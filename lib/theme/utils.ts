import { type ThemeConfig, type ThemeColors, type HSLColor } from './types'
import { defaultTheme } from './themes'

// Convert hex to HSL
export function hexToHSL(hex: string): { h: number; s: number; l: number } {
  // Remove the # if present
  hex = hex.replace('#', '')

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

// Convert HSL to CSS variable format
export function hslToVar(h: number, s: number, l: number): string {
  return `${h} ${s}% ${l}%`
}

// Calculate contrast ratio between two colors
export function getContrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

// Get relative luminance from HSL
export function getLuminance(l: number): number {
  return l / 100
}

// Adjust color for contrast
export function adjustForContrast(
  color: string,
  bgLuminance: number,
  targetRatio = 4.5
): string {
  const hsl = hexToHSL(color)
  let { h, s, l } = hsl
  const originalL = l

  // Try making lighter first
  while (l < 100) {
    if (getContrastRatio(getLuminance(l), bgLuminance) >= targetRatio) {
      break
    }
    l += 1
  }

  // If making lighter didn't work, try darker
  if (l === 100) {
    l = originalL
    while (l > 0) {
      if (getContrastRatio(getLuminance(l), bgLuminance) >= targetRatio) {
        break
      }
      l -= 1
    }
  }

  return `hsl(${h}, ${s}%, ${l}%)`
}

function hslToHex(h: number, s: number, l: number): string {
  l /= 100
  const a = s * Math.min(l, 1 - l) / 100

  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }

  return `#${f(0)}${f(8)}${f(4)}`
}

function hslToString(color: HSLColor): string {
  return `${color.h} ${color.s}% ${color.l}%`
}

// Generate theme CSS variables
export function generateThemeVars(theme: ThemeConfig): Record<string, string> {
  const vars: Record<string, string> = {}

  // Generate HSL variables
  Object.entries(theme.colors).forEach(([key, color]) => {
    vars[`--${key}`] = hslToString(color)
  })

  // Generate hex variables for components that need them
  Object.entries(theme.colors).forEach(([key, color]) => {
    vars[`--${key}-hex`] = hslToHex(color.h, color.s, color.l)
  })

  // Add semantic tokens
  vars['--background'] = theme.colorMode === 'dark' ? vars['--primaryDark'] : vars['--accentLight']
  vars['--foreground'] = theme.colorMode === 'dark' ? vars['--accentLight'] : vars['--primary']
  vars['--muted-foreground'] = vars['--muted']
  vars['--border'] = theme.colorMode === 'dark' ? vars['--primaryLight'] : vars['--accentLighter']

  // Component-specific variables
  vars['--card-background'] = theme.colorMode === 'dark' ? vars['--primaryLight'] : vars['--accentLight']
  vars['--card-foreground'] = theme.colorMode === 'dark' ? vars['--accentLight'] : vars['--primary']
  vars['--button-background'] = vars['--uiPurple']
  vars['--button-foreground'] = vars['--accentLight']

  return vars
}

// Get theme CSS string
export function getThemeCSS(theme: ThemeConfig): string {
  const vars = generateThemeVars(theme)
  return Object.entries(vars)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ')
}

// Get accessible text color for background
export function getAccessibleTextColor(bgColor: string): string {
  const { l } = hexToHSL(bgColor)
  const luminance = getLuminance(l)
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

// Get theme variant styles
export function getThemeVariant(
  theme: ThemeConfig,
  variant: 'default' | 'primary' | 'secondary' | 'accent'
): { background: string; foreground: string } {
  const colors = theme.colors
  switch (variant) {
    case 'primary':
      return {
        background: colors.primary,
        foreground: getAccessibleTextColor(colors.primary),
      }
    case 'secondary':
      return {
        background: colors.secondary,
        foreground: getAccessibleTextColor(colors.secondary),
      }
    case 'accent':
      return {
        background: colors.accentCool,
        foreground: getAccessibleTextColor(colors.accentCool),
      }
    default:
      return {
        background: theme.colorMode === 'dark' ? colors.primaryDark : colors.accentLight,
        foreground: theme.colorMode === 'dark' ? colors.accentLight : colors.primary,
      }
  }
} 