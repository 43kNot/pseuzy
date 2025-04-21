"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  BookOpen,
  Video,
  MessageSquare,
  HelpCircle,
  Download,
  ArrowRight,
  FileText,
  Play,
  Brain,
  Code,
  GitBranch,
  Settings,
  ChevronDown,
} from "lucide-react"

// Sample help topics
const helpTopics = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Learn the basics of the platform",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    id: "computational-thinking",
    title: "Computational Thinking",
    description: "Understanding core concepts",
    icon: <Brain className="h-5 w-5" />,
  },
  {
    id: "pseudocode",
    title: "Pseudocode",
    description: "Writing effective algorithms",
    icon: <Code className="h-5 w-5" />,
  },
  {
    id: "control-structures",
    title: "Control Structures",
    description: "Master conditionals and loops",
    icon: <GitBranch className="h-5 w-5" />,
  },
  {
    id: "programming-languages",
    title: "Programming Languages",
    description: "Python and JavaScript basics",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    id: "account-settings",
    title: "Account Settings",
    description: "Manage your profile and sessions",
    icon: <Settings className="h-5 w-5" />,
  },
]

// Sample FAQ questions
const faqQuestions = [
  {
    id: "faq1",
    question: "How do I reset my password?",
    answer:
      "Go to the login page and click 'Forgot password'. Follow the instructions sent to your email to create a new password.",
  },
  {
    id: "faq2",
    question: "Can I switch between Python and JavaScript?",
    answer:
      "Yes! You can toggle between Python and JavaScript examples in any lesson by using the language selector in the code playground.",
  },
  {
    id: "faq3",
    question: "How do prerequisites work?",
    answer:
      "Each lesson has prerequisite concepts you need to complete first. Look for the prerequisites badge on each lesson to see what you need to finish before starting.",
  },
  {
    id: "faq4",
    question: "What happens if I get stuck on a problem?",
    answer:
      "Don't worry! You can use the hint system to get progressive clues, or check the solution after several attempts. We recommend trying to solve problems yourself first for the best learning experience.",
  },
  {
    id: "faq5",
    question: "How do I track my progress?",
    answer:
      "Visit your dashboard to see a complete overview of your learning journey, including completed lessons, badges earned, and concepts mastered.",
  },
]

// Sample resources
const resources = [
  {
    id: "resource1",
    title: "Computational Thinking Cheatsheet",
    description: "Quick reference for core computational thinking concepts",
    type: "pdf",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    id: "resource2",
    title: "Pseudocode Style Guide",
    description: "Conventions and best practices for writing pseudocode",
    type: "pdf",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    id: "resource3",
    title: "Control Structures Video Tutorial",
    description: "Visual explanation of loops and conditionals",
    type: "video",
    icon: <Video className="h-5 w-5" />,
  },
  {
    id: "resource4",
    title: "Algorithm Design Templates",
    description: "Standard patterns for common algorithmic tasks",
    type: "pdf",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    id: "resource5",
    title: "Python/JavaScript Syntax Comparison",
    description: "Side-by-side comparison of syntax in both languages",
    type: "pdf",
    icon: <FileText className="h-5 w-5" />,
  },
]

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)

  // Simple search filter function
  const filterItems = <T extends { title: string; description: string }>(items: T[]): T[] => {
    if (!searchQuery.trim()) return items

    const query = searchQuery.toLowerCase()
    return items.filter(
      (item) => item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query),
    )
  }

  const filteredTopics = filterItems(helpTopics)
  const filteredFaq = faqQuestions.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )
  const filteredResources = filterItems(resources)

  return (
    <div className="container py-8 max-w-6xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Help Center</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find answers to common questions and access learning resources
          </p>
        </div>

        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search help topics, FAQs, and resources..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="topics" className="space-y-6">
          <TabsList className="grid grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="topics">Help Topics</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="topics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTopics.map((topic) => (
                <Card key={topic.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {topic.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{topic.title}</CardTitle>
                        <CardDescription>{topic.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="ghost" className="w-full" size="sm">
                      View Topic <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredTopics.length === 0 && (
              <div className="text-center p-8 border rounded-lg">
                <HelpCircle className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-lg mb-1">No topics found</h3>
                <p className="text-muted-foreground">Try adjusting your search query or browse all topics</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="faq" className="space-y-4">
            {filteredFaq.map((faq) => (
              <Card key={faq.id} className="overflow-hidden">
                <CardHeader
                  className="cursor-pointer py-4"
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{faq.question}</CardTitle>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          expandedFaq === faq.id ? "transform rotate-180" : ""
                        }`}
                      />
                    </Button>
                  </div>
                </CardHeader>
                <div
                  className={`max-h-0 overflow-hidden transition-all duration-300 ${
                    expandedFaq === faq.id ? "max-h-96" : ""
                  }`}
                >
                  <CardContent className="pb-4">
                    <p>{faq.answer}</p>
                  </CardContent>
                </div>
              </Card>
            ))}

            {filteredFaq.length === 0 && (
              <div className="text-center p-8 border rounded-lg">
                <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-lg mb-1">No FAQs found</h3>
                <p className="text-muted-foreground">Try adjusting your search query or browse all FAQs</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResources.map((resource) => (
                <Card key={resource.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-2">
                      <div className="rounded-full p-2 bg-primary/10 text-primary">{resource.icon}</div>
                      <div>
                        <CardTitle className="text-base">{resource.title}</CardTitle>
                        <CardDescription>{resource.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full" size="sm">
                      {resource.type === "video" ? (
                        <>
                          <Play className="mr-2 h-4 w-4" /> Watch Video
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" /> Download PDF
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center p-8 border rounded-lg">
                <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-lg mb-1">No resources found</h3>
                <p className="text-muted-foreground">Try adjusting your search query or browse all resources</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <h2 className="text-xl font-bold mb-2">Still need help?</h2>
          <p className="text-muted-foreground mb-4">
            Contact our support team and we'll get back to you as soon as possible
          </p>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" /> Contact Support
          </Button>
        </div>
      </div>
    </div>
  )
}
