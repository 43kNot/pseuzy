import { Button } from "@/components/ui/button"
import { ArrowRight, Award, BookOpen, Calendar, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-accent-lighter dark:bg-primary">
      <main className="container mx-auto px-4 py-12">
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-dark dark:text-white mb-6">
            Learn Computational Logic <span className="text-accent-warm">Interactively</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-light dark:text-slate-300 mb-8">
            Master the fundamentals of computational logic through engaging lessons, interactive exercises, and track
            your progress along the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-ui-purple hover:bg-[#7A3BC8] text-white" asChild>
              <Link href="/signup">
                Start Learning <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <Card className="p-6">
            <div className="bg-accent-lighter dark:bg-[#3A1A6A] p-3 rounded-full w-fit mb-4">
              <BookOpen className="h-6 w-6 text-accent-cool" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-primary-dark dark:text-white">Interactive Lessons</h3>
            <p className="text-primary-light dark:text-slate-300">
              Learn through hands-on exercises with drag-and-drop activities and visual feedback.
            </p>
          </Card>

          <Card className="p-6">
            <div className="bg-accent-lighter dark:bg-[#3A1A6A] p-3 rounded-full w-fit mb-4">
              <Calendar className="h-6 w-6 text-accent-cool" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-primary-dark dark:text-white">Streak Tracking</h3>
            <p className="text-primary-light dark:text-slate-300">
              Stay motivated with daily streak tracking and achievement badges.
            </p>
          </Card>

          <Card className="p-6">
            <div className="bg-accent-lighter dark:bg-[#3A1A6A] p-3 rounded-full w-fit mb-4">
              <Award className="h-6 w-6 text-accent-cool" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-primary-dark dark:text-white">Progress Tracking</h3>
            <p className="text-primary-light dark:text-slate-300">
              Monitor your learning journey with detailed progress analytics.
            </p>
          </Card>
        </section>

        <Card className="p-8 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-primary-dark dark:text-white">Featured Lessons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Boolean Logic Basics",
                description: "Learn about TRUE, FALSE, AND, OR, and NOT operations.",
                level: "Beginner",
                duration: "15 min",
              },
              {
                title: "Truth Tables",
                description: "Master the creation and interpretation of truth tables.",
                level: "Intermediate",
                duration: "20 min",
              },
              {
                title: "Logical Equivalences",
                description: "Understand how to simplify and transform logical expressions.",
                level: "Intermediate",
                duration: "25 min",
              },
              {
                title: "Predicate Logic",
                description: "Explore quantifiers and predicates in logical reasoning.",
                level: "Advanced",
                duration: "30 min",
              },
            ].map((lesson, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-[#622CA0] dark:text-[#A888D8]">{lesson.title}</h3>
                <p className="text-primary-light dark:text-slate-300 text-sm mb-4">{lesson.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm bg-accent-lighter dark:bg-[#3A1A6A] px-3 py-1.5 rounded-md text-[#622CA0] dark:text-[#A888D8]">
                    {lesson.level}
                  </span>
                  <span className="text-sm text-muted-DEFAULT dark:text-slate-400">{lesson.duration}</span>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/lessons">View All Lessons</Link>
            </Button>
          </div>
        </Card>
      </main>

      <footer className="bg-primary-dark text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <CheckCircle2 className="h-6 w-6 text-accent-cool" />
              <span className="text-xl font-bold">Pseuzy</span>
            </div>
            <div className="flex gap-8">
              <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="text-slate-300 hover:text-white transition-colors">
                Privacy
              </Link>
            </div>
          </div>
          <div className="border-t border-[#3A1A6A] mt-8 pt-8 text-center text-slate-400 text-sm">
            © {new Date().getFullYear()} Pseuzy. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

