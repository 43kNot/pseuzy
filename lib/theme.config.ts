import { type ThemeConfig } from '@/types/theme'

export const themeConfig: ThemeConfig = {
  themes: {
    light: {
      colors: {
        background: {
          base: '0 0% 100%',
          foreground: '240 10% 3.9%',
        },
        foreground: {
          base: '240 10% 3.9%',
          muted: '240 3.8% 46.1%',
        },
        primary: {
          base: '240 5.9% 10%',
          foreground: '0 0% 98%',
          muted: '240 4.8% 95.9%',
        },
        secondary: {
          base: '240 4.8% 95.9%',
          foreground: '240 5.9% 10%',
        },
        accent: {
          base: '240 4.8% 95.9%',
          foreground: '240 5.9% 10%',
        },
        muted: {
          base: '240 4.8% 95.9%',
          foreground: '240 3.8% 46.1%',
        },
        destructive: {
          base: '0 84.2% 60.2%',
          foreground: '0 0% 98%',
        },
      },
      radii: {
        sm: '0.3rem',
        md: '0.5rem',
        lg: '0.7rem',
      },
      shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      },
      transitions: {
        duration: {
          sm: '150ms',
          md: '200ms',
          lg: '300ms',
        },
        timing: {
          default: 'cubic-bezier(0.4, 0, 0.2, 1)',
          bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        },
      },
    },
    dark: {
      colors: {
        background: {
          base: '240 10% 3.9%',
          foreground: '0 0% 98%',
        },
        foreground: {
          base: '0 0% 98%',
          muted: '240 5% 64.9%',
        },
        primary: {
          base: '0 0% 98%',
          foreground: '240 5.9% 10%',
          muted: '240 3.7% 15.9%',
        },
        secondary: {
          base: '240 3.7% 15.9%',
          foreground: '0 0% 98%',
        },
        accent: {
          base: '240 3.7% 15.9%',
          foreground: '0 0% 98%',
        },
        muted: {
          base: '240 3.7% 15.9%',
          foreground: '240 5% 64.9%',
        },
        destructive: {
          base: '0 62.8% 30.6%',
          foreground: '0 0% 98%',
        },
      },
      radii: {
        sm: '0.3rem',
        md: '0.5rem',
        lg: '0.7rem',
      },
      shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.15)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.2)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.2)',
      },
      transitions: {
        duration: {
          sm: '150ms',
          md: '200ms',
          lg: '300ms',
        },
        timing: {
          default: 'cubic-bezier(0.4, 0, 0.2, 1)',
          bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        },
      },
    },
  },
  defaultTheme: 'light',
  mediaQueries: {
    prefersColorScheme: true,
    prefersReducedMotion: true,
    forcedColors: true,
  },
  features: {
    animations: true,
    transitions: true,
    focusRing: true,
  },
} 