"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, RefreshCw, Briefcase, Users, Brain, Pencil } from "lucide-react"
import Link from "next/link"

type UserType = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  message: string
  cta: string
}

const userTypes: UserType[] = [
  {
    id: "first-time",
    title: "First-Time Learner",
    description: "I'm completely new to programming and computational thinking",
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    message:
      "Welcome to the world of programming! We'll start with the absolute basics and guide you step-by-step through your learning journey. Our curriculum is designed to make complex concepts accessible to beginners with no prior experience.",
    cta: "Start with the fundamentals",
  },
  {
    id: "career-switcher",
    title: "Career Switcher",
    description: "I'm looking to transition into a tech career",
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    message:
      "Making a career change is exciting! Our platform will help you build the practical skills employers are looking for. We'll focus on real-world applications and projects that you can add to your portfolio to showcase your abilities to potential employers.",
    cta: "Build career-ready skills",
  },
  {
    id: "tried-failed",
    title: "Tried Before",
    description: "I've attempted to learn coding before but struggled",
    icon: <RefreshCw className="h-6 w-6 text-primary" />,
    message:
      "Many successful programmers didn't get it on their first try. Our approach focuses on computational thinking first, not just syntax, which helps build a stronger foundation. We'll identify gaps in your understanding and provide targeted practice to overcome previous roadblocks.",
    cta: "Try a different approach",
  },
  {
    id: "teacher",
    title: "Teacher/Educator",
    description: "I want to teach computational thinking to my students",
    icon: <Pencil className="h-6 w-6 text-primary" />,
    message:
      "Empower your students with essential computational thinking skills. Our platform provides ready-to-use lesson plans, interactive exercises, and progress tracking tools designed specifically for classroom environments. Help your students develop problem-solving skills that will benefit them across all subjects.",
    cta: "Explore educator resources",
  },
  {
    id: "inclusive",
    title: "Looking for Inclusive Community",
    description: "I want a safe, supportive learning environment",
    icon: <Users className="h-6 w-6 text-primary" />,
    message:
      "You belong here. We've built Pseuzy with inclusivity at its core, creating a space where everyone feels welcome regardless of background. Our community guidelines ensure respectful interactions, and our content represents diverse perspectives and experiences.",
    cta: "Join our community",
  },
  {
    id: "curious",
    title: "Curious Mind",
    description: "I'm interested in how computers think and solve problems",
    icon: <Brain className="h-6 w-6 text-primary" />,
    message:
      "Computational thinking is a powerful way to approach problems in any field. We'll help you develop this mindset through engaging puzzles and challenges that reveal the fascinating world of algorithms and logical reasoning. These skills extend far beyond just coding.",
    cta: "Explore computational thinking",
  },
]

export function UserTypeSelector() {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const selectedUserType = userTypes.find((type) => type.id === selectedType)

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold">How would you describe yourself?</h2>
        <p className="text-muted-foreground">
          Select the option that best matches your situation for a personalized experience
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {userTypes.map((type) => (
          <Card
            key={type.id}
            className={`cursor-pointer transition-all hover:border-primary ${selectedType === type.id ? "border-primary bg-primary/5" : ""}`}
            onClick={() => setSelectedType(type.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                {type.icon}
                <CardTitle className="text-lg">{type.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{type.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedUserType && (
        <Card className="mt-8 border-primary">
          <CardHeader>
            <CardTitle>Perfect for {selectedUserType.title}s</CardTitle>
            <CardDescription>Here's how Pseuzy can help you specifically</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{selectedUserType.message}</p>
          </CardContent>
          <CardFooter>
            <Link href="/signup">
              <Button className="gap-2">
                {selectedUserType.cta} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
