// User preferences management

export interface UserPreferences {
  name: string
  themeId: string
  learningStyle: {
    visual: number
    auditory: number
    reading: number
    kinesthetic: number
  }
  dominantLearningStyle?: string
  learningGoals: string[]
  customGoal?: string
  timeCommitment: string
  notificationPreferences: string[]
  emailForNotifications?: string
  highContrastMode: boolean
  textToSpeechEnabled: boolean
  keyboardShortcutsEnabled: boolean
  fontSize: "small" | "medium" | "large"
  lastActive?: string
  completedLessons: number[]
  streak: {
    current: number
    longest: number
    lastLoginDate?: string
  }
  achievements: string[]
}

// Default user preferences
export const defaultPreferences: UserPreferences = {
  name: "",
  themeId: "purple-logic",
  learningStyle: {
    visual: 0,
    auditory: 0,
    reading: 0,
    kinesthetic: 0,
  },
  learningGoals: [],
  timeCommitment: "moderate",
  notificationPreferences: [],
  highContrastMode: false,
  textToSpeechEnabled: false,
  keyboardShortcutsEnabled: true,
  fontSize: "medium",
  completedLessons: [],
  streak: {
    current: 0,
    longest: 0,
  },
  achievements: [],
}

// Get user preferences from localStorage
export function getUserPreferences(): UserPreferences {
  const savedPreferences = localStorage.getItem("user-preferences")
  if (savedPreferences) {
    try {
      const parsedPreferences = JSON.parse(savedPreferences)
      return { ...defaultPreferences, ...parsedPreferences }
    } catch (error) {
      console.error("Error parsing user preferences:", error)
    }
  }
  return defaultPreferences
}

// Save user preferences to localStorage
export function saveUserPreferences(preferences: Partial<UserPreferences>): UserPreferences {
  const currentPreferences = getUserPreferences()
  const updatedPreferences = { ...currentPreferences, ...preferences }

  // Calculate dominant learning style if not already set
  if (!updatedPreferences.dominantLearningStyle) {
    updatedPreferences.dominantLearningStyle = getDominantLearningStyle(updatedPreferences.learningStyle)
  }

  // Update last active timestamp
  updatedPreferences.lastActive = new Date().toISOString()

  // Save to localStorage
  localStorage.setItem("user-preferences", JSON.stringify(updatedPreferences))

  return updatedPreferences
}

// Get dominant learning style
export function getDominantLearningStyle(learningStyle: UserPreferences["learningStyle"]): string {
  return Object.entries(learningStyle).reduce((max, [style, score]) => (score > max.score ? { style, score } : max), {
    style: "visual",
    score: -1,
  }).style
}

// Update streak information
export function updateStreak(): { current: number; longest: number } {
  const preferences = getUserPreferences()
  const today = new Date().toDateString()
  const lastLoginDate = preferences.streak.lastLoginDate

  let { current, longest } = preferences.streak

  if (lastLoginDate) {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    if (today === lastLoginDate) {
      // Already logged in today, do nothing
    } else if (yesterday.toDateString() === lastLoginDate) {
      // Logged in yesterday, increment streak
      current += 1
      if (current > longest) {
        longest = current
      }
    } else {
      // Streak broken
      current = 1
    }
  } else {
    // First login
    current = 1
    if (longest < 1) {
      longest = 1
    }
  }

  // Save updated streak
  saveUserPreferences({
    streak: {
      current,
      longest,
      lastLoginDate: today,
    },
  })

  return { current, longest }
}

// Add a completed lesson
export function addCompletedLesson(lessonId: number): void {
  const preferences = getUserPreferences()
  if (!preferences.completedLessons.includes(lessonId)) {
    const updatedLessons = [...preferences.completedLessons, lessonId]
    saveUserPreferences({ completedLessons: updatedLessons })
  }
}

// Add an achievement
export function addAchievement(achievementId: string): void {
  const preferences = getUserPreferences()
  if (!preferences.achievements.includes(achievementId)) {
    const updatedAchievements = [...preferences.achievements, achievementId]
    saveUserPreferences({ achievements: updatedAchievements })
  }
}

// Toggle accessibility feature
export function toggleAccessibilityFeature(
  feature: "highContrastMode" | "textToSpeechEnabled" | "keyboardShortcutsEnabled",
): boolean {
  const preferences = getUserPreferences()
  const newValue = !preferences[feature]

  saveUserPreferences({ [feature]: newValue })
  return newValue
}

// Set font size
export function setFontSize(size: "small" | "medium" | "large"): void {
  saveUserPreferences({ fontSize: size })

  // Apply font size to document
  document.documentElement.classList.remove("text-small", "text-medium", "text-large")
  document.documentElement.classList.add(`text-${size}`)
}

