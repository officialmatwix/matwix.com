"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Calendar, Download } from "lucide-react"
import { useMatwixCompensation } from "@/context/matwix-compensation-context"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BonusHistory() {
  const { bonusHistory, stats } = useMatwixCompensation()

  // Get bonus type color
  const getBonusTypeColor = (type: string) => {
    switch (type) {
      case "direct":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "generation":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "payLeg":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "career":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  // Get bonus type label
  const getBonusTypeLabel = (type: string) => {
    switch (type) {
      case "direct":
        return "Direct Sales"
      case "generation":
        return "Generation"
      case "payLeg":
        return "Pay Leg"
      case "career":
        return "Career"
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-100">Bonus History</h1>

        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700 text-slate-200">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
              <SelectItem value="all">All Bonus Types</SelectItem>
              <SelectItem value="direct">Direct Sales</SelectItem>
              <SelectItem value="generation">Generation</SelectItem>
              <SelectItem value="payLeg">Pay Leg</SelectItem>
              <SelectItem value="career">Career</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="bg-slate-800 border-slate-700">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Total Earnings</p>
                <p className="text-2xl font-bold text-slate-100">{formatCurrency(stats.totalEarnings)}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-cyan-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Direct Sales Bonus</p>
                <p className="text-2xl font-bold text-green-400">{formatCurrency(stats.directSalesBonusEarned)}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Pay Leg Bonus</p>
                <p className="text-2xl font-bold text-purple-400">{formatCurrency(stats.payLegBonusEarned)}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Career Bonus</p>
                <p className="text-2xl font-bold text-amber-400">{formatCurrency(stats.careerBonusEarned)}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-700/50">
          <CardTitle className="text-slate-100 flex items-center text-base sm:text-lg">
            <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-cyan-500" />
            Recent Bonuses
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-400">Date</TableHead>
                <TableHead className="text-slate-400">Type</TableHead>
                <TableHead className="text-slate-400">Amount</TableHead>
                <TableHead className="text-slate-400">From</TableHead>
                <TableHead className="text-slate-400">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bonusHistory.map((bonus) => (
                <TableRow key={bonus.id} className="border-slate-700">
                  <TableCell className="text-slate-300">{bonus.date}</TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${getBonusTypeColor(bonus.type)}`}>
                      {getBonusTypeLabel(bonus.type)}
                      {bonus.generation && ` (Gen ${bonus.generation})`}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-green-400 font-medium">{formatCurrency(bonus.amount)}</TableCell>
                  <TableCell className="text-slate-300">{bonus.from}</TableCell>
                  <TableCell className="text-slate-400 text-xs max-w-[300px] truncate">{bonus.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
