"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, BookOpen } from "lucide-react"
import { useLanguage } from "@/context/language-context"

interface CourseCardProps {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  level: string
  image: string
  progress: number
}

export default function CourseCard({
  id,
  title,
  description,
  instructor,
  duration,
  level,
  image,
  progress,
}: CourseCardProps) {
  const { t } = useLanguage()

  return (
    <Card className="overflow-hidden bg-slate-800/50 border-slate-700/50 hover:border-cyan-500/50 transition-colors">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-slate-100">{title}</CardTitle>
        <div className="text-sm text-slate-400">{instructor}</div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-slate-300 line-clamp-2 mb-3">{description}</p>
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {duration}
          </div>
          <div className="flex items-center">
            <BookOpen className="h-3 w-3 mr-1" />
            {level}
          </div>
        </div>
        {progress > 0 && (
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">{t("progress")}</span>
              <span className="text-cyan-400">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5 bg-slate-700">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </Progress>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
          {progress > 0 ? t("continue") : t("enroll")}
        </Button>
      </CardFooter>
    </Card>
  )
}
