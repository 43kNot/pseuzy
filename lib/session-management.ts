// Session management functionality
export type Session = {
  id: string
  deviceName: string
  browser: string
  location: string
  lastActive: Date
  isCurrentSession: boolean
}

// Mock data - in a real app, this would be stored server-side
let mockSessions: Session[] = [
  {
    id: "session-1",
    deviceName: "MacBook Pro",
    browser: "Chrome",
    location: "New York, USA",
    lastActive: new Date(),
    isCurrentSession: true,
  },
]

// Function to get device/browser info from user-agent
export function getDeviceInfo(): { deviceName: string; browser: string } {
  // This is a simplified version - in production, use a proper library
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const deviceName = isMobile ? "Mobile Device" : "Desktop Computer"

  let browser = "Unknown Browser"
  if (navigator.userAgent.indexOf("Chrome") > -1) browser = "Chrome"
  else if (navigator.userAgent.indexOf("Safari") > -1) browser = "Safari"
  else if (navigator.userAgent.indexOf("Firefox") > -1) browser = "Firefox"
  else if (navigator.userAgent.indexOf("MSIE") > -1 || navigator.userAgent.indexOf("Trident") > -1)
    browser = "Internet Explorer"
  else if (navigator.userAgent.indexOf("Edge") > -1) browser = "Edge"

  return { deviceName, browser }
}

// Get all sessions for the current user
export function getUserSessions(): Session[] {
  return mockSessions
}

// Create a new session
export function createSession(): Session {
  const { deviceName, browser } = getDeviceInfo()

  const newSession: Session = {
    id: `session-${Date.now()}`,
    deviceName,
    browser,
    location: "Unknown Location", // Would use geolocation or IP-based detection in real app
    lastActive: new Date(),
    isCurrentSession: true,
  }

  // Set all existing sessions as not current
  mockSessions = mockSessions.map((session) => ({ ...session, isCurrentSession: false }))

  // Add the new session
  mockSessions.push(newSession)

  return newSession
}

// End a specific session by ID
export function endSession(sessionId: string): boolean {
  const initialLength = mockSessions.length
  mockSessions = mockSessions.filter((session) => session.id !== sessionId)
  return mockSessions.length < initialLength
}

// End all sessions except the current one
export function endAllOtherSessions(): void {
  mockSessions = mockSessions.filter((session) => session.isCurrentSession)
}

// Update last active time for current session
export function updateSessionActivity(): void {
  mockSessions = mockSessions.map((session) =>
    session.isCurrentSession ? { ...session, lastActive: new Date() } : session,
  )
}

// Check if session is about to expire (10 minutes of inactivity)
export function isSessionExpiring(): boolean {
  const currentSession = mockSessions.find((session) => session.isCurrentSession)
  if (!currentSession) return false

  const inactiveTime = Date.now() - currentSession.lastActive.getTime()
  const expiryWarningThreshold = 10 * 60 * 1000 // 10 minutes

  return inactiveTime > expiryWarningThreshold
}
