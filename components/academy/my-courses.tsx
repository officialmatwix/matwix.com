"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/context/language-context"
import CourseCard from "./course-card"
import { BookOpen, Clock, CheckCircle } from "lucide-react"

// Mock data for enrolled courses
const enrolledCourses = [
  {
    id: 1,
    title: "Quantum Network Marketing Fundamentals",
    description:
      "Learn the basics of network marketing in the quantum era and how to build your business from scratch.",
    level: "Beginner",
    duration: "4 weeks",
    lessons: 12,
    instructor: "John Smith",
    rating: 4.8,
    enrolled: 1245,
    image: "/placeholder.svg?height=200&width=400",
    category: "Business",
    progress: 65,
  },
  {
    id: 3,
    title: "Digital Marketing for MLM",
    description: "Leverage digital marketing tools and strategies to grow your network marketing business online.",
    level: "Intermediate",
    duration: "5 weeks",
    lessons: 15,
    instructor: "Michael Brown",
    rating: 4.7,
    enrolled: 1532,
    image: "/placeholder.svg?height=200&width=400",
    category: "Marketing",
    progress: 30,
  },
  {
    id: 5,
    title: "Quantum Compensation Plans",
    description: "Understanding advanced compensation structures in modern network marketing.",
    level: "Advanced",
    duration: "4 weeks",
    lessons: 14,
    instructor: "David Wilson",
    rating: 4.8,
    enrolled: 654,
    image: "/placeholder.svg?height=200&width=400",
    category: "Business",
    progress: 100,
  },
]

export default function MyCourses() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState("all")

  // Filter courses based on progress
  const filteredCourses = enrolledCourses.filter((course) => {
    if (filter === "all") return true
    if (filter === "in-progress") return course.progress > 0 && course.progress < 100
    if (filter === "completed") return course.progress === 100
    if (filter === "not-started") return course.progress === 0
    return true
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
        <h2 className="text-xl font-semibold text-slate-100">{t("myCourses") || "My Courses"}</h2>

        <Tabs defaultValue="all" value={filter} onValueChange={setFilter} className="w-auto">
          <TabsList className="bg-slate-800/70 border border-slate-700/50">
            <TabsTrigger value="all" className="data-[state=active]:bg-slate-700 data-[state=active]:text-purple-400">
              <BookOpen className="h-4 w-4 mr-2" />
              All
            </TabsTrigger>
            <TabsTrigger
              value="in-progress"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-purple-400"
            >
              <Clock className="h-4 w-4 mr-2" />
              In Progress
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-purple-400"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Completed
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} progress={course.progress} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <p className="text-slate-400">{t("noCoursesFound") || "No courses found"}</p>
          <p className="text-slate-500 mt-2">{t("browseCoursesToEnroll") || "Browse courses to enroll"}</p>
        </div>
      )}
    </div>
  )
}
