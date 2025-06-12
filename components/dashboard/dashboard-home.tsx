"use client"

import type React from "react"

import { useState } from "react"
import {
  Activity,
  AlertCircle,
  BarChart3,
  DollarSign,
  Gift,
  LineChart,
  MessageSquare,
  Mic,
  Network,
  RefreshCw,
  TrendingUp,
  UserPlus,
  Users,
  Award,
} from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useMLMData } from "@/context/mlm-data-context"
import { formatCurrency, formatTime } from "@/lib/utils"

export default function DashboardHome() {
  const {
    networkGrowth,
    commissionRate,
    teamActivity,
    recruitmentStatus,
    rankProgress,
    currentTime,
    downlineMembers,
    commissions,
    achievements,
    communications,
    addCommunication,
  } = useMLMData()

  const [messageText, setMessageText] = useState("")

  const handleSendMessage = () => {
    if (messageText.trim()) {
      addCommunication({
        sender: "You",
        time: formatTime(new Date()),
        message: messageText,
        avatar: "/placeholder.svg?height=40&width=40",
        unread: false,
      })
      setMessageText("")
    }
  }

  return (
    <div className="grid gap-4 sm:gap-6">
      {/* Network overview */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="border-b border-slate-700/50 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-100 flex items-center text-base sm:text-lg">
              <Network className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-cyan-500" />
              Network Overview
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1 animate-pulse"></div>
                LIVE
              </Badge>
              <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-slate-400">
                <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            <MetricCard
              title="Commission Rate"
              value={commissionRate}
              icon={DollarSign}
              trend="up"
              color="cyan"
              detail={`${formatCurrency(1250.75)} | This Month`}
            />
            <MetricCard
              title="Team Activity"
              value={teamActivity}
              icon={Users}
              trend="stable"
              color="purple"
              detail="42 Active | 68 Total"
            />
            <MetricCard
              title="Recruitment"
              value={recruitmentStatus}
              icon={UserPlus}
              trend="up"
              color="blue"
              detail="8 New | Last 30 Days"
            />
          </div>

          <div className="mt-6 sm:mt-8">
            <Tabs defaultValue="performance" className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
                <TabsList className="bg-slate-800/50 p-1 w-full sm:w-auto">
                  <TabsTrigger
                    value="performance"
                    className="text-xs sm:text-sm data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Performance
                  </TabsTrigger>
                  <TabsTrigger
                    value="downline"
                    className="text-xs sm:text-sm data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Downline
                  </TabsTrigger>
                  <TabsTrigger
                    value="commissions"
                    className="text-xs sm:text-sm data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Commissions
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs text-slate-400">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-cyan-500 mr-1"></div>
                    Direct
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-purple-500 mr-1"></div>
                    Level 2
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
                    Level 3+
                  </div>
                </div>
              </div>

              <TabsContent value="performance" className="mt-0">
                <div className="h-48 sm:h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                  <PerformanceChart />
                  <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-2 py-1 sm:px-3 sm:py-2 border border-slate-700/50">
                    <div className="text-xs text-slate-400">Network Growth</div>
                    <div className="text-base sm:text-lg font-mono text-cyan-400">{networkGrowth}%</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="downline" className="mt-0">
                <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden overflow-x-auto">
                  <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50 min-w-[600px]">
                    <div className="col-span-1">ID</div>
                    <div className="col-span-3">Member</div>
                    <div className="col-span-2">Rank</div>
                    <div className="col-span-2">Joined</div>
                    <div className="col-span-2">Sales</div>
                    <div className="col-span-2">Status</div>
                  </div>

                  <div className="divide-y divide-slate-700/30 min-w-[600px]">
                    {downlineMembers.slice(0, 4).map((member) => (
                      <DownlineRow
                        key={member.id}
                        id={member.id}
                        name={member.name}
                        rank={member.rank}
                        joined={member.joined}
                        sales={member.sales}
                        status={member.status}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="commissions" className="mt-0">
                <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-3 sm:p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {commissions.slice(0, 4).map((commission, index) => (
                      <CommissionItem
                        key={index}
                        name={commission.name}
                        total={commission.total}
                        growth={commission.growth}
                        type={commission.type}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Rank & Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 flex items-center text-base">
              <Award className="mr-2 h-5 w-5 text-green-500" />
              Rank Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-400">Current Rank</div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Gold</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-400">Next Rank</div>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Platinum</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-400">Team Size</div>
                <div className="text-sm text-cyan-400">
                  68 <span className="text-slate-500">members</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-400">Group Volume</div>
                <div className="text-sm text-cyan-400">
                  {formatCurrency(12580)} <span className="text-slate-500">/ {formatCurrency(15000)}</span>
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Platinum Qualification</div>
                  <div className="text-sm text-cyan-400">{rankProgress}%</div>
                </div>
                <Progress value={rankProgress} className="h-2 bg-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                    style={{ width: `${rankProgress}%` }}
                  />
                </Progress>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 flex items-center text-base">
              <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.slice(0, 4).map((achievement, index) => (
                <AchievementItem
                  key={index}
                  title={achievement.title}
                  time={achievement.time}
                  description={achievement.description}
                  type={achievement.type}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Communications */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-2 flex flex-col sm:flex-row sm:items-center justify-between">
          <CardTitle className="text-slate-100 flex items-center text-base mb-2 sm:mb-0">
            <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
            Team Communications
          </CardTitle>
          <Badge variant="outline" className="bg-slate-800/50 text-blue-400 border-blue-500/50 w-fit">
            {communications.filter((c) => c.unread).length} New Messages
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {communications.slice(0, 4).map((communication, index) => (
              <CommunicationItem
                key={index}
                sender={communication.sender}
                time={communication.time}
                message={communication.message}
                avatar={communication.avatar}
                unread={communication.unread}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t border-slate-700/50 pt-4">
          <div className="flex items-center w-full space-x-2">
            <input
              type="text"
              placeholder="Type a message to your team..."
              className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button size="icon" className="bg-blue-600 hover:bg-blue-700 h-9 w-9 sm:h-10 sm:w-10">
              <Mic className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className="bg-cyan-600 hover:bg-cyan-700 h-9 w-9 sm:h-10 sm:w-10"
              onClick={handleSendMessage}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500">Total Team</span>
                <span className="text-xl sm:text-2xl font-bold text-cyan-400">68</span>
              </div>
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500">Monthly Earnings</span>
                <span className="text-xl sm:text-2xl font-bold text-green-400">{formatCurrency(2361.5)}</span>
              </div>
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500">New Recruits</span>
                <span className="text-xl sm:text-2xl font-bold text-blue-400">8</span>
              </div>
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500">Group Volume</span>
                <span className="text-xl sm:text-2xl font-bold text-purple-400">{formatCurrency(12580)}</span>
              </div>
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Component for metric cards
function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
  detail,
}: {
  title: string
  value: number
  icon: React.ElementType
  trend: "up" | "down" | "stable"
  color: string
  detail: string
}) {
  const getColor = () => {
    switch (color) {
      case "cyan":
        return "from-cyan-500 to-blue-500 border-cyan-500/30"
      case "green":
        return "from-green-500 to-emerald-500 border-green-500/30"
      case "blue":
        return "from-blue-500 to-indigo-500 border-blue-500/30"
      case "purple":
        return "from-purple-500 to-pink-500 border-purple-500/30"
      default:
        return "from-cyan-500 to-blue-500 border-cyan-500/30"
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <BarChart3 className="h-4 w-4 text-amber-500" />
      case "down":
        return <BarChart3 className="h-4 w-4 rotate-180 text-green-500" />
      case "stable":
        return <LineChart className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className={`bg-slate-800/50 rounded-lg border ${getColor()} p-3 sm:p-4 relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs sm:text-sm text-slate-400">{title}</div>
        <Icon className={`h-4 w-4 sm:h-5 sm:w-5 text-${color}-500`} />
      </div>
      <div className="text-xl sm:text-2xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent from-slate-100 to-slate-300">
        {value}%
      </div>
      <div className="text-xs text-slate-500">{detail}</div>
      <div className="absolute bottom-2 right-2 flex items-center">{getTrendIcon()}</div>
      <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-cyan-500 to-blue-500"></div>
    </div>
  )
}

// Performance chart component
function PerformanceChart() {
  return (
    <div className="h-full w-full flex items-end justify-between px-4 pt-4 pb-8 relative">
      {/* Y-axis labels */}
      <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4">
        <div className="text-xs text-slate-500">100%</div>
        <div className="text-xs text-slate-500">75%</div>
        <div className="text-xs text-slate-500">50%</div>
        <div className="text-xs text-slate-500">25%</div>
        <div className="text-xs text-slate-500">0%</div>
      </div>

      {/* X-axis grid lines */}
      <div className="absolute left-0 right-0 top-0 h-full flex flex-col justify-between py-4 px-10">
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
      </div>

      {/* Chart bars */}
      <div className="flex-1 h-full flex items-end justify-between px-2 z-10">
        {Array.from({ length: 12 }).map((_, i) => {
          const directHeight = Math.floor(Math.random() * 60) + 20
          const level2Height = Math.floor(Math.random() * 40) + 40
          const level3Height = Math.floor(Math.random() * 30) + 30

          return (
            <div key={i} className="flex space-x-0.5">
              <div
                className="w-1 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-sm"
                style={{ height: `${directHeight}%` }}
              ></div>
              <div
                className="w-1 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-sm"
                style={{ height: `${level2Height}%` }}
              ></div>
              <div
                className="w-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm"
                style={{ height: `${level3Height}%` }}
              ></div>
            </div>
          )
        })}
      </div>

      {/* X-axis labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-10">
        <div className="text-xs text-slate-500">Jan</div>
        <div className="text-xs text-slate-500 hidden sm:block">Mar</div>
        <div className="text-xs text-slate-500">Jun</div>
        <div className="text-xs text-slate-500 hidden sm:block">Sep</div>
        <div className="text-xs text-slate-500">Dec</div>
      </div>
    </div>
  )
}

// Downline row component
function DownlineRow({
  id,
  name,
  rank,
  joined,
  sales,
  status,
}: {
  id: string
  name: string
  rank: string
  joined: string
  sales: number
  status: string
}) {
  return (
    <div className="grid grid-cols-12 py-2 px-3 text-xs sm:text-sm hover:bg-slate-800/50">
      <div className="col-span-1 text-slate-500">{id}</div>
      <div className="col-span-3 text-slate-300">{name}</div>
      <div className="col-span-2 text-slate-400">{rank}</div>
      <div className="col-span-2 text-slate-400">{joined}</div>
      <div className="col-span-2 text-cyan-400">{formatCurrency(sales)}</div>
      <div className="col-span-2">
        <Badge
          variant="outline"
          className={`bg-${status === "active" ? "green" : "amber"}-500/10 text-${status === "active" ? "green" : "amber"}-400 border-${status === "active" ? "green" : "amber"}-500/30 text-xs`}
        >
          {status}
        </Badge>
      </div>
    </div>
  )
}

// Commission item component
function CommissionItem({
  name,
  total,
  growth,
  type,
}: {
  name: string
  total: number
  growth: number
  type: string
}) {
  return (
    <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs sm:text-sm text-slate-300">{name}</div>
        <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600/50 text-xs">
          {type}
        </Badge>
      </div>
      <div className="mb-2">
        <div className="text-base sm:text-lg font-bold text-cyan-400">{formatCurrency(total)}</div>
      </div>
      <div className="flex items-center justify-between text-xs">
        <div className={`flex items-center ${growth >= 0 ? "text-green-400" : "text-red-400"}`}>
          {growth >= 0 ? "+" : ""}
          {growth}% from last month
        </div>
        <Button variant="ghost" size="sm" className="h-6 text-xs px-2 text-slate-400 hover:text-slate-100">
          Details
        </Button>
      </div>
    </div>
  )
}

// Achievement item component
function AchievementItem({
  title,
  time,
  description,
  type,
}: {
  title: string
  time: string
  description: string
  type: "rank" | "team" | "sales" | "bonus"
}) {
  const getTypeStyles = () => {
    switch (type) {
      case "rank":
        return { icon: Award, color: "text-amber-500 bg-amber-500/10 border-amber-500/30" }
      case "team":
        return { icon: Users, color: "text-blue-500 bg-blue-500/10 border-blue-500/30" }
      case "sales":
        return { icon: TrendingUp, color: "text-green-500 bg-green-500/10 border-green-500/30" }
      case "bonus":
        return { icon: Gift, color: "text-purple-500 bg-purple-500/10 border-purple-500/30" }
      default:
        return { icon: Award, color: "text-amber-500 bg-amber-500/10 border-amber-500/30" }
    }
  }

  const { icon: Icon, color } = getTypeStyles()

  return (
    <div className="flex items-start space-x-3">
      <div className={`mt-0.5 p-1 rounded-full ${color.split(" ")[1]} ${color.split(" ")[2]}`}>
        <Icon className={`h-3 w-3 ${color.split(" ")[0]}`} />
      </div>
      <div>
        <div className="flex items-center flex-wrap">
          <div className="text-sm font-medium text-slate-200 mr-2">{title}</div>
          <div className="text-xs text-slate-500">{time}</div>
        </div>
        <div className="text-xs text-slate-400">{description}</div>
      </div>
    </div>
  )
}

// Communication item component
function CommunicationItem({
  sender,
  time,
  message,
  avatar,
  unread,
}: {
  sender: string
  time: string
  message: string
  avatar: string
  unread?: boolean
}) {
  return (
    <div className={`flex space-x-3 p-2 rounded-md ${unread ? "bg-slate-800/50 border border-slate-700/50" : ""}`}>
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarImage src={avatar} alt={sender} />
        <AvatarFallback className="bg-slate-700 text-cyan-500">{sender.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between flex-wrap">
          <div className="text-sm font-medium text-slate-200">{sender}</div>
          <div className="text-xs text-slate-500">{time}</div>
        </div>
        <div className="text-xs text-slate-400 mt-1 break-words">{message}</div>
      </div>
      {unread && (
        <div className="flex-shrink-0 self-center">
          <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
        </div>
      )}
    </div>
  )
}
