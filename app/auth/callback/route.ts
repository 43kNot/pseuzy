import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/onboarding'

  if (!code) {
    console.error('No code provided in callback')
    return NextResponse.redirect(new URL('/auth-error?error=missing_code', requestUrl.origin))
  }

  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  try {
    // Exchange the code for a session
    const { data: { session }, error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (sessionError || !session) {
      console.error('Session error:', sessionError)
      return NextResponse.redirect(new URL('/auth-error?error=session_error', requestUrl.origin))
    }

    // Get user metadata
    const { user } = session
    if (!user?.email) {
      console.error('No user email in session')
      return NextResponse.redirect(new URL('/auth-error?error=missing_email', requestUrl.origin))
    }

    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single()

    if (!existingProfile) {
      // Create profile with required fields
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || user.email.split('@')[0],
          avatar_url: user.user_metadata?.avatar_url,
          onboarding_completed: false,
          onboarding_step: 1,
          onboarding_data: {},
        })

      if (insertError) {
        console.error('Profile creation error:', insertError)
        return NextResponse.redirect(new URL('/auth-error?error=profile_creation_error', requestUrl.origin))
      }
    }

    // Create response with redirect
    const response = NextResponse.redirect(new URL(next, requestUrl.origin))

    // Set session cookies with proper attributes
    const secure = process.env.NODE_ENV === 'production'
    const cookieOptions = {
      path: '/',
      httpOnly: true,
      secure,
      sameSite: 'lax' as const,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    }

    response.cookies.set('sb-access-token', session.access_token, cookieOptions)
    response.cookies.set('sb-refresh-token', session.refresh_token, cookieOptions)

    return response
  } catch (error) {
    console.error('Callback error:', error)
    return NextResponse.redirect(new URL('/auth-error?error=callback_error', requestUrl.origin))
  }
}

