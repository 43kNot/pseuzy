"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function useOnboarding() {
  const supabase = createClient()
  const router = useRouter()

  // Complete onboarding and redirect to pre-assessment
  const completeOnboarding = async (userId: string, profileData: any) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          ...profileData,
          onboarding_completed: true,
        })
        .eq("id", userId)

      if (error) throw error

      // Redirect to pre-assessment
      router.push("/pre-assessment")

      return true
    } catch (err) {
      console.error("Error completing onboarding:", err)
      return false
    }
  }

  // Update onboarding progress
  const updateOnboardingProgress = async (userId: string, step: number, data: any) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          onboarding_step: step,
          onboarding_data: data,
        })
        .eq("id", userId)

      if (error) throw error

      return true
    } catch (err) {
      console.error("Error updating onboarding progress:", err)
      return false
    }
  }

  return {
    completeOnboarding,
    updateOnboardingProgress,
  }
}

