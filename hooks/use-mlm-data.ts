"use client"

import { useEffect, useState } from "react"
import * as apiService from "@/lib/api-service"

export function useUsers() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await apiService.getUsers()
        setUsers(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { users, loading, error }
}

export function useNetworkData() {
  const [networkData, setNetworkData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await apiService.getNetworkData()
        setNetworkData(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { networkData, loading, error }
}

export function useCommissions(userId?: string) {
  const [commissions, setCommissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await apiService.getCommissions(userId)
        setCommissions(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  return { commissions, loading, error }
}

export function useProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await apiService.getProducts()
        setProducts(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { products, loading, error }
}

export function useAchievements(userId?: string) {
  const [achievements, setAchievements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await apiService.getAchievements(userId)
        setAchievements(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  return { achievements, loading, error }
}

export function useDashboardStats(userId?: string) {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await apiService.getDashboardStats(userId)
        setStats(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  return { stats, loading, error }
}

export function useMLMData() {
  // Fallback implementation that provides the same interface as the context version
  const [networkGrowth] = useState(85)
  const [commissionRate] = useState(42)
  const [teamActivity] = useState(68)
  const [recruitmentStatus] = useState(92)
  const [rankProgress] = useState(75)
  const [currentTime] = useState(new Date())

  // Mock downline members data
  const [downlineMembers] = useState([
    { id: "1024", name: "Sarah Johnson", rank: "Gold", joined: "Jan 15, 2023", sales: 1250, status: "active" },
    { id: "1842", name: "Michael Chen", rank: "Silver", joined: "Mar 22, 2023", sales: 850, status: "active" },
    { id: "2156", name: "Jessica Williams", rank: "Bronze", joined: "Apr 10, 2023", sales: 520, status: "active" },
    { id: "3012", name: "David Rodriguez", rank: "Bronze", joined: "May 05, 2023", sales: 320, status: "active" },
    { id: "4268", name: "Emily Taylor", rank: "New", joined: "Jul 18, 2023", sales: 150, status: "inactive" },
    { id: "5124", name: "Robert Kim", rank: "New", joined: "Aug 30, 2023", sales: 75, status: "active" },
  ])

  // Mock commissions data
  const [commissions] = useState([
    { name: "Direct Sales", total: 1250.75, growth: 12.5, type: "Direct" },
    { name: "Level 2 Bonus", total: 685.5, growth: 8.2, type: "Residual" },
    { name: "Leadership Bonus", total: 425.25, growth: 15.3, type: "Leadership" },
    { name: "Fast Start Bonus", total: 200.0, growth: -5.1, type: "Recruitment" },
  ])

  // Mock achievements data
  const [achievements] = useState([
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
  const [communications] = useState([
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

  // Mock notifications data
  const [notifications] = useState([
    {
      id: "1",
      message: "New commission payment of $250.75 has been processed",
      time: "2 hours ago",
      type: "commission",
      unread: true,
    },
    {
      id: "2",
      message: "Sarah Johnson has joined your team",
      time: "5 hours ago",
      type: "team",
      unread: true,
    },
    {
      id: "3",
      message: "You've reached 80% of your monthly sales goal",
      time: "Yesterday",
      type: "sales",
      unread: true,
    },
    {
      id: "4",
      message: "New training module available: Advanced Recruitment Strategies",
      time: "2 days ago",
      type: "system",
      unread: false,
    },
  ])

  // Add new communication function (stub)
  const addCommunication = () => {
    // Implementation would go here
  }

  return {
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
    notifications, // Added notifications to the return object
    addCommunication,
  }
}
