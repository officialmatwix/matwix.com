"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define types
type DownlineMember = {
  id: string
  name: string
  rank: string
  joined: string
  sales: number
  status: string
}

type Commission = {
  name: string
  total: number
  growth: number
  type: string
}

type Achievement = {
  title: string
  time: string
  description: string
  type: "rank" | "team" | "sales" | "bonus"
}

type Communication = {
  sender: string
  time: string
  message: string
  avatar: string
  unread: boolean
}

type MLMDataContextType = {
  networkGrowth: number
  commissionRate: number
  teamActivity: number
  recruitmentStatus: number
  rankProgress: number
  currentTime: Date
  downlineMembers: DownlineMember[]
  commissions: Commission[]
  achievements: Achievement[]
  communications: Communication[]
  addCommunication: (communication: Communication) => void
}

// Create context
const MLMDataContext = createContext<MLMDataContextType | undefined>(undefined)

// Provider component
export function MLMDataProvider({ children }: { children: ReactNode }) {
  const [networkGrowth, setNetworkGrowth] = useState(85)
  const [commissionRate, setCommissionRate] = useState(42)
  const [teamActivity, setTeamActivity] = useState(68)
  const [recruitmentStatus, setRecruitmentStatus] = useState(92)
  const [rankProgress, setRankProgress] = useState(75)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Mock downline members data
  const [downlineMembers, setDownlineMembers] = useState<DownlineMember[]>([
    { id: "1024", name: "Sarah Johnson", rank: "Gold", joined: "Jan 15, 2023", sales: 1250, status: "active" },
    { id: "1842", name: "Michael Chen", rank: "Silver", joined: "Mar 22, 2023", sales: 850, status: "active" },
    { id: "2156", name: "Jessica Williams", rank: "Bronze", joined: "Apr 10, 2023", sales: 520, status: "active" },
    { id: "3012", name: "David Rodriguez", rank: "Bronze", joined: "May 05, 2023", sales: 320, status: "active" },
    { id: "4268", name: "Emily Taylor", rank: "New", joined: "Jul 18, 2023", sales: 150, status: "inactive" },
    { id: "5124", name: "Robert Kim", rank: "New", joined: "Aug 30, 2023", sales: 75, status: "active" },
  ])

  // Mock commissions data
  const [commissions, setCommissions] = useState<Commission[]>([
    { name: "Direct Sales", total: 1250.75, growth: 12.5, type: "Direct" },
    { name: "Level 2 Bonus", total: 685.5, growth: 8.2, type: "Residual" },
    { name: "Leadership Bonus", total: 425.25, growth: 15.3, type: "Leadership" },
    { name: "Fast Start Bonus", total: 200.0, growth: -5.1, type: "Recruitment" },
  ])

  // Mock achievements data
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      title: "Gold Rank Achieved",
      time: "14 days ago",
      description: "Congratulations on reaching Gold rank!",
      type: "rank",
    },
    {
      title: "Team Size Milestone",
      time: "28 days ago",
      description: "Your team has grown to 50+ members",
      type: "team",
    },
    {
      title: "Sales Leader Award",
      time: "45 days ago",
      description: "Top 10% in sales performance this quarter",
      type: "sales",
    },
    {
      title: "Fast Start Bonus",
      time: "60 days ago",
      description: "Qualified for the Fast Start Bonus program",
      type: "bonus",
    },
  ])

  // Mock communications data
  const [communications, setCommunications] = useState<Communication[]>([
    {
      sender: "Network Admin",
      time: "15:42:12",
      message: "New product launch webinar scheduled for next Tuesday at 7 PM EST. All team members should attend.",
      avatar: "/placeholder.svg?height=40&width=40",
      unread: true,
    },
    {
      sender: "Sarah Johnson",
      time: "14:30:45",
      message: "Just recruited two new members! Looking forward to helping them get started.",
      avatar: "/placeholder.svg?height=40&width=40",
      unread: true,
    },
    {
      sender: "Michael Chen",
      time: "12:15:33",
      message: "Has anyone tried the new sales presentation? Getting great results with it!",
      avatar: "/placeholder.svg?height=40&width=40",
      unread: true,
    },
    {
      sender: "Jessica Williams",
      time: "09:05:18",
      message: "Reminder: Team call tonight at 8 PM. We'll be discussing the new compensation plan.",
      avatar: "/placeholder.svg?height=40&width=40",
      unread: true,
    },
  ])

  // Add new communication
  const addCommunication = (communication: Communication) => {
    setCommunications((prev) => [communication, ...prev])
  }

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Simulate changing data
  useEffect(() => {
    const interval = setInterval(() => {
      setCommissionRate(Math.floor(Math.random() * 30) + 30)
      setTeamActivity(Math.floor(Math.random() * 20) + 60)
      setRecruitmentStatus(Math.floor(Math.random() * 15) + 80)
      setNetworkGrowth(Math.floor(Math.random() * 10) + 80)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const value = {
    networkGrowth,
    commissionRate,
    teamActivity,
    recruitmentStatus,
    rankProgress,
    currentTime,
    downlineMembers,
    commissions,
    achievements,
    communications,
    addCommunication,
  }

  return <MLMDataContext.Provider value={value}>{children}</MLMDataContext.Provider>
}

// Custom hook to use the MLM data context
export function useMLMData() {
  const context = useContext(MLMDataContext)
  if (context === undefined) {
    throw new Error("useMLMData must be used within a MLMDataProvider")
  }
  return context
}

