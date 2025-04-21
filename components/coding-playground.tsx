"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Play, Bug, CheckCircle, BookOpen, MessageCircle, RotateCw, Save } from "lucide-react"

type TestResult = {
  name: string
  passed: boolean
  message?: string
}

type PlaygroundProps = {
  title: string
  description: string
  initialCode: string
  language: "javascript" | "python" | "pseudocode"
  tests: Array<{
    name: string
    testFunction: (code: string) => boolean
    successMessage: string
    failureMessage: string
  }>
  hints: string[]
  solution: string
}

export function CodingPlayground({
  title,
  description,
  initialCode,
  language,
  tests,
  hints,
  solution,
}: PlaygroundProps) {
  const [code, setCode] = useState(initialCode)
  const [activeTab, setActiveTab] = useState<string>("editor")
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [showSolution, setShowSolution] = useState(false)
  const [currentHintIndex, setCurrentHintIndex] = useState(0)
  const { toast } = useToast()

  // Function to run tests
  const runTests = () => {
    const results = tests.map((test) => {
      try {
        const passed = test.testFunction(code)
        return {
          name: test.name,
          passed,
          message: passed ? test.successMessage : test.failureMessage,
        }
      } catch (error) {
        return {
          name: test.name,
          passed: false,
          message: `Error: ${(error as Error).message}`,
        }
      }
    })

    setTestResults(results)
    setActiveTab("tests")

    const passedCount = results.filter((r) => r.passed).length
    if (passedCount === tests.length) {
      toast({
        title: "All tests passed!",
        description: "Congratulations! Your code passed all the tests.",
        variant: "default",
      })
    } else {
      toast({
        title: "Some tests failed",
        description: `${passedCount} of ${tests.length} tests passed.`,
        variant: "destructive",
      })
    }
  }

  // Function to get the next hint
  const getNextHint = () => {
    if (currentHintIndex < hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1)
    }
    setActiveTab("hints")
  }

  // Function to reset code
  const resetCode = () => {
    if (confirm("Are you sure you want to reset your code? All changes will be lost.")) {
      setCode(initialCode)
      toast({
        title: "Code reset",
        description: "Your code has been reset to the initial state.",
      })
    }
  }

  // Function to save code
  const saveCode = () => {
    // In a real app, this would save to a database
    localStorage.setItem(`playground-${title}`, code)
    toast({
      title: "Code saved",
      description: "Your code has been saved.",
    })
  }

  return (
    <div className="flex flex-col space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={saveCode}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button variant="ghost" size="sm" onClick={resetCode}>
                <RotateCw className="h-4 w-4 mr-1" />
                Reset
              </Button>
            </div>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="editor">
                <code className="mr-1">{"{ }"}</code> Editor
              </TabsTrigger>
              <TabsTrigger value="tests">
                <CheckCircle className="h-4 w-4 mr-1" /> Tests
              </TabsTrigger>
              <TabsTrigger value="hints">
                <MessageCircle className="h-4 w-4 mr-1" /> Hints
              </TabsTrigger>
              <TabsTrigger value="solution">
                <BookOpen className="h-4 w-4 mr-1" /> Solution
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="editor">
            <CardContent>
              <div className="min-h-[300px] font-mono text-sm p-4 bg-muted rounded-md">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full min-h-[300px] bg-transparent focus:outline-none resize-none"
                  spellCheck="false"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={getNextHint}>
                <MessageCircle className="h-4 w-4 mr-1" /> Get Hint
              </Button>
              <Button onClick={runTests}>
                <Play className="h-4 w-4 mr-1" /> Run Tests
              </Button>
            </CardFooter>
          </TabsContent>

          <TabsContent value="tests">
            <CardContent>
              <div className="space-y-3">
                {testResults.length === 0 ? (
                  <div className="text-center p-4 bg-muted rounded-md">
                    <p className="text-muted-foreground">Run your code to see test results.</p>
                  </div>
                ) : (
                  testResults.map((result, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-md ${
                        result.passed
                          ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                          : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                      } border`}
                    >
                      <div className="flex items-center">
                        {result.passed ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        ) : (
                          <Bug className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                        )}
                        <div>
                          <div className="font-medium">{result.name}</div>
                          <div className="text-sm">{result.message}</div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={runTests} className="w-full">
                <Play className="h-4 w-4 mr-1" /> Run Tests Again
              </Button>
            </CardFooter>
          </TabsContent>

          <TabsContent value="hints">
            <CardContent>
              <div className="space-y-4">
                {hints.slice(0, currentHintIndex + 1).map((hint, index) => (
                  <div key={index} className="p-3 bg-muted rounded-md">
                    <div className="flex items-start">
                      <MessageCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Hint {index + 1}:</div>
                        <div className="text-sm mt-1">{hint}</div>
                      </div>
                    </div>
                  </div>
                ))}

                {currentHintIndex < hints.length - 1 && (
                  <Button variant="outline" onClick={getNextHint} className="w-full">
                    <MessageCircle className="h-4 w-4 mr-1" /> Get Next Hint
                  </Button>
                )}
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="solution">
            <CardContent>
              {showSolution ? (
                <div className="space-y-3">
                  <div className="font-mono text-sm p-4 bg-muted rounded-md">
                    <pre>{solution}</pre>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is one possible solution. Your solution might be different and still correct!
                  </p>
                </div>
              ) : (
                <div className="text-center p-8 space-y-4">
                  <p className="text-muted-foreground">
                    Are you sure you want to see the solution? Try solving the problem yourself first!
                  </p>
                  <Button onClick={() => setShowSolution(true)}>Show Solution</Button>
                </div>
              )}
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
