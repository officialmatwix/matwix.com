"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// Define the node type
interface TreeNode {
  id: string
  name: string
  rank: string
  personalVolume: number
  groupVolume: number
  children: [TreeNode | null, TreeNode | null]
  isActive: boolean
  joinDate: string
  lastActive: string
}

export default function BinaryTreeVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [networkData, setNetworkData] = useState<TreeNode | null>(null)
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null)
  const [viewMode, setViewMode] = useState<"rank" | "volume">("rank")
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())

  // Mock data for the binary tree
  const mockNetworkData: TreeNode = {
    id: "1",
    name: "You",
    rank: "Specialist",
    personalVolume: 500,
    groupVolume: 5000,
    isActive: true,
    joinDate: "2023-01-15",
    lastActive: "2023-06-20",
    children: [
      {
        id: "2",
        name: "Alice Johnson",
        rank: "Starter",
        personalVolume: 200,
        groupVolume: 1200,
        isActive: true,
        joinDate: "2023-02-10",
        lastActive: "2023-06-18",
        children: [
          {
            id: "4",
            name: "David Smith",
            rank: "Starter",
            personalVolume: 150,
            groupVolume: 150,
            isActive: true,
            joinDate: "2023-03-05",
            lastActive: "2023-06-15",
            children: [null, null],
          },
          {
            id: "5",
            name: "Emma Wilson",
            rank: "Starter",
            personalVolume: 100,
            groupVolume: 100,
            isActive: false,
            joinDate: "2023-03-15",
            lastActive: "2023-06-10",
            children: [null, null],
          },
        ],
      },
      {
        id: "3",
        name: "Bob Miller",
        rank: "Starter",
        personalVolume: 300,
        groupVolume: 1800,
        isActive: true,
        joinDate: "2023-02-20",
        lastActive: "2023-06-19",
        children: [
          {
            id: "6",
            name: "Frank Thomas",
            rank: "Starter",
            personalVolume: 200,
            groupVolume: 200,
            isActive: true,
            joinDate: "2023-04-05",
            lastActive: "2023-06-17",
            children: [null, null],
          },
          {
            id: "7",
            name: "Grace Lee",
            rank: "Starter",
            personalVolume: 150,
            groupVolume: 150,
            isActive: true,
            joinDate: "2023-04-10",
            lastActive: "2023-06-16",
            children: [null, null],
          },
        ],
      },
    ],
  }

  // Load network data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setNetworkData(mockNetworkData)
      setSelectedNode(mockNetworkData)
      setExpandedNodes(new Set([mockNetworkData.id]))
      setIsLoading(false)
    }, 1000)
  }, [])

  // Get color based on rank
  const getRankColor = (rank: string): string => {
    const rankColors: Record<string, string> = {
      Starter: "#6b7280", // gray-500
      Specialist: "#8b5cf6", // violet-500
      Consultant: "#3b82f6", // blue-500
      "Senior Consultant": "#0ea5e9", // sky-500
      Manager: "#10b981", // emerald-500
      "Senior Manager": "#f59e0b", // amber-500
      Director: "#ef4444", // red-500
      "Senior Director": "#ec4899", // pink-500
      Executive: "#6366f1", // indigo-500
      "Senior Executive": "#8b5cf6", // violet-500
      President: "#f43f5e", // rose-500
    }
    return rankColors[rank] || "#6b7280"
  }

  // Get color based on volume
  const getVolumeColor = (volume: number): string => {
    if (volume >= 5000) return "#f43f5e" // rose-500
    if (volume >= 2500) return "#8b5cf6" // violet-500
    if (volume >= 1000) return "#6366f1" // indigo-500
    if (volume >= 500) return "#3b82f6" // blue-500
    if (volume >= 250) return "#0ea5e9" // sky-500
    if (volume >= 100) return "#10b981" // emerald-500
    return "#6b7280" // gray-500
  }

  // Draw the binary tree
  const drawTree = useCallback(() => {
    if (!canvasRef.current || !networkData) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set canvas dimensions
    const width = canvas.width
    const height = canvas.height

    // Node dimensions
    const nodeRadius = 25
    const nodeSpacing = 120
    const levelHeight = 100

    // Function to draw a node
    const drawNode = (
      node: TreeNode | null,
      x: number,
      y: number,
      level: number,
      position: number,
      parentX?: number,
      parentY?: number,
    ) => {
      if (!node) {
        // Draw empty node placeholder
        ctx.beginPath()
        ctx.arc(x, y, nodeRadius / 2, 0, Math.PI * 2)
        ctx.fillStyle = "#374151" // gray-700
        ctx.fill()
        ctx.strokeStyle = "#4b5563" // gray-600
        ctx.stroke()
        return
      }

      // Draw connection line to parent
      if (parentX !== undefined && parentY !== undefined) {
        ctx.beginPath()
        ctx.moveTo(parentX, parentY + nodeRadius)
        ctx.lineTo(x, y - nodeRadius)
        ctx.strokeStyle = "#4b5563" // gray-600
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // Draw node circle
      ctx.beginPath()
      ctx.arc(x, y, nodeRadius, 0, Math.PI * 2)

      // Fill based on view mode
      if (viewMode === "rank") {
        ctx.fillStyle = getRankColor(node.rank)
      } else {
        ctx.fillStyle = getVolumeColor(node.groupVolume)
      }

      // Highlight selected node
      if (selectedNode && node.id === selectedNode.id) {
        ctx.lineWidth = 3
        ctx.strokeStyle = "#f59e0b" // amber-500
      } else {
        ctx.lineWidth = 2
        ctx.strokeStyle = "#1f2937" // gray-800
      }

      ctx.fill()
      ctx.stroke()

      // Draw node text
      ctx.fillStyle = "#ffffff"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(node.name.split(" ")[0], x, y)

      // Check if node is expanded
      const isExpanded = expandedNodes.has(node.id)

      // Draw children if expanded
      if (isExpanded) {
        const leftX = x - nodeSpacing * Math.pow(0.8, level)
        const rightX = x + nodeSpacing * Math.pow(0.8, level)
        const nextY = y + levelHeight

        // Draw left child
        drawNode(node.children[0], leftX, nextY, level + 1, position * 2, x, y)

        // Draw right child
        drawNode(node.children[1], rightX, nextY, level + 1, position * 2 + 1, x, y)
      }
    }

    // Start drawing from the root node
    const rootX = width / 2
    const rootY = 50
    drawNode(networkData, rootX, rootY, 0, 0)

    // Add click handler to canvas
    const handleCanvasClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top

      // Function to check if a node was clicked
      const findClickedNode = (
        node: TreeNode | null,
        x: number,
        y: number,
        level: number,
        position: number,
      ): TreeNode | null => {
        if (!node) return null

        // Check if click is within this node
        const distance = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2))
        if (distance <= nodeRadius) {
          return node
        }

        // Check if node is expanded
        if (expandedNodes.has(node.id)) {
          const leftX = x - nodeSpacing * Math.pow(0.8, level)
          const rightX = x + nodeSpacing * Math.pow(0.8, level)
          const nextY = y + levelHeight

          // Check left child
          const leftResult = findClickedNode(node.children[0], leftX, nextY, level + 1, position * 2)
          if (leftResult) return leftResult

          // Check right child
          const rightResult = findClickedNode(node.children[1], rightX, nextY, level + 1, position * 2 + 1)
          if (rightResult) return rightResult
        }

        return null
      }

      // Find clicked node starting from root
      const clickedNode = findClickedNode(networkData, rootX, rootY, 0, 0)

      if (clickedNode) {
        setSelectedNode(clickedNode)

        // Toggle expansion
        const newExpandedNodes = new Set(expandedNodes)
        if (newExpandedNodes.has(clickedNode.id)) {
          newExpandedNodes.delete(clickedNode.id)
        } else {
          newExpandedNodes.add(clickedNode.id)
        }
        setExpandedNodes(newExpandedNodes)

        // Redraw the tree
        drawTree()
      }
    }

    // Remove previous event listener
    canvas.removeEventListener("click", handleCanvasClick)

    // Add new event listener
    canvas.addEventListener("click", handleCanvasClick)

    // Cleanup function
    return () => {
      canvas.removeEventListener("click", handleCanvasClick)
    }
  }, [networkData, selectedNode, expandedNodes, viewMode])

  // Draw the tree when data changes
  useEffect(() => {
    if (!isLoading) {
      drawTree()
    }
  }, [drawTree, isLoading])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = canvasRef.current.offsetWidth
        canvasRef.current.height = 500
        drawTree()
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [drawTree])

  // Toggle view mode
  const toggleViewMode = () => {
    setViewMode(viewMode === "rank" ? "volume" : "rank")
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Binary Network Visualization</CardTitle>
            <Button onClick={toggleViewMode} variant="outline" size="sm">
              {viewMode === "rank" ? "Switch to Volume View" : "Switch to Rank View"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-[500px]">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative border border-slate-800 rounded-lg overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-[500px]" style={{ touchAction: "none" }} />
              </div>

              {selectedNode && (
                <Card className="bg-slate-900 border-slate-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Node Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="info">
                      <TabsList className="mb-4">
                        <TabsTrigger value="info">Info</TabsTrigger>
                        <TabsTrigger value="volume">Volume</TabsTrigger>
                        <TabsTrigger value="activity">Activity</TabsTrigger>
                      </TabsList>

                      <TabsContent value="info">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-slate-400">Name:</div>
                          <div className="text-sm font-medium">{selectedNode.name}</div>

                          <div className="text-sm text-slate-400">ID:</div>
                          <div className="text-sm font-mono">{selectedNode.id}</div>

                          <div className="text-sm text-slate-400">Rank:</div>
                          <div className="text-sm font-medium">
                            <span
                              className="inline-block w-3 h-3 rounded-full mr-1"
                              style={{ backgroundColor: getRankColor(selectedNode.rank) }}
                            ></span>
                            {selectedNode.rank}
                          </div>

                          <div className="text-sm text-slate-400">Status:</div>
                          <div className="text-sm">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                selectedNode.isActive ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
                              }`}
                            >
                              {selectedNode.isActive ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="volume">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-slate-400">Personal Volume:</div>
                          <div className="text-sm font-medium">{selectedNode.personalVolume} PV</div>

                          <div className="text-sm text-slate-400">Group Volume:</div>
                          <div className="text-sm font-medium">{selectedNode.groupVolume} GV</div>

                          <div className="text-sm text-slate-400">Left Leg:</div>
                          <div className="text-sm font-medium">
                            {selectedNode.children[0] ? selectedNode.children[0].groupVolume : 0} GV
                          </div>

                          <div className="text-sm text-slate-400">Right Leg:</div>
                          <div className="text-sm font-medium">
                            {selectedNode.children[1] ? selectedNode.children[1].groupVolume : 0} GV
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="activity">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-slate-400">Join Date:</div>
                          <div className="text-sm font-medium">{selectedNode.joinDate}</div>

                          <div className="text-sm text-slate-400">Last Active:</div>
                          <div className="text-sm font-medium">{selectedNode.lastActive}</div>

                          <div className="text-sm text-slate-400">Downline Count:</div>
                          <div className="text-sm font-medium">{countDownline(selectedNode)} members</div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Helper function to count downline members
function countDownline(node: TreeNode): number {
  if (!node) return 0

  let count = 0

  // Count left child and its downline
  if (node.children[0]) {
    count += 1 + countDownline(node.children[0])
  }

  // Count right child and its downline
  if (node.children[1]) {
    count += 1 + countDownline(node.children[1])
  }

  return count
}
