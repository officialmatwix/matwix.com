"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, BookOpen, BadgeIcon as Certificate, GraduationCap, BarChart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/context/language-context"
import MyCourses from "./my-courses"
import CoursesList from "./courses-list"
import CourseProgress from "./course-progress"
import Certificates from "./certificates"

export default function AcademyFocusedView() {
  const router = useRouter()
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("courses")

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Header with back button and title */}
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard")}
            className="rounded-full bg-slate-800/50 hover:bg-slate-700/50 h-12 w-12 border border-slate-700/50"
          >
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                Quantum Academy
              </span>
            </h1>
            <p className="text-slate-400 mt-1">Expand your knowledge and skills with our curated courses</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 h-10 px-4">
            <BarChart className="mr-2 h-5 w-5" />
            Learning Stats
          </Button>
        </div>
      </div>

      {/* Main content with tabs */}
      <div className="bg-slate-900/30 backdrop-blur-sm rounded-xl border border-slate-800/50 shadow-xl overflow-hidden">
        <div className="p-6">
          <Tabs defaultValue="courses" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/70 border border-slate-700/50 rounded-lg p-1 mb-8">
              <TabsTrigger
                value="courses"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-purple-400 py-3"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Courses
              </TabsTrigger>
              <TabsTrigger
                value="my-courses"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-purple-400 py-3"
              >
                <GraduationCap className="mr-2 h-5 w-5" />
                My Learning
              </TabsTrigger>
              <TabsTrigger
                value="progress"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-purple-400 py-3"
              >
                <BarChart className="mr-2 h-5 w-5" />
                Progress
              </TabsTrigger>
              <TabsTrigger
                value="certificates"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-purple-400 py-3"
              >
                <Certificate className="mr-2 h-5 w-5" />
                Certificates
              </TabsTrigger>
            </TabsList>

            {/* Featured section for courses tab */}
            {activeTab === "courses" && (
              <div className="mb-8 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 rounded-xl p-6 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                  <h2 className="text-xl font-semibold text-slate-100">Featured Courses</h2>
                </div>
                <p className="text-slate-400 mb-4">
                  Discover our most popular courses designed to help you excel in your network marketing journey.
                </p>
              </div>
            )}

            <TabsContent value="courses" className="mt-0 space-y-8">
              <CoursesList />
            </TabsContent>
            <TabsContent value="my-courses" className="mt-0 space-y-8">
              <MyCourses />
            </TabsContent>
            <TabsContent value="progress" className="mt-0 space-y-8">
              <CourseProgress />
            </TabsContent>
            <TabsContent value="certificates" className="mt-0 space-y-8">
              <Certificates />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
