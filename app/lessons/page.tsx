import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Lock } from "lucide-react"
import Link from "next/link"
import { StreakTracker } from "@/components/streak-tracker"
import { GlobalHeader } from "@/components/global-header"

export default function LessonsPage() {
  // Mock data for lessons
  const lessons = [
    {
      id: 1,
      title: "Boolean Logic Basics",
      description: "Learn about TRUE, FALSE, AND, OR, and NOT operations.",
      progress: 100,
      completed: true,
      locked: false,
    },
    {
      id: 2,
      title: "Truth Tables",
      description: "Master the creation and interpretation of truth tables.",
      progress: 60,
      completed: false,
      locked: false,
    },
    {
      id: 3,
      title: "Logical Equivalences",
      description: "Understand how to simplify and transform logical expressions.",
      progress: 0,
      completed: false,
      locked: false,
    },
    {
      id: 4,
      title: "Predicate Logic",
      description: "Explore quantifiers and predicates in logical reasoning.",
      progress: 0,
      completed: false,
      locked: true,
    },
    {
      id: 5,
      title: "Proof Techniques",
      description: "Learn different methods for proving logical statements.",
      progress: 0,
      completed: false,
      locked: true,
    },
  ]

  return (
    <div className="min-h-screen bg-accent-lighter dark:bg-primary">
      <GlobalHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <StreakTracker currentStreak={3} longestStreak={7} />
          </div>

          <h2 className="text-2xl font-bold mb-6 text-primary-dark dark:text-white">Your Learning Journey</h2>

          <div className="space-y-4">
            {lessons.map((lesson) => (
              <Card key={lesson.id} className={lesson.locked ? "opacity-80" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {lesson.completed && <CheckCircle className="h-5 w-5 text-accent-cool" />}
                      {lesson.title}
                    </CardTitle>
                    {lesson.locked && <Lock className="h-5 w-5 text-muted-DEFAULT" />}
                  </div>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Progress value={lesson.progress} className="h-2" />
                    <span className="text-sm text-muted-DEFAULT dark:text-slate-400 min-w-[45px]">
                      {lesson.progress}%
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={lesson.completed ? "outline" : "default"}
                    className={!lesson.completed && !lesson.locked ? "bg-ui-purple hover:bg-[#7A3BC8]" : ""}
                    disabled={lesson.locked}
                    asChild
                  >
                    <Link href={`/lessons/${lesson.id}`}>
                      {lesson.completed ? "Review Lesson" : lesson.progress > 0 ? "Continue" : "Start Lesson"}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

