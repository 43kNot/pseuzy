"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Accessibility, Eye, Type, Volume2, Keyboard, Moon, Sun, Check } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { getUserPreferences, toggleAccessibilityFeature, setFontSize } from "@/lib/user-preferences"

export function AccessibilityMenu() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [preferences, setPreferences] = useState({
    highContrastMode: false,
    textToSpeechEnabled: false,
    keyboardShortcutsEnabled: true,
    fontSize: "medium" as "small" | "medium" | "large",
  })

  // Ensure component is mounted before accessing window
  useEffect(() => {
    setMounted(true)

    // Load user preferences
    const userPrefs = getUserPreferences()
    setPreferences({
      highContrastMode: userPrefs.highContrastMode,
      textToSpeechEnabled: userPrefs.textToSpeechEnabled,
      keyboardShortcutsEnabled: userPrefs.keyboardShortcutsEnabled,
      fontSize: userPrefs.fontSize,
    })

    // Apply high contrast mode if enabled
    if (userPrefs.highContrastMode) {
      document.documentElement.classList.add("high-contrast")
    }

    // Apply font size
    document.documentElement.classList.add(`text-${userPrefs.fontSize}`)

    // Set up keyboard shortcuts if enabled
    if (userPrefs.keyboardShortcutsEnabled) {
      setupKeyboardShortcuts()
    }

    return () => {
      // Clean up keyboard shortcuts
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  // Set up keyboard shortcuts
  const setupKeyboardShortcuts = () => {
    document.addEventListener("keydown", handleKeyDown)
  }

  // Handle keyboard shortcuts
  const handleKeyDown = (e: KeyboardEvent) => {
    // Only handle if Alt key is pressed
    if (!e.altKey) return

    switch (e.key) {
      case "c": // Toggle high contrast
        toggleHighContrast()
        break
      case "t": // Toggle theme
        toggleTheme()
        break
      case "s": // Toggle text-to-speech
        toggleTextToSpeech()
        break
      case "+": // Increase font size
        changeFontSize("larger")
        break
      case "-": // Decrease font size
        changeFontSize("smaller")
        break
    }
  }

  // Toggle high contrast mode
  const toggleHighContrast = () => {
    const newValue = toggleAccessibilityFeature("highContrastMode")
    setPreferences({ ...preferences, highContrastMode: newValue })

    if (newValue) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }

  // Toggle text-to-speech
  const toggleTextToSpeech = () => {
    const newValue = toggleAccessibilityFeature("textToSpeechEnabled")
    setPreferences({ ...preferences, textToSpeechEnabled: newValue })

    // In a real app, you would initialize or destroy the text-to-speech engine here
    if (newValue && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance("Text to speech enabled")
      window.speechSynthesis.speak(utterance)
    }
  }

  // Toggle keyboard shortcuts
  const toggleKeyboardShortcuts = () => {
    const newValue = toggleAccessibilityFeature("keyboardShortcutsEnabled")
    setPreferences({ ...preferences, keyboardShortcutsEnabled: newValue })

    if (newValue) {
      setupKeyboardShortcuts()
    } else {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Change font size
  const changeFontSize = (direction: "smaller" | "larger" | "small" | "medium" | "large") => {
    const sizes = ["small", "medium", "large"]
    let newSize: "small" | "medium" | "large"

    if (direction === "smaller" || direction === "larger") {
      const currentIndex = sizes.indexOf(preferences.fontSize)
      const newIndex =
        direction === "smaller" ? Math.max(0, currentIndex - 1) : Math.min(sizes.length - 1, currentIndex + 1)
      newSize = sizes[newIndex] as "small" | "medium" | "large"
    } else {
      newSize = direction
    }

    setFontSize(newSize)
    setPreferences({ ...preferences, fontSize: newSize })

    // Apply font size to document
    document.documentElement.classList.remove("text-small", "text-medium", "text-large")
    document.documentElement.classList.add(`text-${newSize}`)
  }

  if (!mounted) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="border-border dark:border-[#3A1A6A]">
          <Accessibility className="h-4 w-4" />
          <span className="sr-only">Accessibility options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Accessibility Options</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={toggleTheme} className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span>{theme === "dark" ? "Dark" : "Light"} Mode</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={toggleHighContrast} className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>High Contrast</span>
          </div>
          {preferences.highContrastMode && <Check className="h-4 w-4" />}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={toggleTextToSpeech} className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            <span>Text-to-Speech</span>
          </div>
          {preferences.textToSpeechEnabled && <Check className="h-4 w-4" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={toggleKeyboardShortcuts}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Keyboard className="h-4 w-4" />
            <span>Keyboard Shortcuts</span>
          </div>
          {preferences.keyboardShortcutsEnabled && <Check className="h-4 w-4" />}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-xs font-normal text-muted-DEFAULT">Font Size</DropdownMenuLabel>

        <DropdownMenuItem
          onClick={() => changeFontSize("small")}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            <span>Small</span>
          </div>
          {preferences.fontSize === "small" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => changeFontSize("medium")}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            <span>Medium</span>
          </div>
          {preferences.fontSize === "medium" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => changeFontSize("large")}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            <span>Large</span>
          </div>
          {preferences.fontSize === "large" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <div className="px-2 py-1.5 text-xs text-muted-DEFAULT">
          Keyboard shortcuts: Alt+C (contrast), Alt+T (theme), Alt+S (speech), Alt+/- (font size)
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

