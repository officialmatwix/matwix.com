"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserPlus, TrendingUp, Calendar, Copy, Share2, Mail, MessageSquare, Download, Check } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export default function RecruitmentPage() {
  const [referralLink, setReferralLink] = useState("https://nexusmlm.com/join/ref/12345")
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Mock recruitment stats
  const recruitmentStats = {
    totalRecruits: 68,
    activeRecruits: 52,
    thisMonth: 8,
    conversionRate: 24,
  }

  // Mock prospects data
  const prospects = [
    { id: "PR1001", name: "John Smith", email: "john.smith@example.com", status: "contacted", date: "Mar 28, 2023" },
    {
      id: "PR1002",
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      status: "interested",
      date: "Mar 25, 2023",
    },
    { id: "PR1003", name: "Alex Johnson", email: "alex.johnson@example.com", status: "meeting", date: "Mar 22, 2023" },
    { id: "PR1004", name: "Lisa Chen", email: "lisa.chen@example.com", status: "contacted", date: "Mar 20, 2023" },
    {
      id: "PR1005",
      name: "James Wilson",
      email: "james.wilson@example.com",
      status: "interested",
      date: "Mar 18, 2023",
    },
    { id: "PR1006", name: "Sophia Kim", email: "sophia.kim@example.com", status: "meeting", date: "Mar 15, 2023" },
  ]

  // Mock recent recruits
  const recentRecruits = [
    { id: "1024", name: "Sarah Johnson", rank: "Gold", joined: "Jan 15, 2023", sales: 1250, status: "active" },
    { id: "1842", name: "Michael Chen", rank: "Silver", joined: "Mar 22, 2023", sales: 850, status: "active" },
    { id: "2156", name: "Jessica Williams", rank: "Bronze", joined: "Apr 10, 2023", sales: 520, status: "active" },
    { id: "3012", name: "David Rodriguez", rank: "Bronze", joined: "May 05, 2023", sales: 320, status: "active" },
  ]

  return (
    <div className="grid gap-6">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserPlus className="mr-2 h-5 w-5 text-cyan-500" />
            Recruitment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-1">Total Recruits</div>
              <div className="text-2xl font-bold text-cyan-400">{recruitmentStats.totalRecruits}</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-1">Active Recruits</div>
              <div className="text-2xl font-bold text-green-400">{recruitmentStats.activeRecruits}</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-1">This Month</div>
              <div className="text-2xl font-bold text-blue-400">{recruitmentStats.thisMonth}</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-1">Conversion Rate</div>
              <div className="text-2xl font-bold text-purple-400">{recruitmentStats.conversionRate}%</div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 mb-6">
            <div className="text-sm font-medium text-slate-300 mb-3">Your Referral Link</div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-slate-900/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm text-slate-300 overflow-hidden text-ellipsis">
                {referralLink}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="border-slate-700 bg-slate-800/50"
                onClick={copyToClipboard}
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon" className="border-slate-700 bg-slate-800/50">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline" size="sm" className="border-slate-700 bg-slate-800/50">
                <Mail className="h-3 w-3 mr-1" />
                Email
              </Button>
              <Button variant="outline" size="sm" className="border-slate-700 bg-slate-800/50">
                <MessageSquare className="h-3 w-3 mr-1" />
                Message
              </Button>
              <Button variant="outline" size="sm" className="border-slate-700 bg-slate-800/50">
                <Download className="h-3 w-3 mr-1" />
                Materials
              </Button>
            </div>
          </div>

          <Tabs defaultValue="prospects" className="w-full">
            <TabsList className="bg-slate-800/50 p-1 mb-4">
              <TabsTrigger
                value="prospects"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
              >
                Prospects
              </TabsTrigger>
              <TabsTrigger
                value="recent"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
              >
                Recent Recruits
              </TabsTrigger>
              <TabsTrigger value="tools" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
                Recruitment Tools
              </TabsTrigger>
            </TabsList>

            <TabsContent value="prospects" className="mt-0">
              <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
                  <div className="col-span-1">ID</div>
                  <div className="col-span-3">Name</div>
                  <div className="col-span-3">Email</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-2">Actions</div>
                </div>

                <div className="divide-y divide-slate-700/30">
                  {prospects.map((prospect) => (
                    <div key={prospect.id} className="grid grid-cols-12 py-3 px-3 text-sm hover:bg-slate-800/50">
                      <div className="col-span-1 text-slate-500">{prospect.id}</div>
                      <div className="col-span-3 text-slate-300">{prospect.name}</div>
                      <div className="col-span-3 text-slate-400">{prospect.email}</div>
                      <div className="col-span-2 text-slate-400">{prospect.date}</div>
                      <div className="col-span-1">
                        <Badge
                          variant="outline"
                          className={`${
                            prospect.status === "meeting"
                              ? "bg-green-500/10 text-green-400 border-green-500/30"
                              : prospect.status === "interested"
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                          } text-xs`}
                        >
                          {prospect.status}
                        </Badge>
                      </div>
                      <div className="col-span-2 flex space-x-1">
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                          Contact
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Mail className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recent" className="mt-0">
              <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
                  <div className="col-span-1">ID</div>
                  <div className="col-span-3">Name</div>
                  <div className="col-span-2">Rank</div>
                  <div className="col-span-2">Joined</div>
                  <div className="col-span-2">Sales</div>
                  <div className="col-span-2">Actions</div>
                </div>

                <div className="divide-y divide-slate-700/30">
                  {recentRecruits.map((recruit) => (
                    <div key={recruit.id} className="grid grid-cols-12 py-3 px-3 text-sm hover:bg-slate-800/50">
                      <div className="col-span-1 text-slate-500">{recruit.id}</div>
                      <div className="col-span-3 text-slate-300">{recruit.name}</div>
                      <div className="col-span-2 text-slate-400">{recruit.rank}</div>
                      <div className="col-span-2 text-slate-400">{recruit.joined}</div>
                      <div className="col-span-2 text-cyan-400">{formatCurrency(recruit.sales)}</div>
                      <div className="col-span-2 flex space-x-1">
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                          Details
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MessageSquare className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tools" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                      <Download className="h-5 w-5 text-cyan-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-300">Recruitment Materials</div>
                      <div className="text-xs text-slate-400">Presentations, brochures, and videos</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full border-slate-700 bg-slate-800/50">
                    Access Materials
                  </Button>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                      <Calendar className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-300">Recruitment Events</div>
                      <div className="text-xs text-slate-400">Webinars, meetings, and trainings</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full border-slate-700 bg-slate-800/50">
                    View Schedule
                  </Button>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                      <Mail className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-300">Email Templates</div>
                      <div className="text-xs text-slate-400">Ready-to-use recruitment emails</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full border-slate-700 bg-slate-800/50">
                    Use Templates
                  </Button>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                      <TrendingUp className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-300">Training Resources</div>
                      <div className="text-xs text-slate-400">Learn effective recruitment strategies</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full border-slate-700 bg-slate-800/50">
                    Start Training
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

