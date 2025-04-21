import { getLessonWithFallback } from "@/lib/sanity-utils"
import { LessonViewer } from "@/components/lesson-viewer"

export default async function LessonPage({ params }: { params: { id: string } }) {
  const lessonId = Number.parseInt(params.id, 10)
  const lesson = await getLessonWithFallback(lessonId)

  return <LessonViewer lessonId={lessonId} lessonData={lesson} />
}
