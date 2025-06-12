"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, SortAsc, SortDesc, Grid, List } from "lucide-react"
import CourseCard from "./course-card"
import { useLanguage } from "@/context/language-context"
import { motion } from "framer-motion"

// Mock course data
const mockCourses = [
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
  },
  {
    id: 2,
    title: "Advanced Recruitment Strategies",
    description: "Master the art of recruiting and building a strong team in your network marketing business.",
    level: "Intermediate",
    duration: "3 weeks",
    lessons: 10,
    instructor: "Sarah Johnson",
    rating: 4.9,
    enrolled: 987,
    image: "/placeholder.svg?height=200&width=400",
    category: "Recruitment",
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
  },
  {
    id: 4,
    title: "Leadership in Network Marketing",
    description: "Develop leadership skills to effectively manage and motivate your team.",
    level: "Advanced",
    duration: "6 weeks",
    lessons: 18,
    instructor: "Emily Davis",
    rating: 4.9,
    enrolled: 876,
    image: "/placeholder.svg?height=200&width=400",
    category: "Leadership",
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
  },
  {
    id: 6,
    title: "Social Media Mastery for MLM",
    description: "Harness the power of social media to expand your network and increase sales.",
    level: "Intermediate",
    duration: "3 weeks",
    lessons: 12,
    instructor: "Jessica Lee",
    rating: 4.6,
    enrolled: 1876,
    image: "/placeholder.svg?height=200&width=400",
    category: "Marketing",
  },
]

export default function CoursesList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { t } = useLanguage()

  // Filter and sort courses
  const filteredCourses = mockCourses
    .filter((course) => {
      if (filter === "all") return true
      return course.category.toLowerCase() === filter.toLowerCase()
    })
    .filter((course) => {
      if (!searchQuery) return true
      return (
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })
    .sort((a, b) => {
      if (sortBy === "popular") return b.enrolled - a.enrolled
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "newest") return b.id - a.id
      return 0
    })

  return (
    <div className="space-y-8">
      <motion.div
        className="bg-slate-800/30 rounded-xl p-4 sm:p-6 border border-slate-700/30"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder={t("searchCourses") || "Search courses..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="matwix-input h-11"
              prefix={<Search className="h-4 w-4 text-slate-500" />}
            />
          </div>
          <div className="flex gap-2 sm:gap-3">
            <Button
              variant="outline"
              className="border-slate-700 bg-slate-800/70 text-slate-300 h-11 flex-1 sm:flex-none"
              onClick={() => setFilter(filter === "all" ? "Business" : "all")}
            >
              <Filter className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">
                {filter === "all" ? t("allCategories") || "All Categories" : filter}
              </span>
            </Button>
            <Button
              variant="outline"
              className="border-slate-700 bg-slate-800/70 text-slate-300 h-11 flex-1 sm:flex-none"
              onClick={() => setSortBy(sortBy === "popular" ? "rating" : "popular")}
            >
              {sortBy === "popular" ? <SortDesc className="h-4 w-4 mr-2" /> : <SortAsc className="h-4 w-4 mr-2" />}
              <span className="hidden sm:inline">
                {sortBy === "popular" ? t("mostPopular") || "Most Popular" : t("highestRated") || "Highest Rated"}
              </span>
            </Button>
            <div className="hidden sm:flex border border-slate-700 rounded-md overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className={`h-11 w-11 rounded-none ${viewMode === "grid" ? "bg-slate-700" : "bg-slate-800/70"}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-11 w-11 rounded-none ${viewMode === "list" ? "bg-slate-700" : "bg-slate-800/70"}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {filteredCourses.length > 0 ? (
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" : "space-y-4"
          }
        >
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <motion.div
          className="text-center py-12 bg-slate-800/30 rounded-lg border border-slate-700/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <p className="text-slate-400">{t("noCoursesFound") || "No courses found"}</p>
          <p className="text-slate-500 mt-2">{t("tryDifferentFilters") || "Try adjusting your search or filters"}</p>
        </motion.div>
      )}
    </div>
  )
}
