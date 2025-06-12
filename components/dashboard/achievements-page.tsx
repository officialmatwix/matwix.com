"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Award, Trophy, Users, Target, Medal, Crown, DollarSign, UserPlus } from "lucide-react"
import { useMLMData } from "@/context/mlm-data-context"

export default function AchievementsPage() {
  const { achievements, rankProgress } = useMLMData()

  // Mock badges data
  const badges = [
    {
      id: "B1001",
      name: "Fast Starter",
      description: "Recruited 5 members in first 30 days",
      earned: true,
      date: "Jan 30, 2023",
    },
    {
      id: "B1002",
      name: "Sales Champion",
      description: "Achieved $5,000 in personal sales",
      earned: true,
      date: "Feb 15, 2023",
    },
    {
      id: "B1003",
      name: "Team Builder",
      description: "Built a team of 50+ members",
      earned: true,
      date: "Mar 10, 2023",
    },
    { id: "B1004", name: "Gold Achiever", description: "Reached Gold rank", earned: true, date: "Mar 25, 2023" },
    { id: "B1005", name: "Platinum Achiever", description: "Reached Platinum rank", earned: false, progress: 75 },
    {
      id: "B1006",
      name: "Leadership Award",
      description: "Developed 3 leaders in your team",
      earned: false,
      progress: 66,
    },
    { id: "B1007", name: "Top Performer", description: "Top 10% in company sales", earned: false, progress: 82 },
    { id: "B1008", name: "Diamond Achiever", description: "Reached Diamond rank", earned: false, progress: 35 },
  ]

  // Mock rank requirements
  const rankRequirements = {
    current: "Gold",
    next: "Platinum",
    requirements: [
      { name: "Personal Volume", current: 750, required: 1000, unit: "PV" },
      { name: "Group Volume", current: 12580, required: 15000, unit: "GV" },
      { name: "Active Legs", current: 3, required: 4, unit: "legs" },
      { name: "Team Size", current: 68, required: 75, unit: "members" },
    ],
  }

  // Mock leaderboard data
  const leaderboard = [
    { rank: 1, name: "Sarah Johnson", points: 12580, badge: "Diamond" },
    { rank: 2, name: "Michael Chen", points: 10250, badge: "Platinum" },
    { rank: 3, name: "Jessica Williams", points: 9875, badge: "Platinum" },
    { rank: 4, name: "David Rodriguez", points: 8920, badge: "Gold" },
    { rank: 5, name: "Emily Taylor", points: 8450, badge: "Gold" },
    { rank: 6, name: "You", points: 7890, badge: "Gold" },
    { rank: 7, name: "Robert Kim", points: 7650, badge: "Gold" },
    { rank: 8, name: "Lisa Martinez", points: 7320, badge: "Gold" },
    { rank: 9, name: "John Smith", points: 6980, badge: "Silver" },
    { rank: 10, name: "Amanda Lee", points: 6540, badge: "Silver" },
  ]

  return (
    <div className="grid gap-6">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5 text-cyan-500" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-1">Current Rank</div>
              <div className="text-2xl font-bold text-cyan-400">Gold</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-1">Badges Earned</div>
              <div className="text-2xl font-bold text-green-400">4</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-1">Achievement Points</div>
              <div className="text-2xl font-bold text-blue-400">7,890</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-sm text-slate-400 mb-1">Leaderboard Rank</div>
              <div className="text-2xl font-bold text-purple-400">#6</div>
            </div>
          </div>

          <Tabs defaultValue="badges" className="w-full">
            <TabsList className="bg-slate-800/50 p-1 mb-4">
              <TabsTrigger
                value="badges"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
              >
                Badges
              </TabsTrigger>
              <TabsTrigger value="ranks" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
                Rank Progress
              </TabsTrigger>
              <TabsTrigger
                value="leaderboard"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
              >
                Leaderboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="badges" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {badges.map((badge) => (
                  <div key={badge.id} className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
                    <div className="h-24 bg-slate-700/50 flex items-center justify-center">
                      {badge.earned ? (
                        <Trophy className="h-12 w-12 text-amber-500" />
                      ) : (
                        <Trophy className="h-12 w-12 text-slate-500" />
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm font-medium text-slate-200">{badge.name}</div>
                        {badge.earned ? (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-xs">Earned</Badge>
                        ) : (
                          <Badge className="bg-slate-700/50 text-slate-300 border-slate-600/50 text-xs">
                            In Progress
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 mb-3">{badge.description}</div>
                      {badge.earned ? (
                        <div className="text-xs text-slate-500">Earned on {badge.date}</div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-xs text-slate-400">Progress</div>
                            <div className="text-xs text-slate-400">{badge.progress}%</div>
                          </div>
                          <Progress value={badge.progress} className="h-1.5 bg-slate-700">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                              style={{ width: `${badge.progress}%` }}
                            ></div>
                          </Progress>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ranks" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="text-center mb-4">
                    <div className="inline-block p-4 bg-slate-700/50 rounded-full mb-2">
                      <Crown className="h-8 w-8 text-amber-500" />
                    </div>
                    <div className="text-lg font-medium text-slate-200">Current Rank</div>
                    <div className="text-3xl font-bold text-amber-500 mb-1">{rankRequirements.current}</div>
                    <div className="text-sm text-slate-400">Next: {rankRequirements.next}</div>
                  </div>

                  <div className="space-y-4">
                    <div className="pt-2 mt-2 border-t border-slate-700/50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium">Platinum Qualification</div>
                        <div className="text-sm text-cyan-400">{rankProgress}%</div>
                      </div>
                      <Progress value={rankProgress} className="h-2 bg-slate-700">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-cyan-500 rounded-full"
                          style={{ width: `${rankProgress}%` }}
                        />
                      </Progress>
                    </div>

                    <div className="text-center">
                      <Button className="bg-cyan-600 hover:bg-cyan-700">
                        <Target className="h-4 w-4 mr-2" />
                        View Rank Benefits
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="text-sm font-medium text-slate-300 mb-4">Rank Requirements</div>

                  <div className="space-y-4">
                    {rankRequirements.requirements.map((req, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-sm text-slate-400">{req.name}</div>
                          <div className="text-sm text-slate-300">
                            {req.current} / {req.required} {req.unit}
                          </div>
                        </div>
                        <Progress value={(req.current / req.required) * 100} className="h-2 bg-slate-700">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                            style={{ width: `${(req.current / req.required) * 100}%` }}
                          />
                        </Progress>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
                    <div className="text-sm font-medium text-slate-300 mb-2">Rank Path</div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center mb-1">
                          <Medal className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="text-xs text-slate-400">Bronze</div>
                      </div>
                      <div className="h-0.5 flex-1 bg-green-500/30 mx-1"></div>
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center mb-1">
                          <Medal className="h-4 w-4 text-blue-500" />
                        </div>
                        <div className="text-xs text-slate-400">Silver</div>
                      </div>
                      <div className="h-0.5 flex-1 bg-green-500/30 mx-1"></div>
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center mb-1">
                          <Medal className="h-4 w-4 text-amber-500" />
                        </div>
                        <div className="text-xs text-amber-400 font-medium">Gold</div>
                      </div>
                      <div className="h-0.5 flex-1 bg-slate-600/30 mx-1"></div>
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-slate-600/20 flex items-center justify-center mb-1">
                          <Medal className="h-4 w-4 text-slate-500" />
                        </div>
                        <div className="text-xs text-slate-400">Platinum</div>
                      </div>
                      <div className="h-0.5 flex-1 bg-slate-600/30 mx-1"></div>
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-slate-600/20 flex items-center justify-center mb-1">
                          <Crown className="h-4 w-4 text-slate-500" />
                        </div>
                        <div className="text-xs text-slate-400">Diamond</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="leaderboard" className="mt-0">
              <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-5">Name</div>
                  <div className="col-span-3">Points</div>
                  <div className="col-span-3">Badge</div>
                </div>

                <div className="divide-y divide-slate-700/30">
                  {leaderboard.map((item) => (
                    <div
                      key={item.rank}
                      className={`grid grid-cols-12 py-3 px-3 text-sm ${
                        item.name === "You" ? "bg-cyan-500/10 border-l-2 border-cyan-500" : "hover:bg-slate-800/50"
                      }`}
                    >
                      <div className="col-span-1 text-slate-400">#{item.rank}</div>
                      <div className="col-span-5 text-slate-300 font-medium">{item.name}</div>
                      <div className="col-span-3 text-cyan-400">{item.points.toLocaleString()}</div>
                      <div className="col-span-3">
                        <Badge
                          variant="outline"
                          className={`${
                            item.badge === "Diamond"
                              ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                              : item.badge === "Platinum"
                                ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                                : item.badge === "Gold"
                                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                  : "bg-slate-500/10 text-slate-400 border-slate-500/30"
                          } text-xs`}
                        >
                          {item.badge}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                <div className="text-sm font-medium text-slate-300 mb-3">How Points Are Calculated</div>
                <div className="space-y-2 text-xs text-slate-400">
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-cyan-500/20 flex items-center justify-center mt-0.5 mr-2">
                      <DollarSign className="h-3 w-3 text-cyan-500" />
                    </div>
                    <div>Personal Sales: 1 point per $1 in sales</div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5 mr-2">
                      <Users className="h-3 w-3 text-green-500" />
                    </div>
                    <div>Team Size: 50 points per active team member</div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5 mr-2">
                      <UserPlus className="h-3 w-3 text-blue-500" />
                    </div>
                    <div>Recruitment: 200 points per new recruit</div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5 mr-2">
                      <Award className="h-3 w-3 text-purple-500" />
                    </div>
                    <div>Rank Advancement: 1000 points per rank level</div>
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
