"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuizOption {
  id: string
  text: string
}

interface KnowledgeCheckProps {
  question: string
  options: QuizOption[]
  correctOptionId: string
  explanation: string
}

export function KnowledgeCheck({ question, options, correctOptionId, explanation }: KnowledgeCheckProps) {
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
    <div className="mt-4 mb-6 p-4 bg-accent-lighter/30 dark:bg-[#2D1155]/50 rounded-md border border-border dark:border-[#3A1A6A]">
      <div className="flex items-start gap-2 mb-3">
        <HelpCircle className="h-5 w-5 text-ui-purple mt-0.5" />
        <h4 className="font-medium text-primary-dark dark:text-white">Quick Check: {question}</h4>
      </div>

      <RadioGroup
        value={selectedOption || ""}
        onValueChange={setSelectedOption}
        disabled={isSubmitted}
        className="ml-7"
      >
        <div className="space-y-2">
          {options.map((option) => (
            <div
              key={option.id}
              className={cn(
                "flex items-center space-x-2 p-2 rounded-md",
                isSubmitted && option.id === correctOptionId
                  ? "bg-accent-lighter/50 dark:bg-[#3A1A6A]"
                  : isSubmitted && option.id === selectedOption
                    ? "bg-red-50 dark:bg-red-950/20"
                    : "",
              )}
            >
              <RadioGroupItem value={option.id} id={`option-${option.id}`} />
              <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                {option.text}
              </Label>
              {isSubmitted && option.id === correctOptionId && <CheckCircle className="h-4 w-4 text-accent-cool" />}
              {isSubmitted && option.id === selectedOption && option.id !== correctOptionId && (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
            </div>
          ))}
        </div>
      </RadioGroup>

      <div className="ml-7 mt-3">
        {!isSubmitted ? (
          <Button
            onClick={handleSubmit}
            disabled={!selectedOption}
            size="sm"
            className="bg-ui-purple hover:bg-[#7A3BC8]"
          >
            Check Answer
          </Button>
        ) : (
          <div className="space-y-2">
            <div
              className={cn(
                "p-3 rounded-md text-sm",
                isCorrect
                  ? "bg-accent-lighter/50 dark:bg-[#3A1A6A] text-ui-purple dark:text-accent-lighter"
                  : "bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300",
              )}
            >
              <div className="font-medium mb-1">{isCorrect ? "Correct!" : "Not quite right."}</div>
              <p>{explanation}</p>
            </div>
            <Button
              onClick={resetQuiz}
              variant="outline"
              size="sm"
              className="border-ui-purple text-ui-purple hover:bg-ui-purple/10"
            >
              Try Again
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

