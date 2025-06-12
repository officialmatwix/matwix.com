"use client"
import { Tree, TreeNode } from "react-organizational-chart"
import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Create a custom styled node component
const StyledNode = ({ node }: { node: any }) => {
  return (
    <Card className="inline-block p-2 bg-slate-800/90 border-slate-700 shadow-md">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 border-2 border-cyan-500">
          <img src={node.avatar || "/placeholder-user.jpg"} alt={node.name} />
        </Avatar>
        <div>
          <div className="text-xs font-medium text-slate-100">{node.name}</div>
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="text-[10px] h-4 px-1 border-cyan-500/50 text-cyan-400">
              {node.rank}
            </Badge>
            <span className="text-[10px] text-slate-400">{node.joinDate}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

// Sample network data
const networkData = {
  name: "John Doe",
  rank: "Diamond",
  joinDate: "2020-01-15",
  avatar: "/placeholder-user.jpg",
  children: [
    {
      name: "Alice Smith",
      rank: "Gold",
      joinDate: "2021-03-22",
      avatar: "/placeholder-user.jpg",
      children: [
        {
          name: "Bob Johnson",
          rank: "Silver",
          joinDate: "2022-05-10",
          avatar: "/placeholder-user.jpg",
          children: [],
        },
        {
          name: "Carol Williams",
          rank: "Bronze",
          joinDate: "2022-06-15",
          avatar: "/placeholder-user.jpg",
          children: [],
        },
      ],
    },
    {
      name: "David Brown",
      rank: "Platinum",
      joinDate: "2021-02-18",
      avatar: "/placeholder-user.jpg",
      children: [
        {
          name: "Eve Davis",
          rank: "Gold",
          joinDate: "2022-01-05",
          avatar: "/placeholder-user.jpg",
          children: [
            {
              name: "Frank Miller",
              rank: "Silver",
              joinDate: "2022-08-20",
              avatar: "/placeholder-user.jpg",
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: "Grace Wilson",
      rank: "Gold",
      joinDate: "2021-05-30",
      avatar: "/placeholder-user.jpg",
      children: [],
    },
  ],
}

// Recursive function to render the tree
const renderTree = (node: any) => (
  <TreeNode key={node.name} label={<StyledNode node={node} />}>
    {node.children.map((child: any) => renderTree(child))}
  </TreeNode>
)

export function NetworkTreeExample() {
  return (
    <div className="w-full h-full overflow-auto p-8">
      <Tree lineWidth="2px" lineColor="#0891b2" lineBorderRadius="10px" label={<StyledNode node={networkData} />}>
        {networkData.children.map(renderTree)}
      </Tree>
    </div>
  )
}

export default NetworkTreeExample
