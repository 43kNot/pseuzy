import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { checkEnvironment } from "@/lib/env-check"
import "./globals.css"

// Check environment variables during build/startup
if (typeof process !== "undefined") {
  checkEnvironment()
}

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Pseuzy - Learn Computational Thinking & Pseudocode",
  description:
    "An interactive platform for learning computational thinking, problem-solving, and pseudocode for Python and JavaScript",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
