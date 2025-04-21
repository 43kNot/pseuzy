"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import { PortableText } from "@portabletext/react"
import { MatchingExercise, TextInputExercise, AlgorithmBuilder } from "@/components/interactive-exercises"

// Define portable text components
const portableTextComponents = {
  types: {
    code: ({ value }: any) => (
      <pre className="bg-muted p-4 rounded-md overflow-x-auto">
        <code>{value.code}</code>
        {value.filename && <div className="text-xs text-muted-foreground mt-2">{value.filename}</div>}
      </pre>
    ),
  },
}

type LessonViewerProps = {
  lessonId: number
  lessonData: any // Can be SanityLesson or local Lesson
}

export function LessonViewer({ lessonId, lessonData }: LessonViewerProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [stepCompleted, setStepCompleted] = useState<Record<number, boolean>>({})
  const [nextLessonId, setNextLessonId] = useState<number | null>(null)
  const [prevLessonId, setPrevLessonId] = useState<number | null>(null)

  // For lessons without steps, we'll create virtual steps from the content
  const [virtualSteps, setVirtualSteps] = useState<any[]>([])

  useEffect(() => {
    // Reset current step when lesson changes
    setCurrentStep(1)
    setStepCompleted({})

    // Fetch next and previous lesson IDs
    // In a real implementation, you would fetch this from Sanity
    // For now, we'll just use placeholder logic
    setPrevLessonId(lessonId > 101 ? lessonId - 1 : null)
    setNextLessonId(lessonId < 509 ? lessonId + 1 : null)

    if (lessonData && !lessonData.steps && lessonData.content) {
      // For simplicity, we'll just create a single virtual step
      setVirtualSteps([
        {
          id: 1,
          type: "content",
          title: lessonData.title,
          content: lessonData.content,
        },
      ])
    } else {
      setVirtualSteps([])
    }
  }, [lessonData, lessonId])

  if (!lessonData) {
    return (
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <h1 className="text-2xl font-bold mb-2">Lesson Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested lesson could not be found.</p>
          <Button onClick={() => router.push("/dashboard")}>Return to Dashboard</Button>
        </div>
      </div>
    )
  }

  // Determine if we're using actual steps or virtual steps
  const hasSteps = lessonData.steps && Array.isArray(lessonData.steps) && lessonData.steps.length > 0
  const hasVirtualSteps = virtualSteps.length > 0
  const effectiveSteps = hasSteps ? lessonData.steps : hasVirtualSteps ? virtualSteps : null

  const totalSteps = hasSteps ? lessonData.steps?.length || 0 : hasVirtualSteps ? virtualSteps.length : 1

  const currentStepData = effectiveSteps ? effectiveSteps.find((step) => step.id === currentStep) : null

  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === totalSteps

  const handlePrevStep = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleNextStep = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevLesson = () => {
    if (prevLessonId) {
      router.push(`/lesson/${prevLessonId}`)
    }
  }

  const handleNextLesson = () => {
    if (nextLessonId) {
      router.push(`/lesson/${nextLessonId}`)
    } else {
      // If no next lesson, go back to dashboard
      router.push("/dashboard")
    }
  }

  const handleExerciseComplete = (success: boolean) => {
    if (success && currentStepData) {
      setStepCompleted({
        ...stepCompleted,
        [currentStepData.id]: true,
      })
    }
  }

  // Helper function to render interactive components
  const renderInteraction = (interaction: any) => {
    if (!interaction) return null

    switch (interaction.type) {
      case "matching":
        return (
          <MatchingExercise
            prompt={interaction.prompt}
            elements={interaction.expectedElements || []}
            correctOrder={interaction.correctOrder}
            feedback={interaction.feedback}
            onComplete={handleExerciseComplete}
          />
        )
      case "text-input":
        return (
          <TextInputExercise
            prompt={interaction.prompt}
            expectedElements={interaction.expectedElements}
            feedback={interaction.feedback}
            onComplete={handleExerciseComplete}
          />
        )
      case "algorithm-builder":
        return (
          <AlgorithmBuilder
            prompt={interaction.prompt}
            steps={interaction.steps || []}
            correctOrder={interaction.correctOrder || []}
            feedback={interaction.feedback}
            onComplete={handleExerciseComplete}
          />
        )
      default:
        return (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-amber-800">
              This interactive exercise type ({interaction.type}) is not yet implemented.
            </p>
          </div>
        )
    }
  }

  // Helper function to render content that could be either HTML string or Portable Text
  const renderContent = (content: any) => {
    if (!content) return null

    if (typeof content === "string") {
      return <div dangerouslySetInnerHTML={{ __html: content }} />
    }

    // Check if it's Portable Text (array with _type properties)
    if (Array.isArray(content) && content.some((item) => item._type)) {
      return <PortableText value={content} components={portableTextComponents} />
    }

    // Fallback
    return <div>{String(content)}</div>
  }

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link href={`/level-content/${lessonData.level}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <div className="text-sm text-muted-foreground">
            Level {lessonData.level} • Module {lessonData.moduleId}
          </div>
          <h1 className="text-2xl font-bold">{lessonData.title}</h1>
        </div>
      </div>

      {/* Progress and navigation controls */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {effectiveSteps ? (
              <>
                <div className="text-sm text-muted-foreground">
                  Step {currentStep} of {totalSteps}
                </div>
                <Progress value={(currentStep / totalSteps) * 100} className="w-28 h-2" />
              </>
            ) : (
              <div className="text-sm text-muted-foreground">Lesson {lessonId}</div>
            )}
          </div>

          {/* Lesson navigation buttons */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrevLesson} disabled={!prevLessonId}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous Lesson
            </Button>

            <Button variant="outline" size="sm" onClick={handleNextLesson} disabled={!nextLessonId}>
              Next Lesson <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Step navigation buttons - only show if we have steps */}
        {effectiveSteps && effectiveSteps.length > 1 && (
          <div className="flex justify-center gap-2 border-t border-b py-2">
            <Button variant="secondary" size="sm" onClick={handlePrevStep} disabled={isFirstStep}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous Step
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleNextStep}
              disabled={isLastStep || (currentStepData?.type === "interactive" && !stepCompleted[currentStepData.id])}
            >
              Next Step <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>

      {/* Lesson content */}
      {effectiveSteps && currentStepData ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <CardTitle>{currentStepData.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {currentStepData.type === "content" && (
                <div className="prose dark:prose-invert max-w-none">{renderContent(currentStepData.content)}</div>
              )}

              {currentStepData.type === "interactive" && (
                <div className="space-y-4">
                  <div className="prose dark:prose-invert max-w-none">{renderContent(currentStepData.content)}</div>

                  {currentStepData.interaction && (
                    <div className="mt-6 p-4 border rounded-md bg-muted/50">
                      {renderInteraction(currentStepData.interaction)}
                    </div>
                  )}
                </div>
              )}

              {currentStepData.type === "quiz" && (
                <div className="space-y-6">
                  <div className="prose dark:prose-invert max-w-none">{renderContent(currentStepData.content)}</div>

                  {currentStepData.questions &&
                    currentStepData.questions.map((question) => (
                      <div key={question.id} className="p-4 border rounded-md">
                        <h3 className="font-medium mb-3">{question.question}</h3>
                        <div className="space-y-2">
                          {question.options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id={`q${question.id}-option${index}`}
                                name={`question-${question.id}`}
                                className="h-4 w-4"
                              />
                              <label htmlFor={`q${question.id}-option${index}`}>{option}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {currentStepData.type === "practice" && (
                <div className="prose dark:prose-invert max-w-none">{renderContent(currentStepData.content)}</div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              {effectiveSteps && effectiveSteps.length > 1 ? (
                <>
                  <Button variant="secondary" onClick={handlePrevStep} disabled={isFirstStep}>
                    <ChevronLeft className="h-4 w-4 mr-2" /> Previous Step
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleNextStep}
                    disabled={
                      isLastStep || (currentStepData?.type === "interactive" && !stepCompleted[currentStepData.id])
                    }
                  >
                    Next Step <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={handlePrevLesson} disabled={!prevLessonId}>
                    <ChevronLeft className="h-4 w-4 mr-2" /> Previous Lesson
                  </Button>
                  <Button onClick={handleNextLesson} disabled={!nextLessonId}>
                    Next Lesson <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      ) : !effectiveSteps ? (
        // Display lesson content directly if no steps are defined
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <CardTitle>{lessonData.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg mb-4">{lessonData.description}</p>
              {lessonData.content ? (
                renderContent(lessonData.content)
              ) : (
                <p>This lesson is currently under development. Check back soon for content!</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" onClick={handlePrevLesson} disabled={!prevLessonId}>
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous Lesson
            </Button>
            <Button onClick={handleNextLesson} disabled={!nextLessonId}>
              Next Lesson <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <p className="text-muted-foreground mb-6">Step content not found. Please try refreshing the page.</p>
          <Button onClick={() => router.push("/dashboard")}>Return to Dashboard</Button>
        </div>
      )}
    </div>
  )
}
