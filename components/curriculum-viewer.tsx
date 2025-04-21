"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, BookOpen, Brain, Code, GitBranch } from "lucide-react"
import { getLevelById, getModulesByLevel } from "@/lib/curriculum-data"

type CurriculumViewerProps = {
  levelId: string
  userProgress?: {
    completedLessons: string[]
    currentLesson?: string
  }
}

export function CurriculumViewer({ levelId, userProgress = { completedLessons: [] } }: CurriculumViewerProps) {
  const [activeTab, setActiveTab] = useState<string>("modules")
  const level = getLevelById(levelId)
  const modules = level ? getModulesByLevel(levelId) : []

  if (!level) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Level Not Found</h2>
        <p className="text-muted-foreground">The requested curriculum level could not be found.</p>
      </div>
    )
  }

  // Calculate progress
  const totalLessons = modules.reduce((count, module) => count + module.lessons.length, 0)
  const completedCount = userProgress.completedLessons.length
  const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{level.title}</h1>
          <p className="text-muted-foreground">{level.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">
            {completedCount} of {totalLessons} lessons completed
          </div>
          <Progress value={progressPercentage} className="w-28 h-2" />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
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
        </TabsContent>

        <TabsContent value="modules" className="space-y-4">
          {modules.map((module) => (
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
                    {module.lessons.filter((lesson) => userProgress.completedLessons.includes(lesson.id)).length} /{" "}
                    {module.lessons.length}
                  </div>
                </div>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {module.lessons.map((lesson) => {
                    const isCompleted = userProgress.completedLessons.includes(lesson.id)
                    const isCurrent = userProgress.currentLesson === lesson.id

                    return (
                      <li key={lesson.id}>
                        <Link href={`/lesson/${lesson.id}`}>
                          <div
                            className={`
                            flex items-center gap-2 p-2 rounded-md
                            ${isCompleted ? "bg-green-50 dark:bg-green-900/20" : "hover:bg-muted"}
                            ${isCurrent ? "border border-primary" : ""}
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
          ))}
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
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
                      <GitBranch className="h-5 w-5 text-primary" />
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
