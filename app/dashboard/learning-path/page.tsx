"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsTrigger, TabsList, Tabs } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, CheckCircle2, Lock, Info, Play, Search, AlertCircle, Beaker } from "lucide-react"
import { PrerequisitesBadge } from "@/components/prerequisites-badge"
import { getPrerequisiteStatus, getModuleStatusText, type Module } from "@/app/curriculum-prerequisites"
import { Input } from "@/components/ui/input"
import { EnrichmentContent } from "@/components/enrichment-content"

// Sample data for the learning path with prerequisites
const modules: Module[] = [
  {
    id: 101,
    title: "Introduction to Computational Thinking",
    description: "Learn the foundational concepts of computational thinking",
    completed: true,
    prerequisites: [],
  },
  {
    id: 102,
    title: "Problem Decomposition",
    description: "Breaking complex problems into manageable parts",
    completed: true,
    prerequisites: [{ id: 101, title: "Introduction to Computational Thinking", completed: true }],
  },
  {
    id: 103,
    title: "Pattern Recognition",
    description: "Identifying patterns and similarities within problems",
    completed: false,
    prerequisites: [{ id: 101, title: "Introduction to Computational Thinking", completed: true }],
  },
  {
    id: 104,
    title: "Abstraction Basics",
    description: "Focusing on essential details while filtering out unnecessary information",
    completed: false,
    prerequisites: [
      { id: 102, title: "Problem Decomposition", completed: true },
      { id: 103, title: "Pattern Recognition", completed: false },
    ],
  },
  {
    id: 105,
    title: "Review: Level 1 Concepts",
    description: "Review key concepts from Level 1 before proceeding",
    isReview: true,
    completed: false,
    prerequisites: [
      { id: 101, title: "Introduction to Computational Thinking", completed: true },
      { id: 102, title: "Problem Decomposition", completed: true },
      { id: 103, title: "Pattern Recognition", completed: false },
    ],
  },
  {
    id: 201,
    title: "Introduction to Pseudocode",
    description: "Express algorithms in a language-agnostic way",
    completed: false,
    prerequisites: [
      { id: 104, title: "Abstraction Basics", completed: false },
      { id: 105, title: "Review: Level 1 Concepts", completed: false },
    ],
  },
  {
    id: 301,
    title: "Control Flow Foundations",
    description: "Learn how to control the flow of execution in algorithms",
    completed: false,
    prerequisites: [{ id: 201, title: "Introduction to Pseudocode", completed: false }],
  },
  {
    id: 302,
    title: "Conditional Statements",
    description: "Master decision-making in algorithms using conditions",
    completed: false,
    prerequisites: [{ id: 301, title: "Control Flow Foundations", completed: false }],
  },
  {
    id: 303,
    title: "Loops and Iteration",
    description: "Learn different ways to repeat code execution",
    completed: false,
    prerequisites: [{ id: 301, title: "Control Flow Foundations", completed: false }],
  },
  {
    id: 304,
    title: "Advanced Conditionals",
    description: "Advanced techniques for complex decision-making",
    completed: false,
    prerequisites: [{ id: 302, title: "Conditional Statements", completed: false }],
  },
  {
    id: 305,
    title: "Enrichment: Loop Optimization",
    description: "Advanced loop techniques and optimization strategies",
    isEnrichment: true,
    completed: false,
    prerequisites: [{ id: 303, title: "Loops and Iteration", completed: false }],
  },
  {
    id: 306,
    title: "Nested Control Structures",
    description: "Combining conditionals and loops for complex logic",
    completed: false,
    prerequisites: [
      { id: 302, title: "Conditional Statements", completed: false },
      { id: 303, title: "Loops and Iteration", completed: false },
    ],
  },
  {
    id: 307,
    title: "Review: Control Structures",
    description: "Comprehensive review of control structures",
    isReview: true,
    completed: false,
    prerequisites: [
      { id: 302, title: "Conditional Statements", completed: false },
      { id: 303, title: "Loops and Iteration", completed: false },
      { id: 306, title: "Nested Control Structures", completed: false },
    ],
  },
  {
    id: 401,
    title: "Python Basics",
    description: "Introduction to Python syntax and environment",
    completed: false,
    prerequisites: [{ id: 307, title: "Review: Control Structures", completed: false }],
  },
  {
    id: 402,
    title: "JavaScript Basics",
    description: "Introduction to JavaScript syntax and environment",
    completed: false,
    prerequisites: [{ id: 307, title: "Review: Control Structures", completed: false }],
  },
  {
    id: 501,
    title: "Algorithm Implementation",
    description: "Implementing algorithms across multiple languages",
    completed: false,
    prerequisites: [
      { id: 401, title: "Python Basics", completed: false },
      { id: 402, title: "JavaScript Basics", completed: false },
    ],
  },
]

export default function LearningPathPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")

  // Filter modules based on search and level filters
  const filteredModules = modules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLevel =
      selectedLevel === "all" ||
      (selectedLevel === "level1" && module.id >= 100 && module.id < 200) ||
      (selectedLevel === "level2" && module.id >= 200 && module.id < 300) ||
      (selectedLevel === "level3" && module.id >= 300 && module.id < 400) ||
      (selectedLevel === "level4" && module.id >= 400 && module.id < 500) ||
      (selectedLevel === "level5" && module.id >= 500)

    return matchesSearch && matchesLevel
  })

  return (
    <div className="container py-8">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Learning Path</h1>
            <p className="text-muted-foreground mt-1">Track your progress and continue your journey</p>
          </div>

          <div className="flex gap-2">
            <div className="relative w-full md:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search modules..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs value={selectedLevel} onValueChange={setSelectedLevel} className="w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="level1">Level 1</TabsTrigger>
                <TabsTrigger value="level2">Level 2</TabsTrigger>
                <TabsTrigger value="level3">Level 3</TabsTrigger>
                <TabsTrigger value="level4">Level 4</TabsTrigger>
                <TabsTrigger value="level5">Level 5</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="space-y-4">
          {filteredModules.map((module) => {
            const prereqStatus = getPrerequisiteStatus(module)
            const statusText = getModuleStatusText(module)

            return (
              <Card
                key={module.id}
                className={`
                  ${module.isReview ? "border-blue-300 dark:border-blue-700" : ""}
                  ${module.isEnrichment ? "border-purple-300 dark:border-purple-700" : ""}
                `}
              >
                <CardHeader className="pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {module.completed && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                      {!module.completed && prereqStatus === "locked" && (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      )}
                      {!module.completed && prereqStatus !== "locked" && !module.isReview && !module.isEnrichment && (
                        <BookOpen className="h-5 w-5 text-primary" />
                      )}
                      {!module.completed && module.isReview && <Info className="h-5 w-5 text-blue-500" />}
                      {!module.completed && module.isEnrichment && <Beaker className="h-5 w-5 text-purple-500" />}
                      <CardTitle className={`${module.completed ? "text-muted-foreground" : ""}`}>
                        {module.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      {module.prerequisites.length > 0 && (
                        <PrerequisitesBadge
                          status={prereqStatus}
                          prerequisites={module.prerequisites.map((p) => p.title)}
                        />
                      )}

                      {module.isReview && (
                        <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                          Review
                        </Badge>
                      )}

                      {module.isEnrichment && (
                        <Badge className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
                          Enrichment
                        </Badge>
                      )}

                      {module.optional && <Badge variant="outline">Optional</Badge>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className={`${module.completed ? "text-muted-foreground" : ""}`}>{module.description}</p>

                  {module.isEnrichment && (
                    <div className="mt-4">
                      <EnrichmentContent topic={module.title.split(":")[1] || "Topics"} />
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-0">
                  {module.completed ? (
                    <Button variant="outline">
                      <Play className="h-4 w-4 mr-2" /> Review Module
                    </Button>
                  ) : prereqStatus === "locked" ? (
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Complete prerequisites first</span>
                    </div>
                  ) : (
                    <Button>
                      <Play className="h-4 w-4 mr-2" /> Start Module
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )
          })}

          {filteredModules.length === 0 && (
            <div className="text-center p-8 border rounded-lg">
              <div className="flex flex-col items-center">
                <Search className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg">No modules found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedLevel("all")
                  }}
                >
                  Reset filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
