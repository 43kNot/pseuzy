"use client"

import { Progress } from "@/components/ui/progress"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Brain, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface PreLessonAssessmentProps {
  lessonId: number
}

export function PreLessonAssessment({ lessonId }: PreLessonAssessmentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)

  // Mock assessment questions based on lesson ID
  const questions = [
    {
      question: "What does the AND operator return when both inputs are TRUE?",
      options: ["TRUE", "FALSE", "NULL", "It depends"],
      correctOptionId: 0,
    },
    {
      question: "What does the OR operator return when at least one input is TRUE?",
      options: ["TRUE", "FALSE", "NULL", "It depends"],
      correctOptionId: 0,
    },
    {
      question: "What does the NOT operator do?",
      options: [
        "Inverts the input value",
        "Returns TRUE only when both inputs are TRUE",
        "Returns TRUE when at least one input is TRUE",
        "Does nothing",
      ],
      correctOptionId: 0,
    },
  ]

  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = value
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleComplete = () => {
    setIsCompleted(true)
    setIsOpen(false)
  }

  const calculateScore = () => {
    let correctCount = 0
    answers.forEach((answer, index) => {
      if (Number.parseInt(answer) === questions[index].correctOptionId) {
        correctCount++
      }
    })
    return Math.round((correctCount / questions.length) * 100)
  }

  if (isCompleted) {
    return (
      <div className="mb-6 animate-fade-in">
        <Card className="p-4 border border-border dark:border-[#3A1A6A] bg-accent-lighter/30 dark:bg-[#2D1155]/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-ui-purple" />
              <h3 className="font-medium text-primary-dark dark:text-white">Pre-Lesson Assessment</h3>
            </div>
            <Badge variant="outline" className="bg-accent-cool/10 text-accent-cool border-accent-cool">
              Score: {calculateScore()}%
            </Badge>
          </div>
          <p className="text-sm text-primary-light dark:text-slate-300 mt-2 ml-7">
            Based on your assessment, we've customized this lesson to focus on areas you need to strengthen.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="mb-6 animate-fade-in">
      <Card className={cn("border border-border dark:border-[#3A1A6A]", isOpen ? "p-4" : "p-4")}>
        <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-ui-purple" />
            <h3 className="font-medium text-primary-dark dark:text-white">Pre-Lesson Assessment</h3>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>

        {isOpen && (
          <div className="mt-4 animate-slide-in">
            {!showResults ? (
              <>
                <p className="text-sm text-primary-light dark:text-slate-300 mb-4">
                  Let's check your current knowledge to personalize this lesson for you.
                </p>

                <Card className="p-4 bg-[#2D1155]">
                  <div className="flex justify-between text-sm text-muted-DEFAULT dark:text-slate-400 mb-2">
                    <span>
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </span>
                    <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete</span>
                  </div>

                  <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-1 mb-4" />

                  <h4 className="font-medium text-primary-dark dark:text-white mb-3">
                    {questions[currentQuestionIndex].question}
                  </h4>

                  <RadioGroup
                    value={answers[currentQuestionIndex] || ""}
                    onValueChange={handleAnswerSelect}
                    className="space-y-2 mb-4"
                  >
                    {questions[currentQuestionIndex].options.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent-lighter/20 dark:hover:bg-[#3A1A6A]/50"
                      >
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </Card>
              </>
            ) : (
              <div className="animate-fade-in">
                <Card className="p-4 bg-[#2D1155] mb-4">
                  <h4 className="font-medium text-primary-dark dark:text-white mb-3">Assessment Results</h4>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-primary-dark dark:text-white">Your Score</span>
                      <span className="font-medium text-accent-cool">{calculateScore()}%</span>
                    </div>
                    <Progress value={calculateScore()} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    {questions.map((q, index) => (
                      <div key={index} className="flex items-start gap-2">
                        {Number.parseInt(answers[index]) === q.correctOptionId ? (
                          <CheckCircle className="h-5 w-5 text-accent-cool mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                        )}
                        <div>
                          <p className="text-sm text-primary-dark dark:text-white">{q.question}</p>
                          <p className="text-xs text-muted-DEFAULT dark:text-slate-400">
                            Your answer: {q.options[Number.parseInt(answers[index])]}
                            {Number.parseInt(answers[index]) !== q.correctOptionId && (
                              <span className="text-accent-cool ml-2">
                                Correct answer: {q.options[q.correctOptionId]}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="flex justify-end">
                  <Button onClick={handleComplete} className="bg-ui-purple hover:bg-[#7A3BC8]">
                    Continue to Lesson
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}

