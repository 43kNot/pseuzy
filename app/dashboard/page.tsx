"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, ChevronRight, BookOpen, Code, Brain, Zap } from "lucide-react"
import { curriculum, getLevelById } from "@/lib/curriculum-data"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // In a real app, this would come from user data in a database
  const userProgress = {
    completedLessons: [101, 102, 103, 104, 105, 106, 301, 302, 303, 304, 305, 306],
    currentLevel: 3,
    currentLesson: 307,
  }

  // Calculate overall progress
  const totalLessons = Object.keys(curriculum.lessons).length
  const completedCount = userProgress.completedLessons.length
  const progressPercentage = (completedCount / totalLessons) * 100

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Your Learning Dashboard</h1>
      <p className="text-muted-foreground mb-8">Track your progress and continue your learning journey</p>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {completedCount} of {totalLessons} lessons completed
              </span>
              <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Current Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Level {userProgress.currentLevel}</p>
                <p className="text-sm text-muted-foreground">
                  {getLevelById(userProgress.currentLevel)?.title.split(":")[1].trim()}
                </p>
              </div>
              <Link href={`/level-content/${userProgress.currentLevel}`}>
                <Button variant="outline" size="sm">
                  View Level <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Continue Learning</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href={`/lesson/${userProgress.currentLesson}`}>
              <Button className="w-full">
                Continue to Next Lesson <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="levels">Levels</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Learning Path</CardTitle>
              <CardDescription>Track your progress through the curriculum</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {curriculum.levels.map((level) => {
                  // Calculate level progress
                  const levelLessons = level.modules.flatMap((m) => m.lessons)
                  const completedLevelLessons = levelLessons.filter((id) => userProgress.completedLessons.includes(id))
                  const levelProgress =
                    levelLessons.length > 0 ? (completedLevelLessons.length / levelLessons.length) * 100 : 0

                  return (
                    <div key={level.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`rounded-full p-1 ${levelProgress === 100 ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-primary/10 text-primary"}`}
                          >
                            {levelProgress === 100 ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : level.id === 1 ? (
                              <Brain className="h-5 w-5" />
                            ) : level.id === 2 ? (
                              <Code className="h-5 w-5" />
                            ) : level.id === 3 ? (
                              <Zap className="h-5 w-5" />
                            ) : level.id === 4 ? (
                              <BookOpen className="h-5 w-5" />
                            ) : (
                              <Code className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">
                              Level {level.id}: {level.title.split(":")[1].trim()}
                            </h3>
                            <p className="text-sm text-muted-foreground">{level.description}</p>
                          </div>
                        </div>
                        <Link href={`/level-content/${level.id}`}>
                          <Button variant="ghost" size="sm">
                            View <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={levelProgress} className="h-2 flex-1" />
                        <span className="text-sm text-muted-foreground w-12 text-right">
                          {Math.round(levelProgress)}%
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recently Completed</CardTitle>
              <CardDescription>Your most recently completed lessons</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userProgress.completedLessons
                  .slice(-3)
                  .reverse()
                  .map((lessonId) => {
                    const lesson = curriculum.lessons[lessonId]
                    if (!lesson) return null

                    return (
                      <div key={lesson.id} className="flex items-center gap-4 p-3 rounded-md border">
                        <div className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full p-1">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{lesson.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Level {lesson.level}, Module {lesson.moduleId}
                          </p>
                        </div>
                        <Link href={`/lesson/${lesson.id}`}>
                          <Button variant="ghost" size="sm">
                            Review <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="levels" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {curriculum.levels.map((level) => {
              // Calculate level progress
              const levelLessons = level.modules.flatMap((m) => m.lessons)
              const completedLevelLessons = levelLessons.filter((id) => userProgress.completedLessons.includes(id))
              const levelProgress =
                levelLessons.length > 0 ? (completedLevelLessons.length / levelLessons.length) * 100 : 0

              return (
                <Card key={level.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Level {level.id}</CardTitle>
                      {levelProgress === 100 && (
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800"
                        >
                          Completed
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{level.title.split(":")[1].trim()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm">{level.description}</p>
                      <div className="flex items-center gap-2">
                        <Progress value={levelProgress} className="h-2 flex-1" />
                        <span className="text-sm text-muted-foreground w-12 text-right">
                          {Math.round(levelProgress)}%
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {completedLevelLessons.length} of {levelLessons.length} lessons completed
                      </div>
                    </div>
                  </CardContent>
                  <div className="bg-muted p-3 border-t">
                    <Link href={`/level-content/${level.id}`}>
                      <Button variant="outline" className="w-full">
                        View Level Content
                      </Button>
                    </Link>
                  </div>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
              <CardDescription>Track your learning milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-md flex items-center gap-3">
                  <div className="bg-primary/10 text-primary rounded-full p-2">
                    <Brain className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium">Computational Thinker</h4>
                    <p className="text-sm text-muted-foreground">Completed Level 1</p>
                  </div>
                </div>

                <div className="p-4 border rounded-md flex items-center gap-3 opacity-50">
                  <div className="bg-muted text-muted-foreground rounded-full p-2">
                    <Code className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium">Pseudocode Master</h4>
                    <p className="text-sm text-muted-foreground">Complete Level 2</p>
                  </div>
                </div>

                <div className="p-4 border rounded-md flex items-center gap-3 opacity-50">
                  <div className="bg-muted text-muted-foreground rounded-full p-2">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium">Control Flow Expert</h4>
                    <p className="text-sm text-muted-foreground">Complete Level 3</p>
                  </div>
                </div>

                <div className="p-4 border rounded-md flex items-center gap-3 opacity-50">
                  <div className="bg-muted text-muted-foreground rounded-full p-2">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium">Polyglot Programmer</h4>
                    <p className="text-sm text-muted-foreground">Complete Level 4</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
