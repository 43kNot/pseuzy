export type ColorMode = 'light' | 'dark'
export type ContrastMode = 'default' | 'high'

export interface HSLColor {
  h: number // 0-360
  s: number // 0-100
  l: number // 0-100
}

export interface ThemeColors {
  primary: HSLColor
  secondary: HSLColor
  accent: HSLColor
  success: HSLColor
  warning: HSLColor
  error: HSLColor
  info: HSLColor
  surface: HSLColor
  background: HSLColor
  foreground: HSLColor
  muted: HSLColor
  border: HSLColor
  ring: HSLColor
  input: HSLColor
  card: HSLColor
  popover: HSLColor
  tooltip: HSLColor
}

export interface ThemeConfig {
  id: string
  name: string
  description: string
  baseHue: number
  colorMode: ColorMode
  colors: ThemeColors
}

export interface ThemeContextValue {
  theme: ThemeConfig
  colorMode: ColorMode
  contrastMode: ContrastMode
  setTheme: (themeId: string) => void
  setColorMode: (mode: ColorMode) => void
  setContrastMode: (mode: ContrastMode) => void
}

// Theme variant types
export type ThemeVariant = 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info'

// Component-specific theme types
export interface CardTheme {
  background: HSLColor
  foreground: HSLColor
  border: HSLColor
  hover: {
    background: HSLColor
    border: HSLColor
  }
}

export interface ButtonTheme {
  background: HSLColor
  foreground: HSLColor
  border: HSLColor
  hover: {
    background: HSLColor
    foreground: HSLColor
    border: HSLColor
  }
}

export interface InputTheme {
  background: HSLColor
  foreground: HSLColor
  border: HSLColor
  placeholder: HSLColor
  focus: {
    border: HSLColor
    ring: HSLColor
  }
}

// Theme utilities
export interface ThemeUtils {
  getThemeById: (id: string) => ThemeConfig
  getThemesByCategory: () => Record<string, ThemeConfig[]>
  generateThemeVars: (theme: ThemeConfig) => Record<string, string>
  getThemeCSS: (theme: ThemeConfig) => string
} 