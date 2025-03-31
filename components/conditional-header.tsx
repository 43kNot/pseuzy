"use client"

import { usePathname } from "next/navigation"
import { GlobalHeader } from "@/components/global-header"

export function ConditionalHeader() {
  const pathname = usePathname()
  const isOnboarding = pathname === "/onboarding"

  if (isOnboarding) {
    return null
  }

  return <GlobalHeader />
} 