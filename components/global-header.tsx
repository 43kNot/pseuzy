"use client"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { UserProfile } from "@/components/user-profile"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { AccessibilityMenu } from "@/components/accessibility-menu"
import { HelpSupport } from "@/components/help-support"
import { usePathname } from "next/navigation"

interface GlobalHeaderProps {
  showThemeSwitcher?: boolean
  showAccessibility?: boolean
  showHelp?: boolean
  children?: React.ReactNode
}

export function GlobalHeader({
  showThemeSwitcher = true,
  showAccessibility = true,
  showHelp = true,
  children
}: GlobalHeaderProps) {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  return (
    <header className="bg-white dark:bg-primary-light shadow-sm border-b border-border dark:border-[#3A1A6A]">
      <div className="container mx-auto py-4 px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <CheckCircle2 className="h-8 w-8 text-accent-cool" />
            <h1 className="text-2xl font-bold text-primary-dark dark:text-white">Pseuzy</h1>
          </Link>

          <div className="flex items-center gap-2">
            {/* Show theme switcher always */}
            {showThemeSwitcher && <ThemeSwitcher />}
            
            {/* Always show accessibility menu */}
            <AccessibilityMenu />
            
            {/* Show help except on homepage */}
            {!isHomePage && showHelp && <HelpSupport />}
            
            {/* Show additional menu items */}
            {children}
            
            {/* Always show user profile */}
            <UserProfile />
          </div>
        </div>
      </div>
    </header>
  )
}

