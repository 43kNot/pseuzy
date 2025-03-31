"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  // Log error for debugging
  useEffect(() => {
    if (error) {
      console.error("Authentication error:", error)
    }
  }, [error])

  // Get a user-friendly error message
  const getErrorMessage = (error: string | null) => {
    if (!error) return "An unknown error occurred"
    
    // Map technical error messages to user-friendly ones
    const errorMessages: Record<string, string> = {
      "No_authorization_code": "The authentication process was interrupted. Please try again.",
      "No_user_data": "We couldn't retrieve your user information. Please try again.",
      "Invalid_grant": "Your session has expired. Please sign in again.",
      "Email_not_confirmed": "Please confirm your email address before signing in.",
      "Invalid_credentials": "Invalid email or password. Please try again.",
      "User_not_found": "No account found with this email. Please sign up first.",
      "Email_already_registered": "An account with this email already exists. Please sign in instead.",
      "Unexpected_error": "Something went wrong. Please try again later.",
    }

    return errorMessages[error] || error
  }

  return (
    <Card className="border border-border dark:border-[#3A1A6A]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center text-primary-dark dark:text-white">Authentication Error</CardTitle>
        <CardDescription className="text-center">There was a problem with the authentication process</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col items-center">
        <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-full">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>
        <p className="text-center text-primary-light dark:text-slate-300">
          We couldn't complete the authentication process.
          {error && (
            <span className="block mt-2 text-sm text-red-500">
              {getErrorMessage(error)}
            </span>
          )}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button asChild className="w-full bg-ui-purple hover:bg-[#7A3BC8]">
          <Link href="/signin">Try Again</Link>
        </Button>
        <p className="text-sm text-center text-muted-DEFAULT dark:text-slate-400">
          Need help?{" "}
          <Link href="/contact" className="text-accent-cool hover:underline">
            Contact Support
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

