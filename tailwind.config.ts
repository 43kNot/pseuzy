import type { Config } from "tailwindcss"
import { themeConfig } from "./lib/theme.config"
import plugin from "tailwindcss/plugin"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
    disableColorOpacityUtilitiesByDefault: true,
    respectDefaultRingColorOpacity: true,
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      transitionDuration: {
        sm: "var(--transition-duration-sm)",
        md: "var(--transition-duration-md)",
        lg: "var(--transition-duration-lg)",
      },
      transitionTimingFunction: {
        default: "var(--transition-timing-default)",
        bounce: "var(--transition-timing-bounce)",
        elastic: "var(--transition-timing-elastic)",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
    plugin(({ addUtilities, addVariant }) => {
      // Add custom utilities
      addUtilities({
        ".text-balance": {
          "text-wrap": "balance",
        },
        ".text-pretty": {
          "text-wrap": "pretty",
        },
        ".tap-highlight-transparent": {
          "-webkit-tap-highlight-color": "transparent",
        },
      })

      // Add custom variants
      addVariant("supports-hover", "@media (hover: hover)")
      addVariant("supports-grid", "@supports (display: grid)")
      addVariant("supports-backdrop", "@supports (backdrop-filter: blur(0px))")
      addVariant("supports-scrollbar", "@supports selector(::-webkit-scrollbar)")
      addVariant("reduced-motion", "@media (prefers-reduced-motion: reduce)")
      addVariant("forced-colors", "@media (forced-colors: active)")
      addVariant("touch", "@media (hover: none) and (pointer: coarse)")
    }),
  ],
} satisfies Config

export default config

