"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle } from "lucide-react"

type FeedbackType = {
  success: string
  partial: string
  failure: string
}

export function MatchingExercise({
  prompt,
  elements,
  correctOrder,
  feedback,
  onComplete,
}: {
  prompt: string
  elements: string[]
  correctOrder?: number[]
  feedback: FeedbackType
  onComplete: (success: boolean) => void
}) {
  const [items, setItems] = useState([...elements])
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...items]
    const [removed] = newItems.splice(fromIndex, 1)
    newItems.splice(toIndex, 0, removed)
    setItems(newItems)
  }

  const handleCheck = () => {
    if (!correctOrder) {
      setFeedbackMessage(feedback.failure)
      setIsSuccess(false)
      setShowFeedback(true)
      return
    }

    // Compare current order with correct order
    const currentOrder = items.map((item) => elements.indexOf(item))
    const isCorrect = correctOrder.every((value, index) => value === currentOrder[index])

    // Count correct positions
    const correctPositions = currentOrder.filter((value, index) => value === correctOrder[index]).length
    const partiallyCorrect = correctPositions > 0 && correctPositions < correctOrder.length

    if (isCorrect) {
      setFeedbackMessage(feedback.success)
      setIsSuccess(true)
      onComplete(true)
    } else if (partiallyCorrect) {
      setFeedbackMessage(feedback.partial)
      setIsSuccess(false)
    } else {
      setFeedbackMessage(feedback.failure)
      setIsSuccess(false)
    }

    setShowFeedback(true)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{prompt}</h3>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="p-3 bg-card border rounded-md flex-1 flex items-center gap-2">
              <div>{item}</div>
            </div>
            <div className="flex flex-col gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => moveItem(index, Math.max(0, index - 1))}
                disabled={index === 0}
                className="h-8 w-8"
              >
                ↑
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => moveItem(index, Math.min(items.length - 1, index + 1))}
                disabled={index === items.length - 1}
                className="h-8 w-8"
              >
                ↓
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={handleCheck}>Check Answer</Button>

      {showFeedback && (
        <div
          className={`p-4 rounded-md ${isSuccess ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-100" : "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-100"}`}
        >
          <div className="flex items-start gap-2">
            {isSuccess ? <CheckCircle className="h-5 w-5 mt-0.5" /> : <XCircle className="h-5 w-5 mt-0.5" />}
            <p>{feedbackMessage}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export function TextInputExercise({
  prompt,
  expectedElements,
  feedback,
  onComplete,
}: {
  prompt: string
  expectedElements?: string[]
  feedback: FeedbackType
  onComplete: (success: boolean) => void
}) {
  const [userInput, setUserInput] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleCheck = () => {
    if (!expectedElements || expectedElements.length === 0) {
      setFeedbackMessage("No expected answers defined for this exercise.")
      setIsSuccess(false)
      setShowFeedback(true)
      return
    }

    const normalizedInput = userInput.toLowerCase().trim()

    // Check if the answer contains any of the expected elements
    const matches = expectedElements.filter((element) => normalizedInput.includes(element.toLowerCase().trim()))

    if (matches.length > 0) {
      setFeedbackMessage(feedback.success)
      setIsSuccess(true)
      onComplete(true)
    } else {
      setFeedbackMessage(feedback.failure)
      setIsSuccess(false)
    }

    setShowFeedback(true)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{prompt}</h3>

      <Textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your answer here..."
        className="min-h-[100px]"
      />

      <Button onClick={handleCheck}>Check Answer</Button>

      {showFeedback && (
        <div
          className={`p-4 rounded-md ${isSuccess ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-100" : "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-100"}`}
        >
          <div className="flex items-start gap-2">
            {isSuccess ? <CheckCircle className="h-5 w-5 mt-0.5" /> : <XCircle className="h-5 w-5 mt-0.5" />}
            <p>{feedbackMessage}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export function AlgorithmBuilder({
  prompt,
  steps,
  correctOrder,
  feedback,
  onComplete,
}: {
  prompt: string
  steps: string[]
  correctOrder: number[]
  feedback: FeedbackType
  onComplete: (success: boolean) => void
}) {
  const [items, setItems] = useState([...steps])
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...items]
    const [removed] = newItems.splice(fromIndex, 1)
    newItems.splice(toIndex, 0, removed)
    setItems(newItems)
  }

  const handleCheck = () => {
    // Compare current order with correct order
    const currentOrder = items.map((item) => steps.indexOf(item))
    const isCorrect = correctOrder.every((value, index) => value === currentOrder[index])

    // Count correct positions
    const correctPositions = currentOrder.filter((value, index) => value === correctOrder[index]).length
    const partiallyCorrect = correctPositions > 0 && correctPositions < correctOrder.length

    if (isCorrect) {
      setFeedbackMessage(feedback.success)
      setIsSuccess(true)
      onComplete(true)
    } else if (partiallyCorrect) {
      setFeedbackMessage(feedback.partial)
      setIsSuccess(false)
    } else {
      setFeedbackMessage(feedback.failure)
      setIsSuccess(false)
    }

    setShowFeedback(true)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{prompt}</h3>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="p-3 bg-card border rounded-md flex-1 flex items-center gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                {index + 1}
              </div>
              <div>{item}</div>
            </div>
            <div className="flex flex-col gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => moveItem(index, Math.max(0, index - 1))}
                disabled={index === 0}
                className="h-8 w-8"
              >
                ↑
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => moveItem(index, Math.min(items.length - 1, index + 1))}
                disabled={index === items.length - 1}
                className="h-8 w-8"
              >
                ↓
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={handleCheck}>Check Answer</Button>

      {showFeedback && (
        <div
          className={`p-4 rounded-md ${isSuccess ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-100" : "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-100"}`}
        >
          <div className="flex items-start gap-2">
            {isSuccess ? <CheckCircle className="h-5 w-5 mt-0.5" /> : <XCircle className="h-5 w-5 mt-0.5" />}
            <p>{feedbackMessage}</p>
          </div>
        </div>
      )}
    </div>
  )
}
