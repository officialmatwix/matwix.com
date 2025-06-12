"use client"

import { useState, useEffect, useRef } from "react"
import {
  Activity,
  AlertCircle,
  DollarSign,
  Gift,
  Network,
  RefreshCw,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Sparkles,
  Calendar,
  Clock,
  ExternalLink,
  Lightbulb,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useMLMData } from "@/context/mlm-data-context"
import { useMatwixCompensation } from "@/context/matwix-compensation-context"
import { formatCurrency } from "@/lib/utils"
import { ParticlesBackground } from "@/components/ui/particles-background"

export default function QuantumDashboardHome() {
  const {
    networkGrowth,
    commissionRate,
    teamActivity,
    recruitmentStatus,
    currentTime,
    downlineMembers,
    commissions,
    communications,
    addCommunication,
  } = useMLMData()

  // Use the Matwix compensation context
  const { stats, getRankById, getRankName, getRankColor, bonusHistory } = useMatwixCompensation()

  const [isLoading, setIsLoading] = useState(true)
  const [showWelcome, setShowWelcome] = useState(true)
  const chartRef = useRef<HTMLDivElement>(null)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Get current and next rank information
  const currentRank = getRankById(stats.currentRank)
  const nextRank = getRankById(stats.nextRank)

  // Get recent achievements from bonus history
  const recentAchievements = bonusHistory
    .filter((bonus) => bonus.type === "career" || bonus.type === "direct")
    .slice(0, 4)
    .map((bonus) => ({
      title:
        bonus.type === "career"
          ? `Reached ${getRankName(Number.parseInt(bonus.description.split("rank")[1]))} Rank`
          : `Direct Sales Bonus from ${bonus.from}`,
      time: new Date(bonus.date).toLocaleDateString(),
      description: bonus.description,
      type: bonus.type === "career" ? "rank" : "sales",
    }))

  // In the component, add:
  const currentRankName = getRankName(stats.currentRank)
  const currentRankColor = getRankColor(stats.currentRank)

  // Key metrics for the dashboard
  const keyMetrics = [
    {
      title: "Monthly Earnings",
      value: formatCurrency(stats.totalEarnings),
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "green",
    },
    {
      title: "Team Size",
      value: stats.totalTeamSize.toString(),
      change: "+8.3%",
      trend: "up",
      icon: Users,
      color: "cyan",
    },
    {
      title: "Group Volume",
      value: formatCurrency(stats.leftLegVolume + stats.rightLegVolume),
      change: "+15.2%",
      trend: "up",
      icon: Activity,
      color: "purple",
    },
    {
      title: "Pay Leg Bonus",
      value: formatCurrency(stats.payLegBonusEarned),
      change: "+9.7%",
      trend: "up",
      icon: Gift,
      color: "amber",
    },
  ]

  // Upcoming events
  const upcomingEvents = [
    {
      title: "Team Training Webinar",
      date: "Tomorrow, 3:00 PM",
      type: "training",
    },
    {
      title: "Rank Advancement Deadline",
      date: "In 5 days",
      type: "deadline",
    },
    {
      title: "New Product Launch",
      date: "Next week",
      type: "product",
    },
  ]

  // AI insights
  const aiInsights = [
    {
      title: "Team Balance Opportunity",
      description: "Your left leg needs 3 more active members to balance your network.",
      type: "opportunity",
      action: "View Details",
    },
    {
      title: "Rank Advancement",
      description: "You're 25% away from reaching Mentor rank.",
      type: "prediction",
      action: "See Requirements",
    },
    {
      title: "Inactive Members",
      description: "5 members haven't logged in for 30+ days.",
      type: "alert",
      action: "Contact Now",
    },
  ]

  // Recent team activity
  const recentActivity = [
    {
      name: "John Doe",
      action: "joined your team",
      time: "10 minutes ago",
      avatar: "/placeholder.svg?height=40&width=40",
      leg: "left",
    },
    {
      name: "Sarah Smith",
      action: "made a sale of $450",
      time: "2 hours ago",
      avatar: "/placeholder.svg?height=40&width=40",
      leg: "right",
    },
    {
      name: "Michael Johnson",
      action: "reached Navigator rank",
      time: "Yesterday",
      avatar: "/placeholder.svg?height=40&width=40",
      leg: "left",
    },
    {
      name: "Emily Wilson",
      action: "recruited 2 new members",
      time: "2 days ago",
      avatar: "/placeholder.svg?height=40&width=40",
      leg: "right",
    },
  ]

  return (
    <div className="space-y-6 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <ParticlesBackground quantity={50} />
      </div>

      <div className="relative z-10">
        {/* Header with welcome message and actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-1">
              Welcome back, <span className="text-cyan-400">Alex</span>
            </h1>
            <p className="text-slate-400">
              Your network is growing! <span className="text-green-400">+15.3%</span> this month
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600"
              onClick={() => setIsLoading(true)}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600"
              onClick={() => window.open("/dashboard/ai", "_self")}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Quantum Insights
            </Button>
          </div>
        </div>

        {/* Welcome Banner - Only shown on first load or when not dismissed */}
        {showWelcome && (
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 p-4 sm:p-6 mb-6">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]"></div>
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Welcome to Matwix Quantum Dashboard</h2>
                <p className="text-blue-100 max-w-2xl">
                  Your futuristic command center for network growth, team management, and compensation tracking. Explore
                  the AI-powered insights to maximize your earnings.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  className="bg-white/20 hover:bg-white/30 text-white border-white/40"
                  onClick={() => window.open("/dashboard/ai", "_self")}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Explore AI Insights
                </Button>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  size="icon"
                  onClick={() => setShowWelcome(false)}
                >
                  <AlertCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="h-16 flex items-center">
                    <div className="w-full h-4 bg-slate-800 rounded-full animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {keyMetrics.map((metric, index) => (
                <Card
                  key={index}
                  className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 from-purple-500 to-cyan-500"></div>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-slate-400">{metric.title}</div>
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center bg-${metric.color}-500/20`}
                      >
                        <metric.icon className={`h-4 w-4 text-${metric.color}-500`} />
                      </div>
                    </div>
                    <div className="text-2xl font-bold mb-1 text-slate-100">{metric.value}</div>
                    <div
                      className={`flex items-center text-xs ${
                        metric.trend === "up" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {metric.trend === "up" ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {metric.change} from last month
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Network Balance */}
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-slate-100 flex items-center text-base">
                        <Network className="mr-2 h-5 w-5 text-cyan-500" />
                        Network Balance
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs text-slate-400"
                        onClick={() => window.open("/dashboard/network", "_self")}
                      >
                        View Full Network
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                              <ChevronLeft className="h-5 w-5 text-cyan-500" />
                            </div>
                            <div className="ml-2">
                              <div className="text-sm font-medium text-slate-200">Left Leg</div>
                              <div className="text-xs text-slate-500">Power Leg</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-cyan-400">{formatCurrency(stats.leftLegVolume)}</div>
                            <div className="text-xs text-slate-500">Volume</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-slate-500">Team Members</div>
                            <div className="text-xs text-slate-300">{stats.leftLegMembers}</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-slate-500">Active Members</div>
                            <div className="text-xs text-green-400">{stats.leftLegActive}</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-slate-500">Qualified Leaders</div>
                            <div className="text-xs text-purple-400">{stats.leftLegLeaders}</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                              <ChevronRight className="h-5 w-5 text-purple-500" />
                            </div>
                            <div className="ml-2">
                              <div className="text-sm font-medium text-slate-200">Right Leg</div>
                              <div className="text-xs text-slate-500">Pay Leg</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-purple-400">
                              {formatCurrency(stats.rightLegVolume)}
                            </div>
                            <div className="text-xs text-slate-500">Volume</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-slate-500">Team Members</div>
                            <div className="text-xs text-slate-300">{stats.rightLegMembers}</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-slate-500">Active Members</div>
                            <div className="text-xs text-green-400">{stats.rightLegActive}</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-slate-500">Qualified Leaders</div>
                            <div className="text-xs text-purple-400">{stats.rightLegLeaders}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-700/50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-slate-400">Network Balance</div>
                        <div className="text-sm text-amber-400">
                          {Math.round((stats.rightLegVolume / stats.leftLegVolume) * 100)}%
                        </div>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                          style={{ width: `${Math.min(100, (stats.rightLegVolume / stats.leftLegVolume) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-slate-500">
                        <div>Left: {formatCurrency(stats.leftLegVolume)}</div>
                        <div>Right: {formatCurrency(stats.rightLegVolume)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Team Activity */}
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-slate-100 flex items-center text-base">
                        <Activity className="mr-2 h-5 w-5 text-green-500" />
                        Recent Team Activity
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs text-slate-400"
                        onClick={() => window.open("/dashboard/team", "_self")}
                      >
                        View All Activity
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={activity.avatar} />
                            <AvatarFallback>{activity.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <span className="font-medium text-slate-200">{activity.name}</span>
                                <Badge
                                  variant="outline"
                                  className={`ml-2 text-xs ${
                                    activity.leg === "left"
                                      ? "text-cyan-400 bg-cyan-500/10 border-cyan-500/30"
                                      : "text-purple-400 bg-purple-500/10 border-purple-500/30"
                                  }`}
                                >
                                  {activity.leg} leg
                                </Badge>
                              </div>
                              <span className="text-xs text-slate-500">{activity.time}</span>
                            </div>
                            <p className="text-sm text-slate-400 mt-1">{activity.action}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Insights Preview */}
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-slate-100 flex items-center text-base">
                        <Brain className="mr-2 h-5 w-5 text-purple-500" />
                        AI Insights
                        <Badge className="ml-2 bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                          <Sparkles className="h-3 w-3 mr-1" />
                          QUANTUM
                        </Badge>
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs text-slate-400"
                        onClick={() => window.open("/dashboard/ai", "_self")}
                      >
                        View All
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {aiInsights.map((insight, index) => (
                        <div
                          key={index}
                          className="p-3 rounded-lg border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
                        >
                          <div className="flex items-start">
                            <div className="mt-0.5">
                              {insight.type === "opportunity" ? (
                                <Lightbulb className="h-4 w-4 text-green-500" />
                              ) : insight.type === "prediction" ? (
                                <TrendingUp className="h-4 w-4 text-blue-500" />
                              ) : (
                                <AlertCircle className="h-4 w-4 text-amber-500" />
                              )}
                            </div>
                            <div className="ml-2 flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-slate-200">{insight.title}</h4>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${
                                    insight.type === "opportunity"
                                      ? "text-green-500 bg-green-500/10 border-green-500/30"
                                      : insight.type === "prediction"
                                        ? "text-blue-500 bg-blue-500/10 border-blue-500/30"
                                        : "text-amber-500 bg-amber-500/10 border-amber-500/30"
                                  }`}
                                >
                                  {insight.type}
                                </Badge>
                              </div>
                              <p className="text-xs text-slate-400 mt-1">{insight.description}</p>
                              <Button
                                variant="link"
                                className={`text-xs p-0 h-auto mt-1 ${
                                  insight.type === "opportunity"
                                    ? "text-green-400"
                                    : insight.type === "prediction"
                                      ? "text-blue-400"
                                      : "text-amber-400"
                                }`}
                              >
                                {insight.action}
                                <ChevronRight className="h-3 w-3 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Rank Progress */}
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <Award className="mr-2 h-5 w-5 text-purple-500" />
                      Rank Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Current Rank</div>
                        <Badge
                          className="bg-opacity-20 border-opacity-50"
                          style={{
                            backgroundColor: `${currentRank.color}20`,
                            borderColor: `${currentRank.color}50`,
                            color: currentRank.color,
                          }}
                        >
                          {currentRank.name}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Next Rank</div>
                        <Badge
                          className="bg-opacity-20 border-opacity-50"
                          style={{
                            backgroundColor: `${nextRank.color}20`,
                            borderColor: `${nextRank.color}50`,
                            color: nextRank.color,
                          }}
                        >
                          {nextRank.name}
                        </Badge>
                      </div>

                      <div className="pt-2 mt-2 border-t border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium">{nextRank.name} Qualification</div>
                          <div className="text-sm text-cyan-400">{stats.rankProgress}%</div>
                        </div>
                        <Progress value={stats.rankProgress} className="h-2 bg-slate-700">
                          <div
                            className="h-full rounded-full"
                            style={{
                              background: `linear-gradient(to right, ${currentRank.color}, ${nextRank.color})`,
                            }}
                          />
                        </Progress>
                      </div>

                      <div className="space-y-2 mt-4">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">Group Volume</div>
                          <div className="text-xs text-cyan-400">
                            {formatCurrency(stats.leftLegVolume + stats.rightLegVolume)} /{" "}
                            {formatCurrency(nextRank.groupVolumeQualified)}
                          </div>
                        </div>
                        <Progress
                          value={Math.min(
                            100,
                            ((stats.leftLegVolume + stats.rightLegVolume) / nextRank.groupVolumeQualified) * 100,
                          )}
                          className="h-1.5 bg-slate-700"
                        >
                          <div className="h-full rounded-full bg-cyan-500" />
                        </Progress>

                        <div className="flex items-center justify-between mt-1">
                          <div className="text-xs text-slate-500">Required Leaders</div>
                          <div className="text-xs text-purple-400">
                            {stats.qualifiedLeaders} / {nextRank.leadersRequired}
                          </div>
                        </div>
                        <Progress
                          value={Math.min(100, (stats.qualifiedLeaders / nextRank.leadersRequired) * 100)}
                          className="h-1.5 bg-slate-700"
                        >
                          <div className="h-full rounded-full bg-purple-500" />
                        </Progress>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                        onClick={() => window.open("/dashboard/achievements", "_self")}
                      >
                        View Rank Benefits
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                      Upcoming Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingEvents.map((event, index) => (
                        <div
                          key={index}
                          className="flex items-center p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
                        >
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                              event.type === "training"
                                ? "bg-green-500/20"
                                : event.type === "deadline"
                                  ? "bg-amber-500/20"
                                  : "bg-blue-500/20"
                            }`}
                          >
                            {event.type === "training" ? (
                              <Users className="h-4 w-4 text-green-500" />
                            ) : event.type === "deadline" ? (
                              <Clock className="h-4 w-4 text-amber-500" />
                            ) : (
                              <Gift className="h-4 w-4 text-blue-500" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-200">{event.title}</div>
                            <div className="text-xs text-slate-500">{event.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Achievements */}
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <Award className="mr-2 h-5 w-5 text-amber-500" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentAchievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="p-3 rounded-lg border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-slate-200">{achievement.title}</h4>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                achievement.type === "rank"
                                  ? "text-purple-500 bg-purple-500/10 border-purple-500/30"
                                  : "text-green-500 bg-green-500/10 border-green-500/30"
                              }`}
                            >
                              {achievement.type}
                            </Badge>
                          </div>
                          <div className="flex items-center mt-2 text-xs text-slate-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {achievement.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// Import missing components
import { ChevronLeft } from "lucide-react"
