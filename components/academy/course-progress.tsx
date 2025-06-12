"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/context/language-context"
import { BarChart, Clock, BookOpen, Award, Calendar } from "lucide-react"

// Mock data for course progress
const progressData = {
  totalCourses: 3,
  completedCourses: 1,
  totalLessons: 41,
  completedLessons: 22,
  totalHours: 28,
  completedHours: 12,
  streakDays: 7,
  lastActivity: "2023-09-15T14:30:00Z",
  nextGoal: "Complete Digital Marketing for MLM",
  nextGoalDeadline: "2023-10-01T00:00:00Z",
  courseProgress: [
    {
      id: 1,
      title: "Quantum Network Marketing Fundamentals",
      progress: 65,
      lastActivity: "2023-09-15T14:30:00Z",
    },
    {
      id: 3,
      title: "Digital Marketing for MLM",
      progress: 30,
      lastActivity: "2023-09-10T09:15:00Z",
    },
    {
      id: 5,
      title: "Quantum Compensation Plans",
      progress: 100,
      lastActivity: "2023-08-28T16:45:00Z",
    },
  ],
}

export default function CourseProgress() {
  const { t, language } = useLanguage()

  // Format date to locale string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Calculate overall progress
  const overallProgress = Math.round((progressData.completedLessons / progressData.totalLessons) * 100)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Courses Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-slate-100">
                {progressData.completedCourses}/{progressData.totalCourses}
              </div>
              <BookOpen className="h-5 w-5 text-purple-500" />
            </div>
            <Progress
              value={(progressData.completedCourses / progressData.totalCourses) * 100}
              className="h-2 mt-2 bg-slate-700"
            >
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                style={{ width: `${(progressData.completedCourses / progressData.totalCourses) * 100}%` }}
              />
            </Progress>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Lessons Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-slate-100">
                {progressData.completedLessons}/{progressData.totalLessons}
              </div>
              <BarChart className="h-5 w-5 text-blue-500" />
            </div>
            <Progress
              value={(progressData.completedLessons / progressData.totalLessons) * 100}
              className="h-2 mt-2 bg-slate-700"
            >
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                style={{ width: `${(progressData.completedLessons / progressData.totalLessons) * 100}%` }}
              />
            </Progress>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Hours Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-slate-100">
                {progressData.completedHours}/{progressData.totalHours}
              </div>
              <Clock className="h-5 w-5 text-purple-500" />
            </div>
            <Progress
              value={(progressData.completedHours / progressData.totalHours) * 100}
              className="h-2 mt-2 bg-slate-700"
            >
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                style={{ width: `${(progressData.completedHours / progressData.totalHours) * 100}%` }}
              />
            </Progress>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Learning Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-slate-100">{progressData.streakDays} days</div>
              <Award className="h-5 w-5 text-amber-500" />
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-slate-400">Last activity: {formatDate(progressData.lastActivity)}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-lg text-slate-100">Course Progress Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progressData.courseProgress.map((course) => (
              <div key={course.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="font-medium text-slate-200">{course.title}</div>
                  <div className="text-sm text-slate-400">{course.progress}%</div>
                </div>
                <Progress value={course.progress} className="h-2 bg-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </Progress>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Last activity: {formatDate(course.lastActivity)}
                  </div>
                  <div>{course.progress === 100 ? "Completed" : "In Progress"}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border-purple-700/30">
        <CardHeader>
          <CardTitle className="text-lg text-slate-100">Next Learning Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 font-medium">{progressData.nextGoal}</p>
              <p className="text-sm text-slate-400 mt-1">
                Target completion: {formatDate(progressData.nextGoalDeadline)}
              </p>
            </div>
            <div className="text-2xl font-bold text-purple-400">{overallProgress}%</div>
          </div>
          <Progress value={overallProgress} className="h-2 mt-4 bg-slate-700">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
              style={{ width: `${overallProgress}%` }}
            />
          </Progress>
        </CardContent>
      </Card>
    </div>
  )
}
