import { readClient } from "./sanity"

// Types for our Sanity data
export type SanityLesson = {
  _id: string
  _type: "lesson"
  id: number
  title: string
  description: string
  level: number
  moduleId: string
  content?: any // Can be string or Portable Text
  steps?: {
    id: number
    type: string
    title: string
    content: any // Can be string or Portable Text
    interaction?: {
      type: string
      prompt: string
      expectedElements?: string[]
      correctOrder?: number[]
      feedback: {
        success: string
        partial: string
        failure: string
      }
    }
    questions?: {
      id: number
      question: string
      options: string[]
      correctAnswer: number
      explanation: string
    }[]
  }[]
  prerequisites?: number[]
  isEnrichment?: boolean
  isReview?: boolean
}

export type SanityModule = {
  _id: string
  _type: "module"
  id: string
  title: string
  description: string
  lessons: number[]
  isEnrichment?: boolean
  isReview?: boolean
}

export type SanityLevel = {
  _id: string
  _type: "level"
  id: number
  title: string
  description: string
  overview: string
  objectives: string[]
  prerequisites: string[]
  modules: string[] // References to module IDs
}

// Fetch a single lesson by ID
export async function getLessonById(id: number): Promise<SanityLesson | null> {
  try {
    const query = `*[_type == "lesson" && id == $id][0]`
    return await readClient.fetch(query, { id })
  } catch (error) {
    console.error("Error fetching lesson:", error)
    return null
  }
}

// Fetch all lessons
export async function getAllLessons(): Promise<SanityLesson[]> {
  try {
    const query = `*[_type == "lesson"] | order(id asc)`
    return await readClient.fetch(query)
  } catch (error) {
    console.error("Error fetching all lessons:", error)
    return []
  }
}

// Fetch a single level by ID
export async function getLevelById(id: number): Promise<SanityLevel | null> {
  try {
    const query = `*[_type == "level" && id == $id][0]`
    return await readClient.fetch(query)
  } catch (error) {
    console.error("Error fetching level:", error)
    return null
  }
}

// Fetch all levels
export async function getAllLevels(): Promise<SanityLevel[]> {
  try {
    const query = `*[_type == "level"] | order(id asc)`
    return await readClient.fetch(query)
  } catch (error) {
    console.error("Error fetching all levels:", error)
    return []
  }
}

// Fetch modules for a level
export async function getModulesByLevel(levelId: number): Promise<SanityModule[]> {
  try {
    const level = await getLevelById(levelId)
    if (!level) return []

    const query = `*[_type == "module" && _id in $moduleIds] | order(id asc)`
    return await readClient.fetch(query, { moduleIds: level.modules })
  } catch (error) {
    console.error("Error fetching modules for level:", error)
    return []
  }
}

// Fetch lessons for a module
export async function getLessonsForModule(moduleId: string): Promise<SanityLesson[]> {
  try {
    const query = `*[_type == "module" && id == $moduleId][0]`
    const module = await readClient.fetch(query, { moduleId })
    if (!module) return []

    const lessonQuery = `*[_type == "lesson" && id in $lessonIds] | order(id asc)`
    return await readClient.fetch(lessonQuery, { lessonIds: module.lessons })
  } catch (error) {
    console.error("Error fetching lessons for module:", error)
    return []
  }
}

// Fetch the complete curriculum structure
export async function getCurriculum() {
  try {
    const levels = await getAllLevels()
    const allLessons = await getAllLessons()

    // Create a map of lessons by ID for easy lookup
    const lessonsMap: Record<number, SanityLesson> = {}
    allLessons.forEach((lesson) => {
      lessonsMap[lesson.id] = lesson
    })

    // For each level, fetch its modules
    const levelsWithModules = await Promise.all(
      levels.map(async (level) => {
        const modules = await getModulesByLevel(level.id)
        return {
          ...level,
          modules,
        }
      }),
    )

    return {
      levels: levelsWithModules,
      lessons: lessonsMap,
    }
  } catch (error) {
    console.error("Error fetching curriculum:", error)
    return {
      levels: [],
      lessons: {},
    }
  }
}

// Fallback to local data if Sanity fetch fails
export async function getLessonWithFallback(id: number) {
  try {
    // First try to get from Sanity
    const sanityLesson = await getLessonById(id)
    if (sanityLesson) return sanityLesson

    // If not found in Sanity, fall back to local data
    // Import dynamically to avoid circular dependencies
    const { getLessonById: getLocalLessonById } = await import("./curriculum-data")
    return getLocalLessonById(id)
  } catch (error) {
    console.error("Error in getLessonWithFallback:", error)

    // Fall back to local data
    const { getLessonById: getLocalLessonById } = await import("./curriculum-data")
    return getLocalLessonById(id)
  }
}
