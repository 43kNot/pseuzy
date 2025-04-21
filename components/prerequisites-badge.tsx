import { AlertCircle, CheckCircle, Info } from "lucide-react"
import { Badge, type BadgeProps } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type PrerequisiteStatus = "completed" | "in-progress" | "locked"

interface PrerequisitesBadgeProps {
  status: PrerequisiteStatus
  prerequisites: string[]
  variant?: BadgeProps["variant"]
}

export function PrerequisitesBadge({ status, prerequisites, variant = "outline" }: PrerequisitesBadgeProps) {
  let icon = <Info className="h-3 w-3" />
  let label = "Prerequisites"
  let bgColor = ""

  switch (status) {
    case "completed":
      icon = <CheckCircle className="h-3 w-3 text-green-500" />
      label = "Prerequisites Met"
      bgColor =
        "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/40"
      break
    case "in-progress":
      icon = <Info className="h-3 w-3 text-blue-500" />
      label = "Prerequisites"
      bgColor =
        "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40"
      break
    case "locked":
      icon = <AlertCircle className="h-3 w-3 text-red-500" />
      label = "Prerequisites Required"
      bgColor = "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40"
      break
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant={variant} className={`${bgColor} gap-1`}>
            {icon}
            {label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-2 p-1 max-w-xs">
            <p className="font-medium">Required prerequisites:</p>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              {prerequisites.map((prereq, index) => (
                <li key={index}>{prereq}</li>
              ))}
            </ul>
            {status === "locked" && (
              <p className="text-xs text-muted-foreground">
                You need to complete these prerequisites before continuing.
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
