"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { HelpCircle, BookOpen, MessageSquare, Keyboard, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function HelpSupport() {
  const { toast } = useToast()
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would send this to your backend
    console.log("Contact form submitted:", contactForm)

    // Show success message
    toast({
      title: "Message Sent",
      description: "We've received your message and will respond soon.",
      duration: 5000,
    })

    // Reset form
    setContactForm({
      name: "",
      email: "",
      message: "",
    })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <HelpCircle className="h-5 w-5" />
          <span className="sr-only">Help & Support</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle>Help & Support</SheetTitle>
          <SheetDescription>Find answers to common questions or contact our support team.</SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="faq">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I track my progress?</AccordionTrigger>
                <AccordionContent>
                  Your progress is automatically tracked as you complete lessons and exercises. You can view your
                  overall progress on your dashboard, and individual lesson progress on the lessons page.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How do streaks work?</AccordionTrigger>
                <AccordionContent>
                  Streaks track your daily learning consistency. Complete at least one lesson or exercise each day to
                  maintain your streak. If you miss a day, your streak will reset, but don't worry - you can always
                  start building it again!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Can I change my theme?</AccordionTrigger>
                <AccordionContent>
                  Yes! Click on the theme switcher icon in the navigation bar to choose from 16 different themes. You
                  can select from our original themes or educational themes designed for different learning
                  environments.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                <AccordionContent>
                  If you've forgotten your password, click on the "Forgot password?" link on the login page. You'll
                  receive an email with instructions to reset your password.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Are there keyboard shortcuts?</AccordionTrigger>
                <AccordionContent>
                  Yes! We support several keyboard shortcuts to enhance your experience:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Alt+C: Toggle high contrast mode</li>
                    <li>Alt+T: Toggle between light and dark theme</li>
                    <li>Alt+S: Toggle text-to-speech</li>
                    <li>Alt++: Increase font size</li>
                    <li>Alt+-: Decrease font size</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="guides" className="space-y-4">
            <div className="grid gap-4">
              <div className="p-4 border border-border dark:border-[#3A1A6A] rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-ui-purple" />
                  <h3 className="font-medium text-primary-dark dark:text-white">Getting Started Guide</h3>
                </div>
                <p className="text-sm text-primary-light dark:text-slate-300 mb-2">
                  Learn the basics of navigating Pseuzy and start your learning journey.
                </p>
                <Button variant="outline" size="sm" className="w-full border-border dark:border-[#3A1A6A]">
                  Read Guide
                </Button>
              </div>

              <div className="p-4 border border-border dark:border-[#3A1A6A] rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Keyboard className="h-5 w-5 text-ui-purple" />
                  <h3 className="font-medium text-primary-dark dark:text-white">Keyboard Shortcuts</h3>
                </div>
                <p className="text-sm text-primary-light dark:text-slate-300 mb-2">
                  Master the keyboard shortcuts to navigate Pseuzy more efficiently.
                </p>
                <Button variant="outline" size="sm" className="w-full border-border dark:border-[#3A1A6A]">
                  View Shortcuts
                </Button>
              </div>

              <div className="p-4 border border-border dark:border-[#3A1A6A] rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5 text-ui-purple" />
                  <h3 className="font-medium text-primary-dark dark:text-white">Computational Logic Basics</h3>
                </div>
                <p className="text-sm text-primary-light dark:text-slate-300 mb-2">
                  An introduction to the fundamental concepts of computational logic.
                </p>
                <Button variant="outline" size="sm" className="w-full border-border dark:border-[#3A1A6A]">
                  Read Guide
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-primary-dark dark:text-white">
                  Name
                </label>
                <Input
                  id="name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="border-border dark:border-[#3A1A6A]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-primary-dark dark:text-white">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="border-border dark:border-[#3A1A6A]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-primary-dark dark:text-white">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="min-h-[120px] border-border dark:border-[#3A1A6A]"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-ui-purple hover:bg-[#7A3BC8]">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <SheetFooter className="mt-6 flex-col sm:flex-row gap-2">
          <SheetClose asChild>
            <Button variant="outline" className="border-border dark:border-[#3A1A6A]">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

