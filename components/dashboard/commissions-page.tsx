"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DollarSign,
  Download,
  Calendar,
  ChevronDown,
  Filter,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { useMLMData } from "@/context/mlm-data-context"
import { formatCurrency } from "@/lib/utils"

export default function CommissionsPage() {
  const { commissions } = useMLMData()
  const [dateRange, setDateRange] = useState("This Month")

  // Mock commission history data
  const commissionHistory = [
    { id: "CM-1024", date: "Mar 28, 2023", type: "Direct Sales", amount: 245.75, status: "paid" },
    { id: "CM-1023", date: "Mar 21, 2023", type: "Level 2 Bonus", amount: 128.5, status: "paid" },
    { id: "CM-1022", date: "Mar 14, 2023", type: "Leadership Bonus", amount: 350.25, status: "paid" },
    { id: "CM-1021", date: "Mar 07, 2023", type: "Direct Sales", amount: 175.8, status: "paid" },
    { id: "CM-1020", date: "Feb 28, 2023", type: "Fast Start Bonus", amount: 200.0, status: "paid" },
    { id: "CM-1019", date: "Feb 21, 2023", type: "Level 2 Bonus", amount: 95.5, status: "paid" },
    { id: "CM-1018", date: "Feb 14, 2023", type: "Direct Sales", amount: 210.25, status: "paid" },
    { id: "CM-1017", date: "Feb 07, 2023", type: "Leadership Bonus", amount: 175.0, status: "paid" },
  ]

  // Mock upcoming commissions
  const upcomingCommissions = [
    { id: "CM-1025", date: "Apr 04, 2023", type: "Direct Sales", amount: 215.5, status: "pending" },
    { id: "CM-1026", date: "Apr 11, 2023", type: "Level 2 Bonus", amount: 110.25, status: "pending" },
    { id: "CM-1027", date: "Apr 18, 2023", type: "Leadership Bonus", estimate: true, status: "estimated" },
  ]

  return (
    <div className="grid gap-6">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-cyan-500" />
            Commissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-1">Total Earnings</div>
              <div className="text-2xl font-bold text-cyan-400">{formatCurrency(12580.75)}</div>
              <div className="text-xs text-green-400 mt-1 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12.5% from last month
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-1">This Month</div>
              <div className="text-2xl font-bold text-green-400">{formatCurrency(2361.5)}</div>
              <div className="text-xs text-green-400 mt-1 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +8.2% from last month
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-1">Pending</div>
              <div className="text-2xl font-bold text-blue-400">{formatCurrency(325.75)}</div>
              <div className="text-xs text-slate-400 mt-1">Next payout in 5 days</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-1">Projected</div>
              <div className="text-2xl font-bold text-purple-400">{formatCurrency(2580.0)}</div>
              <div className="text-xs text-amber-400 mt-1 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                Estimated for next month
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex-1 relative">
              <Button variant="outline" className="w-full justify-between border-slate-700 bg-slate-800/50">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                  <span>{dateRange}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </Button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="border-slate-700 bg-slate-800/50">
                <Filter className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon" className="border-slate-700 bg-slate-800/50">
                <Download className="h-4 w-4" />
              </Button>

              <Button className="bg-cyan-600 hover:bg-cyan-700">
                <CreditCard className="h-4 w-4 mr-2" />
                Withdraw
              </Button>
            </div>
          </div>

          <Tabs defaultValue="breakdown" className="w-full">
            <TabsList className="bg-slate-800/50 p-1 mb-4">
              <TabsTrigger
                value="breakdown"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
              >
                Breakdown
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
              >
                History
              </TabsTrigger>
              <TabsTrigger
                value="upcoming"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
              >
                Upcoming
              </TabsTrigger>
            </TabsList>

            <TabsContent value="breakdown" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {commissions.map((commission, index) => (
                  <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-slate-300">{commission.name}</div>
                      <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600/50 text-xs">
                        {commission.type}
                      </Badge>
                    </div>
                    <div className="mb-2">
                      <div className="text-lg font-bold text-cyan-400">{formatCurrency(commission.total)}</div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div
                        className={`flex items-center ${commission.growth >= 0 ? "text-green-400" : "text-red-400"}`}
                      >
                        {commission.growth >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {commission.growth >= 0 ? "+" : ""}
                        {commission.growth}% from last month
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 text-xs px-2 text-slate-400 hover:text-slate-100"
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                <div className="text-sm font-medium text-slate-300 mb-3">Commission Trends</div>
                <div className="h-64 flex items-end justify-between px-2">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const height = Math.floor(Math.random() * 70) + 20
                    return (
                      <div key={i} className="flex flex-col items-center">
                        <div
                          className="w-6 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-sm"
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="text-xs text-slate-500 mt-1">
                          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-0">
              <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
                  <div className="col-span-2">ID</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-4">Type</div>
                  <div className="col-span-2">Amount</div>
                  <div className="col-span-2">Status</div>
                </div>

                <div className="divide-y divide-slate-700/30">
                  {commissionHistory.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 py-3 px-3 text-sm hover:bg-slate-800/50">
                      <div className="col-span-2 text-slate-500">{item.id}</div>
                      <div className="col-span-2 text-slate-400">{item.date}</div>
                      <div className="col-span-4 text-slate-300">{item.type}</div>
                      <div className="col-span-2 text-cyan-400">{formatCurrency(item.amount)}</div>
                      <div className="col-span-2">
                        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="mt-0">
              <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
                  <div className="col-span-2">ID</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-4">Type</div>
                  <div className="col-span-2">Amount</div>
                  <div className="col-span-2">Status</div>
                </div>

                <div className="divide-y divide-slate-700/30">
                  {upcomingCommissions.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 py-3 px-3 text-sm hover:bg-slate-800/50">
                      <div className="col-span-2 text-slate-500">{item.id}</div>
                      <div className="col-span-2 text-slate-400">{item.date}</div>
                      <div className="col-span-4 text-slate-300">{item.type}</div>
                      <div className="col-span-2 text-cyan-400">
                        {item.estimate ? "TBD" : formatCurrency(item.amount)}
                      </div>
                      <div className="col-span-2">
                        <Badge
                          variant="outline"
                          className={`${
                            item.status === "pending"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                              : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                          } text-xs`}
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                <div className="text-sm font-medium text-slate-300 mb-3">Payout Schedule</div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                      <span className="text-sm text-slate-400">Next Payout Date</span>
                    </div>
                    <span className="text-sm text-cyan-400">April 4, 2023</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2 text-slate-500" />
                      <span className="text-sm text-slate-400">Payment Method</span>
                    </div>
                    <span className="text-sm text-slate-300">Direct Deposit</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-slate-500" />
                      <span className="text-sm text-slate-400">Estimated Amount</span>
                    </div>
                    <span className="text-sm text-cyan-400">{formatCurrency(325.75)}</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

