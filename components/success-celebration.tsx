"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Trophy, Star, Award, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SuccessCelebrationProps {
  isOpen: boolean
  onClose: () => void
  type: "lesson" | "achievement" | "streak" | "quiz"
  title: string
  message: string
}

export function SuccessCelebration({ isOpen, onClose, type, title, message }: SuccessCelebrationProps) {
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Reset animation state
      setAnimationComplete(false)

      // Trigger confetti
      const duration = 3000
      const end = Date.now() + duration

      const colors = ["#622CA0", "#1868E8", "#D3FD53"]

      // Launch confetti
      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        })

        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }

      frame()

      // Set animation complete after duration
      const timer = setTimeout(() => {
        setAnimationComplete(true)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Determine icon based on type
  const Icon = type === "lesson" ? CheckCircle : type === "achievement" ? Trophy : type === "streak" ? Star : Award

  // Determine color based on type
  const iconColor =
    type === "lesson"
      ? "text-accent-cool"
      : type === "achievement"
        ? "text-ui-purple"
        : type === "streak"
          ? "text-accent-warm"
          : "text-accent-cool"

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="bg-white dark:bg-primary-light rounded-lg p-6 max-w-md w-full mx-4 shadow-xl border border-border dark:border-[#3A1A6A] text-center"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4 flex justify-center"
          >
            <div
              className={`w-16 h-16 rounded-full bg-accent-lighter dark:bg-[#3A1A6A] flex items-center justify-center ${iconColor}`}
            >
              <Icon className="h-8 w-8" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold text-primary-dark dark:text-white mb-2"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-primary-light dark:text-slate-300 mb-6"
          >
            {message}
          </motion.p>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
            <Button onClick={onClose} className="bg-ui-purple hover:bg-[#7A3BC8] w-full" disabled={!animationComplete}>
              Continue
            </Button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

