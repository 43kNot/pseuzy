"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"

export function AuthDebug() {
  const [sessionState, setSessionState] = useState<any>(null)
  const [cookies, setCookies] = useState<string[]>([])
  const [lastUrl, setLastUrl] = useState<string>("")
  const supabase = createClient()

  useEffect(() => {
    // Track session changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session)
      setSessionState({ event, session })
    })

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSessionState({ event: "INITIAL", session })
    })

    // Track cookies
    const updateCookies = () => {
      setCookies(document.cookie.split(";").map(c => c.trim()))
    }
    updateCookies()

    // Track URL changes
    setLastUrl(window.location.href)
    const observer = new MutationObserver(() => {
      if (window.location.href !== lastUrl) {
        setLastUrl(window.location.href)
        updateCookies() // Update cookies on URL change
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // Cleanup
    return () => {
      subscription.unsubscribe()
      observer.disconnect()
    }
  }, [lastUrl])

  if (!sessionState) return null

  return (
    <Card className="fixed bottom-4 right-4 p-4 max-w-md max-h-96 overflow-auto bg-white/90 dark:bg-gray-800/90 shadow-lg z-50 text-xs">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      <div className="space-y-2">
        <div>
          <strong>Current URL:</strong> {lastUrl}
        </div>
        <div>
          <strong>Auth State:</strong> {sessionState.event}
        </div>
        <div>
          <strong>Session:</strong>{" "}
          {sessionState.session ? "Authenticated" : "Not authenticated"}
        </div>
        <div>
          <strong>Cookies:</strong>
          <ul className="list-disc pl-4">
            {cookies.map((cookie, i) => (
              <li key={i}>{cookie}</li>
            ))}
          </ul>
        </div>
        {sessionState.session && (
          <div>
            <strong>User:</strong>
            <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-900 rounded">
              {JSON.stringify(sessionState.session.user, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </Card>
  )
}

