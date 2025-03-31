import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define route types
const PUBLIC_ROUTES = ['/signin', '/signup', '/verify', '/reset-password', '/forgot-password']
const AUTH_ROUTES = ['/auth/callback', '/auth-error']
const PROTECTED_ROUTES = ['/dashboard', '/settings', '/profile', '/lessons']
const ONBOARDING_ROUTE = '/onboarding'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Create response early
  const res = NextResponse.next()

  // TEMPORARY: Development-only auth bypass
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️ TEMPORARY: Authentication is bypassed in development mode')
    return res
  }

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Initialize Supabase auth client
  const supabase = createMiddlewareClient({ req: request, res })

  try {
    // Refresh session if exists
    const { data: { session } } = await supabase.auth.getSession()

    // Handle auth-specific routes
    if (AUTH_ROUTES.some(route => pathname.startsWith(route))) {
      return res
    }

    // Handle public routes
    if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
      if (session) {
        // If user is signed in on public route, redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
      return res
    }

    // Handle onboarding route
    if (pathname.startsWith(ONBOARDING_ROUTE)) {
      if (!session) {
        // Store the current URL to redirect back after sign in
        const redirectUrl = new URL('/signin', request.url)
        redirectUrl.searchParams.set('redirectTo', ONBOARDING_ROUTE)
        return NextResponse.redirect(redirectUrl)
      }
      return res
    }

    // Handle protected routes
    if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
      if (!session) {
        // Store the current URL to redirect back after sign in
        const redirectUrl = new URL('/signin', request.url)
        redirectUrl.searchParams.set('redirectTo', pathname)
        return NextResponse.redirect(redirectUrl)
      }
      return res
    }

    // Default: allow access to other routes
    return res
  } catch (error) {
    console.error('Middleware error:', error)
    // On error, redirect to sign in
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}

