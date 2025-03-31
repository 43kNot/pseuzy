/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        sm: '0 1px 2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 0.1))',
        DEFAULT: '0 1px 3px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 0.1)), 0 1px 2px -1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 0.1))',
        md: '0 4px 6px -1px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 0.1)), 0 2px 4px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 0.1))',
        lg: '0 10px 15px -3px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 0.1)), 0 4px 6px -4px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 0.1))',
        xl: '0 20px 25px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 0.1)), 0 8px 10px -6px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 0.1))',
        '2xl': '0 25px 50px -12px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 0.25))',
        inner: 'inset 0 2px 4px 0 hsl(var(--shadow-color) / calc(var(--shadow-strength) + 0.05))',
        none: 'none',
      },
      transitionDuration: {
        DEFAULT: 'var(--transition-duration)',
      },
      transitionTimingFunction: {
        DEFAULT: 'var(--transition-timing)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'content-show': {
          from: { opacity: 0, transform: 'scale(0.96)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
        'content-hide': {
          from: { opacity: 1, transform: 'scale(1)' },
          to: { opacity: 0, transform: 'scale(0.96)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down var(--transition-duration) var(--transition-timing)',
        'accordion-up': 'accordion-up var(--transition-duration) var(--transition-timing)',
        'content-show': 'content-show var(--transition-duration) var(--transition-timing)',
        'content-hide': 'content-hide var(--transition-duration) var(--transition-timing)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} 