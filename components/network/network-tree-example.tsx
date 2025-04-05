"use client"

import BinaryTreeVisualization from "./binary-tree-visualization"

// Sample network data
const sampleNetworkData = {
  id: "1001",
  name: "John Doe",
  rank: "Diamond",
  status: "active" as const,
  personalVolume: 1250,
  groupVolume: 15750,
  joinDate: "Jan 15, 2022",
  left: {
    id: "1002",
    name: "Sarah Johnson",
    rank: "Platinum",
    status: "active" as const,
    personalVolume: 950,
    groupVolume: 8500,
    joinDate: "Mar 22, 2022",
    left: {
      id: "1004",
      name: "Michael Chen",
      rank: "Gold",
      status: "active" as const,
      personalVolume: 650,
      groupVolume: 3200,
      joinDate: "Jun 10, 2022",
      left: {
        id: "1008",
        name: "Lisa Martinez",
        rank: "Silver",
        status: "active" as const,
        personalVolume: 420,
        groupVolume: 1200,
        joinDate: "Sep 05, 2022",
      },
      right: {
        id: "1009",
        name: "Robert Kim",
        rank: "Bronze",
        status: "inactive" as const,
        personalVolume: 180,
        groupVolume: 180,
        joinDate: "Oct 15, 2022",
      },
    },
    right: {
      id: "1005",
      name: "Emily Taylor",
      rank: "Silver",
      status: "active" as const,
      personalVolume: 380,
      groupVolume: 1800,
      joinDate: "Jul 18, 2022",
    },
  },
  right: {
    id: "1003",
    name: "David Rodriguez",
    rank: "Gold",
    status: "active" as const,
    personalVolume: 780,
    groupVolume: 4200,
    joinDate: "Apr 05, 2022",
    left: {
      id: "1006",
      name: "Jessica Williams",
      rank: "Silver",
      status: "active" as const,
      personalVolume: 450,
      groupVolume: 1500,
      joinDate: "Aug 30, 2022",
    },
    right: {
      id: "1007",
      name: "Alex Johnson",
      rank: "Bronze",
      status: "inactive" as const,
      personalVolume: 220,
      groupVolume: 220,
      joinDate: "Sep 12, 2022",
    },
  },
}

export default function NetworkTreeExample() {
  return (
    <div className="grid gap-6">
      <BinaryTreeVisualization rootMember={sampleNetworkData} />
    </div>
  )
}

