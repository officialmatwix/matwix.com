"use client"

import { useParams } from "next/navigation"
import { FocusedAcademyLayout } from "@/components/academy/focused-academy-layout"
import CourseDetail from "@/components/academy/course-detail"

export default function CoursePage() {
  const params = useParams()
  const courseId = params?.id as string

  return (
    <FocusedAcademyLayout title="Course Details">
      <CourseDetail courseId={courseId} />
    </FocusedAcademyLayout>
  )
}
