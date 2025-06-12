"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  TrendingUp,
  Users,
  Target,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  Sparkles,
  RefreshCw,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Award,
  Search,
  Filter,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  X,
  Clock,
  Calendar,
} from "lucide-react"
import { useMatwixCompensation } from "@/context/matwix-compensation-context"
import { formatCurrency } from "@/lib/utils"

// Insight type definition
interface Insight {
  id: string
  type: "opportunity" | "alert" | "prediction"
  title: string
  description: string
  impact: "high" | "medium" | "low"
  category: "recruitment" | "retention" | "sales" | "rank" | "team"
  action?: string
  metric?: {
    current: number
    target: number
    unit: string
  }
  trend?: {
    value: number
    direction: "up" | "down" | "stable"
  }
  timeframe?: string
}

// Prediction type definition
interface Prediction {
  month: string
  sales: number
  team: number
  rank: string
  earnings: number
  probability: number
}

export default function EnhancedAIInsights() {
  const [isLoading, setIsLoading] = useState(true)
  const [insights, setInsights] = useState<Insight[]>([])
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null)
  const [insightCategory, setInsightCategory] = useState<string>("all")
  const [insightType, setInsightType] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [timeframe, setTimeframe] = useState("30days")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const { stats, getRankName, getRankColor, getRankById } = useMatwixCompensation()
  const containerRef = useRef<HTMLDivElement>(null)

  // Load insights data
  useEffect(() => {
    // This would normally come from an API
    const loadInsights = () => {
      const mockInsights: Insight[] = [
        {
          id: "ins-001",
          type: "opportunity",
          title: "Team Growth Opportunity",
          description:
            "Your left leg has 30% fewer members than your right leg. Balancing your team structure could increase your Pay Leg Bonus by up to 25%.",
          impact: "high",
          category: "recruitment",
          action: "Focus recruitment efforts on your left leg",
          metric: {
            current: 12,
            target: 18,
            unit: "members",
          },
          trend: {
            value: 15,
            direction: "up",
          },
          timeframe: "Next 30 days",
        },
        {
          id: "ins-002",
          type: "alert",
          title: "Retention Risk Detected",
          description:
            "5 members in your downline haven't logged in for over 30 days, putting $1,250 of monthly volume at risk.",
          impact: "medium",
          category: "retention",
          action: "Reach out to inactive members",
          metric: {
            current: 5,
            target: 0,
            unit: "inactive members",
          },
          trend: {
            value: 20,
            direction: "up",
          },
          timeframe: "Immediate attention needed",
        },
        {
          id: "ins-003",
          type: "prediction",
          title: "Rank Advancement Opportunity",
          description: "You're on track to reach Mentor rank within 45 days based on your current growth rate.",
          impact: "high",
          category: "rank",
          action: "Maintain current growth trajectory",
          metric: {
            current: 75,
            target: 100,
            unit: "% complete",
          },
          trend: {
            value: 8,
            direction: "up",
          },
          timeframe: "Next 45 days",
        },
        {
          id: "ins-004",
          type: "opportunity",
          title: "Product Cross-Selling",
          description:
            "30% of your team members haven't purchased the premium package. Encouraging upgrades could increase your group volume by 15%.",
          impact: "medium",
          category: "sales",
          action: "Promote premium package benefits",
          metric: {
            current: 30,
            target: 15,
            unit: "% without premium",
          },
          trend: {
            value: 5,
            direction: "down",
          },
          timeframe: "Next 60 days",
        },
        {
          id: "ins-005",
          type: "alert",
          title: "Pay Leg Imbalance",
          description:
            "Your pay leg volume is 40% lower than your power leg. This imbalance is reducing your potential earnings.",
          impact: "high",
          category: "team",
          action: "Focus on building your pay leg",
          metric: {
            current: 40,
            target: 20,
            unit: "% imbalance",
          },
          trend: {
            value: 10,
            direction: "up",
          },
          timeframe: "Current month",
        },
        {
          id: "ins-006",
          type: "prediction",
          title: "Team Growth Forecast",
          description: "Based on current recruitment rates, your team is projected to grow by 35% in the next quarter.",
          impact: "medium",
          category: "recruitment",
          action: "Maintain recruitment momentum",
          metric: {
            current: 65,
            target: 100,
            unit: "team members",
          },
          trend: {
            value: 35,
            direction: "up",
          },
          timeframe: "Next quarter",
        },
        {
          id: "ins-007",
          type: "opportunity",
          title: "Leadership Development",
          description:
            "3 members in your downline are close to reaching Navigator rank. Supporting them could accelerate \"3 members in your downline are close to reaching Navigator rank. Supporting them could accelerate your team's growth and increase your generation bonus earnings.",
          impact: "medium",
          category: "team",
          action: "Provide training and support to potential leaders",
          metric: {
            current: 3,
            target: 3,
            unit: "potential leaders",
          },
          trend: {
            value: 25,
            direction: "up",
          },
          timeframe: "Next 30 days",
        },
        {
          id: "ins-008",
          type: "alert",
          title: "Bonus Qualification Risk",
          description: "You need $1,200 more in group volume to qualify for this month's Pay Leg Bonus.",
          impact: "high",
          category: "sales",
          action: "Encourage team purchases before month end",
          metric: {
            current: 3800,
            target: 5000,
            unit: "group volume",
          },
          trend: {
            value: 15,
            direction: "down",
          },
          timeframe: "5 days remaining",
        },
      ]

      const mockPredictions: Prediction[] = [
        {
          month: "July",
          sales: 5800,
          team: 72,
          rank: "Specialist",
          earnings: 2450,
          probability: 0.95,
        },
        {
          month: "August",
          sales: 7200,
          team: 85,
          rank: "Specialist",
          earnings: 3100,
          probability: 0.85,
        },
        {
          month: "September",
          sales: 9500,
          team: 98,
          rank: "Mentor",
          earnings: 4200,
          probability: 0.75,
        },
        {
          month: "October",
          sales: 12000,
          team: 110,
          rank: "Mentor",
          earnings: 5500,
          probability: 0.65,
        },
        {
          month: "November",
          sales: 15000,
          team: 125,
          rank: "Innovator",
          earnings: 7200,
          probability: 0.55,
        },
        {
          month: "December",
          sales: 18500,
          team: 140,
          rank: "Innovator",
          earnings: 9100,
          probability: 0.45,
        },
      ]

      setInsights(mockInsights)
      setPredictions(mockPredictions)
      setSelectedInsight(mockInsights[0])
      setIsLoading(false)
    }

    setTimeout(loadInsights, 1000)
  }, [])

  // Filter insights by category, type and search query
  const filteredInsights = insights.filter((insight) => {
    const matchesCategory = insightCategory === "all" || insight.category === insightCategory
    const matchesType = insightType === "all" || insight.type === insightType
    const matchesSearch =
      searchQuery === "" ||
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesType && matchesSearch
  })

  // Get impact color
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-500 bg-red-500/10 border-red-500/30"
      case "medium":
        return "text-amber-500 bg-amber-500/10 border-amber-500/30"
      case "low":
        return "text-green-500 bg-green-500/10 border-green-500/30"
      default:
        return "text-slate-500 bg-slate-500/10 border-slate-500/30"
    }
  }

  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "opportunity":
        return <Lightbulb className="h-4 w-4 text-green-500" />
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "prediction":
        return <TrendingUp className="h-4 w-4 text-blue-500" />
      default:
        return <Lightbulb className="h-4 w-4 text-green-500" />
    }
  }

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "recruitment":
        return <Users className="h-4 w-4" />
      case "retention":
        return <Target className="h-4 w-4" />
      case "sales":
        return <BarChart3 className="h-4 w-4" />
      case "rank":
        return <Award className="h-4 w-4" />
      case "team":
        return <Users className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div ref={containerRef} className={`${isFullscreen ? "fixed inset-0 z-50 bg-slate-950 p-4 overflow-auto" : ""}`}>
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-700/50 pb-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-slate-100 flex items-center text-base sm:text-lg">
              <Brain className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
              Quantum AI Insights
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-slate-800/50 text-purple-400 border-purple-500/50 text-xs">
                <Sparkles className="h-3 w-3 mr-1 text-purple-400" />
                QUANTUM AI
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8 text-slate-400"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : (
                  <div className="h-3 w-3 sm:h-4 sm:w-4 border-2 border-current" />
                )}
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-slate-400">
                <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center">
                <div className="relative h-16 w-16">
                  <div className="absolute inset-0 rounded-full border-2 border-purple-500/20"></div>
                  <div className="absolute inset-0 rounded-full border-t-2 border-purple-500 animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
                <p className="text-slate-300 mt-4">Analyzing your network data...</p>
                <p className="text-xs text-slate-500 mt-2">Using quantum algorithms for optimal insights</p>
              </div>
            </div>
          ) : (
            <>
              {/* Search and Filter Bar */}
              <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search insights..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 text-slate-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-slate-800/50 border-slate-700/50 text-slate-300 flex items-center space-x-1"
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                      <Filter className="h-3.5 w-3.5 mr-1" />
                      <span>Filters</span>
                      {isFilterOpen ? (
                        <ChevronUp className="h-3.5 w-3.5 ml-1" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5 ml-1" />
                      )}
                    </Button>
                    {isFilterOpen && (
                      <div className="absolute top-full right-0 mt-1 w-64 bg-slate-800 border border-slate-700 rounded-md shadow-lg z-10 p-3 space-y-3">
                        <div>
                          <label className="text-xs text-slate-400 mb-1 block">Insight Type</label>
                          <div className="flex flex-wrap gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-7 px-2 text-xs ${insightType === "all" ? "bg-slate-700 text-purple-400" : ""}`}
                              onClick={() => setInsightType("all")}
                            >
                              All
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-7 px-2 text-xs ${insightType === "opportunity" ? "bg-slate-700 text-green-400" : ""}`}
                              onClick={() => setInsightType("opportunity")}
                            >
                              Opportunities
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-7 px-2 text-xs ${insightType === "alert" ? "bg-slate-700 text-amber-400" : ""}`}
                              onClick={() => setInsightType("alert")}
                            >
                              Alerts
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-7 px-2 text-xs ${insightType === "prediction" ? "bg-slate-700 text-blue-400" : ""}`}
                              onClick={() => setInsightType("prediction")}
                            >
                              Predictions
                            </Button>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-slate-400 mb-1 block">Category</label>
                          <div className="flex flex-wrap gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-7 px-2 text-xs ${insightCategory === "all" ? "bg-slate-700 text-purple-400" : ""}`}
                              onClick={() => setInsightCategory("all")}
                            >
                              All
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-7 px-2 text-xs ${insightCategory === "recruitment" ? "bg-slate-700 text-purple-400" : ""}`}
                              onClick={() => setInsightCategory("recruitment")}
                            >
                              Recruitment
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-7 px-2 text-xs ${insightCategory === "sales" ? "bg-slate-700 text-purple-400" : ""}`}
                              onClick={() => setInsightCategory("sales")}
                            >
                              Sales
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-7 px-2 text-xs ${insightCategory === "team" ? "bg-slate-700 text-purple-400" : ""}`}
                              onClick={() => setInsightCategory("team")}
                            >
                              Team
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-7 px-2 text-xs ${insightCategory === "rank" ? "bg-slate-700 text-purple-400" : ""}`}
                              onClick={() => setInsightCategory("rank")}
                            >
                              Rank
                            </Button>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-slate-400 mb-1 block">Timeframe</label>
                          <div className="flex flex-wrap gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-7 px-2 text-xs ${timeframe === "7days" ? "bg-slate-700 text-purple-400" : ""}`}
                              onClick={() => setTimeframe("7days")}
                            >
                              7 Days
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-7 px-2 text-xs ${timeframe === "30days" ? "bg-slate-700 text-purple-400" : ""}`}
                              onClick={() => setTimeframe("30days")}
                            >
                              30 Days
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-7 px-2 text-xs ${timeframe === "90days" ? "bg-slate-700 text-purple-400" : ""}`}
                              onClick={() => setTimeframe("90days")}
                            >
                              90 Days
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="bg-slate-800/50 border-slate-700/50 text-slate-300">
                    <Download className="h-3.5 w-3.5 mr-1" />
                    <span className="hidden sm:inline">Export</span>
                  </Button>
                  <Button variant="outline" size="sm" className="bg-slate-800/50 border-slate-700/50 text-slate-300">
                    <Share2 className="h-3.5 w-3.5 mr-1" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Insights List */}
                <div className="lg:col-span-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-slate-300">Key Insights ({filteredInsights.length})</h3>
                    <div className="flex items-center text-xs text-slate-500">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Updated 5 min ago</span>
                    </div>
                  </div>

                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    {filteredInsights.length > 0 ? (
                      filteredInsights.map((insight) => (
                        <div
                          key={insight.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedInsight?.id === insight.id
                              ? "bg-slate-800/80 border-purple-500/50"
                              : "bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50"
                          }`}
                          onClick={() => setSelectedInsight(insight)}
                        >
                          <div className="flex items-start">
                            <div className="mt-0.5">{getTypeIcon(insight.type)}</div>
                            <div className="ml-2 flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-slate-200 truncate">{insight.title}</h4>
                                <Badge variant="outline" className={`ml-2 text-xs ${getImpactColor(insight.impact)}`}>
                                  {insight.impact}
                                </Badge>
                              </div>
                              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{insight.description}</p>
                              {insight.timeframe && (
                                <div className="flex items-center mt-2 text-xs text-slate-500">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {insight.timeframe}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Search className="h-8 w-8 text-slate-600 mb-2" />
                        <p className="text-slate-400">No insights match your filters</p>
                        <Button
                          variant="link"
                          className="text-purple-400 mt-1 text-sm"
                          onClick={() => {
                            setInsightCategory("all")
                            setInsightType("all")
                            setSearchQuery("")
                          }}
                        >
                          Clear all filters
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Selected Insight Details */}
                <div className="lg:col-span-2">
                  {selectedInsight ? (
                    <div className="space-y-4">
                      <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center">
                              {getTypeIcon(selectedInsight.type)}
                              <h3 className="text-lg font-medium text-slate-100 ml-2">{selectedInsight.title}</h3>
                            </div>
                            <p className="text-sm text-slate-300 mt-2">{selectedInsight.description}</p>
                          </div>
                          <Badge variant="outline" className={`${getImpactColor(selectedInsight.impact)}`}>
                            {selectedInsight.impact} impact
                          </Badge>
                        </div>

                        {selectedInsight.timeframe && (
                          <div className="mt-3 flex items-center text-xs text-slate-400">
                            <Calendar className="h-3.5 w-3.5 mr-1.5" />
                            {selectedInsight.timeframe}
                          </div>
                        )}

                        {selectedInsight.metric && (
                          <div className="mt-4">
                            <div className="flex justify-between items-center mb-1">
                              <div className="text-sm text-slate-400">Progress</div>
                              <div className="text-sm text-slate-400">
                                {selectedInsight.metric.current} / {selectedInsight.metric.target}{" "}
                                {selectedInsight.metric.unit}
                              </div>
                            </div>
                            <Progress
                              value={Math.min(
                                100,
                                (selectedInsight.metric.current / selectedInsight.metric.target) * 100,
                              )}
                              className="h-2 bg-slate-700"
                            >
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    (selectedInsight.metric.current / selectedInsight.metric.target) * 100,
                                  )}%`,
                                }}
                              />
                            </Progress>
                          </div>
                        )}

                        {selectedInsight.trend && (
                          <div className="mt-4 flex items-center">
                            <div
                              className={`flex items-center ${
                                selectedInsight.trend.direction === "up"
                                  ? "text-green-400"
                                  : selectedInsight.trend.direction === "down"
                                    ? "text-red-400"
                                    : "text-blue-400"
                              }`}
                            >
                              {selectedInsight.trend.direction === "up" ? (
                                <ArrowUpRight className="h-4 w-4 mr-1" />
                              ) : selectedInsight.trend.direction === "down" ? (
                                <ArrowDownRight className="h-4 w-4 mr-1" />
                              ) : (
                                <ChevronRight className="h-4 w-4 mr-1" />
                              )}
                              {selectedInsight.trend.value}% {selectedInsight.trend.direction}
                            </div>
                            <div className="text-xs text-slate-500 ml-2">Trend over last 30 days</div>
                          </div>
                        )}

                        {selectedInsight.action && (
                          <div className="mt-4 pt-4 border-t border-slate-700/30">
                            <div className="flex items-center">
                              <Zap className="h-4 w-4 text-purple-500 mr-2" />
                              <h4 className="text-sm font-medium text-slate-200">Recommended Action</h4>
                            </div>
                            <p className="text-sm text-slate-400 mt-1">{selectedInsight.action}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                                Take Action
                              </Button>
                              <Button variant="outline" className="bg-slate-800/50 border-slate-700/50 text-slate-300">
                                Dismiss
                              </Button>
                              <Button variant="ghost" className="text-slate-400">
                                Remind Later
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                        <Tabs defaultValue="predictions">
                          <TabsList className="bg-slate-800/50 w-full mb-4">
                            <TabsTrigger value="predictions">Growth Predictions</TabsTrigger>
                            <TabsTrigger value="scenarios">What-If Scenarios</TabsTrigger>
                            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                          </TabsList>

                          <TabsContent value="predictions">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-sm font-medium text-slate-200">6-Month Growth Projection</h4>
                              <Badge
                                variant="outline"
                                className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs"
                              >
                                AI Powered
                              </Badge>
                            </div>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="text-xs text-slate-500 border-b border-slate-700/50">
                                    <th className="pb-2 text-left">Month</th>
                                    <th className="pb-2 text-right">Sales</th>
                                    <th className="pb-2 text-right">Team Size</th>
                                    <th className="pb-2 text-left">Rank</th>
                                    <th className="pb-2 text-right">Earnings</th>
                                    <th className="pb-2 text-right">Probability</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {predictions.map((prediction, index) => (
                                    <tr key={index} className="border-b border-slate-700/30">
                                      <td className="py-2 text-slate-300">{prediction.month}</td>
                                      <td className="py-2 text-right text-cyan-400">
                                        {formatCurrency(prediction.sales)}
                                      </td>
                                      <td className="py-2 text-right text-slate-300">{prediction.team}</td>
                                      <td className="py-2 text-slate-300">{prediction.rank}</td>
                                      <td className="py-2 text-right text-green-400">
                                        {formatCurrency(prediction.earnings)}
                                      </td>
                                      <td className="py-2 text-right text-slate-300">
                                        {Math.round(prediction.probability * 100)}%
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div className="mt-4 text-xs text-slate-500">
                              Predictions based on current performance and market trends. Updated daily.
                            </div>
                          </TabsContent>

                          <TabsContent value="scenarios">
                            <div className="space-y-4">
                              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30">
                                <h4 className="text-sm font-medium text-slate-200 mb-2">
                                  Scenario 1: Increased Recruitment
                                </h4>
                                <p className="text-xs text-slate-400 mb-3">
                                  If you recruit 5 new active members in the next 30 days:
                                </p>
                                <div className="grid grid-cols-3 gap-2">
                                  <div>
                                    <div className="text-xs text-slate-500">Group Volume</div>
                                    <div className="text-sm text-green-400">+35%</div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-slate-500">Rank Progress</div>
                                    <div className="text-sm text-green-400">+28%</div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-slate-500">Earnings</div>
                                    <div className="text-sm text-green-400">+42%</div>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30">
                                <h4 className="text-sm font-medium text-slate-200 mb-2">Scenario 2: Team Activation</h4>
                                <p className="text-xs text-slate-400 mb-3">
                                  If you reactivate all inactive members in your downline:
                                </p>
                                <div className="grid grid-cols-3 gap-2">
                                  <div>
                                    <div className="text-xs text-slate-500">Group Volume</div>
                                    <div className="text-sm text-green-400">+22%</div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-slate-500">Rank Progress</div>
                                    <div className="text-sm text-green-400">+15%</div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-slate-500">Earnings</div>
                                    <div className="text-sm text-green-400">+25%</div>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30">
                                <h4 className="text-sm font-medium text-slate-200 mb-2">
                                  Scenario 3: Product Upgrades
                                </h4>
                                <p className="text-xs text-slate-400 mb-3">
                                  If 50% of your team upgrades to premium packages:
                                </p>
                                <div className="grid grid-cols-3 gap-2">
                                  <div>
                                    <div className="text-xs text-slate-500">Group Volume</div>
                                    <div className="text-sm text-green-400">+45%</div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-slate-500">Rank Progress</div>
                                    <div className="text-sm text-green-400">+30%</div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-slate-500">Earnings</div>
                                    <div className="text-sm text-green-400">+55%</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="recommendations">
                            <div className="space-y-3">
                              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                                    <Users className="h-4 w-4 text-purple-500" />
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium text-slate-200">
                                      Focus on Left Leg Recruitment
                                    </h4>
                                    <p className="text-xs text-slate-400 mt-1">
                                      Balancing your binary structure will maximize your Pay Leg Bonus earnings.
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                                    <BarChart3 className="h-4 w-4 text-green-500" />
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium text-slate-200">Promote Premium Packages</h4>
                                    <p className="text-xs text-slate-400 mt-1">
                                      Encouraging team members to upgrade could increase your group volume by 15%.
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center mr-3">
                                    <Target className="h-4 w-4 text-amber-500" />
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium text-slate-200">Reactivate Inactive Members</h4>
                                    <p className="text-xs text-slate-400 mt-1">
                                      Contact the 5 inactive members to prevent loss of $1,250 monthly volume.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-slate-400">Select an insight to view details</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
