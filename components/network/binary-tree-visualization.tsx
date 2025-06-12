"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, Plus, Info, RefreshCw } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TreeNode {
  id: string
  name: string
  rank: string
  avatar?: string
  status: "active" | "inactive"
  children: [TreeNode | null, TreeNode | null]
  volume?: {
    left: number
    right: number
  }
}

// Enhanced sample data for the binary tree
const sampleTreeData: TreeNode = {
  id: "1",
  name: "John Doe",
  rank: "Diamond",
  status: "active",
  volume: {
    left: 12500,
    right: 9800,
  },
  children: [
    {
      id: "2",
      name: "Alice Smith",
      rank: "Gold",
      status: "active",
      volume: {
        left: 5200,
        right: 3600,
      },
      children: [
        {
          id: "4",
          name: "Bob Johnson",
          rank: "Silver",
          status: "active",
          volume: {
            left: 2100,
            right: 0,
          },
          children: [
            {
              id: "8",
              name: "Emma Davis",
              rank: "Bronze",
              status: "active",
              volume: {
                left: 0,
                right: 0,
              },
              children: [null, null],
            },
            null,
          ],
        },
        {
          id: "5",
          name: "Carol Williams",
          rank: "Silver",
          status: "inactive",
          volume: {
            left: 1800,
            right: 1200,
          },
          children: [null, null],
        },
      ],
    },
    {
      id: "3",
      name: "David Brown",
      rank: "Platinum",
      status: "active",
      volume: {
        left: 4300,
        right: 5100,
      },
      children: [
        {
          id: "6",
          name: "Frank Miller",
          rank: "Silver",
          status: "active",
          volume: {
            left: 2100,
            right: 1800,
          },
          children: [null, null],
        },
        {
          id: "7",
          name: "Grace Wilson",
          rank: "Gold",
          status: "active",
          volume: {
            left: 0,
            right: 2400,
          },
          children: [
            null,
            {
              id: "9",
              name: "Henry Taylor",
              rank: "Bronze",
              status: "inactive",
              volume: {
                left: 0,
                right: 0,
              },
              children: [null, null],
            },
          ],
        },
      ],
    },
  ],
}

export default function BinaryTreeVisualization() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [autoCenter, setAutoCenter] = useState(true)

  useEffect(() => {
    if (containerRef.current) {
      setContainerSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      })
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-center the tree when the component mounts or container size changes
  useEffect(() => {
    if (autoCenter && containerSize.width > 0) {
      setPosition({ x: 0, y: 0 })
      // Adjust zoom based on container width for better initial view
      const initialZoom = Math.min(Math.max(containerSize.width / 1200, 0.6), 1.2)
      setZoom(initialZoom)
      setAutoCenter(false)
    }
  }, [containerSize, autoCenter])

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5))
  }

  const handleReset = () => {
    setPosition({ x: 0, y: 0 })
    setZoom(1)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.x
      const dy = e.clientY - dragStart.y
      setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }))
      setDragStart({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleNodeClick = (node: TreeNode) => {
    setSelectedNode(node)
  }

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true)
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      const dx = e.touches[0].clientX - dragStart.x
      const dy = e.touches[0].clientY - dragStart.y
      setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }))
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  return (
    <div className="relative w-full h-full min-h-[500px] bg-slate-900/50 rounded-lg border border-slate-800">
      <div className="absolute top-2 right-2 flex space-x-2 z-10">
        <Button
          variant="outline"
          size="sm"
          className="bg-slate-800/70 border-slate-700 hover:bg-slate-700"
          onClick={handleZoomOut}
          title="Zoom Out"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-slate-800/70 border-slate-700 hover:bg-slate-700"
          onClick={handleZoomIn}
          title="Zoom In"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-slate-800/70 border-slate-700 hover:bg-slate-700"
          onClick={handleReset}
          title="Reset View"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <div
        ref={containerRef}
        className="w-full h-full overflow-hidden cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="relative transition-transform duration-100"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transformOrigin: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <div className="absolute left-1/2 top-10 -translate-x-1/2">
            <TreeNodeComponent
              node={sampleTreeData}
              onNodeClick={handleNodeClick}
              level={0}
              position="root"
              containerWidth={containerSize.width}
            />
          </div>
        </div>
      </div>

      {selectedNode && (
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-cyan-500/50">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={selectedNode.name} />
                <AvatarFallback className="bg-slate-700 text-cyan-500">{selectedNode.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-slate-200">{selectedNode.name}</h3>
                  <Badge
                    variant="outline"
                    className={`${
                      selectedNode.status === "active"
                        ? "bg-green-500/10 text-green-400 border-green-500/30"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    } text-xs`}
                  >
                    {selectedNode.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400">
                  ID: {selectedNode.id} • Rank: {selectedNode.rank}
                </p>
                {selectedNode.volume && (
                  <p className="text-xs text-slate-400 mt-1">
                    Volume: Left {selectedNode.volume.left.toLocaleString()} • Right{" "}
                    {selectedNode.volume.right.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-700/50 border-slate-600 hover:bg-slate-700 text-xs flex-1 sm:flex-auto"
              >
                <Info className="h-3 w-3 mr-1" />
                Details
              </Button>
              <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-xs flex-1 sm:flex-auto">
                <Plus className="h-3 w-3 mr-1" />
                Add Member
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

interface TreeNodeComponentProps {
  node: TreeNode | null
  onNodeClick: (node: TreeNode) => void
  level: number
  position: "left" | "right" | "root"
  containerWidth: number
}

function TreeNodeComponent({ node, onNodeClick, level, position, containerWidth }: TreeNodeComponentProps) {
  if (!node) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center bg-slate-800/50">
          <Plus className="h-5 w-5 text-slate-600" />
        </div>
      </div>
    )
  }

  // Calculate spacing based on level and container width
  const baseSpacing = Math.max(40, containerWidth / 10)
  const spacing = baseSpacing / (level + 1)
  const horizontalOffset = spacing * Math.pow(2, 3 - level)

  const getRankColor = (rank: string) => {
    switch (rank.toLowerCase()) {
      case "diamond":
        return "border-cyan-500 bg-cyan-500/20"
      case "platinum":
        return "border-indigo-500 bg-indigo-500/20"
      case "gold":
        return "border-amber-500 bg-amber-500/20"
      case "silver":
        return "border-slate-400 bg-slate-400/20"
      case "bronze":
        return "border-orange-500 bg-orange-500/20"
      default:
        return "border-slate-500 bg-slate-500/20"
    }
  }

  // Calculate volume indicators
  const hasVolume = node.volume && (node.volume.left > 0 || node.volume.right > 0)
  const leftVolumeClass = position === "left" || position === "root" ? "bg-green-500/20" : ""
  const rightVolumeClass = position === "right" || position === "root" ? "bg-blue-500/20" : ""

  return (
    <div className="flex flex-col items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className={`w-12 h-12 rounded-full border-2 ${getRankColor(
                node.rank,
              )} flex items-center justify-center cursor-pointer hover:scale-110 transition-transform`}
              onClick={() => onNodeClick(node)}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={node.name} />
                <AvatarFallback className="bg-slate-800 text-slate-200 text-xs">
                  {node.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-slate-800 border-slate-700">
            <div className="text-xs">
              <p className="font-medium">{node.name}</p>
              <p className="text-slate-400">Rank: {node.rank}</p>
              {hasVolume && (
                <div className="mt-1">
                  <p className="text-green-400">Left: {node.volume?.left.toLocaleString()}</p>
                  <p className="text-blue-400">Right: {node.volume?.right.toLocaleString()}</p>
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Volume indicators */}
      {hasVolume && (
        <div className="flex gap-1 mt-1">
          <div
            className={`h-1 rounded-full ${leftVolumeClass}`}
            style={{ width: `${Math.min(node.volume?.left || 0, 50) / 5}px` }}
          ></div>
          <div
            className={`h-1 rounded-full ${rightVolumeClass}`}
            style={{ width: `${Math.min(node.volume?.right || 0, 50) / 5}px` }}
          ></div>
        </div>
      )}

      {(node.children[0] || node.children[1]) && (
        <>
          <div className="h-6 w-px bg-slate-700"></div>
          <div className="flex items-center">
            <div className="h-px bg-slate-700" style={{ width: `${horizontalOffset * 2}px` }}></div>
          </div>
          <div className="flex justify-between" style={{ width: `${horizontalOffset * 2}px` }}>
            <div className="flex flex-col items-center">
              <div className="h-6 w-px bg-slate-700"></div>
              <TreeNodeComponent
                node={node.children[0]}
                onNodeClick={onNodeClick}
                level={level + 1}
                position="left"
                containerWidth={containerWidth}
              />
            </div>
            <div className="flex flex-col items-center">
              <div className="h-6 w-px bg-slate-700"></div>
              <TreeNodeComponent
                node={node.children[1]}
                onNodeClick={onNodeClick}
                level={level + 1}
                position="right"
                containerWidth={containerWidth}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
