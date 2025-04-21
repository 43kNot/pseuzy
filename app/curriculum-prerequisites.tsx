export type ModulePrerequisite = {
  id: string | number
  title: string
  completed: boolean
}

export type Module = {
  id: number
  title: string
  description: string
  completed: boolean
  prerequisites: ModulePrerequisite[]
  optional?: boolean
  isReview?: boolean
  isEnrichment?: boolean
}

export function getPrerequisiteStatus(module: Module): "completed" | "in-progress" | "locked" {
  // If no prerequisites, it's always available
  if (!module.prerequisites || module.prerequisites.length === 0) {
    return "completed"
  }

  // Check if all prerequisites are completed
  const allCompleted = module.prerequisites.every((prereq) => prereq.completed)
  if (allCompleted) {
    return "completed"
  }

  // If some prerequisites are completed, it's in progress
  const someCompleted = module.prerequisites.some((prereq) => prereq.completed)
  if (someCompleted) {
    return "in-progress"
  }

  // Otherwise it's locked
  return "locked"
}

export function getModuleStatusText(module: Module): string {
  if (module.isReview) return "Review"
  if (module.isEnrichment) return "Enrichment"
  if (module.optional) return "Optional"

  const prereqStatus = getPrerequisiteStatus(module)

  switch (prereqStatus) {
    case "completed":
      return module.completed ? "Completed" : "Available"
    case "in-progress":
      return "Prerequisites Partially Met"
    case "locked":
      return "Locked"
    default:
      return "Unknown"
  }
}
