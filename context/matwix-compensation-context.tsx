"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define types for the Matwix compensation plan
export type RankType = {
  id: number
  name: string
  color: string
  groupVolumeQualified2: number
  groupVolumeQualified4: number
  oneTimePayout: number
  payLegCommissionRate: number
  requiredRank2: number
  requiredRank4: number
}

export type BinaryNodeType = {
  id: string
  userId: string
  name: string
  rank: number
  monthlyVolume: number
  position: "left" | "right"
  parent: string | null
  leftChild: string | null
  rightChild: string | null
  isDirectRecruit: boolean
  joinDate: string
  avatar?: string
}

export type BonusType = {
  id: string
  type: "direct" | "generation" | "payLeg" | "career"
  amount: number
  from: string
  description: string
  date: string
  generation?: number
}

export type MatwixStatsType = {
  leftLegVolume: number
  rightLegVolume: number
  payLegVolume: number
  powerLegVolume: number
  directRecruits: number
  totalTeamSize: number
  currentRank: number
  nextRank: number
  rankProgress: number
  careerBonusEarned: number
  directSalesBonusEarned: number
  generationBonusEarned: number
  payLegBonusEarned: number
  totalEarnings: number
}

type MatwixCompensationContextType = {
  ranks: RankType[]
  binaryTree: BinaryNodeType[]
  userPosition: string
  bonusHistory: BonusType[]
  stats: MatwixStatsType
  directSalesRate: number
  generationRates: number[]
  getRankById: (id: number) => RankType
  getRankName: (id: number) => string
  getRankColor: (id: number) => string
  getDirectRecruits: () => BinaryNodeType[]
  getNodeChildren: (nodeId: string) => BinaryNodeType[]
  getNodeById: (nodeId: string) => BinaryNodeType | undefined
  calculatePayLegBonus: () => number
}

// Create context
const MatwixCompensationContext = createContext<MatwixCompensationContextType | undefined>(undefined)

// Provider component
export function MatwixCompensationProvider({ children }: { children: ReactNode }) {
  // Define the ranks according to the Matwix compensation plan
  const [ranks] = useState<RankType[]>([
    {
      id: 1,
      name: "Visionary",
      color: "#6B7280", // slate-500
      groupVolumeQualified2: 0,
      groupVolumeQualified4: 0,
      oneTimePayout: 0,
      payLegCommissionRate: 0,
      requiredRank2: 0,
      requiredRank4: 0,
    },
    {
      id: 2,
      name: "Pioneer",
      color: "#60A5FA", // blue-400
      groupVolumeQualified2: 5000,
      groupVolumeQualified4: 0,
      oneTimePayout: 100,
      payLegCommissionRate: 0.05,
      requiredRank2: 0,
      requiredRank4: 0,
    },
    {
      id: 3,
      name: "Navigator",
      color: "#34D399", // emerald-400
      groupVolumeQualified2: 15000,
      groupVolumeQualified4: 0,
      oneTimePayout: 300,
      payLegCommissionRate: 0.08,
      requiredRank2: 1,
      requiredRank4: 0,
    },
    {
      id: 4,
      name: "Specialist",
      color: "#A78BFA", // violet-400
      groupVolumeQualified2: 100000,
      groupVolumeQualified4: 75000,
      oneTimePayout: 2000,
      payLegCommissionRate: 0.11,
      requiredRank2: 2,
      requiredRank4: 1,
    },
    {
      id: 5,
      name: "Mentor",
      color: "#F472B6", // pink-400
      groupVolumeQualified2: 400000,
      groupVolumeQualified4: 250000,
      oneTimePayout: 6000,
      payLegCommissionRate: 0.14,
      requiredRank2: 3,
      requiredRank4: 2,
    },
    {
      id: 6,
      name: "Innovator",
      color: "#FBBF24", // amber-400
      groupVolumeQualified2: 1300000,
      groupVolumeQualified4: 850000,
      oneTimePayout: 20000,
      payLegCommissionRate: 0.17,
      requiredRank2: 4,
      requiredRank4: 3,
    },
    {
      id: 7,
      name: "Architect",
      color: "#EC4899", // pink-500
      groupVolumeQualified2: 3900000,
      groupVolumeQualified4: 2500000,
      oneTimePayout: 60000,
      payLegCommissionRate: 0.2,
      requiredRank2: 5,
      requiredRank4: 4,
    },
    {
      id: 8,
      name: "Leader",
      color: "#8B5CF6", // violet-500
      groupVolumeQualified2: 14500000,
      groupVolumeQualified4: 10000000,
      oneTimePayout: 200000,
      payLegCommissionRate: 0.23,
      requiredRank2: 6,
      requiredRank4: 5,
    },
    {
      id: 9,
      name: "Sage",
      color: "#10B981", // emerald-500
      groupVolumeQualified2: 40000000,
      groupVolumeQualified4: 25000000,
      oneTimePayout: 350000,
      payLegCommissionRate: 0.26,
      requiredRank2: 7,
      requiredRank4: 6,
    },
    {
      id: 10,
      name: "Master",
      color: "#3B82F6", // blue-500
      groupVolumeQualified2: 80000000,
      groupVolumeQualified4: 50000000,
      oneTimePayout: 600000,
      payLegCommissionRate: 0.29,
      requiredRank2: 8,
      requiredRank4: 7,
    },
    {
      id: 11,
      name: "Mastermind",
      color: "#F59E0B", // amber-500
      groupVolumeQualified2: 120000000,
      groupVolumeQualified4: 85000000,
      oneTimePayout: 1000000,
      payLegCommissionRate: 0.32,
      requiredRank2: 9,
      requiredRank4: 8,
    },
  ])

  // Define the bonus rates
  const [directSalesRate] = useState<number>(0.08) // 8%
  const [generationRates] = useState<number[]>([0.08, 0.02, 0.01, 0.01, 0.005]) // 8%, 2%, 1%, 1%, 0.5%

  // Mock binary tree structure
  const [binaryTree, setBinaryTree] = useState<BinaryNodeType[]>([
    {
      id: "user-1",
      userId: "user-1",
      name: "You",
      rank: 4, // Specialist
      monthlyVolume: 1200,
      position: "left", // Root position doesn't matter
      parent: null,
      leftChild: "user-2",
      rightChild: "user-3",
      isDirectRecruit: false, // Self
      joinDate: "2023-01-15",
    },
    {
      id: "user-2",
      userId: "user-2",
      name: "Sarah Johnson",
      rank: 3, // Navigator
      monthlyVolume: 850,
      position: "left",
      parent: "user-1",
      leftChild: "user-4",
      rightChild: "user-5",
      isDirectRecruit: true,
      joinDate: "2023-02-10",
    },
    {
      id: "user-3",
      userId: "user-3",
      name: "Michael Chen",
      rank: 3, // Navigator
      monthlyVolume: 920,
      position: "right",
      parent: "user-1",
      leftChild: "user-6",
      rightChild: "user-7",
      isDirectRecruit: true,
      joinDate: "2023-02-15",
    },
    {
      id: "user-4",
      userId: "user-4",
      name: "Jessica Williams",
      rank: 2, // Pioneer
      monthlyVolume: 450,
      position: "left",
      parent: "user-2",
      leftChild: "user-8",
      rightChild: "user-9",
      isDirectRecruit: false,
      joinDate: "2023-03-05",
    },
    {
      id: "user-5",
      userId: "user-5",
      name: "David Rodriguez",
      rank: 2, // Pioneer
      monthlyVolume: 380,
      position: "right",
      parent: "user-2",
      leftChild: null,
      rightChild: null,
      isDirectRecruit: true,
      joinDate: "2023-03-12",
    },
    {
      id: "user-6",
      userId: "user-6",
      name: "Emily Taylor",
      rank: 2, // Pioneer
      monthlyVolume: 520,
      position: "left",
      parent: "user-3",
      leftChild: null,
      rightChild: null,
      isDirectRecruit: false,
      joinDate: "2023-03-20",
    },
    {
      id: "user-7",
      userId: "user-7",
      name: "Robert Kim",
      rank: 2, // Pioneer
      monthlyVolume: 490,
      position: "right",
      parent: "user-3",
      leftChild: "user-10",
      rightChild: "user-11",
      isDirectRecruit: true,
      joinDate: "2023-03-25",
    },
    {
      id: "user-8",
      userId: "user-8",
      name: "Amanda Lee",
      rank: 1, // Visionary
      monthlyVolume: 220,
      position: "left",
      parent: "user-4",
      leftChild: null,
      rightChild: null,
      isDirectRecruit: true,
      joinDate: "2023-04-10",
    },
    {
      id: "user-9",
      userId: "user-9",
      name: "Thomas Wilson",
      rank: 1, // Visionary
      monthlyVolume: 180,
      position: "right",
      parent: "user-4",
      leftChild: null,
      rightChild: null,
      isDirectRecruit: false,
      joinDate: "2023-04-15",
    },
    {
      id: "user-10",
      userId: "user-10",
      name: "Sophia Martinez",
      rank: 1, // Visionary
      monthlyVolume: 250,
      position: "left",
      parent: "user-7",
      leftChild: null,
      rightChild: null,
      isDirectRecruit: false,
      joinDate: "2023-04-20",
    },
    {
      id: "user-11",
      userId: "user-11",
      name: "Daniel Brown",
      rank: 1, // Visionary
      monthlyVolume: 210,
      position: "right",
      parent: "user-7",
      leftChild: null,
      rightChild: null,
      isDirectRecruit: true,
      joinDate: "2023-04-25",
    },
  ])

  // User's position in the binary tree
  const [userPosition] = useState<string>("user-1")

  // Bonus history
  const [bonusHistory, setBonusHistory] = useState<BonusType[]>([
    {
      id: "bonus-1",
      type: "direct",
      amount: 68,
      from: "Sarah Johnson",
      description: "Direct Sales Bonus (8%) from Sarah Johnson's purchase",
      date: "2023-05-10",
    },
    {
      id: "bonus-2",
      type: "direct",
      amount: 73.6,
      from: "Michael Chen",
      description: "Direct Sales Bonus (8%) from Michael Chen's purchase",
      date: "2023-05-15",
    },
    {
      id: "bonus-3",
      type: "generation",
      amount: 9,
      from: "Jessica Williams",
      description: "Generation Bonus (2%) from Jessica Williams (2nd generation)",
      date: "2023-05-20",
      generation: 2,
    },
    {
      id: "bonus-4",
      type: "payLeg",
      amount: 60.28,
      from: "Pay Leg",
      description: "Pay Leg Bonus (11%) from weaker leg volume",
      date: "2023-05-31",
    },
    {
      id: "bonus-5",
      type: "career",
      amount: 2000,
      from: "System",
      description: "Career Bonus for reaching Specialist rank",
      date: "2023-06-01",
    },
  ])

  // Stats
  const [stats, setStats] = useState<MatwixStatsType>({
    leftLegVolume: 2080, // Sum of all left leg volumes
    rightLegVolume: 2390, // Sum of all right leg volumes
    payLegVolume: 2080, // The smaller of the two legs
    powerLegVolume: 2390, // The larger of the two legs
    directRecruits: 4, // Number of direct recruits
    totalTeamSize: 10, // Total team size excluding self
    currentRank: 4, // Specialist
    nextRank: 5, // Mentor
    rankProgress: 65, // Progress to next rank (percentage)
    careerBonusEarned: 2400, // Sum of career bonuses earned
    directSalesBonusEarned: 141.6, // Sum of direct sales bonuses
    generationBonusEarned: 9, // Sum of generation bonuses
    payLegBonusEarned: 60.28, // Sum of pay leg bonuses
    totalEarnings: 2610.88, // Total of all bonuses
  })

  // Helper functions
  const getRankById = (id: number): RankType => {
    return ranks.find((rank) => rank.id === id) || ranks[0]
  }

  const getRankName = (id: number): string => {
    return getRankById(id).name
  }

  const getRankColor = (id: number): string => {
    return getRankById(id).color
  }

  const getDirectRecruits = (): BinaryNodeType[] => {
    return binaryTree.filter((node) => node.isDirectRecruit)
  }

  const getNodeChildren = (nodeId: string): BinaryNodeType[] => {
    return binaryTree.filter((node) => node.parent === nodeId)
  }

  const getNodeById = (nodeId: string): BinaryNodeType | undefined => {
    return binaryTree.find((node) => node.id === nodeId)
  }

  const calculatePayLegBonus = (): number => {
    const currentRankData = getRankById(stats.currentRank)
    return stats.payLegVolume * currentRankData.payLegCommissionRate
  }

  // Update stats periodically to simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        leftLegVolume: prev.leftLegVolume + Math.floor(Math.random() * 10),
        rightLegVolume: prev.rightLegVolume + Math.floor(Math.random() * 12),
        rankProgress: Math.min(100, prev.rankProgress + Math.floor(Math.random() * 2)),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Update pay leg and power leg volumes when left or right leg volumes change
  useEffect(() => {
    setStats((prev) => {
      const payLegVolume = Math.min(prev.leftLegVolume, prev.rightLegVolume)
      const powerLegVolume = Math.max(prev.leftLegVolume, prev.rightLegVolume)
      return {
        ...prev,
        payLegVolume,
        powerLegVolume,
      }
    })
  }, [stats.leftLegVolume, stats.rightLegVolume])

  const value = {
    ranks,
    binaryTree,
    userPosition,
    bonusHistory,
    stats,
    directSalesRate,
    generationRates,
    getRankById,
    getRankName,
    getRankColor,
    getDirectRecruits,
    getNodeChildren,
    getNodeById,
    calculatePayLegBonus,
  }

  return <MatwixCompensationContext.Provider value={value}>{children}</MatwixCompensationContext.Provider>
}

// Custom hook to use the Matwix compensation context
export function useMatwixCompensation() {
  const context = useContext(MatwixCompensationContext)
  if (context === undefined) {
    throw new Error("useMatwixCompensation must be used within a MatwixCompensationProvider")
  }
  return context
}
