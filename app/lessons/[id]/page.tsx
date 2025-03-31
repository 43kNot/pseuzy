import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  MessageCircle,
  Lightbulb,
  Clock,
  AlertTriangle,
  Briefcase,
  Code,
  FileText,
  GraduationCap,
  CircleCheck,
} from "lucide-react"
import Link from "next/link"
import { DragDropExercise } from "@/components/drag-drop-exercise"
import { MultipleChoiceQuiz } from "@/components/multiple-choice-quiz"
import { CodePlayground } from "@/components/code-playground"
import { ConceptDiagram } from "@/components/concept-diagram"
import { KnowledgeCheck } from "@/components/knowledge-check"
import { LearningPathMap } from "@/components/learning-path-map"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PreLessonAssessment } from "@/components/pre-lesson-assessment"
import { LessonDiscussion } from "@/components/lesson-discussion"
import { AchievementBadges } from "@/components/achievement-badges"
import { PersonalizedGoals } from "@/components/personalized-goals"
import { GlobalHeader } from "@/components/global-header"

export default function LessonPage({ params }: { params: { id: string } }) {
  const lessonId = Number.parseInt(params.id)

  // Mock lesson data
  const lesson = {
    id: lessonId,
    title: lessonId === 1 ? "Boolean Logic Basics" : lessonId === 2 ? "Truth Tables" : "Lesson " + lessonId,
    progress: lessonId === 1 ? 100 : lessonId === 2 ? 60 : 0,
    difficulty: lessonId === 1 ? "Beginner" : lessonId === 2 ? "Intermediate" : "Advanced",
    estimatedTime: lessonId === 1 ? "20 min" : lessonId === 2 ? "30 min" : "45 min",
    prerequisites:
      lessonId === 1 ? [] : lessonId === 2 ? ["Boolean Logic Basics"] : ["Boolean Logic Basics", "Truth Tables"],
    content:
      "This lesson covers the fundamental concepts of boolean logic, which is the foundation of computational thinking.",
    sections: [
      {
        title: "Introduction to Boolean Logic",
        content:
          "Boolean logic is named after mathematician George Boole. It deals with binary variables and logical operations that result in either TRUE or FALSE values.",
      },
      {
        title: "Basic Operators",
        content:
          "The three fundamental operators in boolean logic are AND, OR, and NOT. These form the building blocks for all logical operations in computing.",
      },
    ],
    commonMistakes: [
      "Confusing OR with XOR (exclusive OR)",
      "Forgetting that AND requires both conditions to be true",
      "Misunderstanding operator precedence in complex expressions",
    ],
    realWorldExamples: [
      {
        title: "Database Queries",
        description: "Boolean logic is used in SQL WHERE clauses to filter data based on multiple conditions.",
      },
      {
        title: "Search Engines",
        description:
          "When you search for 'cats AND dogs', you're using boolean logic to find pages containing both terms.",
      },
      {
        title: "Circuit Design",
        description: "Digital circuits are built using logic gates that implement boolean operations.",
      },
    ],
    furtherReading: [
      {
        title: "Boolean Algebra Fundamentals",
        url: "https://example.com/boolean-algebra",
        type: "Article",
      },
      {
        title: "Logic in Computer Science",
        url: "https://example.com/logic-cs",
        type: "Book",
      },
      {
        title: "Digital Logic Design",
        url: "https://example.com/digital-logic",
        type: "Course",
      },
    ],
    projectIdeas: [
      "Build a simple calculator that uses boolean logic",
      "Create a truth table generator for custom expressions",
      "Design a basic circuit simulator using logic gates",
    ],
  }

  // Mock exercise data for drag and drop
  const dragDropExerciseData = {
    instructions: "Drag the logical operators to their correct descriptions",
    difficulty: "Medium",
    items: [
      { id: "and", label: "AND", type: "operator" },
      { id: "or", label: "OR", type: "operator" },
      { id: "not", label: "NOT", type: "operator" },
    ],
    targets: [
      {
        id: "target1",
        description: "Returns TRUE only when both inputs are TRUE",
        acceptedItemId: "and",
      },
      {
        id: "target2",
        description: "Returns TRUE when at least one input is TRUE",
        acceptedItemId: "or",
      },
      {
        id: "target3",
        description: "Inverts the input value (TRUE becomes FALSE, FALSE becomes TRUE)",
        acceptedItemId: "not",
      },
    ],
  }

  // Mock quiz data
  const quizData = {
    question: "Which of the following statements about the AND operator is true?",
    difficulty: "Easy",
    options: [
      { id: "a", text: "AND returns TRUE when at least one input is TRUE" },
      { id: "b", text: "AND returns TRUE only when both inputs are TRUE" },
      { id: "c", text: "AND always returns the opposite of OR" },
      { id: "d", text: "AND is not a fundamental boolean operator" },
    ],
    correctOptionId: "b",
    explanation:
      "The AND operator returns TRUE only when all of its inputs are TRUE. This is fundamental to boolean logic and is used extensively in programming conditions and digital circuit design.",
  }

  // Mock code playground data
  const codePlaygroundData = {
    title: "Experiment with Boolean Operators",
    initialCode: `// Try changing the values of a and b to see how the results change
const a = true;
const b = false;

// Boolean operations
const andResult = a && b;
const orResult = a || b;
const notA = !a;
const notB = !b;

// Display results
console.log("a:", a);
console.log("b:", b);
console.log("a AND b:", andResult);
console.log("a OR b:", orResult);
console.log("NOT a:", notA);
console.log("NOT b:", notB);`,
    language: "javascript",
  }

  // Mock knowledge check data
  const knowledgeCheckData = [
    {
      question: "What is the result of TRUE AND FALSE?",
      options: ["TRUE", "FALSE", "It depends", "None of the above"],
      correctOptionId: 1,
      explanation:
        "When using the AND operator, both inputs must be TRUE for the result to be TRUE. Since one input is FALSE, the result is FALSE.",
    },
    {
      question: "What is the result of TRUE OR FALSE?",
      options: ["TRUE", "FALSE", "It depends", "None of the above"],
      correctOptionId: 0,
      explanation:
        "When using the OR operator, at least one input must be TRUE for the result to be TRUE. Since one input is TRUE, the result is TRUE.",
    },
  ]

  return (
    <div className="min-h-screen bg-accent-lighter dark:bg-primary">
      <GlobalHeader />

      <header className="bg-white dark:bg-primary-light shadow-sm sticky top-0 z-10 border-b border-border dark:border-[#3A1A6A]">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <Link href="/lessons">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Lessons
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-primary-dark dark:text-white">{lesson.title}</h1>
            <div className="w-24">
              <Progress value={lesson.progress} className="h-2" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Pre-lesson assessment */}
          <PreLessonAssessment lessonId={lessonId} />

          {/* Lesson overview */}
          <div className="mb-8 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <Card className="p-6 dark:bg-primary-light border border-border dark:border-[#3A1A6A]">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-primary-dark dark:text-white">{lesson.title}</h2>
                  <Badge
                    variant="outline"
                    className="bg-accent-lighter/50 dark:bg-[#3A1A6A] text-primary-dark dark:text-white border-border dark:border-[#4A2A7A]"
                  >
                    {lesson.difficulty}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-primary-light dark:text-slate-300">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-DEFAULT" />
                    <span>{lesson.estimatedTime}</span>
                  </div>

                  {lesson.prerequisites.length > 0 && (
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-muted-DEFAULT" />
                      <span>Prerequisites: {lesson.prerequisites.join(", ")}</span>
                    </div>
                  )}
                </div>

                <p className="text-primary-light dark:text-slate-300 mb-6">{lesson.content}</p>

                <LearningPathMap currentLessonId={lessonId} />
              </Card>
            </div>

            <div className="md:w-64">
              <Card className="p-4 dark:bg-primary-light border border-border dark:border-[#3A1A6A]">
                <h3 className="font-medium text-primary-dark dark:text-white mb-3">Your Progress</h3>
                <PersonalizedGoals lessonId={lessonId} />
                <Separator className="my-4 bg-border dark:bg-[#3A1A6A]" />
                <AchievementBadges />
              </Card>
            </div>
          </div>

          {/* Main lesson content */}
          <Tabs defaultValue="content" className="mb-8">
            <TabsList className="mb-4 bg-white dark:bg-primary-light border border-border dark:border-[#3A1A6A]">
              <TabsTrigger value="content">Lesson Content</TabsTrigger>
              <TabsTrigger value="exercises">Exercises</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6 animate-slide-in">
              {/* Lesson content */}
              <Card className="p-6 dark:bg-primary-light border border-border dark:border-[#3A1A6A]">
                {lesson.sections.map((section, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="text-xl font-semibold mb-2 text-primary-dark dark:text-slate-200">
                      {section.title}
                    </h3>
                    <p className="text-primary-light dark:text-slate-300 mb-4">{section.content}</p>

                    {/* Knowledge check after each section */}
                    {index < knowledgeCheckData.length && (
                      <KnowledgeCheck
                        question={knowledgeCheckData[index].question}
                        options={knowledgeCheckData[index].options.map((text, i) => ({ id: i.toString(), text }))}
                        correctOptionId={knowledgeCheckData[index].correctOptionId.toString()}
                        explanation={knowledgeCheckData[index].explanation}
                      />
                    )}
                  </div>
                ))}

                {/* Visual concept diagram */}
                <ConceptDiagram lessonId={lessonId} />

                {/* Common mistakes section */}
                <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-900/30">
                  <h3 className="text-lg font-medium text-red-800 dark:text-red-300 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Common Mistakes
                  </h3>
                  <ul className="list-disc pl-5 text-red-700 dark:text-red-200 space-y-1">
                    {lesson.commonMistakes.map((mistake, index) => (
                      <li key={index}>{mistake}</li>
                    ))}
                  </ul>
                </div>

                {/* Real-world examples */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-primary-dark dark:text-white mb-4 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-ui-purple" />
                    Real-World Applications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {lesson.realWorldExamples.map((example, index) => (
                      <div
                        key={index}
                        className="p-4 bg-white dark:bg-[#3A1A6A] rounded-md border border-border dark:border-[#4A2A7A]"
                      >
                        <h4 className="font-medium text-primary-dark dark:text-white mb-2">{example.title}</h4>
                        <p className="text-sm text-primary-light dark:text-slate-300">{example.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Interactive code playground */}
              <Card className="p-6 dark:bg-primary-light border border-border dark:border-[#3A1A6A]">
                <h3 className="text-xl font-semibold mb-4 text-primary-dark dark:text-slate-200 flex items-center gap-2">
                  <Code className="h-5 w-5 text-accent-cool" />
                  Interactive Code Playground
                </h3>
                <p className="text-primary-light dark:text-slate-300 mb-4">
                  Experiment with the code below to see how boolean operators work in practice.
                </p>
                <CodePlayground initialCode={codePlaygroundData.initialCode} language={codePlaygroundData.language} />
              </Card>
            </TabsContent>

            <TabsContent value="exercises" className="space-y-6 animate-slide-in">
              {/* Drag and drop exercise */}
              <Card className="p-6 dark:bg-primary-light border border-border dark:border-[#3A1A6A]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-primary-dark dark:text-slate-200">Interactive Exercise</h3>
                  <Badge
                    variant="outline"
                    className="bg-accent-lighter/50 dark:bg-[#3A1A6A] text-primary-dark dark:text-white border-border dark:border-[#4A2A7A]"
                  >
                    Difficulty: {dragDropExerciseData.difficulty}
                  </Badge>
                </div>
                <DragDropExercise
                  instructions={dragDropExerciseData.instructions}
                  items={dragDropExerciseData.items}
                  targets={dragDropExerciseData.targets}
                />
              </Card>

              {/* Multiple choice quiz */}
              <Card className="p-6 dark:bg-primary-light border border-border dark:border-[#3A1A6A]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-primary-dark dark:text-slate-200">Knowledge Check</h3>
                  <Badge
                    variant="outline"
                    className="bg-accent-lighter/50 dark:bg-[#3A1A6A] text-primary-dark dark:text-white border-border dark:border-[#4A2A7A]"
                  >
                    Difficulty: {quizData.difficulty}
                  </Badge>
                </div>
                <MultipleChoiceQuiz
                  question={quizData.question}
                  options={quizData.options}
                  correctOptionId={quizData.correctOptionId}
                  explanation={quizData.explanation}
                />
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-6 animate-slide-in">
              {/* Further reading */}
              <Card className="p-6 dark:bg-primary-light border border-border dark:border-[#3A1A6A]">
                <h3 className="text-xl font-semibold mb-4 text-primary-dark dark:text-slate-200 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-accent-cool" />
                  Further Reading
                </h3>
                <div className="space-y-4">
                  {lesson.furtherReading.map((resource, index) => (
                    <div
                      key={index}
                      className="flex items-start p-3 bg-white dark:bg-[#3A1A6A] rounded-md border border-border dark:border-[#4A2A7A]"
                    >
                      <div className="mr-3">
                        {resource.type === "Article" && <FileText className="h-5 w-5 text-ui-purple" />}
                        {resource.type === "Book" && <BookOpen className="h-5 w-5 text-ui-purple" />}
                        {resource.type === "Course" && <GraduationCap className="h-5 w-5 text-ui-purple" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-primary-dark dark:text-white">{resource.title}</h4>
                        <p className="text-xs text-muted-DEFAULT dark:text-slate-400 mb-1">{resource.type}</p>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-accent-cool hover:underline"
                        >
                          View Resource
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Project ideas */}
              <Card className="p-6 dark:bg-primary-light border border-border dark:border-[#3A1A6A]">
                <h3 className="text-xl font-semibold mb-4 text-primary-dark dark:text-slate-200 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-accent-warm" />
                  Project Ideas
                </h3>
                <p className="text-primary-light dark:text-slate-300 mb-4">
                  Apply what you've learned with these hands-on project ideas:
                </p>
                <ul className="space-y-2">
                  {lesson.projectIdeas.map((idea, index) => (
                    <Card key={index} className="flex items-start gap-2 p-3 bg-[#3A1A6A]">
                      <div className="mt-0.5">
                        <CircleCheck className="h-5 w-5 text-accent-cool" />
                      </div>
                      <span className="text-primary-dark dark:text-white">{idea}</span>
                    </Card>
                  ))}
                </ul>
              </Card>
            </TabsContent>

            <TabsContent value="discussion" className="animate-slide-in">
              {/* Discussion section */}
              <Card className="p-6 dark:bg-primary-light border border-border dark:border-[#3A1A6A]">
                <h3 className="text-xl font-semibold mb-4 text-primary-dark dark:text-slate-200 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-accent-cool" />
                  Discussion
                </h3>
                <LessonDiscussion lessonId={lessonId} />
              </Card>
            </TabsContent>
          </Tabs>

          {/* Navigation buttons */}
          <div className="flex justify-between pt-4">
            {lessonId > 1 ? (
              <Button variant="outline" asChild className="border-border dark:border-[#3A1A6A]">
                <Link href={`/lessons/${lessonId - 1}`}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous Lesson
                </Link>
              </Button>
            ) : (
              <div></div>
            )}

            <Button className="bg-ui-purple hover:bg-[#7A3BC8]" asChild>
              <Link href={`/lessons/${lessonId + 1}`}>
                Next Lesson <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

