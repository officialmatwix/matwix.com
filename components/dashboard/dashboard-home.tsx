"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMLMData } from "@/hooks/use-mlm-data"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { CommissionChart } from "@/components/ui/commission-chart"
import { DownlineChart } from "@/components/ui/downline-chart"
import { RankProgress } from "@/components/ui/rank-progress"
import { StatusBadge } from "@/components/ui/status-badge"
import { NotificationPanel } from "@/components/ui/notification-panel"
import { useMatwixCompensation } from "@/context/matwix-compensation-context"

export default function DashboardHome() {
  const {
    totalCommissions,
    activeDownlineMembers,
    personalVolume,
    groupVolume,
    rank,
    nextRank,
    volumeToNextRank,
    recentTransactions,
    notifications,
  } = useMLMData()

  const { bonusHistory } = useMatwixCompensation()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s an overview of your network performance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-400">Total Commissions</CardDescription>
            <CardTitle className="text-2xl font-bold text-white">
              <AnimatedCounter value={totalCommissions} prefix="$" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-slate-400">
              <span className="inline-flex items-center text-emerald-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-3 w-3 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                    clipRule="evenodd"
                  />
                </svg>
                +14.5%
              </span>{" "}
              from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-400">Active Downline</CardDescription>
            <CardTitle className="text-2xl font-bold text-white">
              <AnimatedCounter value={activeDownlineMembers} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-slate-400">
              <span className="inline-flex items-center text-emerald-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-3 w-3 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                    clipRule="evenodd"
                  />
                </svg>
                +3
              </span>{" "}
              new members this week
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-400">Personal Volume</CardDescription>
            <CardTitle className="text-2xl font-bold text-white">
              <AnimatedCounter value={personalVolume} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-slate-400">
              <span className="inline-flex items-center text-emerald-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-3 w-3 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                    clipRule="evenodd"
                  />
                </svg>
                +210
              </span>{" "}
              from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-400">Group Volume</CardDescription>
            <CardTitle className="text-2xl font-bold text-white">
              <AnimatedCounter value={groupVolume} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-slate-400">
              <span className="inline-flex items-center text-emerald-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-3 w-3 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                    clipRule="evenodd"
                  />
                </svg>
                +1,245
              </span>{" "}
              from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        <Card className="md:col-span-4 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 shadow-lg">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="commissions">
              <TabsList className="mb-4 bg-slate-800">
                <TabsTrigger value="commissions">Commissions</TabsTrigger>
                <TabsTrigger value="downline">Downline Growth</TabsTrigger>
              </TabsList>
              <TabsContent value="commissions" className="h-[300px]">
                <CommissionChart />
              </TabsContent>
              <TabsContent value="downline" className="h-[300px]">
                <DownlineChart />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 shadow-lg">
          <CardHeader>
            <CardTitle>Rank Progress</CardTitle>
            <CardDescription className="text-slate-400">
              Current Rank: <StatusBadge status={rank} />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RankProgress
              currentRank={rank}
              nextRank={nextRank}
              progress={Math.min(100, (personalVolume / volumeToNextRank) * 100)}
            />
            <p className="mt-4 text-sm text-slate-400">
              You need <span className="text-purple-400 font-semibold">{volumeToNextRank - personalVolume}</span> more
              volume to reach {nextRank}.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 shadow-lg">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between border-b border-slate-700 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === "commission"
                          ? "bg-purple-500/20 text-purple-400"
                          : transaction.type === "bonus"
                            ? "bg-cyan-500/20 text-cyan-400"
                            : "bg-emerald-500/20 text-emerald-400"
                      }`}
                    >
                      {transaction.type === "commission" ? "$" : transaction.type === "bonus" ? "B" : "R"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">{transaction.description}</p>
                      <p className="text-xs text-slate-400">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-medium ${transaction.amount > 0 ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-slate-400">{transaction.source}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 shadow-lg">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <NotificationPanel notifications={notifications} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
