"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Award,
  ChevronRight,
  ChevronLeft,
  Star,
  Trophy,
  Zap,
  Users,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  type LucideIcon,
} from "lucide-react"
import { useMatwixCompensation } from "@/context/matwix-compensation-context"
import { formatCurrency } from "@/lib/utils"

// Achievement type definition
interface Achievement {
  id: string
  title: string
  description: string
  icon: LucideIcon
  progress: number
  reward: string
  category: "rank" | "sales" | "team" | "personal"
  completed: boolean
  unlockDate?: string
  nextMilestone?: {
    value: number
    unit: string
  }
}

export default function AchievementRoadmap() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
  const [visibleAchievements, setVisibleAchievements] = useState<Achievement[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const achievementsPerPage = 3
  const roadmapRef = useRef<HTMLDivElement>(null)

  const { stats, getRankName, getRankColor, getRankById } = useMatwixCompensation()

  // Load achievements data
  useEffect(() => {
    // This would normally come from an API
    const loadAchievements = () => {
      const mockAchievements: Achievement[] = [
        {
          id: "ach-001",
          title: "Visionary",
          description: "Join the Matwix network and start your journey",
          icon: Star,
          progress: 100,
          reward: "Welcome Kit",
          category: "rank",
          completed: true,
          unlockDate: "Jan 15, 2023",
        },
        {
          id: "ach-002",
          title: "Pioneer",
          description: "Achieve $5,000 in group volume",
          icon: Award,
          progress: 100,
          reward: formatCurrency(100),
          category: "rank",
          completed: true,
          unlockDate: "Feb 10, 2023",
        },
        {
          id: "ach-003",
          title: "Navigator",
          description: "Achieve $15,000 in group volume with 2 Pioneer ranks",
          icon: Award,
          progress: 100,
          reward: formatCurrency(250),
          category: "rank",
          completed: true,
          unlockDate: "Mar 5, 2023",
        },
        {
          id: "ach-004",
          title: "Specialist",
          description: "Achieve $100,000 in group volume with 2 Navigator ranks",
          icon: Award,
          progress: 100,
          reward: formatCurrency(500),
          category: "rank",
          completed: true,
          unlockDate: "Apr 20, 2023",
        },
        {
          id: "ach-005",
          title: "Mentor",
          description: "Achieve $400,000 in group volume with 2 Specialist ranks",
          icon: Award,
          progress: 65,
          reward: formatCurrency(1000),
          category: "rank",
          completed: false,
          nextMilestone: {
            value: 400000,
            unit: "GV",
          },
        },
        {
          id: "ach-006",
          title: "Innovator",
          description: "Achieve $1,300,000 in group volume with 2 Mentor ranks",
          icon: Award,
          progress: 25,
          reward: formatCurrency(2500),
          category: "rank",
          completed: false,
          nextMilestone: {
            value: 1300000,
            unit: "GV",
          },
        },
        {
          id: "ach-007",
          title: "First Team of 10",
          description: "Recruit and maintain 10 active team members",
          icon: Users,
          progress: 80,
          reward: "Team Leader Badge",
          category: "team",
          completed: false,
          nextMilestone: {
            value: 10,
            unit: "members",
          },
        },
        {
          id: "ach-008",
          title: "Sales Champion",
          description: "Generate $10,000 in personal sales volume",
          icon: DollarSign,
          progress: 75,
          reward: "Sales Champion Badge + Bonus",
          category: "sales",
          completed: false,
          nextMilestone: {
            value: 10000,
            unit: "PV",
          },
        },
        {
          id: "ach-009",
          title: "Perfect Balance",
          description: "Achieve perfect balance between left and right legs",
          icon: Zap,
          progress: 60,
          reward: formatCurrency(150) + " Bonus",
          category: "team",
          completed: false,
          nextMilestone: {
            value: 100,
            unit: "% balance",
          },
        },
        {
          id: "ach-010",
          title: "90-Day Streak",
          description: "Maintain activity for 90 consecutive days",
          icon: Calendar,
          progress: 85,
          reward: "Activity Champion Badge",
          category: "personal",
          completed: false,
          nextMilestone: {
            value: 90,
            unit: "days",
          },
        },
        {
          id: "ach-011",
          title: "Recruitment Master",
          description: "Personally recruit 20 new members",
          icon: Users,
          progress: 45,
          reward: formatCurrency(300) + " Bonus",
          category: "team",
          completed: false,
          nextMilestone: {
            value: 20,
            unit: "recruits",
          },
        },
        {
          id: "ach-012",
          title: "Volume Builder",
          description: "Generate $50,000 in group volume in a single month",
          icon: Trophy,
          progress: 70,
          reward: formatCurrency(500) + " Bonus",
          category: "sales",
          completed: false,
          nextMilestone: {
            value: 50000,
            unit: "GV",
          },
        },
      ]

      setAchievements(mockAchievements)
      setSelectedAchievement(mockAchievements[4]) // Select the in-progress rank
      setIsLoading(false)
    }

    setTimeout(loadAchievements, 1000)
  }, [])

  // Update visible achievements when page or category changes
  useEffect(() => {
    if (achievements.length === 0) return

    const filtered = activeCategory === "all" ? achievements : achievements.filter((a) => a.category === activeCategory)

    const startIndex = currentPage * achievementsPerPage
    const endIndex = startIndex + achievementsPerPage

    setVisibleAchievements(filtered.slice(startIndex, endIndex))
  }, [achievements, currentPage, activeCategory])

  // Handle page navigation
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const handleNextPage = () => {
    const filtered = activeCategory === "all" ? achievements : achievements.filter((a) => a.category === activeCategory)

    const maxPage = Math.ceil(filtered.length / achievementsPerPage) - 1

    if (currentPage < maxPage) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "rank":
        return "text-purple-500 bg-purple-500/10 border-purple-500/30"
      case "sales":
        return "text-green-500 bg-green-500/10 border-green-500/30"
      case "team":
        return "text-blue-500 bg-blue-500/10 border-blue-500/30"
      case "personal":
        return "text-amber-500 bg-amber-500/10 border-amber-500/30"
      default:
        return "text-slate-500 bg-slate-500/10 border-slate-500/30"
    }
  }

  // Get progress color
  const getProgressColor = (progress: number) => {
    if (progress >= 100) return "from-green-500 to-emerald-500"
    if (progress >= 75) return "from-cyan-500 to-blue-500"
    if (progress >= 50) return "from-blue-500 to-purple-500"
    if (progress >= 25) return "from-purple-500 to-pink-500"
    return "from-pink-500 to-rose-500"
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="border-b border-slate-700/50 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-100 flex items-center text-base sm:text-lg">
            <Trophy className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
            Achievement Roadmap
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-slate-800/50 text-amber-400 border-amber-500/50 text-xs">
              <Star className="h-3 w-3 mr-1 text-amber-400" />
              {achievements.filter((a) => a.completed).length}/{achievements.length} COMPLETED
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 rounded-full border-2 border-t-transparent border-amber-500 animate-spin mb-4"></div>
              <p className="text-slate-300">Loading achievements...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Achievement categories */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className={`text-xs ${activeCategory === "all" ? "bg-slate-800 text-amber-400" : "bg-slate-800/50"}`}
                onClick={() => {
                  setActiveCategory("all")
                  setCurrentPage(0)
                }}
              >
                All
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`text-xs ${activeCategory === "rank" ? "bg-slate-800 text-purple-400" : "bg-slate-800/50"}`}
                onClick={() => {
                  setActiveCategory("rank")
                  setCurrentPage(0)
                }}
              >
                <Award className="h-3 w-3 mr-1" />
                Ranks
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`text-xs ${activeCategory === "team" ? "bg-slate-800 text-blue-400" : "bg-slate-800/50"}`}
                onClick={() => {
                  setActiveCategory("team")
                  setCurrentPage(0)
                }}
              >
                <Users className="h-3 w-3 mr-1" />
                Team
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`text-xs ${activeCategory === "sales" ? "bg-slate-800 text-green-400" : "bg-slate-800/50"}`}
                onClick={() => {
                  setActiveCategory("sales")
                  setCurrentPage(0)
                }}
              >
                <DollarSign className="h-3 w-3 mr-1" />
                Sales
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`text-xs ${activeCategory === "personal" ? "bg-slate-800 text-amber-400" : "bg-slate-800/50"}`}
                onClick={() => {
                  setActiveCategory("personal")
                  setCurrentPage(0)
                }}
              >
                <Star className="h-3 w-3 mr-1" />
                Personal
              </Button>
            </div>

            {/* Achievement roadmap */}
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-700 -translate-y-1/2 z-0"></div>

              <div className="flex justify-between items-center relative z-10">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-slate-800 border-slate-700"
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div ref={roadmapRef} className="flex-1 flex justify-between items-center px-4 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage}
                      className="flex justify-between items-center w-full"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      {visibleAchievements.map((achievement, index) => (
                        <div
                          key={achievement.id}
                          className="flex flex-col items-center cursor-pointer"
                          onClick={() => setSelectedAchievement(achievement)}
                        >
                          <div
                            className={`h-12 w-12 rounded-full flex items-center justify-center mb-2 relative ${
                              selectedAchievement?.id === achievement.id
                                ? "ring-2 ring-amber-500 ring-offset-2 ring-offset-slate-900"
                                : ""
                            }`}
                            style={{
                              background: `linear-gradient(to bottom right, ${
                                achievement.completed ? "#10b981, #059669" : "#8b5cf6, #6366f1"
                              })`,
                            }}
                          >
                            <achievement.icon className="h-6 w-6 text-white" />
                            {achievement.completed && (
                              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                                <CheckCircle className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="text-xs font-medium text-slate-300 text-center max-w-[80px] truncate">
                            {achievement.title}
                          </div>
                          <div className="text-xs text-slate-500">
                            {achievement.completed ? "Completed" : `${achievement.progress}%`}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-slate-800 border-slate-700"
                  onClick={handleNextPage}
                  disabled={
                    currentPage >=
                    Math.ceil(
                      (activeCategory === "all"
                        ? achievements.length
                        : achievements.filter((a) => a.category === activeCategory).length) / achievementsPerPage,
                    ) -
                      1
                  }
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Selected achievement details */}
            {selectedAchievement && (
              <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                <div className="flex items-start">
                  <div
                    className="h-14 w-14 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                    style={{
                      background: `linear-gradient(to bottom right, ${
                        selectedAchievement.completed ? "#10b981, #059669" : "#8b5cf6, #6366f1"
                      })`,
                    }}
                  >
                    <selectedAchievement.icon className="h-7 w-7 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-slate-100">{selectedAchievement.title}</h3>
                      <Badge variant="outline" className={`${getCategoryColor(selectedAchievement.category)}`}>
                        {selectedAchievement.category}
                      </Badge>
                    </div>

                    <p className="text-sm text-slate-300 mt-1">{selectedAchievement.description}</p>

                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-sm text-slate-400">Progress</div>
                        <div className="text-sm text-slate-400">{selectedAchievement.progress}%</div>
                      </div>
                      <Progress value={selectedAchievement.progress} className="h-2 bg-slate-700">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${getProgressColor(selectedAchievement.progress)}`}
                          style={{ width: `${selectedAchievement.progress}%` }}
                        />
                      </Progress>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <div className="text-xs text-slate-500">Reward</div>
                        <div className="text-sm text-amber-400 font-medium">{selectedAchievement.reward}</div>
                      </div>

                      {selectedAchievement.completed ? (
                        <div>
                          <div className="text-xs text-slate-500">Completed On</div>
                          <div className="text-sm text-green-400">{selectedAchievement.unlockDate}</div>
                        </div>
                      ) : selectedAchievement.nextMilestone ? (
                        <div>
                          <div className="text-xs text-slate-500">Next Milestone</div>
                          <div className="text-sm text-slate-300">
                            {selectedAchievement.nextMilestone.value.toLocaleString()}{" "}
                            {selectedAchievement.nextMilestone.unit}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-700/30 flex justify-between items-center">
                      {selectedAchievement.completed ? (
                        <div className="flex items-center text-green-400 text-sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Achievement Completed
                        </div>
                      ) : (
                        <div className="flex items-center text-slate-400 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          In Progress
                        </div>
                      )}

                      <Button variant="outline" size="sm" className="text-xs">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Achievement stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
                <div className="text-xs text-slate-500 mb-1">Completed</div>
                <div className="text-xl font-bold text-amber-400">{achievements.filter((a) => a.completed).length}</div>
                <div className="text-xs text-slate-400 mt-1">out of {achievements.length} achievements</div>
              </div>

              <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
                <div className="text-xs text-slate-500 mb-1">In Progress</div>
                <div className="text-xl font-bold text-cyan-400">
                  {achievements.filter((a) => !a.completed && a.progress > 0).length}
                </div>
                <div className="text-xs text-slate-400 mt-1">achievements being worked on</div>
              </div>

              <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
                <div className="text-xs text-slate-500 mb-1">Next Milestone</div>
                <div className="text-xl font-bold text-purple-400">Mentor</div>
                <div className="text-xs text-slate-400 mt-1">65% progress to next rank</div>
              </div>

              <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
                <div className="text-xs text-slate-500 mb-1">Rewards Earned</div>
                <div className="text-xl font-bold text-green-400">{formatCurrency(850)}</div>
                <div className="text-xs text-slate-400 mt-1">in achievement bonuses</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
