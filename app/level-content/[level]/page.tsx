"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, ArrowLeft, BookOpen, Code, Brain, Zap, ChevronRight } from "lucide-react"
import { getLevelById, getLessonsForModule } from "@/lib/curriculum-data"

export default function LevelContentPage({ params }: { params: { level: string } }) {
  const router = useRouter()
  const levelId = Number.parseInt(params.level, 10)
  const [activeTab, setActiveTab] = useState("modules")

  // In a real app, this would come from user data in a database
  const userProgress = {
    completedLessons: [101, 102, 103, 104, 105, 106, 301, 302, 303, 304, 305, 306],
    currentLesson: levelId === 3 ? 307 : levelId === 1 ? 107 : 201,
  }

  const level = getLevelById(levelId)

  if (!level) {
    return (
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <h1 className="text-2xl font-bold mb-2">Level Not Found</h1>
          <p className="text-muted-foreground mb-6">The level you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/dashboard")}>Return to Dashboard</Button>
        </div>
      </div>
    )
  }

  // Calculate level progress
  const levelLessons = level.modules.flatMap((m) => m.lessons)
  const completedLevelLessons = levelLessons.filter((id) => userProgress.completedLessons.includes(id))
  const levelProgress = levelLessons.length > 0 ? (completedLevelLessons.length / levelLessons.length) * 100 : 0

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{level.title}</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <p className="text-muted-foreground max-w-2xl">{level.description}</p>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">
            {completedLevelLessons.length} of {levelLessons.length} lessons completed
          </div>
          <Progress value={levelProgress} className="w-28 h-2" />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About This Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-line">{level.overview}</p>

                <h3>Learning Objectives</h3>
                <ul>
                  {level.objectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>

                {level.prerequisites.length > 0 && (
                  <>
                    <h3>Prerequisites</h3>
                    <ul>
                      {level.prerequisites.map((prereq, index) => (
                        <li key={index}>{prereq}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Continue Learning</CardTitle>
              <CardDescription>Pick up where you left off</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/lesson/${userProgress.currentLesson}`}>
                <Button className="w-full">
                  Continue to Next Lesson <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="space-y-6">
          {level.modules.map((module) => {
            // Calculate module progress
            const moduleLessons = module.lessons
            const completedModuleLessons = moduleLessons.filter((id) => userProgress.completedLessons.includes(id))
            const moduleProgress =
              moduleLessons.length > 0 ? (completedModuleLessons.length / moduleLessons.length) * 100 : 0

            return (
              <Card key={module.id} className={module.isEnrichment ? "border-primary/50" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle>{module.title}</CardTitle>
                      {module.isEnrichment && (
                        <Badge variant="outline" className="border-primary text-primary">
                          Enrichment
                        </Badge>
                      )}
                      {module.isReview && <Badge variant="outline">Review</Badge>}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {completedModuleLessons.length} / {moduleLessons.length}
                    </div>
                  </div>
                  <CardDescription>{module.description}</CardDescription>
                  <div className="flex items-center gap-2 pt-1">
                    <Progress value={moduleProgress} className="h-2 flex-1" />
                    <span className="text-sm text-muted-foreground w-12 text-right">{Math.round(moduleProgress)}%</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {module.lessons.map((lessonId) => {
                      const moduleLessons = getLessonsForModule(levelId, module.id)
                      const lesson = moduleLessons.find((l) => l.id === lessonId)

                      if (!lesson) return null

                      const isCompleted = userProgress.completedLessons.includes(lessonId)
                      const isCurrent = userProgress.currentLesson === lessonId

                      return (
                        <li key={lessonId}>
                          <Link href={`/lesson/${lessonId}`}>
                            <div
                              className={`
                              flex items-center gap-2 p-3 rounded-md border
                              ${isCompleted ? "bg-green-50 dark:bg-green-900/20" : "hover:bg-muted"}
                              ${isCurrent ? "border-primary" : ""}
                            `}
                            >
                              <div className="flex-shrink-0">
                                {isCompleted ? (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : (
                                  <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{lesson.title}</div>
                                <div className="text-sm text-muted-foreground">{lesson.description}</div>
                              </div>
                              {lesson.isEnrichment && (
                                <Badge variant="outline" className="border-primary text-primary text-xs">
                                  Enrichment
                                </Badge>
                              )}
                            </div>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
              <CardDescription>Additional materials to help you master this level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Reading Materials</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-primary hover:underline">
                          Computational Thinking: A Beginner's Guide
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-primary hover:underline">
                          Problem Solving Strategies
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-primary hover:underline">
                          Introduction to Algorithms
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Interactive Exercises</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-primary hover:underline">
                          Problem Decomposition Practice
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-primary hover:underline">
                          Pattern Recognition Challenges
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-primary hover:underline">
                          Algorithm Building Exercises
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Code Examples</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-primary hover:underline">
                          Pseudocode Samples
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-primary hover:underline">
                          Simple Algorithm Implementations
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-primary hover:underline">
                          Flowchart Examples
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">External Resources</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-primary hover:underline">
                          Khan Academy: Computer Science
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-primary hover:underline">
                          Computational Thinking for Problem Solving (Coursera)
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-primary hover:underline">
                          CS Unplugged Activities
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
