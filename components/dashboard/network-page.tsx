"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Network, Users, RefreshCw, Search, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMLMData } from "@/context/mlm-data-context"
import BinaryTreeVisualization from "@/components/network/binary-tree-visualization"

export default function NetworkPage() {
  const { networkGrowth } = useMLMData()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterValue, setFilterValue] = useState("all")

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-700/50 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-100 flex items-center text-base sm:text-lg">
              <Network className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-cyan-500" />
              Network Visualization
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
          <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-3 sm:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input
                  placeholder="Search network..."
                  className="pl-8 bg-slate-800/50 border-slate-700/50 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Label htmlFor="filter" className="text-xs text-slate-400 whitespace-nowrap">
                  Filter by:
                </Label>
                <Select value={filterValue} onValueChange={setFilterValue}>
                  <SelectTrigger id="filter" className="bg-slate-800/50 border-slate-700/50 text-sm h-9 w-full">
                    <SelectValue placeholder="All Members" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">All Members</SelectItem>
                    <SelectItem value="active">Active Only</SelectItem>
                    <SelectItem value="inactive">Inactive Only</SelectItem>
                    <SelectItem value="new">New Members</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="border-slate-700 bg-slate-800/50 text-xs h-9">
                <Filter className="mr-1 h-3 w-3" />
                Advanced Filters
              </Button>
              <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-xs h-9">
                <Users className="mr-1 h-3 w-3" />
                Add Member
              </Button>
            </div>
          </div>

          <div className="w-full h-[calc(100vh-12rem)]">
            <BinaryTreeVisualization />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-100 flex items-center text-base">
            <Network className="mr-2 h-5 w-5 text-cyan-500" />
            Network Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Total Members" value="68" change="+12%" />
            <StatCard title="Active Members" value="42" change="+8%" />
            <StatCard title="Network Depth" value="5 Levels" change="+1" />
            <StatCard title="Growth Rate" value={`${networkGrowth}%`} change="+5%" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({ title, value, change }: { title: string; value: string; change: string }) {
  const isPositive = change.startsWith("+")

  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-3 sm:p-4">
      <div className="text-xs text-slate-500 mb-1">{title}</div>
      <div className="text-xl sm:text-2xl font-bold text-slate-100 mb-1">{value}</div>
      <div className={`text-xs ${isPositive ? "text-green-400" : "text-red-400"}`}>{change} from last month</div>
    </div>
  )
}

