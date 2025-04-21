"use client"

import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { updateSessionActivity, isSessionExpiring } from "@/lib/session-management"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SessionTimeoutWarning() {
  const [showWarning, setShowWarning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const router = useRouter()

  // Check for session activity
  useEffect(() => {
    const handleActivity = () => {
      updateSessionActivity()
      setShowWarning(false)
    }

    // Listen for user activity
    window.addEventListener("click", handleActivity)
    window.addEventListener("keypress", handleActivity)
    window.addEventListener("scroll", handleActivity)
    window.addEventListener("mousemove", handleActivity)

    // Check every minute if session is expiring
    const checkInterval = setInterval(() => {
      if (isSessionExpiring()) {
        setShowWarning(true)
        setTimeLeft(60) // 1 minute countdown
      }
    }, 60000)

    // Countdown timer when warning is displayed
    let countdownInterval: NodeJS.Timeout | null = null
    if (showWarning) {
      countdownInterval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Session expired, redirect to login
            router.push("/login")
            clearInterval(countdownInterval as NodeJS.Timeout)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }

    return () => {
      window.removeEventListener("click", handleActivity)
      window.removeEventListener("keypress", handleActivity)
      window.removeEventListener("scroll", handleActivity)
      window.removeEventListener("mousemove", handleActivity)
      clearInterval(checkInterval)
      if (countdownInterval) clearInterval(countdownInterval)
    }
  }, [showWarning, router])

  if (!showWarning) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Your session is about to expire</AlertTitle>
        <AlertDescription>
          <p className="mb-2">
            Due to inactivity, your session will expire in {timeLeft} seconds. Any unsaved changes will be lost.
          </p>
          <Button
            onClick={() => {
              updateSessionActivity()
              setShowWarning(false)
            }}
            className="w-full"
          >
            Stay logged in
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  )
}
