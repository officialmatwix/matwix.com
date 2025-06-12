"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PinEntry } from "@/components/ui/pin-entry"
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
  Lock,
  Gift,
  Star,
} from "lucide-react"
import { useMLMData } from "@/context/mlm-data-context"
import { formatCurrency } from "@/lib/utils"

export default function BankingPage() {
  const { commissions } = useMLMData()
  const [dateRange, setDateRange] = useState("This Month")
  const [isPinModalOpen, setIsPinModalOpen] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("breakdown")
  const [isMounted, setIsMounted] = useState(false)

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

  // Mock bonuses data
  const bonusesData = [
    {
      id: "BN-1001",
      name: "Fast Start Bonus",
      amount: 500,
      date: "Mar 15, 2023",
      status: "Paid",
      description: "Bonus for recruiting 3 new members in your first month",
    },
    {
      id: "BN-1002",
      name: "Leadership Bonus",
      amount: 750,
      date: "Mar 20, 2023",
      status: "Paid",
      description: "Bonus for achieving Gold rank",
    },
    {
      id: "BN-1003",
      name: "Team Performance Bonus",
      amount: 1200,
      date: "Mar 25, 2023",
      status: "Paid",
      description: "Bonus for team exceeding 10,000 PV",
    },
    {
      id: "BN-1004",
      name: "Rank Advancement Bonus",
      amount: 2000,
      date: "Apr 05, 2023",
      status: "Pending",
      description: "Bonus for advancing to Platinum rank",
    },
    {
      id: "BN-1005",
      name: "Anniversary Bonus",
      amount: 300,
      date: "Apr 10, 2023",
      status: "Pending",
      description: "Bonus for 1 year with the company",
    },
  ]

  // Mock upcoming bonuses
  const upcomingBonuses = [
    {
      id: "BN-1006",
      name: "Car Bonus",
      amount: 500,
      eligibilityDate: "May 01, 2023",
      requirements: "Maintain Diamond rank for 3 consecutive months",
      progress: 67,
    },
    {
      id: "BN-1007",
      name: "Travel Incentive",
      amount: 2000,
      eligibilityDate: "Jun 15, 2023",
      requirements: "Achieve 25,000 GV for 3 consecutive months",
      progress: 45,
    },
    {
      id: "BN-1008",
      name: "Leadership Pool",
      amount: null,
      eligibilityDate: "Jul 01, 2023",
      requirements: "Qualify as Executive rank",
      progress: 30,
    },
  ]

  useEffect(() => {
    // Mark component as mounted
    setIsMounted(true)

    // Only access localStorage/sessionStorage after component has mounted (client-side)
    if (typeof window !== "undefined") {
      // Check if PIN is set
      const hasPin = !!localStorage.getItem("bankingPin")

      // Check if PIN has been verified for this session
      const isPinVerified = sessionStorage.getItem("bankingPinVerified") === "true"

      if (hasPin && !isPinVerified) {
        setIsPinModalOpen(true)
        setIsAuthorized(false)
      } else {
        setIsAuthorized(true)
      }
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Only access sessionStorage after component has mounted (client-side)
    if (isMounted && typeof window !== "undefined") {
      // Get the active tab from sessionStorage if it exists
      const storedActiveTab = sessionStorage.getItem("bankingActiveTab")
      if (storedActiveTab) {
        // Set the active tab
        setActiveTab(storedActiveTab)
        // Clear it from sessionStorage
        sessionStorage.removeItem("bankingActiveTab")
      }
    }
  }, [isMounted])

  const handlePinSuccess = () => {
    setIsPinModalOpen(false)
    setIsAuthorized(true)
    // Set session storage to remember PIN verification for this session
    if (typeof window !== "undefined") {
      sessionStorage.setItem("bankingPinVerified", "true")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="grid gap-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="bg-slate-800 p-6 rounded-full mb-4">
              <Lock className="h-12 w-12 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-100 mb-2">Banking Section Protected</h2>
            <p className="text-slate-400 text-center max-w-md mb-6">
              This section contains sensitive financial information and is protected with a PIN.
            </p>
            <Button onClick={() => setIsPinModalOpen(true)} className="bg-cyan-600 hover:bg-cyan-700">
              <Lock className="h-4 w-4 mr-2" />
              Enter PIN to Access
            </Button>
          </CardContent>
        </Card>

        <PinEntry
          isOpen={isPinModalOpen}
          onClose={() => setIsPinModalOpen(false)}
          onSuccess={handlePinSuccess}
          title="Enter Banking PIN"
          description="Please enter your 6-digit PIN to access your Banking information"
        />
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-cyan-500" />
            Banking
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

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
              <TabsTrigger
                value="bonuses"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
              >
                Bonuses
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

            <TabsContent value="bonuses" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center mb-2">
                    <Gift className="h-5 w-5 mr-2 text-purple-400" />
                    <div className="text-sm font-medium text-slate-300">Total Bonuses</div>
                  </div>
                  <div className="text-2xl font-bold text-purple-400 mb-1">{formatCurrency(4750)}</div>
                  <div className="text-xs text-green-400 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +15.2% from last quarter
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center mb-2">
                    <Star className="h-5 w-5 mr-2 text-amber-400" />
                    <div className="text-sm font-medium text-slate-300">Pending Bonuses</div>
                  </div>
                  <div className="text-2xl font-bold text-amber-400 mb-1">{formatCurrency(2300)}</div>
                  <div className="text-xs text-slate-400">Next qualification review in 14 days</div>
                </div>
              </div>

              <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden mb-6">
                <div className="p-3 border-b border-slate-700/50 bg-slate-800/50">
                  <h3 className="text-sm font-medium text-slate-300">Recent Bonuses</h3>
                </div>
                <div className="divide-y divide-slate-700/30">
                  {bonusesData.map((bonus) => (
                    <div key={bonus.id} className="p-4 hover:bg-slate-800/50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-sm font-medium text-slate-200">{bonus.name}</h4>
                          <p className="text-xs text-slate-400">{bonus.description}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`${
                            bonus.status === "Paid"
                              ? "bg-green-500/10 text-green-400 border-green-500/30"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          } text-xs`}
                        >
                          {bonus.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-slate-400">{bonus.date}</div>
                        <div className="text-sm font-medium text-purple-400">{formatCurrency(bonus.amount)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                <div className="p-3 border-b border-slate-700/50 bg-slate-800/50">
                  <h3 className="text-sm font-medium text-slate-300">Upcoming Bonus Opportunities</h3>
                </div>
                <div className="divide-y divide-slate-700/30">
                  {upcomingBonuses.map((bonus) => (
                    <div key={bonus.id} className="p-4 hover:bg-slate-800/50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-sm font-medium text-slate-200">{bonus.name}</h4>
                          <p className="text-xs text-slate-400">{bonus.requirements}</p>
                        </div>
                        <div className="text-xs text-cyan-400">{bonus.eligibilityDate}</div>
                      </div>
                      <div className="mb-2">
                        <div className="text-sm font-medium text-purple-400">
                          {bonus.amount ? formatCurrency(bonus.amount) : "Variable Amount"}
                        </div>
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-1.5">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-cyan-500 h-1.5 rounded-full"
                          style={{ width: `${bonus.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-slate-400">Progress</span>
                        <span className="text-xs text-slate-300">{bonus.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
