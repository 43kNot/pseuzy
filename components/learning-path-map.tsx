"use client"

import { useEffect, useRef } from "react"

interface LearningPathMapProps {
  currentLessonId: number
}

export function LearningPathMap({ currentLessonId }: LearningPathMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Mock lesson data
  const lessons = [
    { id: 1, title: "Boolean Logic Basics", x: 0.1, y: 0.5, completed: currentLessonId > 1 },
    { id: 2, title: "Truth Tables", x: 0.3, y: 0.3, completed: currentLessonId > 2 },
    { id: 3, title: "Logical Equivalences", x: 0.5, y: 0.5, completed: currentLessonId > 3 },
    { id: 4, title: "Predicate Logic", x: 0.7, y: 0.7, completed: currentLessonId > 4 },
    { id: 5, title: "Proof Techniques", x: 0.9, y: 0.5, completed: currentLessonId > 5 },
  ]

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = 150

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw learning path
    drawLearningPath(ctx, canvas.width, canvas.height)

    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return

      canvasRef.current.width = canvasRef.current.offsetWidth
      drawLearningPath(ctx, canvas.width, canvas.height)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [currentLessonId])

  const drawLearningPath = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Set colors based on our theme
    const completedColor = "#1868E8" // Accent Cool
    const currentColor = "#622CA0" // UI Purple
    const upcomingColor = document.documentElement.classList.contains("dark") ? "#3A1A6A" : "#DAD0F2"
    const textColor = document.documentElement.classList.contains("dark") ? "#EEECFE" : "#1B0637"
    const lineColor = document.documentElement.classList.contains("dark") ? "#3A1A6A" : "#DAD0F2"

    // Draw connecting lines first (behind nodes)
    ctx.strokeStyle = lineColor
    ctx.lineWidth = 3
    ctx.beginPath()

    // Connect all lessons with a path
    ctx.moveTo(lessons[0].x * width, lessons[0].y * height)
    for (let i = 1; i < lessons.length; i++) {
      ctx.lineTo(lessons[i].x * width, lessons[i].y * height)
    }
    ctx.stroke()

    // Draw completed path
    const lastCompletedIndex = lessons.findIndex((lesson) => lesson.id === currentLessonId) - 1
    if (lastCompletedIndex >= 0) {
      ctx.strokeStyle = completedColor
      ctx.lineWidth = 3
      ctx.beginPath()

      ctx.moveTo(lessons[0].x * width, lessons[0].y * height)
      for (let i = 1; i <= lastCompletedIndex; i++) {
        ctx.lineTo(lessons[i].x * width, lessons[i].y * height)
      }
      ctx.stroke()
    }

    // Draw nodes
    lessons.forEach((lesson, index) => {
      // Determine node color based on status
      let nodeColor
      if (lesson.id < currentLessonId) {
        nodeColor = completedColor // Completed
      } else if (lesson.id === currentLessonId) {
        nodeColor = currentColor // Current
      } else {
        nodeColor = upcomingColor // Upcoming
      }

      // Draw node
      ctx.fillStyle = nodeColor
      ctx.beginPath()
      ctx.arc(lesson.x * width, lesson.y * height, 10, 0, Math.PI * 2)
      ctx.fill()

      // Add white border for current lesson
      if (lesson.id === currentLessonId) {
        ctx.strokeStyle = document.documentElement.classList.contains("dark") ? "#EEECFE" : "#FFFFFF"
        ctx.lineWidth = 3
        ctx.stroke()
      }

      // Add lesson number
      ctx.fillStyle = lesson.id === currentLessonId ? "#FFFFFF" : textColor
      ctx.font = "bold 12px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(lesson.id.toString(), lesson.x * width, lesson.y * height)

      // Add lesson title
      ctx.fillStyle = textColor
      ctx.font = "12px sans-serif"

      // Position title based on node position to avoid overlap
      const yOffset = index % 2 === 0 ? -20 : 20
      ctx.fillText(lesson.title, lesson.x * width, lesson.y * height + yOffset)
    })
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-primary-dark dark:text-white mb-3">Your Learning Path</h3>
      <div className="border border-border dark:border-[#3A1A6A] rounded-md overflow-hidden bg-white dark:bg-primary-light p-2">
        <canvas ref={canvasRef} className="w-full h-[150px]"></canvas>
      </div>
      <p className="text-sm text-muted-DEFAULT dark:text-slate-400 mt-2 text-center">
        You are on lesson {currentLessonId} of 5
      </p>
    </div>
  )
}

