"use client"
import { Trophy, Zap, Brain } from "lucide-react"
import { cn } from "@/lib/utils"

export function AchievementBadges() {
  // Mock achievement data
  const achievements = [
    {
      id: 1,
      name: "Fast Learner",
      description: "Complete 3 lessons in a single day",
      icon: Zap,
      unlocked: true,
      color: "text-accent-warm",
    },
    {
      id: 2,
      name: "Logic Master",
      description: "Score 100% on 5 quizzes",
      icon: Brain,
      unlocked: false,
      color: "text-accent-cool",
    },
    {
      id: 3,
      name: "Streak Champion",
      description: "Maintain a 7-day streak",
      icon: Trophy,
      unlocked: false,
      color: "text-ui-purple",
    },
  ]

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-primary-dark dark:text-white">Your Achievements</h4>
      <div className="flex flex-wrap gap-2">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="group relative"
            title={achievement.unlocked ? achievement.name : `Locked: ${achievement.description}`}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                achievement.unlocked
                  ? "bg-white dark:bg-[#3A1A6A] border border-border dark:border-[#4A2A7A]"
                  : "bg-muted-DEFAULT/20 dark:bg-muted-DEFAULT/10 border border-muted-DEFAULT/30",
              )}
            >
              <achievement.icon
                className={cn("h-5 w-5", achievement.unlocked ? achievement.color : "text-muted-DEFAULT/50")}
              />
            </div>

            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-40 bg-white dark:bg-[#3A1A6A] p-2 rounded shadow-lg border border-border dark:border-[#4A2A7A] text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-10">
              <p className="font-medium text-primary-dark dark:text-white">{achievement.name}</p>
              <p className="text-muted-DEFAULT dark:text-slate-400">{achievement.description}</p>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white dark:bg-[#3A1A6A] border-r border-b border-border dark:border-[#4A2A7A]"></div>
            </div>
          </div>
        ))}

        <div
          className="w-10 h-10 rounded-full flex items-center justify-center bg-accent-lighter/30 dark:bg-[#3A1A6A]/50 border border-dashed border-muted-DEFAULT cursor-pointer"
          title="More achievements to unlock"
        >
          <span className="text-muted-DEFAULT text-xs font-medium">+5</span>
        </div>
      </div>
    </div>
  )
}

