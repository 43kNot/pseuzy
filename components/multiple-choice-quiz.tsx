"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuizOption {
  id: string
  text: string
}

interface MultipleChoiceQuizProps {
  question: string
  options: QuizOption[]
  correctOptionId: string
  explanation?: string
}

export function MultipleChoiceQuiz({ question, options, correctOptionId, explanation }: MultipleChoiceQuizProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSubmit = () => {
    if (!selectedOption) return

    setIsSubmitted(true)
    setIsCorrect(selectedOption === correctOptionId)
  }

  const resetQuiz = () => {
    setSelectedOption(null)
    setIsSubmitted(false)
    setIsCorrect(false)
  }

  return (
    <div className="space-y-6">
      <h4 className="font-medium text-primary-dark dark:text-white">{question}</h4>

      <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption} disabled={isSubmitted}>
        <div className="space-y-3">
          {options.map((option) => (
            <div
              key={option.id}
              className={cn(
                "flex items-center space-x-2 p-3 rounded-md border",
                isSubmitted && option.id === correctOptionId
                  ? "border-accent-cool bg-accent-lighter/50 dark:bg-[#3A1A6A]"
                  : isSubmitted && option.id === selectedOption
                    ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                    : "border-border dark:border-[#3A1A6A]",
              )}
            >
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                {option.text}
              </Label>
              {isSubmitted && option.id === correctOptionId && <CheckCircle className="h-5 w-5 text-accent-cool" />}
              {isSubmitted && option.id === selectedOption && option.id !== correctOptionId && (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
          ))}
        </div>
      </RadioGroup>

      {!isSubmitted ? (
        <Button onClick={handleSubmit} disabled={!selectedOption} className="bg-ui-purple hover:bg-[#7A3BC8]">
          Submit Answer
        </Button>
      ) : (
        <div className="space-y-4">
          <div
            className={cn(
              "p-4 rounded-md",
              isCorrect
                ? "bg-accent-lighter/50 dark:bg-[#3A1A6A] text-ui-purple dark:text-accent-lighter"
                : "bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300",
            )}
          >
            <div className="font-medium mb-2">{isCorrect ? "Correct! Well done." : "Incorrect. Try again."}</div>
            {explanation && <p>{explanation}</p>}
          </div>
          <Button
            onClick={resetQuiz}
            variant="outline"
            className="border-ui-purple text-ui-purple hover:bg-ui-purple/10"
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  )
}

