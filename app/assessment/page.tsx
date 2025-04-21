"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Code, ArrowRight, Brain, CheckCircle2, Bug } from "lucide-react"
import { Input } from "@/components/ui/input"

// Sample assessment questions
const questions = [
  {
    id: 1,
    type: "multiple-choice",
    question: "Which of the following best describes a variable?",
    options: [
      "A fixed value that never changes",
      "A container that stores data which can be changed",
      "A mathematical equation",
      "A type of function",
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    type: "multiple-choice",
    question: "What is an algorithm?",
    options: [
      "A programming language",
      "A type of computer hardware",
      "A step-by-step procedure for solving a problem",
      "A mathematical formula",
    ],
    correctAnswer: 2,
  },
  {
    id: 3,
    type: "problem-solving",
    question: "Describe the steps you would take to find the largest number in a list of numbers.",
    hint: "Think about how you would compare numbers one by one.",
  },
  {
    id: 4,
    type: "multiple-choice",
    question: "What does a conditional statement do in programming?",
    options: [
      "It defines a variable",
      "It creates a loop",
      "It makes decisions based on conditions",
      "It outputs text to the screen",
    ],
    correctAnswer: 2,
  },
  {
    id: 5,
    type: "fill-in-blank",
    question: "In pseudocode, the _______ statement is used to repeat a block of code a specific number of times.",
    answer: "for",
    alternativeAnswers: ["for loop", "for statement"],
  },
  {
    id: 6,
    type: "multiple-choice",
    question: "What is decomposition in computational thinking?",
    options: [
      "Breaking down a complex problem into smaller, manageable parts",
      "Building a program from simple components",
      "Converting decimal numbers to binary",
      "Analyzing why a program crashed",
    ],
    correctAnswer: 0,
  },
  {
    id: 7,
    type: "code-completion",
    question: "Complete the following pseudocode to calculate the average of all numbers in an array:",
    codeStart: `function calculateAverage(numbers):
  sum = 0
  for each number in numbers:
    `,
    codeEnd: `
  return sum / length of numbers`,
    correctAnswer: "sum = sum + number",
    alternatives: ["sum += number", "sum = sum + number;"],
  },
  {
    id: 8,
    type: "debugging",
    question: "Find and fix the error in this pseudocode for calculating factorial:",
    buggyCode: `function factorial(n):
  if n <= 0:
    return 1
  else:
    return n * factorial(n)`,
    correctCode: `function factorial(n):
  if n <= 0:
    return 1
  else:
    return n * factorial(n - 1)`,
    hint: "Check the recursive call carefully.",
  },
  {
    id: 9,
    type: "multiple-choice",
    question: "Which of these is an example of pattern recognition in computational thinking?",
    options: [
      "Using a loop to process each element in an array",
      "Creating a variable to store a value",
      "Using a print statement to display results",
      "Selecting a programming language for a project",
    ],
    correctAnswer: 0,
  },
  {
    id: 10,
    type: "problem-solving",
    question: "Describe an algorithm to determine if a word is a palindrome (reads the same backward as forward).",
    hint: "Consider how you might compare characters from both ends of the word.",
  },
]

export default function AssessmentPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [codeCompletionAnswer, setCodeCompletionAnswer] = useState<string>("")
  const [debuggingAnswer, setDebuggingAnswer] = useState<string>("")
  const [fillInBlankAnswer, setFillInBlankAnswer] = useState<string>("")

  const handleAnswer = (questionId: number, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const isAnswerValid = (questionData: any, answer: any): boolean => {
    if (!answer && answer !== 0) return false

    switch (questionData.type) {
      case "multiple-choice":
        return answer !== undefined
      case "problem-solving":
        return answer.trim().length > 0
      case "fill-in-blank":
        const userAnswer = answer.toLowerCase().trim()
        return (
          userAnswer === questionData.answer.toLowerCase() ||
          (questionData.alternativeAnswers &&
            questionData.alternativeAnswers.some((alt: string) => alt.toLowerCase() === userAnswer))
        )
      case "code-completion":
        const normalizedAnswer = answer.replace(/\s+/g, " ").trim()
        const normalizedCorrect = questionData.correctAnswer.replace(/\s+/g, " ").trim()
        return (
          normalizedAnswer === normalizedCorrect ||
          (questionData.alternatives &&
            questionData.alternatives.some((alt: string) => alt.replace(/\s+/g, " ").trim() === normalizedAnswer))
        )
      case "debugging":
        // Simple comparison - in a real app, you'd use a more sophisticated approach
        const userCode = answer.replace(/\s+/g, " ").trim()
        const correctCode = questionData.correctCode.replace(/\s+/g, " ").trim()
        return userCode === correctCode
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      // Reset state for new question types
      setCodeCompletionAnswer("")
      setDebuggingAnswer("")
      setFillInBlankAnswer("")
    } else {
      // Complete assessment
      setIsCompleted(true)
      // In a real app, this would submit answers for evaluation
    }
  }

  const handleComplete = () => {
    router.push("/dashboard")
  }

  const progressPercentage = isCompleted ? 100 : ((currentQuestion + 1) / questions.length) * 100
  const currentQuestionData = questions[currentQuestion]

  return (
    <div className="container max-w-screen-md py-10">
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Code className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Pseuzy</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Pre-Learning Assessment</h1>
        <p className="text-muted-foreground text-center max-w-md">
          This assessment helps us understand your current knowledge level and create a personalized learning path.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium">{progressPercentage.toFixed(0)}% Complete</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {!isCompleted ? (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <CardTitle>Question {currentQuestion + 1}</CardTitle>
            </div>
            <CardDescription>
              {currentQuestionData.type === "multiple-choice" ? "Select the best answer" : "Provide your solution"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-lg font-medium">{currentQuestionData.question}</div>

              {currentQuestionData.type === "multiple-choice" && (
                <RadioGroup
                  value={answers[currentQuestionData.id]?.toString()}
                  onValueChange={(value) => handleAnswer(currentQuestionData.id, Number.parseInt(value))}
                >
                  {(currentQuestionData.options as string[]).map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 py-2">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentQuestionData.type === "problem-solving" && (
                <div className="space-y-4">
                  <Textarea
                    placeholder="Type your answer here..."
                    className="min-h-[150px]"
                    value={answers[currentQuestionData.id] || ""}
                    onChange={(e) => handleAnswer(currentQuestionData.id, e.target.value)}
                  />
                  {currentQuestionData.hint && (
                    <div className="text-sm text-muted-foreground italic">Hint: {currentQuestionData.hint}</div>
                  )}
                </div>
              )}

              {currentQuestionData.type === "fill-in-blank" && (
                <div className="space-y-4">
                  <div className="text-lg font-medium">
                    {currentQuestionData.question.split("_______").map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <Input
                            className="mx-2 inline-block w-32"
                            value={fillInBlankAnswer}
                            onChange={(e) => {
                              setFillInBlankAnswer(e.target.value)
                              handleAnswer(currentQuestionData.id, e.target.value)
                            }}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {currentQuestionData.type === "code-completion" && (
                <div className="space-y-4">
                  <pre className="p-4 bg-muted rounded-md text-sm overflow-x-auto">
                    {currentQuestionData.codeStart}
                    <Input
                      className="my-2 font-mono"
                      value={codeCompletionAnswer}
                      onChange={(e) => {
                        setCodeCompletionAnswer(e.target.value)
                        handleAnswer(currentQuestionData.id, e.target.value)
                      }}
                      placeholder="Type your code here..."
                    />
                    {currentQuestionData.codeEnd}
                  </pre>
                </div>
              )}

              {currentQuestionData.type === "debugging" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Bug className="h-4 w-4 text-red-500" />
                    <span className="font-medium">Find and fix the bug:</span>
                  </div>
                  <pre className="p-4 bg-muted rounded-md text-sm overflow-x-auto mb-4">
                    {currentQuestionData.buggyCode}
                  </pre>
                  <div className="space-y-2">
                    <Label htmlFor="debugging-answer">Your corrected code:</Label>
                    <Textarea
                      id="debugging-answer"
                      className="font-mono"
                      rows={6}
                      value={debuggingAnswer}
                      onChange={(e) => {
                        setDebuggingAnswer(e.target.value)
                        handleAnswer(currentQuestionData.id, e.target.value)
                      }}
                      placeholder="Enter your corrected code..."
                    />
                  </div>
                  {currentQuestionData.hint && (
                    <div className="text-sm text-muted-foreground italic">Hint: {currentQuestionData.hint}</div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleNext}
              disabled={!isAnswerValid(currentQuestionData, answers[currentQuestionData.id])}
            >
              {currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next Question"}{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <CardTitle>Assessment Completed</CardTitle>
            </div>
            <CardDescription>Thank you for completing the assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-6 text-center">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-900 mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">Great job!</h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                We're analyzing your responses to create a personalized learning path tailored to your skills and goals.
              </p>
              <Button onClick={handleComplete} className="mt-2">
                Continue to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
