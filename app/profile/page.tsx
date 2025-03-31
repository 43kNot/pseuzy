"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Settings,
  Bell,
  BookOpen,
  Award,
  Calendar,
  Loader2,
  CheckCircle2,
  Lock,
  LogOut,
  Laptop,
  Smartphone,
  Clock,
  Edit,
  Save,
  AlertTriangle,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth"
import { SessionTimeout } from "@/components/session-timeout"
import type { Session } from "@supabase/auth-helpers-nextjs"

interface UserSession {
  id: string;
  user_agent: string;
  current: boolean;
  created_at: string;
  expires_at: string;
}

export default function ProfilePage() {
  const { toast } = useToast()
  const auth = useAuth()
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [savingProfile, setSavingProfile] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [sessions, setSessions] = useState<UserSession[]>([])
  const [progress, setProgress] = useState<any[]>([])
  const [editMode, setEditMode] = useState(false)

  // Mock data for badges and streaks
  const badges = [
    { id: 1, name: "First Lesson", description: "Completed your first lesson", earned: true },
    { id: 2, name: "Quick Learner", description: "Completed 5 lessons", earned: true },
    { id: 3, name: "Logic Master", description: "Scored 100% on an assessment", earned: false },
    { id: 4, name: "Consistent", description: "Maintained a 7-day streak", earned: true },
    { id: 5, name: "Dedicated", description: "Maintained a 30-day streak", earned: false },
  ]

  const streak = {
    current: 3,
    longest: 7,
    lastActive: new Date().toISOString().split("T")[0],
  }

  useEffect(() => {
    async function loadUserData() {
      try {
        setLoading(true)

        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          return
        }

        setUser(user)

        // Get user profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (profileError) throw profileError

        setProfile(profileData)

        // Get user progress
        const { data: progressData, error: progressError } = await supabase
          .from("user_progress")
          .select("*")
          .eq("user_id", user.id)

        if (progressError) throw progressError

        setProgress(progressData || [])

        // Create a single session for the current browser
        const currentSession: UserSession = {
          id: user.id,
          user_agent: 'Current Browser',
          current: true,
          created_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
        }

        setSessions([currentSession])
      } catch (error) {
        console.error("Error loading user data:", error)
        toast({
          title: "Error",
          description: "Failed to load your profile data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [auth, supabase, toast])

  const handleSaveProfile = async () => {
    try {
      setSavingProfile(true)

      const { error } = await supabase
        .from("profiles")
        .update({
          name: profile.name,
          preferred_name: profile.preferred_name,
          notification_preferences: profile.notification_preferences,
        })
        .eq("id", user.id)

      if (error) throw error

      setEditMode(false)
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSavingProfile(false)
    }
  }

  const handleSignOut = () => {
    auth.signOut()
  }

  const calculateCompletionPercentage = () => {
    if (!progress || progress.length === 0) return 0

    const completedLessons = progress.filter((p) => p.completed).length
    return Math.round((completedLessons / progress.length) * 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-accent-lighter dark:bg-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-ui-purple" />
          <p className="text-primary-dark dark:text-white">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-accent-lighter dark:bg-primary">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-1/3">
              <Card className="border border-border dark:border-[#3A1A6A]">
                <CardHeader className="flex flex-col items-center">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profile?.avatar_url || ""} alt={profile?.name || "User"} />
                      <AvatarFallback className="text-2xl">
                        {profile?.name
                          ?.split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .toUpperCase() ||
                          user?.email?.charAt(0).toUpperCase() ||
                          "U"}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0 border border-border dark:border-[#3A1A6A]"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Change avatar</span>
                    </Button>
                  </div>
                  <CardTitle className="mt-4 text-xl text-primary-dark dark:text-white">
                    {profile?.name || "User"}
                  </CardTitle>
                  <CardDescription>{user?.email}</CardDescription>

                  <div className="mt-2 flex flex-wrap gap-2 justify-center">
                    <Badge variant="outline" className="bg-accent-lighter/50 dark:bg-[#2D1155]/30">
                      <Clock className="mr-1 h-3 w-3" />
                      {streak.current} day streak
                    </Badge>
                    <Badge variant="outline" className="bg-accent-lighter/50 dark:bg-[#2D1155]/30">
                      <Award className="mr-1 h-3 w-3" />
                      {badges.filter((b) => b.earned).length} badges
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-primary-dark dark:text-white">Overall Progress</span>
                        <span className="font-medium text-accent-cool">{calculateCompletionPercentage()}%</span>
                      </div>
                      <Progress value={calculateCompletionPercentage()} className="h-2" />
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start border-border dark:border-[#3A1A6A]"
                        onClick={() => setEditMode(!editMode)}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        {editMode ? "Cancel Editing" : "Edit Profile"}
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-border dark:border-[#3A1A6A]"
                        onClick={handleSignOut}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="w-full md:w-2/3">
              <Tabs defaultValue="progress">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                  <TabsTrigger value="badges">Badges</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="sessions">Sessions</TabsTrigger>
                </TabsList>

                <TabsContent value="progress">
                  <Card className="border border-border dark:border-[#3A1A6A]">
                    <CardHeader>
                      <CardTitle className="text-xl text-primary-dark dark:text-white">Learning Progress</CardTitle>
                      <CardDescription>Track your learning journey and achievements</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="h-5 w-5 text-ui-purple" />
                            <h3 className="font-medium text-primary-dark dark:text-white">Lessons Completed</h3>
                          </div>
                          <p className="text-3xl font-bold text-primary-dark dark:text-white">
                            {progress.filter((p) => p.completed).length}{" "}
                            <span className="text-sm text-muted-DEFAULT">/ {progress.length}</span>
                          </p>
                        </Card>

                        <Card className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="h-5 w-5 text-ui-purple" />
                            <h3 className="font-medium text-primary-dark dark:text-white">Current Streak</h3>
                          </div>
                          <p className="text-3xl font-bold text-primary-dark dark:text-white">
                            {streak.current} <span className="text-sm text-muted-DEFAULT">days</span>
                          </p>
                        </Card>

                        <Card className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="h-5 w-5 text-ui-purple" />
                            <h3 className="font-medium text-primary-dark dark:text-white">Badges Earned</h3>
                          </div>
                          <p className="text-3xl font-bold text-primary-dark dark:text-white">
                            {badges.filter((b) => b.earned).length}{" "}
                            <span className="text-sm text-muted-DEFAULT">/ {badges.length}</span>
                          </p>
                        </Card>
                      </div>

                      <Card className="p-4 mt-4">
                        <h3 className="font-medium text-primary-dark dark:text-white mb-4">Recent Activity</h3>

                        {progress.length > 0 ? (
                          <div className="space-y-4">
                            {progress.slice(0, 5).map((item) => (
                              <div key={item.id} className="flex items-center gap-3">
                                {item.completed ? (
                                  <CheckCircle2 className="h-5 w-5 text-accent-cool" />
                                ) : (
                                  <div className="h-5 w-5 rounded-full border-2 border-muted-DEFAULT" />
                                )}
                                <div>
                                  <p className="text-sm font-medium text-primary-dark dark:text-white">
                                    Lesson {item.lesson_id}
                                  </p>
                                  <p className="text-xs text-muted-DEFAULT">
                                    {item.completed ? "Completed" : `${item.progress}% complete`}
                                  </p>
                                </div>
                                <div className="ml-auto">
                                  <Progress value={item.progress} className="h-2 w-24" />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-DEFAULT">No progress recorded yet. Start learning!</p>
                        )}
                      </Card>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="badges">
                  <Card className="border border-border dark:border-[#3A1A6A]">
                    <CardHeader>
                      <CardTitle className="text-xl text-primary-dark dark:text-white">Achievement Badges</CardTitle>
                      <CardDescription>Collect badges as you progress through your learning journey</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {badges.map((badge) => (
                          <div
                            key={badge.id}
                            className={`p-4 rounded-lg border ${
                              badge.earned
                                ? "bg-white dark:bg-primary-light border-border dark:border-[#3A1A6A]"
                                : "bg-gray-100 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700"
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div
                                className={`p-2 rounded-full ${
                                  badge.earned
                                    ? "bg-accent-lighter/50 dark:bg-[#2D1155]/30"
                                    : "bg-gray-200 dark:bg-gray-700"
                                }`}
                              >
                                <Award
                                  className={`h-6 w-6 ${
                                    badge.earned ? "text-ui-purple" : "text-gray-400 dark:text-gray-500"
                                  }`}
                                />
                              </div>
                              <div>
                                <h3
                                  className={`font-medium ${
                                    badge.earned
                                      ? "text-primary-dark dark:text-white"
                                      : "text-gray-500 dark:text-gray-400"
                                  }`}
                                >
                                  {badge.name}
                                </h3>
                                <p className="text-xs text-muted-DEFAULT">{badge.description}</p>
                              </div>
                            </div>
                            <div className="mt-2 text-right">
                              <Badge
                                variant={badge.earned ? "default" : "outline"}
                                className={
                                  badge.earned
                                    ? "bg-accent-cool hover:bg-accent-cool/90"
                                    : "text-gray-400 dark:text-gray-500"
                                }
                              >
                                {badge.earned ? "Earned" : "Locked"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings">
                  <Card className="border border-border dark:border-[#3A1A6A]">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-xl text-primary-dark dark:text-white">Account Settings</CardTitle>
                          <CardDescription>Manage your account preferences and notifications</CardDescription>
                        </div>
                        {editMode && (
                          <Button
                            onClick={handleSaveProfile}
                            disabled={savingProfile}
                            className="bg-ui-purple hover:bg-[#7A3BC8]"
                          >
                            {savingProfile ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium text-primary-dark dark:text-white flex items-center gap-2">
                          <User className="h-5 w-5" />
                          Personal Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={profile?.name || ""}
                              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                              disabled={!editMode}
                              className="border-border dark:border-[#3A1A6A]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="preferred_name">Preferred Name</Label>
                            <Input
                              id="preferred_name"
                              value={profile?.preferred_name || ""}
                              onChange={(e) => setProfile({ ...profile, preferred_name: e.target.value })}
                              disabled={!editMode}
                              className="border-border dark:border-[#3A1A6A]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              value={user?.email || ""}
                              disabled
                              className="border-border dark:border-[#3A1A6A]"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="font-medium text-primary-dark dark:text-white flex items-center gap-2">
                          <Bell className="h-5 w-5" />
                          Notification Preferences
                        </h3>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="email_notifications">Email Notifications</Label>
                              <p className="text-sm text-muted-DEFAULT">
                                Receive lesson reminders and updates via email
                              </p>
                            </div>
                            <Switch
                              id="email_notifications"
                              checked={profile?.notification_preferences?.includes("email")}
                              onCheckedChange={(checked) => {
                                const newPrefs = profile?.notification_preferences || []
                                if (checked) {
                                  if (!newPrefs.includes("email")) {
                                    setProfile({ ...profile, notification_preferences: [...newPrefs, "email"] })
                                  }
                                } else {
                                  setProfile({
                                    ...profile,
                                    notification_preferences: newPrefs.filter((p: string) => p !== "email"),
                                  })
                                }
                              }}
                              disabled={!editMode}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="browser_notifications">Browser Notifications</Label>
                              <p className="text-sm text-muted-DEFAULT">Receive notifications in your browser</p>
                            </div>
                            <Switch
                              id="browser_notifications"
                              checked={profile?.notification_preferences?.includes("browser")}
                              onCheckedChange={(checked) => {
                                const newPrefs = profile?.notification_preferences || []
                                if (checked) {
                                  if (!newPrefs.includes("browser")) {
                                    setProfile({ ...profile, notification_preferences: [...newPrefs, "browser"] })
                                  }
                                } else {
                                  setProfile({
                                    ...profile,
                                    notification_preferences: newPrefs.filter((p: string) => p !== "browser"),
                                  })
                                }
                              }}
                              disabled={!editMode}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="learning_reminders">Learning Reminders</Label>
                              <p className="text-sm text-muted-DEFAULT">Receive daily reminders to continue learning</p>
                            </div>
                            <Switch
                              id="learning_reminders"
                              checked={profile?.notification_preferences?.includes("reminders")}
                              onCheckedChange={(checked) => {
                                const newPrefs = profile?.notification_preferences || []
                                if (checked) {
                                  if (!newPrefs.includes("reminders")) {
                                    setProfile({ ...profile, notification_preferences: [...newPrefs, "reminders"] })
                                  }
                                } else {
                                  setProfile({
                                    ...profile,
                                    notification_preferences: newPrefs.filter((p: string) => p !== "reminders"),
                                  })
                                }
                              }}
                              disabled={!editMode}
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="font-medium text-primary-dark dark:text-white flex items-center gap-2">
                          <Lock className="h-5 w-5" />
                          Security
                        </h3>

                        <Button variant="outline" className="border-border dark:border-[#3A1A6A]">
                          Change Password
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="sessions">
                  <Card className="border border-border dark:border-[#3A1A6A]">
                    <CardHeader>
                      <CardTitle className="text-xl text-primary-dark dark:text-white">Active Sessions</CardTitle>
                      <CardDescription>Manage your active sessions across devices</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {sessions.length > 0 ? (
                        <div className="space-y-4">
                          {(sessions as UserSession[]).map((session, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-4 bg-white dark:bg-primary-light rounded-lg border border-border dark:border-[#3A1A6A]"
                            >
                              {session.user_agent?.includes("Mobile") ? (
                                <Smartphone className="h-8 w-8 text-ui-purple" />
                              ) : (
                                <Laptop className="h-8 w-8 text-ui-purple" />
                              )}
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium text-primary-dark dark:text-white">
                                    {session.user_agent?.includes("Mobile") ? "Mobile Device" : "Desktop"}
                                  </h3>
                                  {session.current && (
                                    <Badge className="bg-green-500 hover:bg-green-600">Current</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-DEFAULT">
                                  Last active: {session.created_at ? new Date(session.created_at).toLocaleString() : 'Unknown'}
                                </p>
                                <p className="text-xs text-muted-DEFAULT mt-1">
                                  {session.user_agent?.split(" ").slice(0, 3).join(" ")}
                                </p>
                              </div>
                              {!session.current && (
                                <Button variant="outline" size="sm" className="border-border dark:border-[#3A1A6A]">
                                  Sign Out
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-6 text-center">
                          <AlertTriangle className="h-12 w-12 text-muted-DEFAULT mb-4" />
                          <h3 className="font-medium text-primary-dark dark:text-white mb-2">
                            No active sessions found
                          </h3>
                          <p className="text-sm text-muted-DEFAULT">
                            We couldn't retrieve your active sessions. This could be due to a temporary issue.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      {/* Session timeout component */}
      <SessionTimeout />
    </div>
  )
}

