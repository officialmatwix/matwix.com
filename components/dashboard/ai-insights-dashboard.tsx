"use client"

import { useState, useEffect } from "react"
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

export default function AIInsightsDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [insights, setInsights] = useState<Insight[]>([])
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null)
  const [insightCategory, setInsightCategory] = useState<string>("all")
  const { stats, getRankName, getRankColor, getRankById } = useMatwixCompensation()

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

  // Filter insights by category
  const filteredInsights =
    insightCategory === "all" ? insights : insights.filter((insight) => insight.category === insightCategory)

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

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="border-b border-slate-700/50 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-100 flex items-center text-base sm:text-lg">
            <Brain className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
            AI-Powered Insights
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-slate-800/50 text-purple-400 border-purple-500/50 text-xs">
              <Sparkles className="h-3 w-3 mr-1 text-purple-400" />
              QUANTUM AI
            </Badge>
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
              <div className="h-10 w-10 rounded-full border-2 border-t-transparent border-purple-500 animate-spin mb-4"></div>
              <p className="text-slate-300">Analyzing your network data...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Insights List */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-300">Key Insights</h3>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-7 px-2 text-xs ${insightCategory === "all" ? "bg-slate-800 text-purple-400" : ""}`}
                    onClick={() => setInsightCategory("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-7 px-2 text-xs ${insightCategory === "recruitment" ? "bg-slate-800 text-purple-400" : ""}`}
                    onClick={() => setInsightCategory("recruitment")}
                  >
                    Recruitment
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-7 px-2 text-xs ${insightCategory === "sales" ? "bg-slate-800 text-purple-400" : ""}`}
                    onClick={() => setInsightCategory("sales")}
                  >
                    Sales
                  </Button>
                </div>
              </div>

              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {filteredInsights.map((insight) => (
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
                      </div>
                    </div>
                  </div>
                ))}
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
                          value={Math.min(100, (selectedInsight.metric.current / selectedInsight.metric.target) * 100)}
                          className="h-2 bg-slate-700"
                        >
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                            style={{
                              width: `${Math.min(100, (selectedInsight.metric.current / selectedInsight.metric.target) * 100)}%`,
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
                        <Button className="mt-3 bg-purple-600 hover:bg-purple-700">Take Action</Button>
                      </div>
                    )}
                  </div>

                  <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                    <Tabs defaultValue="predictions">
                      <TabsList className="bg-slate-800/50 w-full mb-4">
                        <TabsTrigger value="predictions">Growth Predictions</TabsTrigger>
                        <TabsTrigger value="scenarios">What-If Scenarios</TabsTrigger>
                      </TabsList>

                      <TabsContent value="predictions">
                        <h4 className="text-sm font-medium text-slate-200 mb-3">6-Month Growth Projection</h4>
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
                                  <td className="py-2 text-right text-cyan-400">{formatCurrency(prediction.sales)}</td>
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
                            <h4 className="text-sm font-medium text-slate-200 mb-2">Scenario 3: Product Upgrades</h4>
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
        )}
      </CardContent>
    </Card>
  )
}
