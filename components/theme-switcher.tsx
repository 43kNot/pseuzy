"use client"

import * as React from "react"
import { useTheme } from "@/lib/theme/theme-provider"
import { type ThemeConfig } from "@/lib/theme/types"
import { themes, accessibilityThemes } from "@/lib/theme/themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun, Contrast } from "lucide-react"

export function ThemeSwitcher() {
  const { theme, colorMode, contrastMode, setTheme, setColorMode, setContrastMode } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={theme.id === t.id ? 'bg-accent' : ''}
          >
            {t.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Accessibility</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {accessibilityThemes.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={theme.id === t.id ? 'bg-accent' : ''}
          >
            {t.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Color Mode</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => setColorMode('light')}
          className={colorMode === 'light' ? 'bg-accent' : ''}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setColorMode('dark')}
          className={colorMode === 'dark' ? 'bg-accent' : ''}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Contrast</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => setContrastMode('default')}
          className={contrastMode === 'default' ? 'bg-accent' : ''}
        >
          Default
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setContrastMode('high')}
          className={contrastMode === 'high' ? 'bg-accent' : ''}
        >
          High
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Utility function to convert hex to HSL
function hexToHSL(hex: string) {
  // Remove the # if present
  hex = hex.replace('#', '')

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  // Find min and max values
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  
  let h = 0
  let s = 0
  let l = (max + min) / 2

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
    l: Math.round(l * 100)
  }
}

