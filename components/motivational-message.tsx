"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Trophy, Zap, Brain, Star, Heart, Lightbulb, Rocket } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { getUserPreferences } from "@/lib/user-preferences"

interface MotivationalMessageProps {
  type?: "streak" | "achievement" | "progress" | "random"
  className?: string
}

export function MotivationalMessage({ type = "random", className = "" }: MotivationalMessageProps) {
  const [message, setMessage] = useState<{
    text: string
    icon: React.ElementType
    color: string
  }>({
    text: "Ready to learn something new today?",
    icon: Sparkles,
    color: "text-accent-cool",
  })

  const [visible, setVisible] = useState(true)

  // Messages by type
  const messages = {
    streak: [
      { text: "You're on a roll! Keep up the great work!", icon: Zap, color: "text-accent-warm" },
      { text: "Your dedication is impressive! Keep that streak going!", icon: Trophy, color: "text-accent-cool" },
      { text: "Consistency is key to mastery. You're doing great!", icon: Zap, color: "text-accent-warm" },
    ],
    achievement: [
      {
        text: "Congratulations on your achievement! You're making great progress.",
        icon: Trophy,
        color: "text-accent-cool",
      },
      { text: "Achievement unlocked! Your hard work is paying off.", icon: Star, color: "text-accent-warm" },
      { text: "You've reached a milestone! Keep pushing forward.", icon: Trophy, color: "text-accent-cool" },
    ],
    progress: [
      { text: "You're making excellent progress on your learning journey!", icon: Brain, color: "text-ui-purple" },
      { text: "Every lesson completed brings you closer to mastery.", icon: Rocket, color: "text-accent-cool" },
      { text: "Your progress is impressive! Keep up the momentum.", icon: Brain, color: "text-ui-purple" },
    ],
    random: [
      { text: "Learning is a journey, not a destination. Enjoy the process!", icon: Heart, color: "text-red-500" },
      { text: "Your brain is building new connections with every lesson.", icon: Brain, color: "text-ui-purple" },
      { text: "Small steps every day lead to big results over time.", icon: Rocket, color: "text-accent-cool" },
      { text: "Curiosity is the engine of achievement.", icon: Lightbulb, color: "text-accent-warm" },
      { text: "The best way to learn is to enjoy what you're learning.", icon: Heart, color: "text-red-500" },
    ],
  }

  useEffect(() => {
    // Get user preferences
    const preferences = getUserPreferences()

    // Select message based on type and user context
    let messageType = type

    // If streak is active and type is random, show streak message sometimes
    if (type === "random" && preferences.streak.current > 2) {
      if (Math.random() > 0.7) {
        messageType = "streak"
      }
    }

    // If user has recent achievements and type is random, show achievement message sometimes
    if (type === "random" && preferences.achievements.length > 0) {
      if (Math.random() > 0.7) {
        messageType = "achievement"
      }
    }

    // Select a random message from the appropriate category
    const messageList = messages[messageType as keyof typeof messages]
    const randomMessage = messageList[Math.floor(Math.random() * messageList.length)]

    setMessage(randomMessage)

    // Set up message rotation
    const interval = setInterval(() => {
      setVisible(false)

      // After fade out, change message
      setTimeout(() => {
        const newMessageList = messages[messageType as keyof typeof messages]
        const newRandomMessage = newMessageList[Math.floor(Math.random() * newMessageList.length)]
        setMessage(newRandomMessage)
        setVisible(true)
      }, 500)
    }, 10000)

    return () => clearInterval(interval)
  }, [type])

  return (
    <Card className={`border border-border dark:border-[#3A1A6A] overflow-hidden ${className}`}>
      <CardContent className="p-4">
        <AnimatePresence mode="wait">
          {visible && (
            <motion.div
              key={message.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className={`${message.color}`}>
                <message.icon className="h-5 w-5" />
              </div>
              <p className="text-sm text-primary-dark dark:text-white">{message.text}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

