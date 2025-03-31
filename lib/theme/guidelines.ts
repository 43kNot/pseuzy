/**
 * Theme Generation Guidelines
 * 
 * This file documents the rules and requirements for generating new themes.
 * When asked to generate a new theme "according to guidelines", these rules must be followed.
 */

import { type ThemeConfig, type HSLColor } from './types'

/**
 * Theme Categories
 */
export enum ThemeCategory {
  Custom = 'custom',    // Themes using the custom color palette
  Industry = 'industry' // Themes inspired by industry standards
}

/**
 * Required semantic colors for all themes
 */
export interface RequiredSemanticColors {
  primary: HSLColor    // Main theme color
  secondary: HSLColor  // Supporting color
  accent: HSLColor     // Highlight color
  success: HSLColor    // Positive state color
  warning: HSLColor    // Warning state color
  error: HSLColor      // Error state color
  info: HSLColor       // Information state color
  surface: HSLColor    // Component background
  background: HSLColor // Page background
  foreground: HSLColor // Main text color
  muted: HSLColor      // Secondary text color
  border: HSLColor     // Border color
  ring: HSLColor       // Focus ring color
  input: HSLColor      // Input field color
  card: HSLColor       // Card component color
  popover: HSLColor    // Popover component color
  tooltip: HSLColor    // Tooltip component color
}

/**
 * Custom color palette for custom themes
 */
export const customColorPalette = {
  primary: '#1868E8',
  secondary: '#D3FD53',
  dark: '#1B0637',
  purple: '#301457',
  deepPurple: '#49207C',
  richPurple: '#622CA0',
  lightPurple: '#A888D8',
  lavender: '#DAD0F2',
  lightLavender: '#EEECFE',
  muted: '#9E98A9'
} as const

/**
 * Theme generation rules and requirements
 */
export const themeGuidelines = {
  /**
   * Structure Requirements
   */
  structure: {
    required: [
      'id (unique, descriptive)',
      'name (descriptive)',
      'description (clear purpose)',
      'baseHue (0-360)',
      'colorMode (light/dark)',
      'colors (complete semantic palette)'
    ]
  },

  /**
   * Color Mode Requirements
   */
  colorMode: {
    dark: {
      background: { l: { min: 5, max: 15 } },
      text: { l: { min: 90, max: 95 } }
    },
    light: {
      background: { l: { min: 90, max: 98 } },
      text: { l: { min: 20, max: 30 } }
    }
  },

  /**
   * Contrast Requirements (WCAG 2.1 AA)
   */
  contrast: {
    normalText: { min: 4.5 },
    largeText: { min: 3 },
    uiComponents: { min: 3 }
  },

  /**
   * Theme Categories
   */
  categories: {
    custom: {
      description: 'Themes using the custom color palette',
      colors: customColorPalette
    },
    industry: {
      description: 'Themes inspired by industry standards',
      requirements: [
        'Maintain original color relationships',
        'Adapt to semantic color system',
        'Ensure accessibility compliance'
      ]
    }
  },

  /**
   * Accessibility Requirements
   */
  accessibility: {
    required: [
      'High contrast mode support',
      'Color not sole information carrier',
      'Readable across devices',
      'Color blindness consideration'
    ]
  },

  /**
   * Implementation Requirements
   */
  implementation: {
    colorFormat: 'HSL',
    types: 'TypeScript',
    structure: 'Consistent with ThemeConfig'
  },

  /**
   * Testing Requirements
   */
  testing: {
    required: [
      'Contrast ratio verification',
      'Component testing',
      'Consistency check',
      'Accessibility validation'
    ]
  }
} as const

/**
 * Helper function to validate a theme against guidelines
 */
export function validateTheme(theme: ThemeConfig): string[] {
  const errors: string[] = []

  // Validate required properties
  const required = themeGuidelines.structure.required
  for (const prop of required) {
    const [name] = prop.split(' ')
    if (!theme[name as keyof ThemeConfig]) {
      errors.push(`Missing required property: ${name}`)
    }
  }

  // Validate color mode requirements
  const mode = theme.colorMode
  const modeReqs = themeGuidelines.colorMode[mode]
  if (theme.colors.background.l < modeReqs.background.l.min || 
      theme.colors.background.l > modeReqs.background.l.max) {
    errors.push(`Background lightness outside ${mode} mode range`)
  }

  // Validate semantic colors
  const requiredColors = Object.keys(themeGuidelines.structure.required
    .find(p => p.includes('colors'))?.split(' ')[1] || '') as (keyof RequiredSemanticColors)[]
  for (const color of requiredColors) {
    if (!theme.colors[color]) {
      errors.push(`Missing required semantic color: ${color}`)
    }
  }

  return errors
} 