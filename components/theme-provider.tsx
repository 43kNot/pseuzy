'use client'

import * as React from 'react'
import { themeConfig } from "@/lib/theme.config"

type Theme = "light" | "dark"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

interface ThemeProviderState {
  theme: Theme
  systemTheme: Theme | null
}

const ThemeContext = React.createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
} | null>(null)

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function ThemeProvider({
  children,
  defaultTheme = themeConfig.defaultTheme,
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [state, setState] = React.useState<ThemeProviderState>(() => ({
    theme: defaultTheme,
    systemTheme: null,
  }))

  React.useEffect(() => {
    const stored = localStorage.getItem(storageKey)
    const theme = stored ? (JSON.parse(stored) as Theme) : getSystemTheme()
    
    setState((prev) => ({
      ...prev,
      theme,
      systemTheme: getSystemTheme(),
    }))

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    
    const handleChange = () => {
      setState((prev) => ({
        ...prev,
        systemTheme: getSystemTheme(),
      }))
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [storageKey])

  const value = React.useMemo(() => {
    const setTheme = (theme: Theme) => {
      localStorage.setItem(storageKey, JSON.stringify(theme))
      setState((prev) => ({ ...prev, theme }))
    }

    return { theme: state.theme, setTheme }
  }, [state.theme, storageKey])

  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(state.theme)
  }, [state.theme])

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <span className="sr-only">Toggle theme</span>
      {theme === "dark" ? (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  )
}
