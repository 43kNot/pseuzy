"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Code, ArrowLeft, ArrowRight } from "lucide-react"

const steps = [
  { id: "personal", title: "Personal Information" },
  { id: "goals", title: "Learning Goals" },
  { id: "experience", title: "Experience Level" },
  { id: "schedule", title: "Learning Schedule" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    personal: {
      displayName: "",
      bio: "",
      publicProfile: true,
    },
    goals: {
      primaryGoal: "",
      targetLanguage: "",
      careerPath: "",
    },
    experience: {
      programmingExperience: "",
      logicalThinking: "",
      previousLanguages: [],
    },
    schedule: {
      weeklyHours: "",
      preferredTime: "",
      reminderFrequency: "",
    },
  })

  const updateFormData = (section: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit form data and redirect to assessment
      router.push("/assessment")
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progressPercentage = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="container max-w-screen-md py-10">
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Code className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Pseuzy</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Let&apos;s set up your learning journey</h1>
        <p className="text-muted-foreground text-center max-w-md">
          We&apos;ll use this information to personalize your learning experience and create a custom curriculum.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`text-sm ${index <= currentStep ? "text-primary font-medium" : "text-muted-foreground"}`}
            >
              {step.title}
            </div>
          ))}
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
          <CardDescription>
            {currentStep === 0 && "Tell us a bit about yourself"}
            {currentStep === 1 && "What do you want to achieve with Pseuzy?"}
            {currentStep === 2 && "Let us know your current experience level"}
            {currentStep === 3 && "When and how often do you want to learn?"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  placeholder="How you'll appear to other users"
                  value={formData.personal.displayName}
                  onChange={(e) => updateFormData("personal", "displayName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Short Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us a bit about yourself"
                  value={formData.personal.bio}
                  onChange={(e) => updateFormData("personal", "bio", e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="publicProfile"
                  checked={formData.personal.publicProfile}
                  onCheckedChange={(checked) => updateFormData("personal", "publicProfile", checked)}
                />
                <label
                  htmlFor="publicProfile"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Make my profile public to other learners
                </label>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primaryGoal">Primary Learning Goal</Label>
                <Select
                  onValueChange={(value) => updateFormData("goals", "primaryGoal", value)}
                  value={formData.goals.primaryGoal}
                >
                  <SelectTrigger id="primaryGoal">
                    <SelectValue placeholder="Select your main goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="career">Career in Programming</SelectItem>
                    <SelectItem value="skills">Improve Problem-Solving Skills</SelectItem>
                    <SelectItem value="hobby">Learn Programming as a Hobby</SelectItem>
                    <SelectItem value="academic">Academic Requirements</SelectItem>
                    <SelectItem value="specific">Work on Specific Projects</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetLanguage">Target Programming Language</Label>
                <Select
                  onValueChange={(value) => updateFormData("goals", "targetLanguage", value)}
                  value={formData.goals.targetLanguage}
                >
                  <SelectTrigger id="targetLanguage">
                    <SelectValue placeholder="Select your preferred language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="both">Both Python and JavaScript</SelectItem>
                    <SelectItem value="undecided">Undecided</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="careerPath">Career Interest (if applicable)</Label>
                <Select
                  onValueChange={(value) => updateFormData("goals", "careerPath", value)}
                  value={formData.goals.careerPath}
                >
                  <SelectTrigger id="careerPath">
                    <SelectValue placeholder="Select a career path" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="webdev">Web Development</SelectItem>
                    <SelectItem value="datascience">Data Science</SelectItem>
                    <SelectItem value="ai">Artificial Intelligence</SelectItem>
                    <SelectItem value="mobile">Mobile App Development</SelectItem>
                    <SelectItem value="game">Game Development</SelectItem>
                    <SelectItem value="other">Other/Not Sure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Programming Experience</Label>
                <RadioGroup
                  onValueChange={(value) => updateFormData("experience", "programmingExperience", value)}
                  value={formData.experience.programmingExperience}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="exp-none" />
                    <Label htmlFor="exp-none">No experience at all</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="basic" id="exp-basic" />
                    <Label htmlFor="exp-basic">Basic concepts only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="some" id="exp-some" />
                    <Label htmlFor="exp-some">Some programming experience</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="exp-moderate" />
                    <Label htmlFor="exp-moderate">Moderate experience</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="exp-advanced" />
                    <Label htmlFor="exp-advanced">Advanced programmer</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Logical Thinking Self-Assessment</Label>
                <RadioGroup
                  onValueChange={(value) => updateFormData("experience", "logicalThinking", value)}
                  value={formData.experience.logicalThinking}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="logic-beginner" />
                    <Label htmlFor="logic-beginner">Beginner - I find logical puzzles challenging</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="logic-intermediate" />
                    <Label htmlFor="logic-intermediate">Intermediate - I can solve most logical problems</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="logic-advanced" />
                    <Label htmlFor="logic-advanced">Advanced - I excel at logical thinking</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="weeklyHours">Hours per Week</Label>
                <Select
                  onValueChange={(value) => updateFormData("schedule", "weeklyHours", value)}
                  value={formData.schedule.weeklyHours}
                >
                  <SelectTrigger id="weeklyHours">
                    <SelectValue placeholder="Select hours per week" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3">1-3 hours</SelectItem>
                    <SelectItem value="4-6">4-6 hours</SelectItem>
                    <SelectItem value="7-10">7-10 hours</SelectItem>
                    <SelectItem value="10+">More than 10 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredTime">Preferred Learning Time</Label>
                <Select
                  onValueChange={(value) => updateFormData("schedule", "preferredTime", value)}
                  value={formData.schedule.preferredTime}
                >
                  <SelectTrigger id="preferredTime">
                    <SelectValue placeholder="Select preferred time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="afternoon">Afternoon</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                    <SelectItem value="night">Late Night</SelectItem>
                    <SelectItem value="weekend">Weekends Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reminderFrequency">Reminder Frequency</Label>
                <Select
                  onValueChange={(value) => updateFormData("schedule", "reminderFrequency", value)}
                  value={formData.schedule.reminderFrequency}
                >
                  <SelectTrigger id="reminderFrequency">
                    <SelectValue placeholder="Select reminder frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="every-other">Every Other Day</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="none">No Reminders</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? "Complete" : "Next"} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        Step {currentStep + 1} of {steps.length}
      </div>
    </div>
  )
}
