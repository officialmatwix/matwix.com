"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, DollarSign, Users, Zap } from "lucide-react"
import { useMatwixCompensation } from "@/context/matwix-compensation-context"
import { formatCurrency } from "@/lib/utils"

export default function CompensationPlan() {
  const { ranks, directSalesRate, generationRates } = useMatwixCompensation()

  const getRankName = (rankId: number) => {
    const rank = ranks.find((r) => r.id === rankId)
    return rank ? rank.name : "Unknown Rank"
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-100">Matwix Quantum Compensation Plan</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ranks">Ranks</TabsTrigger>
          <TabsTrigger value="bonuses">Bonuses</TabsTrigger>
          <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="border-b border-slate-700/50">
                <CardTitle className="text-slate-100 flex items-center text-base sm:text-lg">
                  <Award className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-cyan-500" />
                  Compensation Plan Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-slate-300 text-sm">
                  The Matwix Quantum Compensation Plan is a powerful binary structure designed to maximize your earning
                  potential. With four distinct bonus types and 11 achievement ranks, you have multiple ways to earn as
                  you build your network.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
                    <div className="flex items-center mb-2">
                      <Users className="h-4 w-4 mr-2 text-cyan-500" />
                      <h3 className="text-sm font-medium text-slate-200">Binary Structure</h3>
                    </div>
                    <p className="text-xs text-slate-400">
                      Build your network with a left and right leg. Balance your team for maximum earnings.
                    </p>
                  </div>

                  <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
                    <div className="flex items-center mb-2">
                      <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                      <h3 className="text-sm font-medium text-slate-200">Multiple Income Streams</h3>
                    </div>
                    <p className="text-xs text-slate-400">
                      Earn through direct sales, generations, pay leg, and career advancement bonuses.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="border-b border-slate-700/50">
                <CardTitle className="text-slate-100 flex items-center text-base sm:text-lg">
                  <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-cyan-500" />
                  Key Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-cyan-500/20 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs text-cyan-500">1</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-200">Unlimited Depth</h4>
                      <p className="text-xs text-slate-400">
                        Earn from your entire organization with no level restrictions.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-cyan-500/20 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs text-cyan-500">2</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-200">Spillover System</h4>
                      <p className="text-xs text-slate-400">
                        Benefit from your upline's recruiting efforts through strategic placement.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-cyan-500/20 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs text-cyan-500">3</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-200">Rank Advancement</h4>
                      <p className="text-xs text-slate-400">
                        Increase your earning potential as you progress through 11 achievement ranks.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-cyan-500/20 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs text-cyan-500">4</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-200">One-Time Bonuses</h4>
                      <p className="text-xs text-slate-400">
                        Earn substantial one-time payments when you achieve new ranks.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ranks">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-700/50">
              <CardTitle className="text-slate-100 flex items-center text-base sm:text-lg">
                <Award className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-cyan-500" />
                Rank Structure
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-400">Rank</TableHead>
                    <TableHead className="text-slate-400">Pay Leg Rate</TableHead>
                    <TableHead className="text-slate-400">One-Time Bonus</TableHead>
                    <TableHead className="text-slate-400">Group Volume (2 Legs)</TableHead>
                    <TableHead className="text-slate-400">Group Volume (4 Legs)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ranks.map((rank) => (
                    <TableRow key={rank.id} className="border-slate-700">
                      <TableCell>
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: rank.color }}></div>
                          <span className="text-slate-200">{rank.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300">{(rank.payLegCommissionRate * 100).toFixed(0)}%</TableCell>
                      <TableCell className="text-green-400">{formatCurrency(rank.oneTimePayout)}</TableCell>
                      <TableCell className="text-slate-300">
                        {rank.groupVolumeQualified2 > 0 ? formatCurrency(rank.groupVolumeQualified2) : "-"}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {rank.groupVolumeQualified4 > 0 ? formatCurrency(rank.groupVolumeQualified4) : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bonuses">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="border-b border-slate-700/50">
                <CardTitle className="text-slate-100 flex items-center text-base sm:text-lg">
                  <DollarSign className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-cyan-500" />
                  Direct Sales Bonus
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-slate-300 text-sm mb-4">
                  Earn {directSalesRate * 100}% on all personal sales and the sales of your directly recruited members.
                </p>

                <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
                  <h3 className="text-sm font-medium text-slate-200 mb-2">Example:</h3>
                  <p className="text-xs text-slate-400">
                    If your direct recruit purchases a $1,000 product, you earn ${1000 * directSalesRate} in Direct
                    Sales Bonus.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="border-b border-slate-700/50">
                <CardTitle className="text-slate-100 flex items-center text-base sm:text-lg">
                  <Users className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-cyan-500" />
                  Generation Bonus
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-slate-300 text-sm mb-4">
                  Earn from your extended network through 5 generations of recruits.
                </p>

                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-400">Generation</TableHead>
                      <TableHead className="text-slate-400">Bonus Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {generationRates.map((rate, index) => (
                      <TableRow key={index} className="border-slate-700">
                        <TableCell className="text-slate-300">Generation {index + 1}</TableCell>
                        <TableCell className="text-green-400">{(rate * 100).toFixed(1)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="border-b border-slate-700/50">
                <CardTitle className="text-slate-100 flex items-center text-base sm:text-lg">
                  <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-cyan-500" />
                  Pay Leg Bonus
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-slate-300 text-sm mb-4">
                  Earn a percentage of your weaker leg's volume based on your rank.
                </p>

                <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
                  <h3 className="text-sm font-medium text-slate-200 mb-2">How it works:</h3>
                  <p className="text-xs text-slate-400">
                    Your Pay Leg Bonus is calculated based on the volume of your weaker leg (left or right) multiplied
                    by your rank's commission rate. Higher ranks earn higher percentages, from 5% at Pioneer rank up to
                    32% at Mastermind rank.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader className="border-b border-slate-700/50">
                <CardTitle className="text-slate-100 flex items-center text-base sm:text-lg">
                  <Award className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-cyan-500" />
                  Career Bonus
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-slate-300 text-sm mb-4">
                  Receive substantial one-time payments when you achieve new ranks.
                </p>

                <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50 mb-3">
                  <h3 className="text-sm font-medium text-slate-200 mb-2">Highlights:</h3>
                  <ul className="space-y-1 text-xs text-slate-400">
                    <li>• Pioneer: {formatCurrency(ranks[1].oneTimePayout)}</li>
                    <li>• Specialist: {formatCurrency(ranks[3].oneTimePayout)}</li>
                    <li>• Innovator: {formatCurrency(ranks[5].oneTimePayout)}</li>
                    <li>• Leader: {formatCurrency(ranks[7].oneTimePayout)}</li>
                    <li>• Mastermind: {formatCurrency(ranks[10].oneTimePayout)}</li>
                  </ul>
                </div>

                <p className="text-xs text-slate-400">
                  Career Bonuses are paid once when you first achieve each rank and are in addition to your regular
                  commissions.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="qualifications">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-700/50">
              <CardTitle className="text-slate-100 flex items-center text-base sm:text-lg">
                <Users className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-cyan-500" />
                Rank Qualifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-slate-300 text-sm mb-4">
                To advance in rank, you need to meet specific qualification requirements for group volume and team
                structure.
              </p>

              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-400">Rank</TableHead>
                    <TableHead className="text-slate-400">Required Volume</TableHead>
                    <TableHead className="text-slate-400">Team Requirements</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ranks.slice(1).map((rank) => (
                    <TableRow key={rank.id} className="border-slate-700">
                      <TableCell>
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: rank.color }}></div>
                          <span className="text-slate-200">{rank.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300">
                        <div className="space-y-1">
                          <p>2 Legs: {formatCurrency(rank.groupVolumeQualified2)}</p>
                          {rank.groupVolumeQualified4 > 0 && (
                            <p>4 Legs: {formatCurrency(rank.groupVolumeQualified4)}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300">
                        <div className="space-y-1">
                          {rank.requiredRank2 > 0 && <p>2 {getRankName(rank.requiredRank2)} or higher</p>}
                          {rank.requiredRank4 > 0 && <p>4 {getRankName(rank.requiredRank4)} or higher</p>}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
