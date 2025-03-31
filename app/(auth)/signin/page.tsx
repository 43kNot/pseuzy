"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Github, Loader2, Mail } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useSearchParams } from "next/navigation"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const { signIn, signInWithGithub, loading, error } = useAuth()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo")

  // Check if there's a stored email for "remember me"
  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail")
    if (storedEmail) {
      setEmail(storedEmail)
      setRememberMe(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Save email if "remember me" is checked
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email)
    } else {
      localStorage.removeItem("rememberedEmail")
    }

    await signIn(email, password, redirectTo)
  }

  const handleGithubSignIn = async () => {
    try {
      await signInWithGithub(redirectTo || '/onboarding')
    } catch (error) {
      console.error("GitHub sign in error:", error)
    }
  }

  return (
    <Card className="border border-border dark:border-[#3A1A6A]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center text-primary-dark dark:text-white">Welcome back</CardTitle>
        <CardDescription className="text-center">
          Sign in to your account to continue your learning journey
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!showEmailForm ? (
          <>
            <div className="space-y-2">
              <Button
                onClick={() => setShowEmailForm(true)}
                className="w-full bg-ui-purple hover:bg-[#7A3BC8] text-white flex items-center justify-center gap-2 py-6"
              >
                <Mail className="h-5 w-5" />
                <span>Continue with Email</span>
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-primary-light px-2 text-muted-DEFAULT">Or continue with</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border-border dark:border-[#3A1A6A] py-6 mb-2"
                onClick={handleGithubSignIn}
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Github className="mr-2 h-5 w-5" />}
                GitHub
              </Button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="border-border dark:border-[#3A1A6A]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-accent-cool hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                className="border-border dark:border-[#3A1A6A]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              <Label htmlFor="remember" className="text-sm">
                Remember me
              </Label>
            </div>
            <Button className="w-full bg-ui-purple hover:bg-[#7A3BC8]" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setShowEmailForm(false)}
              disabled={loading}
            >
              Back to options
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-DEFAULT dark:text-slate-400">
          Don't have an account?{" "}
          <Link href="/signup" className="text-accent-cool hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

