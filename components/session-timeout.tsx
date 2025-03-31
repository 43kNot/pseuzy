"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

// Session timeout in milliseconds (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000
// Warning before timeout in milliseconds (5 minutes)
const WARNING_BEFORE_TIMEOUT = 5 * 60 * 1000
// Activity events to listen for
const ACTIVITY_EVENTS = ["mousedown", "mousemove", "keydown", "scroll", "touchstart"]

export function SessionTimeout() {
  const [showWarning, setShowWarning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // Reset the session timeout
  const resetTimeout = useCallback(async () => {
    setIsRefreshing(true)
    try {
      // Refresh the session
      const { error } = await supabase.auth.refreshSession()
      if (error) throw error

      // Update last activity time
      localStorage.setItem("lastActivityTime", Date.now().toString())
      setShowWarning(false)
    } catch (error) {
      console.error("Error refreshing session:", error)
      // If we can't refresh the session, sign out
      await supabase.auth.signOut()
      router.push("/signin")
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  // Handle user activity
  const handleUserActivity = useCallback(() => {
    localStorage.setItem("lastActivityTime", Date.now().toString())
  }, [])

  // Check session status
  const checkSessionStatus = useCallback(() => {
    const lastActivityTime = Number.parseInt(localStorage.getItem("lastActivityTime") || Date.now().toString())
    const currentTime = Date.now()
    const timeSinceLastActivity = currentTime - lastActivityTime

    if (timeSinceLastActivity >= SESSION_TIMEOUT) {
      // Session expired, sign out
      supabase.auth.signOut().then(() => {
        router.push("/signin")
      })
    } else if (timeSinceLastActivity >= SESSION_TIMEOUT - WARNING_BEFORE_TIMEOUT) {
      // Show warning
      setShowWarning(true)
      setTimeLeft(Math.floor((SESSION_TIMEOUT - timeSinceLastActivity) / 1000))
    } else {
      setShowWarning(false)
    }
  }, [])

  // Initialize session timeout
  useEffect(() => {
    // Set initial last activity time
    if (!localStorage.getItem("lastActivityTime")) {
      localStorage.setItem("lastActivityTime", Date.now().toString())
    }

    // Add activity event listeners
    ACTIVITY_EVENTS.forEach((event) => {
      window.addEventListener(event, handleUserActivity)
    })

    // Check session status periodically
    const intervalId = setInterval(checkSessionStatus, 1000)

    return () => {
      // Clean up event listeners and interval
      ACTIVITY_EVENTS.forEach((event) => {
        window.removeEventListener(event, handleUserActivity)
      })
      clearInterval(intervalId)
    }
  }, [handleUserActivity, checkSessionStatus])

  // Update time left countdown
  useEffect(() => {
    if (showWarning && timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timerId)
    }
  }, [showWarning, timeLeft])

  // Format time left as mm:ss
  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <Dialog open={showWarning} onOpenChange={setShowWarning}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Session Timeout Warning</DialogTitle>
          <DialogDescription>
            Your session will expire in {formatTimeLeft()}. Would you like to stay signed in?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowWarning(false)}>
            Dismiss
          </Button>
          <Button onClick={resetTimeout} disabled={isRefreshing}>
            {isRefreshing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              "Stay Signed In"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

