"use client"

import { useState, useEffect } from "react"
import { Users, Network, BarChart3, TrendingUp, UserPlus, Search, Filter, Download, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { NetworkTree } from "@/components/ui/network-tree"
import { TeamMemberCard } from "@/components/ui/team-member-card"
import { useMLMData } from "@/hooks/use-mlm-data"
import { useLanguage } from "@/context/language-context"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NetworkPage() {
  const { teamMembers, networkStats, loading } = useMLMData()
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredMembers, setFilteredMembers] = useState(teamMembers)
  const [activeTab, setActiveTab] = useState("structure")
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    if (teamMembers) {
      setFilteredMembers(
        teamMembers.filter(
          (member) =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.rank.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      )
    }
  }, [searchQuery, teamMembers])

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  if (loading) {
    return <NetworkPageSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">{t("network")}</h1>
          <p className="text-slate-400 mt-1">{t("networkStructure")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Download className="h-4 w-4 mr-2" />
            {t("exportData")}
          </Button>
          <Button variant="outline" size="sm" className="h-9" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? t("refreshing") : t("refresh")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-purple-900/20 to-slate-900 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Users className="h-4 w-4 mr-2 text-purple-400" />
              {t("totalMembers")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-100">{networkStats.totalMembers}</div>
            <div className="flex items-center mt-1 text-sm">
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                <TrendingUp className="h-3 w-3 mr-1" />+{networkStats.memberGrowth}%
              </Badge>
              <span className="text-slate-400 ml-2">{t("fromLastMonth")}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/20 to-slate-900 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <UserPlus className="h-4 w-4 mr-2 text-blue-400" />
              {t("activeMembers")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-100">{networkStats.activeMembers}</div>
            <div className="flex items-center mt-1">
              <div className="w-full">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{t("activityRate")}</span>
                  <span className="text-blue-400">{networkStats.activityRate}%</span>
                </div>
                <Progress value={networkStats.activityRate} className="h-1.5">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                    style={{ width: `${networkStats.activityRate}%` }}
                  />
                </Progress>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-900/20 to-slate-900 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <BarChart3 className="h-4 w-4 mr-2 text-cyan-400" />
              {t("networkVolume")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-100">${networkStats.networkVolume.toLocaleString()}</div>
            <div className="flex items-center mt-1 text-sm">
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                <TrendingUp className="h-3 w-3 mr-1" />+{networkStats.volumeGrowth}%
              </Badge>
              <span className="text-slate-400 ml-2">{t("fromLastMonth")}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="structure" className="w-full" onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <TabsList className="bg-slate-800/50 p-1">
            <TabsTrigger
              value="structure"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-purple-400"
            >
              <Network className="h-4 w-4 mr-2" />
              {t("networkStructure")}
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-purple-400"
            >
              <Users className="h-4 w-4 mr-2" />
              {t("teamMembers")}
            </TabsTrigger>
            <TabsTrigger
              value="statistics"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-purple-400"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              {t("networkStatistics")}
            </TabsTrigger>
          </TabsList>

          {activeTab === "members" && (
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  type="search"
                  placeholder={t("searchMembers")}
                  className="w-full pl-9 bg-slate-800 border-slate-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-40 bg-slate-800 border-slate-700">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2 text-slate-400" />
                    <SelectValue placeholder={t("filter")} />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">{t("allMembers")}</SelectItem>
                  <SelectItem value="active">{t("activeMembers")}</SelectItem>
                  <SelectItem value="inactive">{t("inactiveMembers")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <TabsContent value="structure" className="mt-0">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <div className="h-[600px] overflow-auto">
                <NetworkTree />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
          {filteredMembers.length === 0 && (
            <div className="text-center py-12 bg-slate-900/50 border border-slate-800 rounded-lg">
              <Users className="h-12 w-12 mx-auto text-slate-600 mb-4" />
              <h3 className="text-lg font-medium text-slate-300 mb-1">{t("noMembersFound")}</h3>
              <p className="text-slate-400 max-w-md mx-auto">{t("tryDifferentSearch")}</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="statistics" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">{t("membershipGrowth")}</CardTitle>
                <CardDescription>{t("last12Months")}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-80 flex items-center justify-center">
                  <div className="text-slate-500 text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>{t("membershipGrowthChart")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">{t("rankDistribution")}</CardTitle>
                <CardDescription>{t("byMemberRank")}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-80 flex items-center justify-center">
                  <div className="text-slate-500 text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>{t("rankDistributionChart")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">{t("topPerformers")}</CardTitle>
                <CardDescription>{t("byVolume")}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-800">
                        <th className="text-left p-4 text-slate-400 font-medium">{t("member")}</th>
                        <th className="text-left p-4 text-slate-400 font-medium">{t("rank")}</th>
                        <th className="text-left p-4 text-slate-400 font-medium">{t("personalVolume")}</th>
                        <th className="text-left p-4 text-slate-400 font-medium">{t("groupVolume")}</th>
                        <th className="text-left p-4 text-slate-400 font-medium">{t("directReferrals")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamMembers.slice(0, 5).map((member) => (
                        <tr key={member.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                          <td className="p-4">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-3">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback className="bg-slate-700 text-slate-300">
                                  {member.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-slate-200">{member.name}</div>
                                <div className="text-xs text-slate-400">{member.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
                              {member.rank}
                            </Badge>
                          </td>
                          <td className="p-4 text-slate-200">${member.personalVolume.toLocaleString()}</td>
                          <td className="p-4 text-slate-200">${member.groupVolume.toLocaleString()}</td>
                          <td className="p-4 text-slate-200">{member.directReferrals}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="border-t border-slate-800 p-4">
                <Button variant="outline" size="sm" className="ml-auto">
                  {t("viewAllMembers")}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function NetworkPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Skeleton className="h-8 w-48 bg-slate-800" />
          <Skeleton className="h-4 w-64 bg-slate-800 mt-2" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-32 bg-slate-800" />
          <Skeleton className="h-9 w-32 bg-slate-800" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-slate-900/50 border-slate-800">
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-32 bg-slate-800" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 bg-slate-800 mb-2" />
              <Skeleton className="h-4 w-40 bg-slate-800" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-80 bg-slate-800" />
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="p-6">
            <div className="h-[600px] flex items-center justify-center">
              <Skeleton className="h-full w-full bg-slate-800/50 rounded-lg" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
