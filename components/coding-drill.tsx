"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Check, X, Brain, Puzzle } from "lucide-react"

// Define different types of assessment questions
type AssessmentQuestion =
  | MultipleChoiceQuestion
  | FillInBlankQuestion
  | CodeCompletionQuestion
  | DebuggingQuestion
  | AlgorithmDesignQuestion

type MultipleChoiceQuestion = {
  type: "multiple-choice"
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

type FillInBlankQuestion = {
  type: "fill-in-blank"
  id: string
  question: string
  blanks: string[]
  correctAnswers: string[][]
  explanation: string
}

type CodeCompletionQuestion = {
  type: "code-completion"
  id: string
  question: string
  codeSnippet: string
  missingCode: string
  correctAnswers: string[]
  explanation: string
}

type DebuggingQuestion = {
  type: "debugging"
  id: string
  question: string
  buggyCode: string
  correctCode: string
  bugs: string[]
  explanation: string
}

type AlgorithmDesignQuestion = {
  type: "algorithm-design"
  id: string
  question: string
  requirements: string[]
  sampleSolution: string
  evaluationCriteria: string[]
  explanation: string
}

// Mock data for a coding drill
const mockDrill = {
  title: "Control Flow Fundamentals",
  description: "Practice identifying and implementing basic control flow structures in algorithms.",
  questions: [
    {
      type: "multiple-choice",
      id: "q1",
      question: "Which of the following is NOT a control flow structure?",
      options: ["If-Then-Else statement", "For loop", "Variable declaration", "While loop"],
      correctAnswer: 2,
      explanation:
        "Control flow structures determine the order in which code executes. Variable declarations define data but don't control execution flow.",
    },
    {
      type: "fill-in-blank",
      id: "q2",
      question:
        "In pseudocode, a loop that executes a specific number of times typically uses a _____ loop, while a loop that continues until a condition becomes false uses a _____ loop.",
      blanks: ["first blank", "second blank"],
      correctAnswers: [
        ["for", "while"],
        ["FOR", "WHILE"],
        ["For", "While"],
      ],
      explanation:
        "For loops are used when the number of iterations is known in advance, while While loops continue until a specified condition becomes false.",
    },
    {
      type: "code-completion",
      id: "q3",
      question: "Complete the pseudocode to implement a basic if-then-else structure:",
      codeSnippet: `if (temperature > 30) then
  OUTPUT "It's hot outside"
else
  [YOUR CODE HERE]
endif`,
      missingCode: `OUTPUT "It's not hot outside"`,
      correctAnswers: [
        `OUTPUT "It's not hot outside"`,
        `OUTPUT "It is not hot outside"`,
        `OUTPUT "It isn't hot outside"`,
      ],
      explanation: "The else clause executes when the condition is false, providing an alternative action.",
    },
    {
      type: "debugging",
      id: "q4",
      question: "Find and fix the error in this pseudocode for a loop that counts from 1 to 10:",
      buggyCode: `count = 1
while count <= 10
  OUTPUT count
  count = count - 1
endwhile`,
      correctCode: `count = 1
while count <= 10
  OUTPUT count
  count = count + 1
endwhile`,
      bugs: ["The count variable is being decremented instead of incremented, creating an infinite loop."],
      explanation: "To count from 1 to 10, we need to increment the counter in each iteration, not decrement it.",
    },
    {
      type: "algorithm-design",
      id: "q5",
      question: "Design an algorithm to check if a number is even or odd and display an appropriate message.",
      requirements: [
        "Accept a number as input",
        "Determine if the number is even or odd",
        "Display 'Even' or 'Odd' accordingly",
      ],
      sampleSolution: `ALGORITHM CheckEvenOdd(number)
  IF number % 2 = 0 THEN
    OUTPUT "Even"
  ELSE
    OUTPUT "Odd"
  ENDIF
END ALGORITHM`,
      evaluationCriteria: [
        "Correctly checks for divisibility by 2",
        "Displays the appropriate message",
        "Handles both even and odd cases",
      ],
      explanation:
        "Even numbers are divisible by 2 with no remainder, while odd numbers have a remainder of 1 when divided by 2.",
    },
  ] as AssessmentQuestion[],
}

export function CodingDrill() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({})
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({})
  const [activeTab, setActiveTab] = useState("question")

  const drill = mockDrill
  const currentQuestion = drill.questions[currentQuestionIndex]
  const totalQuestions = drill.questions.length

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setActiveTab("question")
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setActiveTab("question")
    }
  }

  const handleAnswerChange = (answer: any) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestion.id]: answer,
    })
  }

  const toggleExplanation = (questionId: string) => {
    setShowExplanation({
      ...showExplanation,
      [questionId]: !showExplanation[questionId],
    })
  }

  const isAnswerCorrect = (question: AssessmentQuestion, answer: any): boolean => {
    if (!answer && answer !== 0) return false

    switch (question.type) {
      case "multiple-choice":
        return answer === question.correctAnswer

      case "fill-in-blank":
        if (!Array.isArray(answer) || answer.length !== question.blanks.length) {
          return false
        }
        return question.correctAnswers.some((correctAnswerSet) =>
          correctAnswerSet.every((correctAnswer, index) => correctAnswer.toLowerCase() === answer[index].toLowerCase()),
        )

      case "code-completion":
        return question.correctAnswers.some(
          (correctAnswer) => correctAnswer.trim().toLowerCase() === answer.trim().toLowerCase(),
        )

      case "debugging":
        return (
          question.correctCode.replace(/\s+/g, " ").trim().toLowerCase() ===
          answer.replace(/\s+/g, " ").trim().toLowerCase()
        )

      case "algorithm-design":
        // In a real app, this would be more sophisticated
        return answer && answer.trim().length > 0

      default:
        return false
    }
  }

  const renderQuestion = () => {
    const question = currentQuestion
    const userAnswer = userAnswers[question.id]
    const hasAnswered = userAnswer !== undefined
    const isCorrect = hasAnswered && isAnswerCorrect(question, userAnswer)

    switch (question.type) {
      case "multiple-choice":
        return (
          <div className="space-y-4">
            <p className="text-lg font-medium">{question.question}</p>
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`
                    p-3 rounded-md border cursor-pointer
                    ${userAnswer === index ? "border-primary bg-primary/5" : "hover:bg-muted"}
                    ${hasAnswered && index === question.correctAnswer ? "border-green-500 bg-green-50 dark:bg-green-900/20" : ""}
                    ${hasAnswered && userAnswer === index && index !== question.correctAnswer ? "border-red-500 bg-red-50 dark:bg-red-900/20" : ""}
                  `}
                  onClick={() => !hasAnswered && handleAnswerChange(index)}
                >
                  {option}
                </div>
              ))}
            </div>

            {hasAnswered && (
              <div
                className={`p-3 rounded-md ${isCorrect ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"}`}
              >
                <div className="flex items-center gap-2">
                  {isCorrect ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-red-500" />}
                  <span>{isCorrect ? "Correct!" : "Incorrect"}</span>
                </div>

                <Button variant="link" className="text-sm p-0 h-auto" onClick={() => toggleExplanation(question.id)}>
                  {showExplanation[question.id] ? "Hide Explanation" : "Show Explanation"}
                </Button>

                {showExplanation[question.id] && <div className="mt-2 text-sm">{question.explanation}</div>}
              </div>
            )}
          </div>
        )

      // Implement the other question types...

      default:
        return <p>Unsupported question type</p>
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{drill.title}</CardTitle>
            <CardDescription>{drill.description}</CardDescription>
          </div>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
        </div>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="question">
              <Brain className="h-4 w-4 mr-2" /> Question
            </TabsTrigger>
            <TabsTrigger value="overview">
              <Puzzle className="h-4 w-4 mr-2" /> Overview
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="question">
          <CardContent>{renderQuestion()}</CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
              Previous
            </Button>
            <Button onClick={handleNextQuestion} disabled={currentQuestionIndex === totalQuestions - 1}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </TabsContent>

        <TabsContent value="overview">
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {drill.questions.map((q, index) => {
                const hasAnswered = userAnswers[q.id] !== undefined
                const isCorrect = hasAnswered && isAnswerCorrect(q, userAnswers[q.id])

                return (
                  <Button
                    key={q.id}
                    variant={currentQuestionIndex === index ? "default" : "outline"}
                    className={`
                      relative
                      ${hasAnswered && isCorrect ? "border-green-500" : ""}
                      ${hasAnswered && !isCorrect ? "border-red-500" : ""}
                    `}
                    onClick={() => setCurrentQuestionIndex(index)}
                  >
                    {index + 1}
                    {hasAnswered && (
                      <span className="absolute -top-2 -right-2">
                        {isCorrect ? (
                          <Check className="h-4 w-4 text-green-500 bg-white dark:bg-gray-950 rounded-full" />
                        ) : (
                          <X className="h-4 w-4 text-red-500 bg-white dark:bg-gray-950 rounded-full" />
                        )}
                      </span>
                    )}
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
