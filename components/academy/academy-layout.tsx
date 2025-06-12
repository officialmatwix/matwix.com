"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/context/language-context"
import CoursesList from "./courses-list"
import MyCourses from "./my-courses"
import CourseProgress from "./course-progress"
import Certificates from "./certificates"

export default function AcademyLayout() {
  const [activeTab, setActiveTab] = useState("courses")
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{t("academy")}</h1>
      </div>

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardContent className="p-0">
          <Tabs defaultValue="courses" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full bg-slate-800/50 p-0 rounded-t-lg border-b border-slate-700/50">
              <TabsTrigger
                value="courses"
                className="flex-1 py-3 data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400 rounded-none"
              >
                {t("courses")}
              </TabsTrigger>
              <TabsTrigger
                value="myCourses"
                className="flex-1 py-3 data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400 rounded-none"
              >
                {t("myCourses")}
              </TabsTrigger>
              <TabsTrigger
                value="progress"
                className="flex-1 py-3 data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400 rounded-none"
              >
                {t("progress")}
              </TabsTrigger>
              <TabsTrigger
                value="certificates"
                className="flex-1 py-3 data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400 rounded-none"
              >
                {t("certificates")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="courses" className="p-4">
              <CoursesList />
            </TabsContent>
            <TabsContent value="myCourses" className="p-4">
              <MyCourses />
            </TabsContent>
            <TabsContent value="progress" className="p-4">
              <CourseProgress />
            </TabsContent>
            <TabsContent value="certificates" className="p-4">
              <Certificates />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
