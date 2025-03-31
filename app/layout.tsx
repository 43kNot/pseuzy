import { Inter as InterFont } from 'next/font/google'
import { ThemeProvider } from '@/lib/theme/theme-provider'
import { ThemeSwitcher } from '@/components/theme-switcher'
import './globals.css'
import { SessionTimeout } from "@/components/session-timeout"
import { AuthDebug } from "@/components/auth-debug"
import { ConditionalHeader } from "@/components/conditional-header"

const inter = InterFont({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'Pseuzy - Learn Python with AI',
  description: 'An interactive platform for learning Python programming with AI assistance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased">
        <ThemeProvider defaultThemeId="purple-logic" defaultColorMode="light">
          <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-4 flex">
                  <a className="mr-6 flex items-center space-x-2" href="/">
                    <span className="font-bold">Pseuzy</span>
                  </a>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                  <nav className="flex items-center">
                    <ThemeSwitcher />
                  </nav>
                </div>
              </div>
            </header>
            <main>{children}</main>
          </div>
          <SessionTimeout />
          <AuthDebug />
        </ThemeProvider>
      </body>
    </html>
  )
}
