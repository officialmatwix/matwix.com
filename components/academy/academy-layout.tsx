"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/context/language-context"
import CoursesList from "./courses-list"
import MyCourses from "./my-courses"
import CourseProgress from "./course-progress"
import Certificates from "./certificates"
import { BookOpen, BarChart2, Award, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"

export default function AcademyLayout() {
  const [activeTab, setActiveTab] = useState("courses")
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold tracking-tight flex items-center">
          <GraduationCap className="mr-2 h-6 w-6 text-purple-500" />
          {t("academy")}
        </h1>
      </motion.div>

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <Tabs defaultValue="courses" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full rounded-none border-b border-slate-700/50 bg-slate-900/80 p-0 overflow-x-auto hide-scrollbar">
              <TabsTrigger
                value="courses"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:bg-transparent data-[state=active]:text-purple-400 flex-1 py-3"
              >
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span className="hidden xs:inline">{t("courses")}</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="myCourses"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:bg-transparent data-[state=active]:text-purple-400 flex-1 py-3"
              >
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span className="hidden xs:inline">{t("myCourses")}</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="progress"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:bg-transparent data-[state=active]:text-purple-400 flex-1 py-3"
              >
                <div className="flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  <span className="hidden xs:inline">{t("progress")}</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="certificates"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:bg-transparent data-[state=active]:text-purple-400 flex-1 py-3"
              >
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  <span className="hidden xs:inline">{t("certificates")}</span>
                </div>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="courses" className="p-4 sm:p-6">
              <CoursesList />
            </TabsContent>
            <TabsContent value="myCourses" className="p-4 sm:p-6">
              <MyCourses />
            </TabsContent>
            <TabsContent value="progress" className="p-4 sm:p-6">
              <CourseProgress />
            </TabsContent>
            <TabsContent value="certificates" className="p-4 sm:p-6">
              <Certificates />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
