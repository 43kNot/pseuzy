import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, ArrowLeft, BookOpen, Brain, CheckCircle2 } from "lucide-react"

export default function CurriculumPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <Code className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Pseuzy</span>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/features" className="text-sm font-medium hover:underline">
              Features
            </Link>
            <Link href="/curriculum" className="text-sm font-medium hover:underline text-primary">
              Curriculum
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Link href="/" className="flex items-center text-primary hover:underline mb-4">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">Our Curriculum</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                A structured learning path from computational thinking basics to implementing algorithms in multiple
                languages.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-2xl md:text-4xl font-bold">Curriculum Structure</h2>
              <p className="max-w-[700px] text-muted-foreground">
                Our curriculum is designed to build a strong foundation in computational thinking before diving into
                specific programming languages.
              </p>
            </div>
            <div className="space-y-12">
              <div className="p-6 rounded-lg border border-green-200 dark:border-green-800 bg-green-100 dark:bg-green-900">
                <h3 className="text-2xl font-bold mb-4 text-green-800 dark:text-green-100">Level 1: Foundation</h3>
                <p className="text-green-800 dark:text-green-100 mb-6">Computational Thinking Basics</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Introduction to Computational Thinking</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Learn what computational thinking is and why it's the foundation of all programming.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Understanding problem-solving approaches</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>The history and importance of computational thinking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Real-world applications beyond programming</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <Brain className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Problem Decomposition</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Master the art of breaking complex problems into smaller, manageable parts.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Identifying component parts of a problem</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Creating modular solutions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Practical decomposition exercises</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <Brain className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Pattern Recognition</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Develop the ability to identify similarities and patterns within problems.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Finding commonalities between problems</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Recognizing recurring patterns</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Using patterns to simplify solutions</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <Brain className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Abstraction Basics</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Learn to focus on essential details while filtering out unnecessary information.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Identifying what's important in a problem</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Creating models and representations</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Simplifying complex systems</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-100 dark:bg-blue-900">
                <h3 className="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-100">Level 2: Framework</h3>
                <p className="text-blue-800 dark:text-blue-100 mb-6">Pseudocode Fundamentals</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Introduction to Pseudocode</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Learn how to express algorithms in a language-agnostic way.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>What is pseudocode and why use it</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Pseudocode conventions and styles</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Converting ideas to structured pseudocode</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <Brain className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Variables and Data Types</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Understand how to store and manipulate different types of data.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Concept of variables as containers</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Common data types (numbers, text, booleans)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Using variables in pseudocode</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-100 dark:bg-purple-900">
                <h3 className="text-2xl font-bold mb-4 text-purple-800 dark:text-purple-100">Level 3: Structure</h3>
                <p className="text-purple-800 dark:text-purple-100 mb-6">Control Structures</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Conditional Statements</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Learn how to make decisions in your algorithms.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>If-then-else structures</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Logical operators and conditions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Nested conditionals</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <Brain className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Loops and Iteration</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Master the concept of repeating actions in your algorithms.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>For loops and while loops</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Loop control (break, continue)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Common loop patterns</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg border border-orange-200 dark:border-orange-800 bg-orange-100 dark:bg-orange-900">
                <h3 className="text-2xl font-bold mb-4 text-orange-800 dark:text-orange-100">Level 4: Architecture</h3>
                <p className="text-orange-800 dark:text-orange-100 mb-6">Basic Python/JavaScript Concepts</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">From Pseudocode to Python</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Translate your pseudocode algorithms into working Python code.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Python syntax basics</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Converting pseudocode to Python</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Python-specific features and libraries</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <Brain className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">From Pseudocode to JavaScript</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Translate your pseudocode algorithms into working JavaScript code.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>JavaScript syntax basics</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Converting pseudocode to JavaScript</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>JavaScript-specific features and libraries</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg border border-red-200 dark:border-red-800 bg-red-100 dark:bg-red-900">
                <h3 className="text-2xl font-bold mb-4 text-red-800 dark:text-red-100">Level 5: Implementation</h3>
                <p className="text-red-800 dark:text-red-100 mb-6">Problem-Solving with Multiple Languages</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Advanced Problem-Solving</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Apply all your skills to solve complex programming challenges.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Real-world programming challenges</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Optimizing algorithms for efficiency</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Debugging and testing strategies</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <Brain className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Language Comparison</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Understand the strengths and differences between programming languages.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Implementing the same algorithm in multiple languages</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Language-specific optimizations</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Choosing the right language for specific tasks</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-12">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Start Your Learning Journey <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            <span className="font-semibold">Pseuzy</span>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Pseuzy. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
