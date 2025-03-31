'use client'

import * as React from 'react'
import { type ThemeConfig, type ColorMode, type ContrastMode } from './types'
import { defaultTheme, getThemeById } from './themes'
import { generateThemeVars, getThemeCSS } from './utils'

interface ThemeContextValue {
  theme: ThemeConfig
  colorMode: ColorMode
  contrastMode: ContrastMode
  setTheme: (themeId: string) => void
  setColorMode: (mode: ColorMode) => void
  setContrastMode: (mode: ContrastMode) => void
}

const STORAGE_KEYS = {
  theme: 'pseuzy-theme',
  colorMode: 'pseuzy-color-mode',
  contrastMode: 'pseuzy-contrast-mode',
} as const

function getStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch (error) {
    console.warn(`Error reading ${key} from localStorage:`, error)
    return fallback
  }
}

const initialContext: ThemeContextValue = {
  theme: defaultTheme,
  colorMode: 'light',
  contrastMode: 'default',
  setTheme: () => null,
  setColorMode: () => null,
  setContrastMode: () => null,
}

const ThemeContext = React.createContext<ThemeContextValue>(initialContext)

export function ThemeProvider({
  children,
  defaultThemeId = 'purple-logic',
  defaultColorMode = 'light',
  defaultContrastMode = 'default',
}: {
  children: React.ReactNode
  defaultThemeId?: string
  defaultColorMode?: ColorMode
  defaultContrastMode?: ContrastMode
}) {
  // Theme state with localStorage persistence
  const [theme, setThemeState] = React.useState<ThemeConfig>(() => 
    getThemeById(getStoredValue(STORAGE_KEYS.theme, defaultThemeId))
  )
  const [colorMode, setColorModeState] = React.useState<ColorMode>(() =>
    getStoredValue(STORAGE_KEYS.colorMode, defaultColorMode)
  )
  const [contrastMode, setContrastModeState] = React.useState<ContrastMode>(() =>
    getStoredValue(STORAGE_KEYS.contrastMode, defaultContrastMode)
  )

  // Update theme and persist to localStorage
  const setTheme = React.useCallback((themeId: string) => {
    const newTheme = getThemeById(themeId)
    setThemeState(newTheme)
    document.documentElement.style.cssText = getThemeCSS(newTheme)
    localStorage.setItem(STORAGE_KEYS.theme, JSON.stringify(themeId))
  }, [])

  // Update color mode and persist to localStorage
  const setColorMode = React.useCallback((mode: ColorMode) => {
    setColorModeState(mode)
    localStorage.setItem(STORAGE_KEYS.colorMode, JSON.stringify(mode))
  }, [])

  // Update contrast mode and persist to localStorage
  const setContrastMode = React.useCallback((mode: ContrastMode) => {
    setContrastModeState(mode)
    localStorage.setItem(STORAGE_KEYS.contrastMode, JSON.stringify(mode))
  }, [])

  // Apply theme on mount and changes
  React.useEffect(() => {
    document.documentElement.style.cssText = getThemeCSS(theme)
  }, [theme, colorMode, contrastMode])

  // Update color mode classes
  React.useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(colorMode)
  }, [colorMode])

  // Update contrast mode classes
  React.useEffect(() => {
    document.documentElement.classList.remove('contrast-default', 'contrast-high')
    document.documentElement.classList.add(`contrast-${contrastMode}`)
  }, [contrastMode])

  // Handle system color scheme changes
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      const systemColorMode: ColorMode = e.matches ? 'dark' : 'light'
      const storedColorMode = getStoredValue(STORAGE_KEYS.colorMode, null)
      if (!storedColorMode) {
        setColorMode(systemColorMode)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [setColorMode])

  const value = React.useMemo(
    () => ({
      theme,
      colorMode,
      contrastMode,
      setTheme,
      setColorMode,
      setContrastMode,
    }),
    [theme, colorMode, contrastMode, setTheme, setColorMode, setContrastMode]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// Custom hooks for accessing theme context
export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export function useThemeValue<T>(selector: (theme: ThemeConfig) => T): T {
  const { theme } = useTheme()
  return selector(theme)
}

export function useSemanticToken(token: string): string {
  const { theme } = useTheme()
  const vars = generateThemeVars(theme)
  return vars[`--${token}`] || ''
}

export function useComponentTheme(component: string): Record<string, string> {
  const { theme } = useTheme()
  const vars = generateThemeVars(theme)
  const componentVars: Record<string, string> = {}

  Object.entries(vars)
    .filter(([key]) => key.startsWith(`--${component}-`))
    .forEach(([key, value]) => {
      componentVars[key.replace(`--${component}-`, '')] = value
    })

  return componentVars
} 