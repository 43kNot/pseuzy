"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Brain,
  Clock,
  CalendarIcon as CalendarIconComponent,
  Bell,
  Mail,
  Target,
  Save,
  Share2,
  HelpCircle,
  BookOpen,
  Sparkles,
  Paintbrush,
  User,
  Briefcase,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getThemesByCategory, getThemeById, type Theme } from "@/lib/themes"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/lib/auth"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { GlobalHeader } from "@/components/global-header"

// Learning style quiz questions
const learningStyleQuestions = [
  {
    question: "When learning something new, I prefer to:",
    options: [
      { id: "visual", text: "See diagrams, charts, and visual examples" },
      { id: "auditory", text: "Listen to explanations and discuss concepts" },
      { id: "reading", text: "Read detailed explanations and documentation" },
      { id: "kinesthetic", text: "Try it out hands-on and learn by doing" },
    ],
  },
  {
    question: "I remember information best when:",
    options: [
      { id: "visual", text: "I can visualize it in my mind" },
      { id: "auditory", text: "I hear it or say it aloud" },
      { id: "reading", text: "I've written it down or read it multiple times" },
      { id: "kinesthetic", text: "I've performed the task or activity myself" },
    ],
  },
  {
    question: "When solving a problem, I typically:",
    options: [
      { id: "visual", text: "Draw diagrams or visualize the solution" },
      { id: "auditory", text: "Talk through the problem out loud" },
      { id: "reading", text: "Write down the steps and analyze them" },
      { id: "kinesthetic", text: "Try different approaches until one works" },
    ],
  },
]

// Specific goals options
const specificGoalOptions = [
  { id: "challenge", text: "Challenge myself intellectually" },
  { id: "business", text: "Launch a business or startup" },
  { id: "career", text: "Change my career path" },
  { id: "skills", text: "Improve my technical skills" },
  { id: "education", text: "Supplement my formal education" },
  { id: "hobby", text: "Learn as a hobby or interest" },
  { id: "custom", text: "Custom goal (specify below)" },
]

// Career path options
const careerPathOptions = [
  { id: "software-dev", text: "Software Developer" },
  { id: "data-analyst", text: "Data Analyst" },
  { id: "ai-ml", text: "AI/ML Engineer" },
  { id: "cybersecurity", text: "Cybersecurity Specialist" },
  { id: "product-manager", text: "Product Manager" },
  { id: "researcher", text: "Academic Researcher" },
  { id: "student", text: "Student" },
  { id: "other", text: "Other (specify below)" },
]

// Time commitment options
const timeCommitmentOptions = [
  { id: "minimal", text: "5-10 minutes daily", value: 10 },
  { id: "moderate", text: "15-30 minutes daily", value: 30 },
  { id: "dedicated", text: "30-60 minutes daily", value: 60 },
  { id: "intensive", text: "1+ hours daily", value: 90 },
]

// Preferred learning times
const preferredLearningTimeOptions = [
  { id: "morning", text: "Morning (6am - 12pm)" },
  { id: "afternoon", text: "Afternoon (12pm - 5pm)" },
  { id: "evening", text: "Evening (5pm - 9pm)" },
  { id: "night", text: "Night (9pm - 12am)" },
  { id: "flexible", text: "Flexible / No preference" },
]

// Notification options
const notificationOptions = [
  { id: "email", text: "Email reminders", icon: Mail },
  { id: "push", text: "Push notifications", icon: Bell },
  { id: "calendar", text: "Calendar integration", icon: CalendarIconComponent },
]

// Add type definitions for onboarding data
interface OnboardingData {
  learning_style: {
    visual: number;
    auditory: number;
    reading: number;
    kinesthetic: number;
  };
  // ... other fields as needed
}

interface Profile {
  onboarding_completed: boolean;
  onboarding_step: number;
  onboarding_data: OnboardingData;
}

export default function OnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const isMobile = useMobile()
  const supabase = createClient()
  const { updateOnboardingProgress, completeOnboarding } = useAuth()

  // State for user authentication
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // State for onboarding steps
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const totalSteps = 7

  // User data state
  const [userData, setUserData] = useState({
    // Personal Information
    name: "",
    preferred_name: "",
    birth_date: "",
    postal_code: "",

    // Theme
    theme_id: "purple-logic",

    // Learning Style
    learning_style: {
      visual: 0,
      auditory: 0,
      reading: 0,
      kinesthetic: 0,
    },

    // Goals
    specific_goals: [] as string[],
    custom_goal: "",
    career_path: "",
    custom_career_path: "",

    // Schedule
    time_commitment: "moderate",
    preferred_learning_times: [] as string[],
    weekly_schedule: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },

    // Notifications
    notification_preferences: [] as string[],
    email_for_notifications: "",
  })

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<string[]>([])

  // Theme selection state
  const [themes, setThemes] = useState<Theme[]>([])
  const [selectedThemeCategory, setSelectedThemeCategory] = useState<"original" | "educational">("original")

  // Date picker state
  const [date, setDate] = useState<Date>()

  // Check if user is authenticated and load saved progress
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true)

        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          // Not authenticated, redirect to sign in
          router.push("/signin")
          return
        }

        setUserId(user.id)

        // Check if user has already completed onboarding
        const { data: profile } = await supabase
          .from("profiles")
          .select("onboarding_completed, onboarding_step, onboarding_data")
          .eq("id", user.id)
          .single()

        if (profile) {
          if (profile.onboarding_completed) {
            // Onboarding already completed, redirect to pre-assessment
            router.push("/pre-assessment")
            return
          }

          // Resume onboarding
          if (profile.onboarding_step > 1) {
            setStep(profile.onboarding_step)

            if (profile.onboarding_data) {
              setUserData({
                ...userData,
                ...profile.onboarding_data,
              })

              if (profile.onboarding_step === 3) {
                const learningStyle = profile.onboarding_data.learning_style
                if (learningStyle && typeof learningStyle === 'object') {
                  const values = Object.values(learningStyle as Record<string, number>)
                  const answeredQuestions = values.reduce((a, b) => a + (b || 0), 0)
                  
                  setCurrentQuestionIndex(Math.min(answeredQuestions, learningStyleQuestions.length - 1))

                  const reconstructedAnswers = []
                  for (let i = 0; i < answeredQuestions; i++) {
                    reconstructedAnswers.push("reconstructed")
                  }
                  setQuizAnswers(reconstructedAnswers)
                }
              }

              toast({
                title: "Progress Restored",
                description: "Your onboarding progress has been restored.",
                duration: 3000,
              })
            }
          }
        }

        // Get user email for notifications
        if (user.email) {
          setUserData((prev) => ({
            ...prev,
            email_for_notifications: user.email || "",
          }))
        }
      } catch (error) {
        console.error("Error checking auth:", error)
        toast({
          title: "Error",
          description: "There was a problem loading your profile. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Load themes
  useEffect(() => {
    const { original, educational } = getThemesByCategory()
    setThemes([...original, ...educational])
  }, [])

  // Update progress when step changes
  useEffect(() => {
    setProgress((step / totalSteps) * 100)
  }, [step])

  // Save progress to database
  const saveProgress = async () => {
    if (!userId) return

    try {
      const success = await updateOnboardingProgress(userId, step, userData)

      if (success) {
        toast({
          title: "Progress Saved",
          description: "Your onboarding progress has been saved.",
          duration: 3000,
        })
      } else {
        throw new Error("Failed to save progress")
      }
    } catch (error) {
      console.error("Error saving progress:", error)
      toast({
        title: "Error",
        description: "There was a problem saving your progress. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle theme selection
  const handleThemeSelect = (themeId: string) => {
    setUserData({ ...userData, theme_id: themeId })

    // Apply the theme immediately
    const theme = getThemeById(themeId)
    document.documentElement.style.setProperty("--primary", theme.colors.primary)
    document.documentElement.style.setProperty("--primary-dark", theme.colors.primaryDark)
    document.documentElement.style.setProperty("--primary-light", theme.colors.primaryLight)
    document.documentElement.style.setProperty("--secondary", theme.colors.secondary)
    document.documentElement.style.setProperty("--accent-cool", theme.colors.accentCool)
    document.documentElement.style.setProperty("--accent-warm", theme.colors.accentWarm)
    document.documentElement.style.setProperty("--accent-light", theme.colors.accentLight)
    document.documentElement.style.setProperty("--accent-lighter", theme.colors.accentLighter)
    document.documentElement.style.setProperty("--muted", theme.colors.muted)
    document.documentElement.style.setProperty("--ui-purple", theme.colors.uiPurple)
    document.documentElement.style.setProperty("--ui-lavender", theme.colors.uiLavender)
  }

  // Handle learning style quiz answer
  const handleQuizAnswer = (styleType: string) => {
    // Update learning style scores
    const updatedLearningStyle = { ...userData.learning_style }
    updatedLearningStyle[styleType as keyof typeof updatedLearningStyle] += 1

    // Update quiz state
    const updatedAnswers = [...quizAnswers, styleType]
    setQuizAnswers(updatedAnswers)

    // Update user data
    setUserData({
      ...userData,
      learning_style: updatedLearningStyle,
    })

    // Move to next question or next step if done
    if (currentQuestionIndex < learningStyleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Quiz complete, determine dominant learning style
      const dominantStyle = Object.entries(updatedLearningStyle).reduce(
        (max, [style, score]) => (score > max.score ? { style, score } : max),
        { style: "", score: -1 },
      ).style

      // Log the result (in a real app, you'd use this to customize the experience)
      console.log("Dominant learning style:", dominantStyle)

      // Move to next step
      handleNextStep()
    }
  }

  // Handle specific goals selection
  const handleSpecificGoalToggle = (goalId: string) => {
    const updatedGoals = [...userData.specific_goals]

    if (updatedGoals.includes(goalId)) {
      // Remove goal if already selected
      const index = updatedGoals.indexOf(goalId)
      updatedGoals.splice(index, 1)
    } else {
      // Add goal if not already selected
      updatedGoals.push(goalId)
    }

    setUserData({
      ...userData,
      specific_goals: updatedGoals,
    })
  }

  // Handle preferred learning times selection
  const handleLearningTimeToggle = (timeId: string) => {
    const updatedTimes = [...userData.preferred_learning_times]

    if (updatedTimes.includes(timeId)) {
      // Remove time if already selected
      const index = updatedTimes.indexOf(timeId)
      updatedTimes.splice(index, 1)
    } else {
      // Add time if not already selected
      updatedTimes.push(timeId)
    }

    setUserData({
      ...userData,
      preferred_learning_times: updatedTimes,
    })
  }

  // Handle weekly schedule toggle
  const handleWeeklyScheduleToggle = (day: string) => {
    setUserData({
      ...userData,
      weekly_schedule: {
        ...userData.weekly_schedule,
        [day]: !userData.weekly_schedule[day as keyof typeof userData.weekly_schedule],
      },
    })
  }

  // Handle notification preferences
  const handleNotificationToggle = (notificationType: string) => {
    const updatedPreferences = [...userData.notification_preferences]

    if (updatedPreferences.includes(notificationType)) {
      // Remove preference if already selected
      const index = updatedPreferences.indexOf(notificationType)
      updatedPreferences.splice(index, 1)
    } else {
      // Add preference if not already selected
      updatedPreferences.push(notificationType)
    }

    setUserData({
      ...userData,
      notification_preferences: updatedPreferences,
    })
  }

  // Handle next step
  const handleNextStep = async () => {
    // Save progress to database
    if (userId) {
      await updateOnboardingProgress(userId, step + 1, userData)
    }

    // Move to next step
    setStep(step + 1)
  }

  // Handle previous step
  const handlePreviousStep = () => {
    setStep(step - 1)
  }

  // Handle form submission
  const handleComplete = async () => {
    if (!userId) return

    try {
      // Complete onboarding in database
      const success = await completeOnboarding(userId, userData)

      if (success) {
        toast({
          title: "Onboarding Complete!",
          description: "Your preferences have been saved. Let's start learning!",
          duration: 5000,
        })

        // Redirect to pre-assessment
        router.push("/pre-assessment")
      } else {
        throw new Error("Failed to complete onboarding")
      }
    } catch (error) {
      console.error("Error completing onboarding:", error)
      toast({
        title: "Error",
        description: "There was a problem completing your onboarding. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Get dominant learning style
  const getDominantLearningStyle = () => {
    return Object.entries(userData.learning_style).reduce(
      (max, [style, score]) => (score > max.score ? { style, score } : max),
      { style: "", score: -1 },
    ).style
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-accent-lighter dark:bg-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-ui-purple" />
          <p className="text-primary-dark dark:text-white">Loading your profile...</p>
        </div>
      </div>
    )
  }

  // Render step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className="bg-accent-lighter dark:bg-[#3A1A6A] p-4 rounded-full">
                  <Sparkles className="h-8 w-8 text-ui-purple" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-primary-dark dark:text-white">Welcome to Pseuzy!</h1>
              <p className="text-primary-light dark:text-slate-300">
                Let's personalize your learning experience. This will only take a few minutes.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="border-border dark:border-[#3A1A6A]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferred_name">
                  Preferred Name/Nickname <span className="text-muted-DEFAULT">(optional)</span>
                </Label>
                <Input
                  id="preferred_name"
                  placeholder="Johnny"
                  value={userData.preferred_name}
                  onChange={(e) => setUserData({ ...userData, preferred_name: e.target.value })}
                  className="border-border dark:border-[#3A1A6A]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birth_date">
                  Birth Date <span className="text-muted-DEFAULT">(optional)</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal border-border dark:border-[#3A1A6A]",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIconComponent className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => {
                        setDate(date)
                        if (date) {
                          setUserData({ ...userData, birth_date: date.toISOString() })
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="postal_code">
                  Postal Code <span className="text-muted-DEFAULT">(optional)</span>
                </Label>
                <Input
                  id="postal_code"
                  placeholder="90210"
                  value={userData.postal_code}
                  onChange={(e) => setUserData({ ...userData, postal_code: e.target.value })}
                  className="border-border dark:border-[#3A1A6A]"
                />
                <p className="text-xs text-muted-DEFAULT">
                  This helps us provide localized content and connect you with nearby learners.
                </p>
              </div>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className="bg-accent-lighter dark:bg-[#3A1A6A] p-4 rounded-full">
                  <Paintbrush className="h-8 w-8 text-ui-purple" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-primary-dark dark:text-white">Choose Your Theme</h1>
              <p className="text-primary-light dark:text-slate-300">
                Select a visual theme that suits your style and preferences.
              </p>
            </div>

            <Tabs
              defaultValue="original"
              onValueChange={(value) => setSelectedThemeCategory(value as "original" | "educational")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="original">Original Themes</TabsTrigger>
                <TabsTrigger value="educational">Educational Themes</TabsTrigger>
              </TabsList>

              <TabsContent value="original" className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {selectedThemeCategory === "original" && themes.slice(0, 8).map((theme) => (
                    <div
                      key={theme.id}
                      className={`relative cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
                        userData.theme_id === theme.id
                          ? "border-accent-cool dark:border-accent-cool"
                          : "border-border dark:border-[#3A1A6A]"
                      }`}
                      onClick={() => handleThemeSelect(theme.id)}
                    >
                      <div
                        className="h-20 w-full"
                        style={{
                          background: theme.colors.primary,
                        }}
                      />
                      <div
                        className="h-8 w-full p-1 text-xs font-medium flex items-center justify-center"
                        style={{
                          backgroundColor: theme.colors.accentLighter,
                          color: theme.colors.primary,
                        }}
                      >
                        {theme.name}
                      </div>
                      {userData.theme_id === theme.id && (
                        <div className="absolute top-2 right-2 bg-white dark:bg-[#3A1A6A] rounded-full p-0.5">
                          <CheckCircle2 className="h-4 w-4 text-accent-cool" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="educational" className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {selectedThemeCategory === "educational" && themes.slice(8).map((theme) => (
                    <div
                      key={theme.id}
                      className={`relative cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
                        userData.theme_id === theme.id
                          ? "border-accent-cool dark:border-accent-cool"
                          : "border-border dark:border-[#3A1A6A]"
                      }`}
                      onClick={() => handleThemeSelect(theme.id)}
                    >
                      <div
                        className="h-20 w-full"
                        style={{
                          background: theme.colors.primary,
                        }}
                      />
                      <div
                        className="h-8 w-full p-1 text-xs font-medium flex items-center justify-center"
                        style={{
                          backgroundColor: theme.colors.accentLighter,
                          color: theme.colors.primary,
                        }}
                      >
                        {theme.name}
                      </div>
                      {userData.theme_id === theme.id && (
                        <div className="absolute top-2 right-2 bg-white dark:bg-[#3A1A6A] rounded-full p-0.5">
                          <CheckCircle2 className="h-4 w-4 text-accent-cool" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-center text-sm text-muted-DEFAULT dark:text-slate-400">
              You can always change your theme later in settings.
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className="bg-accent-lighter dark:bg-[#3A1A6A] p-4 rounded-full">
                  <Brain className="h-8 w-8 text-ui-purple" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-primary-dark dark:text-white">Learning Style Assessment</h1>
              <p className="text-primary-light dark:text-slate-300">
                Let's determine your learning style to personalize your experience.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm text-muted-DEFAULT dark:text-slate-400">
                <span>
                  Question {currentQuestionIndex + 1} of {learningStyleQuestions.length}
                </span>
                <span>{Math.round(((currentQuestionIndex + 1) / learningStyleQuestions.length) * 100)}% Complete</span>
              </div>

              <Progress value={((currentQuestionIndex + 1) / learningStyleQuestions.length) * 100} className="h-1" />

              <div className="p-4 bg-white dark:bg-primary-light rounded-md border border-border dark:border-[#3A1A6A]">
                <h3 className="font-medium text-primary-dark dark:text-white mb-4">
                  {learningStyleQuestions[currentQuestionIndex].question}
                </h3>

                <RadioGroup className="space-y-3">
                  {learningStyleQuestions[currentQuestionIndex].options.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-2 p-3 rounded-md border border-border dark:border-[#3A1A6A] cursor-pointer hover:bg-accent-lighter/20 dark:hover:bg-[#3A1A6A]/50"
                      onClick={() => handleQuizAnswer(option.id)}
                    >
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className="bg-accent-lighter dark:bg-[#3A1A6A] p-4 rounded-full">
                  <Target className="h-8 w-8 text-ui-purple" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-primary-dark dark:text-white">Set Your Learning Goals</h1>
              <p className="text-primary-light dark:text-slate-300">
                What do you want to achieve with Pseuzy? Select all that apply.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-medium text-primary-dark dark:text-white">Specific Goals</h3>
                {specificGoalOptions.map((goal) => (
                  <div
                    key={goal.id}
                    className={`flex items-start space-x-2 p-3 rounded-md border cursor-pointer hover:bg-accent-lighter/20 dark:hover:bg-[#3A1A6A]/50 ${
                      userData.specific_goals.includes(goal.id)
                        ? "border-accent-cool bg-accent-lighter/30 dark:bg-[#3A1A6A]"
                        : "border-border dark:border-[#3A1A6A]"
                    }`}
                    onClick={() => handleSpecificGoalToggle(goal.id)}
                  >
                    <Checkbox
                      id={`goal-${goal.id}`}
                      checked={userData.specific_goals.includes(goal.id)}
                      onCheckedChange={() => handleSpecificGoalToggle(goal.id)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <Label htmlFor={`goal-${goal.id}`} className="cursor-pointer">
                        {goal.text}
                      </Label>
                      {goal.id === "custom" && userData.specific_goals.includes("custom") && (
                        <Input
                          className="mt-2 border-border dark:border-[#3A1A6A]"
                          placeholder="Describe your custom goal"
                          value={userData.custom_goal}
                          onChange={(e) => setUserData({ ...userData, custom_goal: e.target.value })}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4">
                <h3 className="font-medium text-primary-dark dark:text-white">Career Path</h3>
                <RadioGroup
                  value={userData.career_path}
                  onValueChange={(value) => setUserData({ ...userData, career_path: value })}
                  className="space-y-2"
                >
                  {careerPathOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`flex items-center space-x-2 p-3 rounded-md border cursor-pointer hover:bg-accent-lighter/20 dark:hover:bg-[#3A1A6A]/50 ${
                        userData.career_path === option.id
                          ? "border-accent-cool bg-accent-lighter/30 dark:bg-[#3A1A6A]"
                          : "border-border dark:border-[#3A1A6A]"
                      }`}
                    >
                      <RadioGroupItem value={option.id} id={`career-${option.id}`} />
                      <div className="flex flex-1 justify-between items-center">
                        <Label htmlFor={`career-${option.id}`} className="cursor-pointer flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-muted-DEFAULT" />
                          {option.text}
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>

                {userData.career_path === "other" && (
                  <div className="mt-2">
                    <Input
                      className="border-border dark:border-[#3A1A6A]"
                      placeholder="Specify your career path"
                      value={userData.custom_career_path}
                      onChange={(e) => setUserData({ ...userData, custom_career_path: e.target.value })}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className="bg-accent-lighter dark:bg-[#3A1A6A] p-4 rounded-full">
                  <Clock className="h-8 w-8 text-ui-purple" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-primary-dark dark:text-white">Schedule & Commitment</h1>
              <p className="text-primary-light dark:text-slate-300">
                Let us know when you prefer to learn and how much time you can commit.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-medium text-primary-dark dark:text-white">Time Commitment</h3>
                <RadioGroup
                  value={userData.time_commitment}
                  onValueChange={(value) => setUserData({ ...userData, time_commitment: value })}
                  className="space-y-2"
                >
                  {timeCommitmentOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`flex items-center space-x-2 p-3 rounded-md border cursor-pointer hover:bg-accent-lighter/20 dark:hover:bg-[#3A1A6A]/50 ${
                        userData.time_commitment === option.id
                          ? "border-accent-cool bg-accent-lighter/30 dark:bg-[#3A1A6A]"
                          : "border-border dark:border-[#3A1A6A]"
                      }`}
                    >
                      <RadioGroupItem value={option.id} id={`time-${option.id}`} />
                      <div className="flex flex-1 justify-between items-center">
                        <Label htmlFor={`time-${option.id}`} className="cursor-pointer flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-DEFAULT" />
                          {option.text}
                        </Label>
                        <div className="w-24 bg-accent-lighter/30 dark:bg-[#3A1A6A] h-2 rounded-full overflow-hidden">
                          <div className="h-full bg-ui-purple" style={{ width: `${option.value}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3 pt-4">
                <h3 className="font-medium text-primary-dark dark:text-white">Preferred Learning Times</h3>
                <div className="space-y-2">
                  {preferredLearningTimeOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`flex items-start space-x-2 p-3 rounded-md border cursor-pointer hover:bg-accent-lighter/20 dark:hover:bg-[#3A1A6A]/50 ${
                        userData.preferred_learning_times.includes(option.id)
                          ? "border-accent-cool bg-accent-lighter/30 dark:bg-[#3A1A6A]"
                          : "border-border dark:border-[#3A1A6A]"
                      }`}
                      onClick={() => handleLearningTimeToggle(option.id)}
                    >
                      <Checkbox
                        id={`time-pref-${option.id}`}
                        checked={userData.preferred_learning_times.includes(option.id)}
                        onCheckedChange={() => handleLearningTimeToggle(option.id)}
                        className="mt-0.5"
                      />
                      <Label htmlFor={`time-pref-${option.id}`} className="cursor-pointer">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <h3 className="font-medium text-primary-dark dark:text-white">Weekly Schedule</h3>
                <p className="text-sm text-primary-light dark:text-slate-300">Select the days you plan to learn:</p>
                <div className="grid grid-cols-7 gap-2">
                  {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                    <div
                      key={day}
                      className={`flex flex-col items-center p-2 rounded-md border cursor-pointer hover:bg-accent-lighter/20 dark:hover:bg-[#3A1A6A]/50 ${
                        userData.weekly_schedule[day as keyof typeof userData.weekly_schedule]
                          ? "border-accent-cool bg-accent-lighter/30 dark:bg-[#3A1A6A]"
                          : "border-border dark:border-[#3A1A6A]"
                      }`}
                      onClick={() => handleWeeklyScheduleToggle(day)}
                    >
                      <span className="text-xs uppercase">{day.slice(0, 3)}</span>
                      <Checkbox
                        id={`day-${day}`}
                        checked={userData.weekly_schedule[day as keyof typeof userData.weekly_schedule]}
                        onCheckedChange={() => handleWeeklyScheduleToggle(day)}
                        className="mt-1"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className="bg-accent-lighter dark:bg-[#3A1A6A] p-4 rounded-full">
                  <Bell className="h-8 w-8 text-ui-purple" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-primary-dark dark:text-white">Stay on Track</h1>
              <p className="text-primary-light dark:text-slate-300">
                How would you like to be reminded about your learning schedule?
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                {notificationOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`flex items-start space-x-2 p-3 rounded-md border cursor-pointer hover:bg-accent-lighter/20 dark:hover:bg-[#3A1A6A]/50 ${
                      userData.notification_preferences.includes(option.id)
                        ? "border-accent-cool bg-accent-lighter/30 dark:bg-[#3A1A6A]"
                        : "border-border dark:border-[#3A1A6A]"
                    }`}
                    onClick={() => handleNotificationToggle(option.id)}
                  >
                    <Checkbox
                      id={`notif-${option.id}`}
                      checked={userData.notification_preferences.includes(option.id)}
                      onCheckedChange={() => handleNotificationToggle(option.id)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <Label htmlFor={`notif-${option.id}`} className="cursor-pointer flex items-center gap-2">
                        <option.icon className="h-4 w-4 text-muted-DEFAULT" />
                        {option.text}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>

              {userData.notification_preferences.includes("email") && (
                <div className="space-y-2 pt-2">
                  <Label htmlFor="email">Email for notifications</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={userData.email_for_notifications}
                    onChange={(e) => setUserData({ ...userData, email_for_notifications: e.target.value })}
                    className="border-border dark:border-[#3A1A6A]"
                  />
                </div>
              )}
            </div>
          </motion.div>
        )

      case 7:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className="bg-accent-lighter dark:bg-[#3A1A6A] p-4 rounded-full">
                  <BookOpen className="h-8 w-8 text-ui-purple" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-primary-dark dark:text-white">Your Learning Path</h1>
              <p className="text-primary-light dark:text-slate-300">
                Based on your preferences, we've created a personalized learning path for you.
              </p>
            </div>

            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-accent-lighter dark:bg-[#3A1A6A] p-2 rounded-full">
                    <User className="h-5 w-5 text-ui-purple" />
                  </div>
                  <div>
                    <h4 className="font-medium text-primary-dark dark:text-white">Your Profile</h4>
                    <p className="text-sm text-muted-DEFAULT dark:text-slate-400">
                      {userData.name || "User"} • {getDominantLearningStyle()} Learner
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent-lighter dark:bg-[#3A1A6A] p-2 rounded-full">
                      <Target className="h-5 w-5 text-ui-purple" />
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-dark dark:text-white">Goals</h4>
                      <p className="text-sm text-muted-DEFAULT dark:text-slate-400">
                        {userData.specific_goals.length > 0
                          ? specificGoalOptions
                              .filter((g) => userData.specific_goals.includes(g.id))
                              .map((g) => g.text)
                              .join(", ")
                          : "No specific goals selected"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-accent-lighter dark:bg-[#3A1A6A] p-2 rounded-full">
                      <Clock className="h-5 w-5 text-ui-purple" />
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-dark dark:text-white">Schedule</h4>
                      <p className="text-sm text-muted-DEFAULT dark:text-slate-400">
                        {timeCommitmentOptions.find((t) => t.id === userData.time_commitment)?.text || "Flexible"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-accent-lighter dark:bg-[#3A1A6A] p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-ui-purple" />
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-dark dark:text-white">Learning Path</h4>
                      <p className="text-sm text-muted-DEFAULT dark:text-slate-400">
                        Computational Logic •{" "}
                        {careerPathOptions.find((c) => c.id === userData.career_path)?.text || "General"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <h4 className="font-medium text-primary-dark dark:text-white">Recommended Lessons</h4>
                  {[
                    { title: "Boolean Logic Basics", duration: "15 min", difficulty: "Beginner" },
                    { title: "Truth Tables", duration: "20 min", difficulty: "Intermediate" },
                    { title: "Logical Equivalences", duration: "25 min", difficulty: "Intermediate" },
                  ].map((lesson, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 rounded-md border border-border dark:border-[#3A1A6A] bg-accent-lighter/10 dark:bg-[#3A1A6A]/50"
                    >
                      <div className="w-6 h-6 rounded-full bg-ui-purple text-white flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-primary-dark dark:text-white">{lesson.title}</h5>
                        <div className="flex items-center gap-2 text-xs text-muted-DEFAULT dark:text-slate-400">
                          <span>{lesson.duration}</span>
                          <span>•</span>
                          <span>{lesson.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="bg-accent-lighter/50 dark:bg-[#2D1155]/30 p-4 rounded-lg border border-border dark:border-[#3A1A6A]">
                <h3 className="font-medium text-primary-dark dark:text-white mb-2">Next Steps:</h3>
                <ul className="space-y-2 text-sm text-primary-light dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-cool mt-0.5" />
                    <span>Complete a quick pre-assessment to gauge your current knowledge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-cool mt-0.5" />
                    <span>Start with your first recommended lesson</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-cool mt-0.5" />
                    <span>Track your progress and earn badges as you learn</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-accent-lighter dark:bg-primary">
      <GlobalHeader>
        <Button variant="ghost" size="sm" onClick={saveProgress} className="gap-1">
          <Save className="h-4 w-4" />
          <span className={isMobile ? "sr-only" : ""}>Save Progress</span>
        </Button>
      </GlobalHeader>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-DEFAULT dark:text-slate-400 mb-2">
              <span>
                Step {step} of {totalSteps}
              </span>
              <span>{progress}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="border border-border dark:border-[#3A1A6A]">
            <CardContent className="pt-6">
              <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-border dark:border-[#3A1A6A] pt-4">
              {step > 1 ? (
                <Button variant="outline" onClick={handlePreviousStep} className="border-border dark:border-[#3A1A6A]">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <Button variant="outline" asChild className="border-border dark:border-[#3A1A6A]">
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Cancel
                  </Link>
                </Button>
              )}

              {step < totalSteps ? (
                <Button
                  onClick={handleNextStep}
                  disabled={
                    (step === 1 && !userData.name) ||
                    (step === 3 && currentQuestionIndex < learningStyleQuestions.length - 1) ||
                    (step === 4 && userData.specific_goals.length === 0) ||
                    (step === 4 && !userData.career_path)
                  }
                  className="bg-ui-purple hover:bg-[#7A3BC8]"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleComplete} className="bg-ui-purple hover:bg-[#7A3BC8]">
                  Complete
                  <CheckCircle2 className="ml-2 h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>

          <div className="mt-4 flex justify-center">
            <div className="flex items-center gap-2 text-sm text-muted-DEFAULT dark:text-slate-400">
              <Share2 className="h-4 w-4" />
              <span>Share your learning journey</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

