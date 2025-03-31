export type ThemeMode = 'light' | 'dark'

export type ColorToken = {
  base: string
  foreground?: string
  muted?: string
  subtle?: string
}

export type ThemeColors = {
  background: ColorToken
  foreground: ColorToken
  primary: ColorToken
  secondary: ColorToken
  accent: ColorToken
  muted: ColorToken
  destructive: ColorToken
}

export type Scale = {
  sm: string
  md: string
  lg: string
}

export type ThemeTokens = {
  colors: ThemeColors
  radii: Scale
  shadows: Scale
  transitions: {
    duration: Scale
    timing: {
      default: string
      bounce: string
      elastic: string
    }
  }
}

export type ThemePreferences = {
  reducedMotion: boolean
  highContrast: boolean
  forcedColors: boolean
}

export type ThemeConfig = {
  themes: Record<ThemeMode, ThemeTokens>
  defaultTheme: ThemeMode
  mediaQueries: {
    prefersColorScheme: boolean
    prefersReducedMotion: boolean
    forcedColors: boolean
  }
  features: {
    animations: boolean
    transitions: boolean
    focusRing: boolean
  }
} 