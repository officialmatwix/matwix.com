"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/context/language-context"
import { Award, Clock, BookOpen, CheckCircle } from "lucide-react"

// Mock data for course progress
const mockCourseProgress = [
  {
    id: "2",
    title: {
      en: "Advanced Recruitment Strategies",
      es: "Estrategias Avanzadas de Reclutamiento",
    },
    progress: 65,
    completedModules: 5,
    totalModules: 8,
    lastAccessed: "2023-09-15T14:30:00Z",
    estimatedCompletion: "2023-10-05",
  },
  {
    id: "4",
    title: {
      en: "Leadership in Network Marketing",
      es: "Liderazgo en Marketing en Red",
    },
    progress: 30,
    completedModules: 2,
    totalModules: 7,
    lastAccessed: "2023-09-18T10:15:00Z",
    estimatedCompletion: "2023-10-20",
  },
]

export default function CourseProgress() {
  const { language, t } = useLanguage()

  // Format date to locale string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-100">{t("yourProgress")}</h2>

      {mockCourseProgress.map((course) => (
        <Card key={course.id} className="bg-slate-800/50 border-slate-700/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-slate-100">{course.title[language]}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">{t("progress")}</span>
                <span className="text-cyan-400">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2 bg-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </Progress>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-slate-300">
                  {course.completedModules} / {course.totalModules} {t("modulesCompleted")}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-slate-300">
                  {t("lastAccessed")}: {formatDate(course.lastAccessed)}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <BookOpen className="h-4 w-4 text-purple-500" />
                <span className="text-slate-300">
                  {t("estimatedCompletion")}: {course.estimatedCompletion}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <Award className="h-4 w-4 text-amber-500" />
                <span className="text-slate-300">
                  {t("certificateStatus")}: {course.progress === 100 ? t("available") : t("pending")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {mockCourseProgress.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">{t("noProgressData")}</p>
        </div>
      )}
    </div>
  )
}
