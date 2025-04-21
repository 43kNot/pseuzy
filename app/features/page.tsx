import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Code,
  ArrowLeft,
  Brain,
  Award,
  CheckCircle2,
  Zap,
  BarChart,
  Users,
  BookOpen,
  Play,
  Eye,
} from "lucide-react"

export default function FeaturesPage() {
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
            <Link href="/features" className="text-sm font-medium hover:underline text-primary">
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
        <section className="py-12 md:py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Link href="/" className="flex items-center text-primary hover:underline mb-4">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">Features That Make Learning Effective</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Discover how Pseuzy's unique approach helps you master computational thinking and coding skills.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold mb-6">Adaptive Learning Path</h2>
                <p className="text-muted-foreground mb-6">
                  Our AI-powered system creates a personalized learning experience based on your goals, experience
                  level, and learning style. No two journeys are the same.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Personalized Assessment</h4>
                      <p className="text-sm text-muted-foreground">
                        Initial evaluation to understand your current knowledge and learning needs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Custom Curriculum</h4>
                      <p className="text-sm text-muted-foreground">
                        Tailored learning path that adapts as you progress
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Spaced Repetition</h4>
                      <p className="text-sm text-muted-foreground">
                        Smart review scheduling based on your performance and forgetting curves
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-muted p-6 rounded-lg border">
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-md border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Your Learning Path</h4>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Personalized</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-800">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div className="flex-1 h-2 bg-green-100 rounded-full">
                          <div className="h-2 bg-green-500 rounded-full w-full"></div>
                        </div>
                        <span className="text-xs font-medium">100%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800">
                          <Brain className="h-4 w-4" />
                        </div>
                        <div className="flex-1 h-2 bg-blue-100 rounded-full">
                          <div className="h-2 bg-blue-500 rounded-full w-3/4"></div>
                        </div>
                        <span className="text-xs font-medium">75%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-800">
                          <Zap className="h-4 w-4" />
                        </div>
                        <div className="flex-1 h-2 bg-purple-100 rounded-full">
                          <div className="h-2 bg-purple-500 rounded-full w-1/2"></div>
                        </div>
                        <span className="text-xs font-medium">50%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-800">
                          <Code className="h-4 w-4" />
                        </div>
                        <div className="flex-1 h-2 bg-orange-100 rounded-full">
                          <div className="h-2 bg-orange-500 rounded-full w-1/4"></div>
                        </div>
                        <span className="text-xs font-medium">25%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-800">
                          <Award className="h-4 w-4" />
                        </div>
                        <div className="flex-1 h-2 bg-red-100 rounded-full">
                          <div className="h-2 bg-red-500 rounded-full w-0"></div>
                        </div>
                        <span className="text-xs font-medium">0%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-2xl md:text-4xl font-bold">Interactive Learning Tools</h2>
              <p className="max-w-[700px] text-muted-foreground">
                Our platform offers a variety of interactive tools designed to make learning engaging and effective.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Visual Algorithm Playground</h3>
                <p className="text-muted-foreground mb-4">
                  Watch algorithms come to life with step-by-step visualizations that help you understand exactly how
                  they work.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Step-by-step execution</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Visual data structures</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Customizable inputs</span>
                  </li>
                </ul>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Play className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Interactive Exercises</h3>
                <p className="text-muted-foreground mb-4">
                  Practice what you learn with hands-on exercises that provide immediate feedback and guidance.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Real-time feedback</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Hints and solutions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Progressive difficulty</span>
                  </li>
                </ul>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Debugging Challenges</h3>
                <p className="text-muted-foreground mb-4">
                  Develop critical thinking by identifying and fixing errors in code, an essential skill for any
                  programmer.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Error identification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Logic problem solving</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Code improvement suggestions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-muted p-6 rounded-lg border">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-800">
                        <Zap className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">5-Day Streak</div>
                        <div className="text-xs text-muted-foreground">Keep it going!</div>
                      </div>
                    </div>
                    <div className="bg-card p-4 rounded-md border">
                      <h4 className="font-medium mb-2">Your Achievements</h4>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="flex flex-col items-center">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                            <Award className="h-5 w-5 text-primary" />
                          </div>
                          <span className="text-xs text-center">First Login</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                            <Brain className="h-5 w-5 text-primary" />
                          </div>
                          <span className="text-xs text-center">Quiz Master</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                            <Zap className="h-5 w-5 text-primary" />
                          </div>
                          <span className="text-xs text-center">Fast Learner</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          </div>
                          <span className="text-xs text-center">Problem Solver</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-card p-4 rounded-md border">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Daily Challenge</h4>
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">50 XP</span>
                      </div>
                      <p className="text-sm mb-3">Identify the pattern and complete the sequence: 2, 4, 8, 16, ...</p>
                      <Button size="sm" className="w-full">
                        Solve Challenge
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-2xl md:text-4xl font-bold mb-6">Gamified Learning Experience</h2>
                <p className="text-muted-foreground mb-6">
                  Stay motivated with game-like elements that make learning fun and rewarding. Track your progress, earn
                  badges, and compete with others.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Achievement System</h4>
                      <p className="text-sm text-muted-foreground">
                        Earn badges and rewards as you master new concepts
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Daily Challenges</h4>
                      <p className="text-sm text-muted-foreground">Bite-sized problems to keep your skills sharp</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Progress Visualization</h4>
                      <p className="text-sm text-muted-foreground">See your growth with intuitive progress tracking</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Leaderboards</h4>
                      <p className="text-sm text-muted-foreground">Compare your progress with peers and friends</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-2xl md:text-4xl font-bold">Inclusive Learning Community</h2>
              <p className="max-w-[700px] text-muted-foreground">
                Join a supportive community of learners from diverse backgrounds, all working toward the same goal.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Safe Learning Environment</h3>
                <p className="text-muted-foreground mb-4">
                  We're committed to creating a welcoming space where everyone feels comfortable learning and asking
                  questions.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Inclusive community guidelines</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Moderated discussion forums</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Diverse learning resources</span>
                  </li>
                </ul>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Accessibility First</h3>
                <p className="text-muted-foreground mb-4">
                  Our platform is designed to be accessible to everyone, regardless of background or ability.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Screen reader compatibility</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Color blindness support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Keyboard navigation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Financial assistance options</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-6">
              <h2 className="text-2xl md:text-4xl font-bold">Ready to Start Your Learning Journey?</h2>
              <p className="max-w-[700px] text-muted-foreground">
                Join thousands of learners who are building their computational thinking and coding skills with Pseuzy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="gap-2">
                    Sign Up Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/curriculum">
                  <Button size="lg" variant="outline">
                    Explore Curriculum
                  </Button>
                </Link>
              </div>
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
