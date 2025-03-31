"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, Trophy } from "lucide-react"

interface StreakTrackerProps {
  currentStreak?: number
  longestStreak?: number
}

export function StreakTracker({
  currentStreak: initialCurrentStreak = 0,
  longestStreak: initialLongestStreak = 0,
}: StreakTrackerProps) {
  const [currentStreak, setCurrentStreak] = useState(initialCurrentStreak)
  const [longestStreak, setLongestStreak] = useState(initialLongestStreak)
  const [lastActive, setLastActive] = useState<string | null>(null)

  useEffect(() => {
    // Load streak data from localStorage
    const storedStreak = localStorage.getItem("streak")
    const storedLongestStreak = localStorage.getItem("longestStreak")
    const storedLastActive = localStorage.getItem("lastActive")

    if (storedStreak) setCurrentStreak(Number.parseInt(storedStreak))
    if (storedLongestStreak) setLongestStreak(Number.parseInt(storedLongestStreak))
    if (storedLastActive) setLastActive(storedLastActive)

    // Check if we need to update the streak based on the current date
    const today = new Date().toDateString()

    if (storedLastActive) {
      const lastActiveDate = new Date(storedLastActive)
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)

      if (today === storedLastActive) {
        // Already logged in today, do nothing
      } else if (yesterday.toDateString() === storedLastActive) {
        // Logged in yesterday, increment streak
        const newStreak = (Number.parseInt(storedStreak || "0") || 0) + 1
        setCurrentStreak(newStreak)
        localStorage.setItem("streak", newStreak.toString())

        // Update longest streak if needed
        if (newStreak > (Number.parseInt(storedLongestStreak || "0") || 0)) {
          setLongestStreak(newStreak)
          localStorage.setItem("longestStreak", newStreak.toString())
        }
      } else {
        // Streak broken
        setCurrentStreak(1)
        localStorage.setItem("streak", "1")
      }
    } else {
      // First time logging in
      setCurrentStreak(1)
      localStorage.setItem("streak", "1")

      if (longestStreak < 1) {
        setLongestStreak(1)
        localStorage.setItem("longestStreak", "1")
      }
    }

    // Update last active date
    setLastActive(today)
    localStorage.setItem("lastActive", today)
  }, [])

  return (
    <Card className="dark:bg-primary-light">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-primary-dark dark:text-white">Your Learning Streak</CardTitle>
        <CardDescription>Keep learning daily to build your streak!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-2xl font-bold text-primary-dark dark:text-white">
              <Flame className="h-6 w-6 text-accent-warm" />
              <span>{currentStreak}</span>
            </div>
            <span className="text-sm text-muted-DEFAULT dark:text-slate-400">Current Streak</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-2xl font-bold text-primary-dark dark:text-white">
              <Trophy className="h-6 w-6 text-accent-cool" />
              <span>{longestStreak}</span>
            </div>
            <span className="text-sm text-muted-DEFAULT dark:text-slate-400">Longest Streak</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

