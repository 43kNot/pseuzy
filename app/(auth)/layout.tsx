import type React from "react"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { AuthDebug } from "@/components/auth-debug"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-accent-lighter dark:bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center gap-2">
            <CheckCircle2 className="h-8 w-8 text-accent-cool" />
            <h1 className="text-2xl font-bold text-primary-dark dark:text-white">Pseuzy</h1>
          </Link>
        </div>
        {children}
      </div>
      <AuthDebug />
    </div>
  )
}

