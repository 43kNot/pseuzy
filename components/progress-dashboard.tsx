"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Award,
  Brain,
  Zap,
  CheckCircle2,
  Flame,
  Star,
  Code,
  GitBranch,
  Database,
  Languages,
  Trophy,
} from "lucide-react"

type ProgressStats = {
  level: number
  xp: number
  xpToNextLevel: number
  streak: number
  completedLessons: number
  totalLessons: number
  masteredConcepts: number
  totalConcepts: number
  hoursSpent: number
  lastActive: Date
  longestStreak: number
  badges: number
  achievements: number
}

export function ProgressDashboard() {
  const [stats, setStats] = useState<ProgressStats>({
    level: 2,
    xp: 1250,
    xpToNextLevel: 2000,
    streak: 7,
    completedLessons: 28,
    totalLessons: 120,
    masteredConcepts: 12,
    totalConcepts: 50,
    hoursSpent: 42,
    lastActive: new Date(),
    longestStreak: 14,
    badges: 8,
    achievements: 12,
  })

  const [chartData, setChartData] = useState<{ date: string; xp: number }[]>([])

  useEffect(() => {
    // Generate mock chart data for the last 14 days
    const data = []
    const now = new Date()

    for (let i = 13; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)

      // Generate random XP between 50 and 200, with some days having 0
      const xp = Math.random() > 0.8 ? 0 : Math.floor(Math.random() * 151) + 50

      // Format date as MM/DD
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`

      data.push({
        date: formattedDate,
        xp,
      })
    }

    setChartData(data)
  }, [])

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="concepts">Concepts</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Flame className="h-4 w-4 text-orange-500 mr-2" />
                  <div className="text-2xl font-bold">{stats.streak} days</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.streak === stats.longestStreak
                    ? "This is your longest streak!"
                    : `Longest streak: ${stats.longestStreak} days`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Lesson Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round((stats.completedLessons / stats.totalLessons) * 100)}%
                </div>
                <Progress value={(stats.completedLessons / stats.totalLessons) * 100} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.completedLessons} of {stats.totalLessons} lessons completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Current Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-2" />
                  <div className="text-2xl font-bold">Level {stats.level}</div>
                </div>
                <Progress value={(stats.xp / stats.xpToNextLevel) * 100} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.xp} / {stats.xpToNextLevel} XP to Level {stats.level + 1}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Learning Totals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.hoursSpent} hours</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Last active: {stats.lastActive.toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Learning Activity</CardTitle>
              <CardDescription>Your XP earned over the last 14 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                {/* In a real app, use a charting library here */}
                <div className="flex h-full items-end gap-2">
                  {chartData.map((day, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-primary/10 rounded-t-sm"
                        style={{
                          height: day.xp ? `${(day.xp / 200) * 100}%` : "1px",
                          opacity: day.xp ? 1 : 0.2,
                        }}
                      />
                      <div className="text-xs mt-1 text-muted-foreground">{day.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="concepts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Concept Mastery</CardTitle>
              <CardDescription>Track your understanding of key programming concepts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Brain className="h-4 w-4 text-primary mr-2" />
                      <span>Computational Thinking</span>
                    </div>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Code className="h-4 w-4 text-primary mr-2" />
                      <span>Pseudocode</span>
                    </div>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <GitBranch className="h-4 w-4 text-primary mr-2" />
                      <span>Control Structures</span>
                    </div>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Database className="h-4 w-4 text-primary mr-2" />
                      <span>Data Structures</span>
                    </div>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Languages className="h-4 w-4 text-primary mr-2" />
                      <span>Programming Languages</span>
                    </div>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Strengths</CardTitle>
                <CardDescription>Concepts you've mastered</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Problem Decomposition</div>
                      <div className="text-sm text-muted-foreground">
                        Breaking complex problems into manageable parts
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Pattern Recognition</div>
                      <div className="text-sm text-muted-foreground">
                        Identifying similarities and patterns in problems
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Pseudocode Syntax</div>
                      <div className="text-sm text-muted-foreground">Writing clear algorithmic steps in pseudocode</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
                <CardDescription>Focus on these concepts next</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Brain className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <div className="font-medium">Advanced Control Structures</div>
                      <div className="text-sm text-muted-foreground">Nested conditions and complex loop patterns</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Brain className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <div className="font-medium">Algorithm Optimization</div>
                      <div className="text-sm text-muted-foreground">Improving efficiency and performance</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Brain className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <div className="font-medium">Error Handling</div>
                      <div className="text-sm text-muted-foreground">Handling edge cases and unexpected inputs</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-yellow-500 mr-2" />
                  <div className="text-2xl font-bold">{stats.badges}/20</div>
                </div>
                <Progress value={(stats.badges / 20) * 100} className="h-2 mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                  <div className="text-2xl font-bold">{stats.achievements}/30</div>
                </div>
                <Progress value={(stats.achievements / 30) * 100} className="h-2 mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Daily Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                  <div className="text-2xl font-bold">5/7</div>
                </div>
                <Progress value={(5 / 7) * 100} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-1">Completed 5 of 7 challenges this week</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Badges and milestones you've earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 bg-muted rounded-md">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">7-Day Streak Achieved!</div>
                    <div className="text-sm text-muted-foreground">You've logged in for 7 consecutive days</div>
                    <div className="text-xs text-muted-foreground mt-1">3 days ago</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 bg-muted rounded-md">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Problem Solver</div>
                    <div className="text-sm text-muted-foreground">Completed 10 problem-solving exercises</div>
                    <div className="text-xs text-muted-foreground mt-1">5 days ago</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 bg-muted rounded-md">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Brain className="h-5 w-5 text-primary justify-center flex-shrink-0" />
                  </div>
                  <div>
                    <div className="font-medium">7-Day Streak Achieved!</div>
                    <div className="text-sm text-muted-foreground">You've logged in for 7 consecutive days</div>
                    <div className="text-xs text-muted-foreground mt-1">3 days ago</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 bg-muted rounded-md">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Problem Solver</div>
                    <div className="text-sm text-muted-foreground">Completed 10 problem-solving exercises</div>
                    <div className="text-xs text-muted-foreground mt-1">5 days ago</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 bg-muted rounded-md">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Algorithm Ace</div>
                    <div className="text-sm text-muted-foreground">Solved a complex algorithm challenge</div>
                    <div className="text-xs text-muted-foreground mt-1">7 days ago</div>
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
