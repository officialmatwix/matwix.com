"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/context/language-context"
import CourseCard from "./course-card"

// Mock data for courses
const mockCourses = [
  {
    id: "1",
    title: {
      en: "Network Marketing Fundamentals",
      es: "Fundamentos de Marketing en Red",
    },
    description: {
      en: "Learn the basics of network marketing and how to build your business from scratch.",
      es: "Aprende los conceptos básicos del marketing en red y cómo construir tu negocio desde cero.",
    },
    instructor: "John Smith",
    duration: "6 hours",
    level: {
      en: "Beginner",
      es: "Principiante",
    },
    image: "/placeholder.svg?height=200&width=350",
    progress: 0,
  },
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
    progress: 0,
  },
  {
    id: "3",
    title: {
      en: "Digital Marketing for MLM",
      es: "Marketing Digital para MLM",
    },
    description: {
      en: "Learn how to leverage digital marketing tools to grow your network marketing business.",
      es: "Aprende a utilizar herramientas de marketing digital para hacer crecer tu negocio de marketing en red.",
    },
    instructor: "Michael Chen",
    duration: "10 hours",
    level: {
      en: "Advanced",
      es: "Avanzado",
    },
    image: "/placeholder.svg?height=200&width=350",
    progress: 0,
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
    progress: 0,
  },
]

export default function CoursesList() {
  const { language, t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCourses = mockCourses.filter(
    (course) =>
      course.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description[language].toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder={`${t("search")} ${t("courses").toLowerCase()}...`}
          className="pl-10 bg-slate-800/50 border-slate-700/50 text-slate-100"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

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
    </div>
  )
}

