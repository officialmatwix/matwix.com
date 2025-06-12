"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, Star, Users, ChevronRight, Play } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { motion } from "framer-motion"
import Link from "next/link"

interface CourseCardProps {
  course: {
    id: number
    title: string
    description: string
    level: string
    duration: string
    lessons: number
    instructor: string
    rating: number
    enrolled: number
    image: string
    category: string
  }
  progress?: number
}

export default function CourseCard({ course, progress }: CourseCardProps) {
  const { t } = useLanguage()

  // Get level color
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-500/10 text-green-500 border-green-500/30"
      case "intermediate":
        return "bg-blue-500/10 text-blue-500 border-blue-500/30"
      case "advanced":
        return "bg-purple-500/10 text-purple-500 border-purple-500/30"
      default:
        return "bg-slate-500/10 text-slate-500 border-slate-500/30"
    }
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 10 }}>
      <Card className="overflow-hidden bg-slate-900/50 border-slate-700/50 hover:border-purple-500/50 transition-colors group shadow-lg h-full flex flex-col">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={course.image || "/placeholder.svg?height=200&width=400"}
            alt={course.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <Badge className="absolute top-2 right-2 bg-slate-800/80 text-purple-400 border-purple-500/50">
            {course.category}
          </Badge>

          {progress !== undefined && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/80">
              <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500" style={{ width: `${progress}%` }} />
            </div>
          )}

          {progress === undefined && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60">
              <Button size="icon" className="rounded-full bg-purple-500 hover:bg-purple-600 text-white">
                <Play className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-lg text-slate-100 line-clamp-1">{course.title}</CardTitle>
          <CardDescription className="line-clamp-2 text-slate-400">{course.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2 flex-grow">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline" className={getLevelColor(course.level)}>
              {course.level}
            </Badge>
            <div className="flex items-center text-xs text-slate-400">
              <Clock className="h-3 w-3 mr-1" />
              {course.duration}
            </div>
            <div className="flex items-center text-xs text-slate-400">
              <BookOpen className="h-3 w-3 mr-1" />
              {course.lessons} {t("lessons") || "lessons"}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="font-medium text-slate-200">{course.rating}</span>
            </div>
            <div className="flex items-center text-xs text-slate-400">
              <Users className="h-3 w-3 mr-1" />
              {course.enrolled.toLocaleString()} {t("enrolled") || "enrolled"}
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2 pb-4 mt-auto">
          <Link href={`/dashboard/academy/course/${course.id}`} className="w-full">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
              {progress !== undefined
                ? progress === 100
                  ? "Completed"
                  : `Continue (${progress}%)`
                : t("enrollNow") || "Enroll Now"}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
