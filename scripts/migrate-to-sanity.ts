import { writeClient } from "../lib/sanity"
import { curriculum } from "../lib/curriculum-data"

async function migrateToSanity() {
  console.log("Starting migration to Sanity...")

  try {
    // First, create all levels
    console.log("Creating levels...")
    const levelIds = []
    for (const level of curriculum.levels) {
      console.log(`Creating level ${level.id}: ${level.title}`)

      // Create the level document
      const levelDoc = {
        _type: "level",
        id: level.id,
        title: level.title,
        description: level.description,
        overview: level.overview,
        objectives: level.objectives,
        prerequisites: level.prerequisites,
        // We'll update the modules references later
        modules: [],
      }

      const createdLevel = await writeClient.create(levelDoc)
      levelIds.push(createdLevel._id)
      console.log(`Created level with ID: ${createdLevel._id}`)
    }

    // Next, create all modules
    console.log("Creating modules...")
    const moduleMap = new Map() // To store module ID -> Sanity _id mapping

    for (const level of curriculum.levels) {
      for (const module of level.modules) {
        console.log(`Creating module ${module.id}: ${module.title}`)

        // Create the module document
        const moduleDoc = {
          _type: "module",
          id: module.id,
          title: module.title,
          description: module.description,
          lessons: module.lessons,
          isEnrichment: module.isEnrichment || false,
          isReview: module.isReview || false,
        }

        const createdModule = await writeClient.create(moduleDoc)
        moduleMap.set(module.id, createdModule._id)
        console.log(`Created module with ID: ${createdModule._id}`)
      }
    }

    // Update level documents with module references
    console.log("Updating level documents with module references...")
    for (const level of curriculum.levels) {
      const levelDoc = await writeClient.fetch(`*[_type == "level" && id == ${level.id}][0]`)

      if (levelDoc) {
        const moduleRefs = level.modules.map((module) => ({
          _type: "reference",
          _ref: moduleMap.get(module.id),
        }))

        await writeClient.patch(levelDoc._id).set({ modules: moduleRefs }).commit()

        console.log(`Updated level ${level.id} with module references`)
      }
    }

    // Finally, create all lessons
    console.log("Creating lessons...")
    for (const lessonId in curriculum.lessons) {
      const lesson = curriculum.lessons[lessonId]
      console.log(`Creating lesson ${lesson.id}: ${lesson.title}`)

      // Create a simple block for the content
      const simplePortableText = [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "This content was migrated from HTML. Please edit in Sanity Studio.",
            },
          ],
          markDefs: [],
          style: "normal",
        },
      ]

      // Create the lesson document
      const lessonDoc = {
        _type: "lesson",
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        level: lesson.level,
        moduleId: lesson.moduleId,
        // Store the original HTML content as a string field
        content: lesson.content || "",
        steps: lesson.steps || [],
        prerequisites: lesson.prerequisites || [],
        isEnrichment: lesson.isEnrichment || false,
        isReview: lesson.isReview || false,
      }

      const createdLesson = await writeClient.create(lessonDoc)
      console.log(`Created lesson with ID: ${createdLesson._id}`)
    }

    console.log("Migration completed successfully!")
  } catch (error) {
    console.error("Error during migration:", error)
  }
}

// Run the migration
migrateToSanity().catch(console.error)
