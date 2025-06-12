"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Network, Users, Activity, ChevronRight, Info, Zap } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useMatwixCompensation } from "@/context/matwix-compensation-context"

// Create a component that doesn't use hooks in the render phase
export default function BinaryTreeVisualization() {
  return <BinaryTreeContent />
}

// Separate component that safely uses the context
function BinaryTreeContent() {
  // State for loading
  const [isLoading, setIsLoading] = useState(true)

  // State for context data
  const contextData = useMatwixCompensation()

  // Fetch context data on mount
  useEffect(() => {
    // Import dynamically to avoid hooks in render phase
    const getContextData = async () => {
      try {
        setIsLoading(false)
      } catch (error) {
        console.error("Error loading Matwix context:", error)
        setIsLoading(true)
      }
    }

    getContextData()
  }, [])

  // Show loading state
  if (isLoading || !contextData) {
    return (
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-slate-100 flex items-center">
            <Network className="mr-2 h-5 w-5 text-cyan-500" />
            Binary Network Structure
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="mb-4">
              <div className="animate-spin inline-block w-8 h-8 border-2 border-current border-t-transparent text-cyan-500 rounded-full" />
            </div>
            <p className="text-slate-400">Loading network data...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Render the actual content once data is loaded
  return <BinaryTreeRenderer data={contextData} />
}

// Component that renders the binary tree with the context data
function BinaryTreeRenderer({ data }: { data: any }) {
  const { binaryTree, userPosition, stats, getRankById, getRankName, getRankColor } = data

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set([userPosition]))
  const [selectedNode, setSelectedNode] = useState<string | null>(userPosition)
  const [viewMode, setViewMode] = useState<"tree" | "volume">("tree")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Toggle node expansion
  const toggleNodeExpansion = (nodeId: string) => {
    const newExpandedNodes = new Set(expandedNodes)
    if (newExpandedNodes.has(nodeId)) {
      newExpandedNodes.delete(nodeId)
    } else {
      newExpandedNodes.add(nodeId)
    }
    setExpandedNodes(newExpandedNodes)
  }

  // Select a node
  const handleNodeSelect = (nodeId: string) => {
    setSelectedNode(nodeId)
  }

  // Get the selected node data
  const selectedNodeData = binaryTree.find((node) => node.id === selectedNode) || binaryTree[0]

  // Draw the binary tree visualization
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    canvas.width = canvas.clientWidth * dpr
    canvas.height = canvas.clientHeight * dpr
    ctx.scale(dpr, dpr)

    // Draw the binary tree
    drawBinaryTree(ctx, canvas.clientWidth, canvas.clientHeight)
  }, [binaryTree, expandedNodes, viewMode])

  // Draw the binary tree
  const drawBinaryTree = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Find the root node
    const rootNode = binaryTree.find((node) => node.id === userPosition)
    if (!rootNode) return

    // Node dimensions
    const nodeRadius = 25
    const nodeSpacing = 60
    const levelHeight = 100

    // Start drawing from the root
    drawNode(ctx, rootNode, width / 2, 50, 0, width, nodeRadius, nodeSpacing, levelHeight)
  }

  // Draw a single node and its children
  const drawNode = (
    ctx: CanvasRenderingContext2D,
    node: any,
    x: number,
    y: number,
    startX: number,
    endX: number,
    nodeRadius: number,
    nodeSpacing: number,
    levelHeight: number,
  ) => {
    // Draw node
    ctx.beginPath()
    ctx.arc(x, y, nodeRadius, 0, Math.PI * 2)

    // Fill based on view mode
    if (viewMode === "tree") {
      // Fill based on rank
      const rankColor = getRankColor(node.rank)
      ctx.fillStyle = rankColor + "40" // Add transparency
      ctx.strokeStyle = rankColor
    } else {
      // Fill based on volume
      const volumeRatio = Math.min(1, node.monthlyVolume / 1000)
      const gradient = ctx.createLinearGradient(x - nodeRadius, y - nodeRadius, x + nodeRadius, y + nodeRadius)
      gradient.addColorStop(0, `rgba(6, 182, 212, ${volumeRatio * 0.8})`) // cyan-500
      gradient.addColorStop(1, `rgba(59, 130, 246, ${volumeRatio * 0.8})`) // blue-500
      ctx.fillStyle = gradient
      ctx.strokeStyle = "#0ea5e9" // sky-500
    }

    ctx.lineWidth = 2
    ctx.fill()
    ctx.stroke()

    // Draw node text
    ctx.fillStyle = "#f8fafc" // slate-50
    ctx.font = "bold 12px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(node.name.split(" ")[0], x, y)

    // Draw node details
    ctx.font = "10px sans-serif"
    ctx.fillStyle = "#cbd5e1" // slate-300
    if (viewMode === "tree") {
      ctx.fillText(getRankName(node.rank), x, y + nodeRadius + 15)
    } else {
      ctx.fillText(`${node.monthlyVolume} PV`, x, y + nodeRadius + 15)
    }

    // Check if node is expanded
    if (!expandedNodes.has(node.id)) return

    // Draw children if they exist
    const leftChild = node.leftChild ? binaryTree.find((n) => n.id === node.leftChild) : null
    const rightChild = node.rightChild ? binaryTree.find((n) => n.id === node.rightChild) : null

    if (leftChild) {
      const leftX = startX + (x - startX) / 2
      const leftY = y + levelHeight

      // Draw line to left child
      ctx.beginPath()
      ctx.moveTo(x - nodeRadius * 0.5, y + nodeRadius * 0.5)
      ctx.lineTo(leftX + nodeRadius * 0.5, leftY - nodeRadius * 0.5)
      ctx.strokeStyle = "#475569" // slate-600
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw left child
      drawNode(ctx, leftChild, leftX, leftY, startX, x, nodeRadius, nodeSpacing, levelHeight)
    }

    if (rightChild) {
      const rightX = x + (endX - x) / 2
      const rightY = y + levelHeight

      // Draw line to right child
      ctx.beginPath()
      ctx.moveTo(x + nodeRadius * 0.5, y + nodeRadius * 0.5)
      ctx.lineTo(rightX - nodeRadius * 0.5, rightY - nodeRadius * 0.5)
      ctx.strokeStyle = "#475569" // slate-600
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw right child
      drawNode(ctx, rightChild, rightX, rightY, x, endX, nodeRadius, nodeSpacing, levelHeight)
    }
  }

  // Handle canvas click to select nodes
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) * (canvas.width / rect.width)
    const y = (e.clientY - rect.top) * (canvas.height / rect.height)

    // Check if click is on a node
    for (const node of binaryTree) {
      // Calculate node position (simplified)
      // This is a placeholder - actual implementation would need to match drawNode logic
      const nodeX = canvas.width / 2
      const nodeY = 50
      const nodeRadius = 25

      const dx = x - nodeX
      const dy = y - nodeY
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance <= nodeRadius) {
        handleNodeSelect(node.id)
        toggleNodeExpansion(node.id)
        break
      }
    }
  }

  return (
    <div className="grid gap-6">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-100 flex items-center">
              <Network className="mr-2 h-5 w-5 text-cyan-500" />
              Binary Network Structure
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className={`text-xs ${viewMode === "tree" ? "bg-slate-800" : "bg-transparent"}`}
                onClick={() => setViewMode("tree")}
              >
                <Users className="h-3.5 w-3.5 mr-1" />
                Rank View
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`text-xs ${viewMode === "volume" ? "bg-slate-800" : "bg-transparent"}`}
                onClick={() => setViewMode("volume")}
              >
                <Activity className="h-3.5 w-3.5 mr-1" />
                Volume View
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
              <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
                <div className="text-sm font-medium text-slate-300">Binary Tree Visualization</div>
                <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs">
                  Interactive
                </Badge>
              </div>
              <div className="relative h-[400px] w-full">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" onClick={handleCanvasClick} />
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-700/50 text-xs text-slate-400">
                  <div className="flex items-center mb-1">
                    <div className="h-2 w-2 rounded-full bg-cyan-500 mr-1"></div>
                    Left Leg Volume: {formatCurrency(stats.leftLegVolume)}
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
                    Right Leg Volume: {formatCurrency(stats.rightLegVolume)}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
              <div className="p-4 border-b border-slate-700/50">
                <div className="text-sm font-medium text-slate-300">Node Details</div>
              </div>
              {selectedNodeData && (
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <div
                      className="h-10 w-10 rounded-full flex items-center justify-center mr-3"
                      style={{
                        backgroundColor: `${getRankColor(selectedNodeData.rank)}20`,
                        borderColor: `${getRankColor(selectedNodeData.rank)}50`,
                        border: "1px solid",
                      }}
                    >
                      <Users className="h-5 w-5" style={{ color: getRankColor(selectedNodeData.rank) }} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-200">{selectedNodeData.name}</div>
                      <div className="text-xs text-slate-400">ID: {selectedNodeData.id}</div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <div className="text-slate-400">Rank</div>
                      <div className="font-medium" style={{ color: getRankColor(selectedNodeData.rank) }}>
                        {getRankName(selectedNodeData.rank)}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-slate-400">Position</div>
                      <div className="text-slate-200 capitalize">{selectedNodeData.position} Leg</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-slate-400">Monthly Volume</div>
                      <div className="text-cyan-400">{formatCurrency(selectedNodeData.monthlyVolume)}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-slate-400">Join Date</div>
                      <div className="text-slate-200">{selectedNodeData.joinDate}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-slate-400">Direct Recruit</div>
                      <div className="text-slate-200">{selectedNodeData.isDirectRecruit ? "Yes" : "No"}</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-700/50">
                    <div className="text-xs text-slate-400 mb-2">Downline Structure</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-slate-300">
                          <ChevronRight className="h-3.5 w-3.5 mr-1 text-cyan-500" />
                          Left Leg
                        </div>
                        <div className="text-xs text-slate-400">
                          {selectedNodeData.leftChild
                            ? binaryTree.find((n) => n.id === selectedNodeData.leftChild)?.name
                            : "Empty"}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-slate-300">
                          <ChevronRight className="h-3.5 w-3.5 mr-1 text-blue-500" />
                          Right Leg
                        </div>
                        <div className="text-xs text-slate-400">
                          {selectedNodeData.rightChild
                            ? binaryTree.find((n) => n.id === selectedNodeData.rightChild)?.name
                            : "Empty"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
              <div className="text-sm font-medium text-slate-300 mb-3 flex items-center">
                <Zap className="h-4 w-4 mr-1.5 text-amber-500" />
                Pay Leg Bonus Calculation
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <div className="text-slate-400">Pay Leg Volume</div>
                  <div className="text-cyan-400">{formatCurrency(stats.payLegVolume)}</div>
                </div>
                <div className="flex justify-between text-xs">
                  <div className="text-slate-400">Commission Rate</div>
                  <div className="text-green-400">
                    {(getRankById(stats.currentRank).payLegCommissionRate * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <div className="text-slate-300">Estimated Pay Leg Bonus</div>
                  <div className="text-amber-400">
                    {formatCurrency(stats.payLegVolume * getRankById(stats.currentRank).payLegCommissionRate)}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
              <div className="text-sm font-medium text-slate-300 mb-3 flex items-center">
                <Info className="h-4 w-4 mr-1.5 text-blue-500" />
                Binary Structure Tips
              </div>
              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex items-start">
                  <ChevronRight className="h-3.5 w-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>Balance your legs for optimal growth. The Pay Leg is always the leg with less volume.</div>
                </div>
                <div className="flex items-start">
                  <ChevronRight className="h-3.5 w-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    Your commission rate increases as you advance in rank. Current rate:{" "}
                    {(getRankById(stats.currentRank).payLegCommissionRate * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="flex items-start">
                  <ChevronRight className="h-3.5 w-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>Click on nodes in the visualization to see details and expand/collapse branches.</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
