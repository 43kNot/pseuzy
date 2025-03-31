import { type ClassValue } from 'clsx'

// Theme scale type
type ColorScale = {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

// Semantic color tokens
export const semanticTokens = {
  light: {
    surface: {
      background: 'hsl(var(--theme-hue) 30% 98%)',
      card: 'hsl(var(--theme-hue) 20% 100%)',
      elevated: 'hsl(var(--theme-hue) 25% 96%)',
      muted: 'hsl(var(--theme-hue) 20% 94%)',
      highlight: 'hsl(var(--theme-hue) 25% 92%)',
    },
    content: {
      primary: 'hsl(var(--theme-hue) 80% 20%)',
      secondary: 'hsl(var(--theme-hue) 60% 40%)',
      muted: 'hsl(var(--theme-hue) 30% 60%)',
      inverse: 'hsl(var(--theme-hue) 20% 98%)',
    },
    interactive: {
      default: 'hsl(var(--theme-hue) 80% 50%)',
      hover: 'hsl(var(--theme-hue) 80% 45%)',
      active: 'hsl(var(--theme-hue) 80% 40%)',
      muted: 'hsl(var(--theme-hue) 30% 80%)',
      disabled: 'hsl(var(--theme-hue) 20% 85%)',
    },
    border: {
      default: 'hsl(var(--theme-hue) 20% 90%)',
      muted: 'hsl(var(--theme-hue) 20% 94%)',
      focus: 'hsl(var(--theme-hue) 80% 50%)',
    },
    shadow: {
      sm: '0 1px 2px hsl(var(--theme-hue) 20% 92%)',
      md: '0 2px 4px hsl(var(--theme-hue) 20% 90%)',
      lg: '0 4px 8px hsl(var(--theme-hue) 20% 88%)',
    },
  },
  dark: {
    surface: {
      background: 'hsl(var(--theme-hue) 20% 4%)',
      card: 'hsl(var(--theme-hue) 20% 8%)',
      elevated: 'hsl(var(--theme-hue) 20% 12%)',
      muted: 'hsl(var(--theme-hue) 20% 16%)',
      highlight: 'hsl(var(--theme-hue) 20% 20%)',
    },
    content: {
      primary: 'hsl(var(--theme-hue) 20% 98%)',
      secondary: 'hsl(var(--theme-hue) 20% 80%)',
      muted: 'hsl(var(--theme-hue) 20% 60%)',
      inverse: 'hsl(var(--theme-hue) 80% 20%)',
    },
    interactive: {
      default: 'hsl(var(--theme-hue) 80% 60%)',
      hover: 'hsl(var(--theme-hue) 80% 65%)',
      active: 'hsl(var(--theme-hue) 80% 70%)',
      muted: 'hsl(var(--theme-hue) 30% 40%)',
      disabled: 'hsl(var(--theme-hue) 20% 30%)',
    },
    border: {
      default: 'hsl(var(--theme-hue) 20% 24%)',
      muted: 'hsl(var(--theme-hue) 20% 20%)',
      focus: 'hsl(var(--theme-hue) 80% 60%)',
    },
    shadow: {
      sm: '0 1px 2px hsl(var(--theme-hue) 20% 0%)',
      md: '0 2px 4px hsl(var(--theme-hue) 20% 0%)',
      lg: '0 4px 8px hsl(var(--theme-hue) 20% 0%)',
    },
  },
}

// Design tokens
export const tokens = {
  colors: {
    primary: {
      50: 'hsl(var(--theme-hue) 80% 97%)',
      100: 'hsl(var(--theme-hue) 80% 90%)',
      200: 'hsl(var(--theme-hue) 80% 80%)',
      300: 'hsl(var(--theme-hue) 80% 70%)',
      400: 'hsl(var(--theme-hue) 80% 60%)',
      500: 'hsl(var(--theme-hue) 80% 50%)',
      600: 'hsl(var(--theme-hue) 80% 40%)',
      700: 'hsl(var(--theme-hue) 80% 30%)',
      800: 'hsl(var(--theme-hue) 80% 20%)',
      900: 'hsl(var(--theme-hue) 80% 10%)',
    } as ColorScale,
    gray: {
      50: 'hsl(var(--theme-hue) 20% 97%)',
      100: 'hsl(var(--theme-hue) 20% 90%)',
      200: 'hsl(var(--theme-hue) 20% 80%)',
      300: 'hsl(var(--theme-hue) 20% 70%)',
      400: 'hsl(var(--theme-hue) 20% 60%)',
      500: 'hsl(var(--theme-hue) 20% 50%)',
      600: 'hsl(var(--theme-hue) 20% 40%)',
      700: 'hsl(var(--theme-hue) 20% 30%)',
      800: 'hsl(var(--theme-hue) 20% 20%)',
      900: 'hsl(var(--theme-hue) 20% 10%)',
    } as ColorScale,
  },
  spacing: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },
  radii: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
  fontWeights: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  lineHeights: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  transitions: {
    DEFAULT: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    fast: '100ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    drawer: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
} 