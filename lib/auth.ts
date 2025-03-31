"use client"

import { createClientComponentClient, type User, type Session } from "@supabase/auth-helpers-nextjs"
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

interface AuthError {
  error?: string
}

interface UseAuth {
  signUp: (email: string, password: string) => Promise<{ error: string } | { data: { user: User | null; session: Session | null }; needsEmailVerification: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error: string } | { data: { user: User | null; session: Session | null } }>;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
  getSession: () => Promise<Session | null>;
  getUser: () => Promise<User | null>;
  getUserSessions: () => Promise<Session[]>;
  updateOnboardingProgress: (userId: string, step: number, data: any) => Promise<boolean>;
  completeOnboarding: (userId: string, data: any) => Promise<boolean>;
  error: string | null;
}

export function useAuth(): UseAuth {
  const supabase = createClient()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const handleError = useCallback((error: any) => {
    console.error('Auth error:', error)
    setError(error?.message || 'An error occurred')
  }, [])

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
        },
      })
      
      if (error) {
        return { error: error.message }
      }

      return {
        data: {
          user: data.user,
          session: data.session,
        },
        needsEmailVerification: !data.session,
      }
    } catch (error: any) {
      return { error: error?.message || 'An error occurred during sign up' }
    }
  }

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { error: error.message }
      }

      return {
        data: {
          user: data.user,
          session: data.session,
        },
      }
    } catch (error: any) {
      return { error: error?.message || 'An error occurred during sign in' }
    }
  }

  // Sign in with GitHub - Fixed implementation
  const signInWithGithub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
        },
      })
      if (error) throw error
    } catch (error) {
      handleError(error)
    }
  }

  // Sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/signin')
    } catch (error) {
      handleError(error)
    }
  }

  // Get user sessions
  const getSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      return session
    } catch (error) {
      handleError(error)
      return null
    }
  }

  // Get user information
  const getUser = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return user
    } catch (error) {
      handleError(error)
      return null
    }
  }

  // Get all user sessions
  const getUserSessions = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        handleError(error)
        return []
      }
      return session ? [session] : []
    } catch (error) {
      handleError(error)
      return []
    }
  }

  // Update onboarding progress
  const updateOnboardingProgress = async (userId: string, step: number, data: any) => {
    // Implementation needed
    throw new Error("Method not implemented")
  }

  // Complete onboarding
  const completeOnboarding = async (userId: string, data: any) => {
    // Implementation needed
    throw new Error("Method not implemented")
  }

  return {
    signUp,
    signIn,
    signInWithGithub,
    signOut,
    getSession,
    getUser,
    getUserSessions,
    updateOnboardingProgress,
    completeOnboarding,
    error,
  }
}

