// Simple analytics tracking for user engagement

// Define event types
export type AnalyticsEventType =
  | "page_view"
  | "lesson_start"
  | "lesson_complete"
  | "quiz_start"
  | "quiz_complete"
  | "exercise_start"
  | "exercise_complete"
  | "achievement_earned"
  | "theme_changed"
  | "login"
  | "signup"
  | "onboarding_complete"
  | "feature_used"

// Define event properties
export interface AnalyticsEventProperties {
  [key: string]: string | number | boolean | null
}

// Define user properties
export interface AnalyticsUserProperties {
  userId?: string
  learningStyle?: string
  themeId?: string
  [key: string]: string | number | boolean | undefined
}

// Analytics class
class Analytics {
  private userId: string | null = null
  private userProperties: AnalyticsUserProperties = {}
  private isEnabled = true

  constructor() {
    // Check if analytics is enabled in localStorage
    this.isEnabled = localStorage.getItem("analytics-opt-out") !== "true"

    // Try to get user ID from localStorage
    this.userId = localStorage.getItem("user-id")

    // If no user ID exists, create one
    if (!this.userId) {
      this.userId = this.generateUserId()
      localStorage.setItem("user-id", this.userId)
    }

    // Load user properties from localStorage
    const savedProperties = localStorage.getItem("user-properties")
    if (savedProperties) {
      try {
        this.userProperties = JSON.parse(savedProperties)
      } catch (error) {
        console.error("Error parsing user properties:", error)
      }
    }
  }

  // Generate a random user ID
  private generateUserId(): string {
    return "user_" + Math.random().toString(36).substring(2, 15)
  }

  // Track an event
  public trackEvent(eventType: AnalyticsEventType, properties: AnalyticsEventProperties = {}): void {
    if (!this.isEnabled) return

    const event = {
      eventType,
      properties,
      userId: this.userId,
      timestamp: new Date().toISOString(),
    }

    // In a real app, you would send this to your analytics service
    console.log("Analytics event:", event)

    // For demo purposes, store in localStorage
    const events = this.getStoredEvents()
    events.push(event)
    localStorage.setItem("analytics-events", JSON.stringify(events.slice(-100))) // Keep last 100 events
  }

  // Get stored events from localStorage
  private getStoredEvents(): any[] {
    const storedEvents = localStorage.getItem("analytics-events")
    if (storedEvents) {
      try {
        return JSON.parse(storedEvents)
      } catch (error) {
        console.error("Error parsing stored events:", error)
      }
    }
    return []
  }

  // Set user properties
  public setUserProperties(properties: AnalyticsUserProperties): void {
    if (!this.isEnabled) return

    this.userProperties = {
      ...this.userProperties,
      ...properties,
    }

    // Store in localStorage
    localStorage.setItem("user-properties", JSON.stringify(this.userProperties))

    // In a real app, you would send this to your analytics service
    console.log("User properties updated:", this.userProperties)
  }

  // Opt out of analytics
  public optOut(): void {
    this.isEnabled = false
    localStorage.setItem("analytics-opt-out", "true")
  }

  // Opt in to analytics
  public optIn(): void {
    this.isEnabled = true
    localStorage.removeItem("analytics-opt-out")
  }

  // Check if analytics is enabled
  public isAnalyticsEnabled(): boolean {
    return this.isEnabled
  }
}

// Create a singleton instance
export const analytics = new Analytics()

// Export default instance
export default analytics

