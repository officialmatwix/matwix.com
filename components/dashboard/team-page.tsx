"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, Mail, Phone, MessageSquare, Calendar, Clock, DollarSign, Award } from "lucide-react"
import { useMLMData } from "@/context/mlm-data-context"
import { formatCurrency } from "@/lib/utils"

export default function TeamPage() {
  const { downlineMembers } = useMLMData()
  const [selectedMember, setSelectedMember] = useState(downlineMembers[0])

  return (
    <div className="grid gap-6">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-cyan-500" />
            Team Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Team Stats */}
            <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="text-sm text-slate-400 mb-1">Active Members</div>
                <div className="text-2xl font-bold text-cyan-400">52</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="text-sm text-slate-400 mb-1">Avg. Performance</div>
                <div className="text-2xl font-bold text-green-400">78%</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="text-sm text-slate-400 mb-1">Team Retention</div>
                <div className="text-2xl font-bold text-blue-400">92%</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="text-sm text-slate-400 mb-1">Team Growth</div>
                <div className="text-2xl font-bold text-purple-400">+15.3%</div>
              </div>
            </div>

            {/* Team Members List */}
            <div className="col-span-1 bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
              <div className="p-3 border-b border-slate-700/50 bg-slate-800/50 flex justify-between items-center">
                <div className="text-sm font-medium text-slate-300">Team Members</div>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  <UserPlus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </div>
              <div className="h-[500px] overflow-y-auto">
                {downlineMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`flex items-center p-3 hover:bg-slate-800/70 cursor-pointer ${selectedMember.id === member.id ? "bg-slate-800/70 border-l-2 border-cyan-500" : ""}`}
                    onClick={() => setSelectedMember(member)}
                  >
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt={member.name} />
                      <AvatarFallback className="bg-slate-700 text-cyan-500">{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-200">{member.name}</div>
                      <div className="text-xs text-slate-400">{member.rank}</div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`bg-${member.status === "active" ? "green" : "amber"}-500/10 text-${member.status === "active" ? "green" : "amber"}-400 border-${member.status === "active" ? "green" : "amber"}-500/30 text-xs`}
                    >
                      {member.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Member Details */}
            <div className="col-span-2 bg-slate-800/30 rounded-lg border border-slate-700/50">
              <div className="p-4 border-b border-slate-700/50 bg-slate-800/50 flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt={selectedMember.name} />
                  <AvatarFallback className="bg-slate-700 text-cyan-500">
                    {selectedMember.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-lg font-medium text-slate-200">{selectedMember.name}</div>
                  <div className="text-sm text-slate-400">Member ID: {selectedMember.id}</div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" className="h-8 w-8 border-slate-700 bg-slate-800/50">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 border-slate-700 bg-slate-800/50">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 border-slate-700 bg-slate-800/50">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="overview" className="p-4">
                <TabsList className="bg-slate-800/50 p-1 mb-4">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="performance"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Performance
                  </TabsTrigger>
                  <TabsTrigger
                    value="downline"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Downline
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-0 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                      <div className="text-xs text-slate-500 mb-1">Rank</div>
                      <div className="text-sm font-medium text-slate-200">{selectedMember.rank}</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                      <div className="text-xs text-slate-500 mb-1">Joined</div>
                      <div className="text-sm font-medium text-slate-200">{selectedMember.joined}</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                      <div className="text-xs text-slate-500 mb-1">Status</div>
                      <div className="text-sm font-medium text-slate-200">{selectedMember.status}</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                      <div className="text-xs text-slate-500 mb-1">Sales</div>
                      <div className="text-sm font-medium text-slate-200">{formatCurrency(selectedMember.sales)}</div>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="text-sm font-medium text-slate-300 mb-2">Contact Information</div>
                    <div className="space-y-2">
                      <div className="flex items-center text-xs">
                        <Mail className="h-3 w-3 mr-2 text-slate-500" />
                        <span className="text-slate-400">
                          {selectedMember.name.toLowerCase().replace(" ", ".")}@example.com
                        </span>
                      </div>
                      <div className="flex items-center text-xs">
                        <Phone className="h-3 w-3 mr-2 text-slate-500" />
                        <span className="text-slate-400">+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <Calendar className="h-3 w-3 mr-2 text-slate-500" />
                        <span className="text-slate-400">Last Activity: 2 days ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="text-sm font-medium text-slate-300 mb-2">Recent Activity</div>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5 mr-2">
                          <UserPlus className="h-3 w-3 text-blue-500" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-300">Recruited a new member</div>
                          <div className="text-xs text-slate-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> 3 days ago
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5 mr-2">
                          <DollarSign className="h-3 w-3 text-green-500" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-300">Achieved sales target</div>
                          <div className="text-xs text-slate-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> 5 days ago
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5 mr-2">
                          <Award className="h-3 w-3 text-purple-500" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-300">Rank advancement</div>
                          <div className="text-xs text-slate-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> 2 weeks ago
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="performance" className="mt-0">
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 mb-4">
                    <div className="text-sm font-medium text-slate-300 mb-3">Sales Performance</div>
                    <div className="h-40 flex items-end justify-between px-2">
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

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                      <div className="text-sm font-medium text-slate-300 mb-2">Key Metrics</div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-slate-400">Personal Sales</div>
                          <div className="text-xs font-medium text-cyan-400">
                            {formatCurrency(selectedMember.sales)}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-slate-400">Group Sales</div>
                          <div className="text-xs font-medium text-cyan-400">
                            {formatCurrency(selectedMember.sales * 3.5)}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-slate-400">Commissions Earned</div>
                          <div className="text-xs font-medium text-cyan-400">
                            {formatCurrency(selectedMember.sales * 0.15)}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-slate-400">Recruitment Rate</div>
                          <div className="text-xs font-medium text-cyan-400">2.3 per month</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                      <div className="text-sm font-medium text-slate-300 mb-2">Rank Progress</div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-xs text-slate-400">Personal Volume</div>
                            <div className="text-xs text-slate-400">75%</div>
                          </div>
                          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                              style={{ width: "75%" }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-xs text-slate-400">Group Volume</div>
                            <div className="text-xs text-slate-400">62%</div>
                          </div>
                          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                              style={{ width: "62%" }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-xs text-slate-400">Team Size</div>
                            <div className="text-xs text-slate-400">85%</div>
                          </div>
                          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                              style={{ width: "85%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="downline" className="mt-0">
                  <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
                    <div className="p-3 border-b border-slate-700/50 bg-slate-800/70 flex justify-between items-center">
                      <div className="text-sm font-medium text-slate-300">Direct Downline (3)</div>
                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                        View All
                      </Button>
                    </div>
                    <div className="divide-y divide-slate-700/30">
                      {downlineMembers.slice(0, 3).map((member) => (
                        <div key={member.id} className="flex items-center p-3 hover:bg-slate-800/50">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt={member.name} />
                            <AvatarFallback className="bg-slate-700 text-cyan-500">
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="text-sm text-slate-300">{member.name}</div>
                            <div className="text-xs text-slate-400">
                              {member.rank} • {formatCurrency(member.sales)}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
