import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Brain, Award, CheckCircle2, Zap, Users } from "lucide-react"
import { UserTypeSelector } from "@/components/user-type-selector"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Pseuzy</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/features" className="text-sm font-medium hover:underline">
              Features
            </Link>
            <Link href="/curriculum" className="text-sm font-medium hover:underline">
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
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">The Smartest Way to Learn to Code</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Master computational thinking, problem-solving, and pseudocode through an adaptive learning experience
                designed with you in mind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="gap-2">
                    Start Learning <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/features">
                  <Button size="lg" variant="outline">
                    Explore Features
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <UserTypeSelector />
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-2xl md:text-4xl font-bold">Why Pseuzy Works</h2>
              <p className="max-w-[700px] text-muted-foreground">
                Our platform combines proven learning science with cutting-edge technology to make coding accessible to
                everyone.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
                <Brain className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Learn by Doing</h3>
                <p className="text-muted-foreground">
                  Interactive exercises and visual algorithm playgrounds help you understand concepts through practice,
                  not just theory.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
                <Zap className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Adaptive Learning</h3>
                <p className="text-muted-foreground">
                  Our AI-powered system adjusts to your pace, learning style, and goals, creating a personalized path
                  just for you.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
                <CheckCircle2 className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Focus on Fundamentals</h3>
                <p className="text-muted-foreground">
                  Master computational thinking and problem-solving first, then apply these skills to any programming
                  language.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-2xl md:text-4xl font-bold">From Thinking to Coding</h2>
                <p className="text-muted-foreground">
                  Pseuzy bridges the gap between computational thinking and actual coding. We teach you how to break
                  down problems, recognize patterns, and create algorithms before you ever write a line of code.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Build Mental Models</h4>
                      <p className="text-sm text-muted-foreground">
                        Develop the mental frameworks needed to approach any programming challenge
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Language Agnostic</h4>
                      <p className="text-sm text-muted-foreground">
                        Learn concepts that apply to any programming language, not just syntax
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Visualize Algorithms</h4>
                      <p className="text-sm text-muted-foreground">
                        See how algorithms work step-by-step with interactive visualizations
                      </p>
                    </div>
                  </div>
                </div>
                <Link href="/curriculum">
                  <Button className="gap-2">
                    View Our Curriculum <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="md:w-1/2 bg-muted rounded-lg p-6 border">
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-md border">
                    <h4 className="font-medium mb-2">Pseudocode Example:</h4>
                    <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                      {`function findLargest(numbers):
  if numbers is empty:
    return null
  
  largest = first number in numbers
  
  for each number in numbers:
    if number > largest:
      largest = number
  
  return largest`}
                    </pre>
                  </div>
                  <div className="bg-card p-4 rounded-md border">
                    <h4 className="font-medium mb-2">The Same Algorithm in Python:</h4>
                    <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                      {`def find_largest(numbers):
  if not numbers:
    return None
  
  largest = numbers[0]
  
  for number in numbers:
    if number > largest:
      largest = number
  
  return largest`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-2xl md:text-4xl font-bold">Join Our Community</h2>
              <p className="max-w-[700px] text-muted-foreground">
                Learning to code is better together. Connect with fellow learners, share your progress, and get support
                when you need it.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Inclusive Learning Environment</h3>
                <p className="text-muted-foreground">
                  We're committed to creating a safe, supportive space for learners from all backgrounds. Everyone
                  belongs in tech.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
                <Award className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Celebrate Progress Together</h3>
                <p className="text-muted-foreground">
                  Share achievements, participate in challenges, and build confidence through community recognition.
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Join Pseuzy Today <ArrowRight className="h-4 w-4" />
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
