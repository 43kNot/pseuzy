"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CreateTestUser() {
  const [email, setEmail] = useState("admin@pseuzy.com")
  const [password, setPassword] = useState("Password123!")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const supabase = createClient()

  const handleCreateUser = async () => {
    try {
      setLoading(true)
      setResult(null)

      // Create user with email and password
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      // Create a profile for the user
      if (data.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          email,
          name: "Admin User",
          onboarding_completed: true,
          onboarding_step: 7,
        })

        if (profileError) throw profileError

        setResult({
          success: true,
          message: "Test user created successfully!",
          credentials: {
            email,
            password,
          },
          userId: data.user.id,
        })
      }
    } catch (error) {
      console.error("Error creating test user:", error)
      setResult({
        success: false,
        message: error instanceof Error ? error.message : "An error occurred",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-accent-lighter dark:bg-primary">
      <Card className="w-full max-w-md border border-border dark:border-[#3A1A6A]">
        <CardHeader>
          <CardTitle>Create Test User</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-border dark:border-[#3A1A6A]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="text" // Showing password for testing purposes
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-border dark:border-[#3A1A6A]"
            />
          </div>
          <Button onClick={handleCreateUser} disabled={loading} className="w-full bg-ui-purple hover:bg-[#7A3BC8]">
            {loading ? "Creating..." : "Create Test User"}
          </Button>

          {result && (
            <div
              className={`mt-4 p-4 rounded-md ${
                result.success
                  ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900"
                  : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900"
              }`}
            >
              <p className={result.success ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}>
                {result.message}
              </p>
              {result.success && (
                <div className="mt-2">
                  <p className="font-medium">Login Credentials:</p>
                  <p>Email: {result.credentials.email}</p>
                  <p>Password: {result.credentials.password}</p>
                  <p className="mt-2 text-sm">User ID: {result.userId}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

