"use client"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Target } from "lucide-react"

interface PersonalizedGoalsProps {
  lessonId: number
}

export function PersonalizedGoals({ lessonId }: PersonalizedGoalsProps) {
  // Mock goals data
  const goals = [
    {
      id: 1,
      title: "Complete Boolean Logic Basics",
      progress: lessonId > 1 ? 100 : lessonId === 1 ? 60 : 0,
      completed: lessonId > 1,
    },
    {
      id: 2,
      title: "Master Truth Tables",
      progress: lessonId > 2 ? 100 : lessonId === 2 ? 60 : 0,
      completed: lessonId > 2,
    },
    {
      id: 3,
      title: "Weekly Learning Goal",
      progress: 40,
      completed: false,
      meta: "2/5 lessons",
    },
  ]

  return (
    <div className="space-y-3">
      {goals.map((goal) => (
        <div key={goal.id} className="space-y-1">
          <div className="flex items-start gap-2">
            {goal.completed ? (
              <CheckCircle className="h-4 w-4 text-accent-cool mt-0.5" />
            ) : (
              <Target className="h-4 w-4 text-ui-purple mt-0.5" />
            )}
            <div className="flex-1">
              <p className="text-sm text-primary-dark dark:text-white">{goal.title}</p>
              {goal.meta && <p className="text-xs text-muted-DEFAULT dark:text-slate-400">{goal.meta}</p>}
              <Progress value={goal.progress} className="h-1.5 mt-1" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

