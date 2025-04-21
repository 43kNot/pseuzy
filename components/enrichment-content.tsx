"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, BookOpen, Brain, Beaker, GitBranch } from "lucide-react"
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs"

export function EnrichmentContent({ topic }: { topic: string }) {
  const [activeSection, setActiveSection] = useState("concept")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Beaker className="h-5 w-5 text-primary" />
          <CardTitle>Enrichment: Advanced {topic}</CardTitle>
        </div>
        <CardDescription>Optional in-depth material for advanced learners</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-4">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="concept">Concept</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="concept" className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <h3>Advanced Understanding of {topic}</h3>
              <p>
                This enrichment module explores {topic} in greater depth, examining edge cases, optimization techniques,
                and theoretical foundations.
              </p>
              <h4>Key Advanced Concepts</h4>
              <ul>
                <li>Optimizing {topic} for performance</li>
                <li>Theoretical underpinnings of {topic}</li>
                <li>Real-world applications in complex systems</li>
                <li>Common pitfalls and how to avoid them</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <h3>Example: Advanced {topic} Implementation</h3>
              <pre className="p-4 bg-muted rounded-md text-sm overflow-x-auto">
                {`function optimized${topic.replace(/\s+/g, "")}(input) {
  // Advanced implementation with optimizations
  const result = [];
  
  // Step 1: Preprocess input
  const processedInput = preprocess(input);
  
  // Step 2: Apply core algorithm with optimizations
  for (const item of processedInput) {
    // Apply advanced techniques
    result.push(transform(item));
  }
  
  // Step 3: Post-process and verify
  return validate(result);
}`}
              </pre>
              <p>
                This implementation showcases advanced techniques such as pre-processing, performance optimizations, and
                validation steps that go beyond the basic approach.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-4">
            <div className="space-y-4">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Challenge Yourself</h3>
                <p>Try these advanced problems to test your understanding of {topic}:</p>
              </div>

              <div className="space-y-3">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">Challenge 1: Optimize for Scale</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Improve the standard {topic} implementation to handle inputs of size 10⁶ efficiently. Consider
                      time and space complexity.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Start Challenge
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">Challenge 2: Edge Cases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Identify and handle all possible edge cases in a {topic} implementation, including empty inputs,
                      invalid data, and boundary conditions.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Start Challenge
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <h3>Additional Resources</h3>
              <p>Explore these resources to deepen your understanding of {topic}:</p>
              <ul>
                <li>
                  <a href="#" className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>"Advanced {topic}: Theory and Practice" (E-Book)</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-1">
                    <GitBranch className="h-4 w-4" />
                    <span>GitHub Repository: {topic} Implementations</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-1">
                    <Brain className="h-4 w-4" />
                    <span>Interactive {topic} Visualizer</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-1">
                    <Code className="h-4 w-4" />
                    <span>Advanced {topic} Code Samples</span>
                  </a>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
