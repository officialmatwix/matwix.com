"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/context/language-context"
import CourseCard from "./course-card"

// Mock data for enrolled courses
const mockEnrolledCourses = [
  {
    id: "2",
    title: {
      en: "Advanced Recruitment Strategies",
      es: "Estrategias Avanzadas de Reclutamiento",
    },
    description: {
      en: "Master the art of recruiting and building a strong team in your network marketing business.",
      es: "Domina el arte de reclutar y construir un equipo sólido en tu negocio de marketing en red.",
    },
    instructor: "Sarah Johnson",
    duration: "8 hours",
    level: {
      en: "Intermediate",
      es: "Intermedio",
    },
    image: "/placeholder.svg?height=200&width=350",
    progress: 65,
  },
  {
    id: "4",
    title: {
      en: "Leadership in Network Marketing",
      es: "Liderazgo en Marketing en Red",
    },
    description: {
      en: "Develop leadership skills to effectively manage and grow your team.",
      es: "Desarrolla habilidades de liderazgo para gestionar y hacer crecer tu equipo de manera efectiva.",
    },
    instructor: "Emily Taylor",
    duration: "7 hours",
    level: {
      en: "Intermediate",
      es: "Intermedio",
    },
    image: "/placeholder.svg?height=200&width=350",
    progress: 30,
  },
]

export default function MyCourses() {
  const { language, t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCourses = mockEnrolledCourses.filter(
    (course) =>
      course.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description[language].toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder={`${t("search")} ${t("myCourses").toLowerCase()}...`}
          className="pl-10 bg-slate-800/50 border-slate-700/50 text-slate-100"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title[language]}
              description={course.description[language]}
              instructor={course.instructor}
              duration={course.duration}
              level={course.level[language]}
              image={course.image}
              progress={course.progress}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-400">{t("noCoursesFound")}</p>
        </div>
      )}
    </div>
  )
}

