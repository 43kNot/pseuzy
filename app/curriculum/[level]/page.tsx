"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { CurriculumViewer } from "@/components/curriculum-viewer"

// Mock user progress - in a real app, this would come from a database
const mockUserProgress = {
  completedLessons: ["1.1.1", "1.1.2", "1.2.1"],
  currentLesson: "1.2.2",
}

export default function CurriculumLevelPage({ params }: { params: { level: string } }) {
  const router = useRouter()
  const [userProgress, setUserProgress] = useState(mockUserProgress)

  // In a real app, we would fetch the user's progress from an API
  useEffect(() => {
    // Simulate API call
    const savedProgress = localStorage.getItem(`progress-level-${params.level}`)
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress))
    }
  }, [params.level])

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <CurriculumViewer levelId={params.level} userProgress={userProgress} />
    </div>
  )
}
