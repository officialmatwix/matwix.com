"use client"

import { useEffect, useRef, useState } from "react"
import { useThree, Canvas } from "@react-three/fiber"
import { OrbitControls, Text } from "@react-three/drei"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import { Vector3, MathUtils } from "three"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Network, Activity, Users, ZoomIn, ZoomOut, RotateCcw, Download, Award } from "lucide-react"
import { useMatwixCompensation } from "@/context/matwix-compensation-context"
import { formatCurrency } from "@/lib/utils"

// Node types
interface NetworkNode {
  id: string
  name: string
  rank: number
  position: [number, number, number]
  volume: number
  isActive: boolean
  children: string[]
  parentId?: string
}

// Scene setup component
function NetworkScene({ nodes, selectedNode, onNodeSelect, viewMode }) {
  const { camera } = useThree()
  const groupRef = useRef()
  const { getRankColor, getRankName } = useMatwixCompensation()

  // Set initial camera position
  useEffect(() => {
    camera.position.set(0, 15, 30)
    camera.lookAt(0, 0, 0)
  }, [camera])

  // Focus on selected node
  useEffect(() => {
    if (selectedNode && groupRef.current) {
      const node = nodes.find((n) => n.id === selectedNode)
      if (node) {
        const targetPosition = new Vector3(...node.position)
        // Animate camera to focus on selected node
        const duration = 1.0
        const startPosition = camera.position.clone()
        const startTime = Date.now()

        const animate = () => {
          const now = Date.now()
          const elapsed = (now - startTime) / 1000
          const t = Math.min(elapsed / duration, 1)
          const easedT = MathUtils.smootherstep(t)

          if (t < 1) {
            requestAnimationFrame(animate)
          }

          // Move camera closer to the node but not too close
          const newPosition = new Vector3(targetPosition.x + 5, targetPosition.y + 5, targetPosition.z + 10)

          camera.position.lerpVectors(startPosition, newPosition, easedT)
          camera.lookAt(targetPosition)
        }

        animate()
      }
    }
  }, [selectedNode, nodes, camera])

  // Handle node click
  const handleNodeClick = (nodeId) => {
    onNodeSelect(nodeId)
  }

  return (
    <group ref={groupRef}>
      {/* Ambient light */}
      <ambientLight intensity={0.2} />

      {/* Directional light */}
      <directionalLight position={[10, 10, 5]} intensity={0.5} />

      {/* Point lights for dramatic effect */}
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#06b6d4" />
      <pointLight position={[-10, -10, -10]} intensity={0.2} color="#8b5cf6" />

      {/* Grid helper */}
      <gridHelper args={[50, 50, "#1e293b", "#1e293b"]} position={[0, -5, 0]} />

      {/* Nodes and connections */}
      {nodes.map((node) => (
        <group key={node.id} position={node.position}>
          {/* Node sphere */}
          <mesh onClick={() => handleNodeClick(node.id)}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color={viewMode === "rank" ? getRankColor(node.rank) : getVolumeColor(node.volume)}
              emissive={viewMode === "rank" ? getRankColor(node.rank) : getVolumeColor(node.volume)}
              emissiveIntensity={node.id === selectedNode ? 0.8 : 0.3}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Node label */}
          <Text position={[0, 1.5, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
            {node.name}
          </Text>

          {/* Connection lines to children */}
          {node.children.map((childId) => {
            const childNode = nodes.find((n) => n.id === childId)
            if (childNode) {
              return (
                <line key={`${node.id}-${childId}`}>
                  <bufferGeometry
                    attach="geometry"
                    setFromPoints={[
                      new Vector3(0, 0, 0),
                      new Vector3(
                        childNode.position[0] - node.position[0],
                        childNode.position[1] - node.position[1],
                        childNode.position[2] - node.position[2],
                      ),
                    ]}
                  />
                  <lineBasicMaterial
                    attach="material"
                    color={node.id === selectedNode || childId === selectedNode ? "#06b6d4" : "#475569"}
                    linewidth={1}
                    opacity={0.7}
                    transparent
                  />
                </line>
              )
            }
            return null
          })}
        </group>
      ))}

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </group>
  )
}

// Helper function to get color based on volume
function getVolumeColor(volume: number): string {
  if (volume > 10000) return "#f43f5e" // rose-500
  if (volume > 5000) return "#8b5cf6" // violet-500
  if (volume > 2500) return "#3b82f6" // blue-500
  if (volume > 1000) return "#06b6d4" // cyan-500
  if (volume > 500) return "#10b981" // emerald-500
  return "#6b7280" // gray-500
}

// Main component
export default function HolographicNetwork() {
  const [viewMode, setViewMode] = useState("rank")
  const [selectedNode, setSelectedNode] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [networkData, setNetworkData] = useState<NetworkNode[]>([])
  const { getRankName, getRankColor } = useMatwixCompensation()

  // Generate sample network data
  useEffect(() => {
    // This would normally come from an API
    const generateNetworkData = () => {
      const rootNode: NetworkNode = {
        id: "root",
        name: "You",
        rank: 4, // Specialist
        position: [0, 0, 0],
        volume: 5000,
        isActive: true,
        children: ["left1", "right1"],
      }

      const leftNode1: NetworkNode = {
        id: "left1",
        name: "Alice",
        rank: 3, // Navigator
        position: [-8, -3, -5],
        volume: 2500,
        isActive: true,
        children: ["left2", "left3"],
        parentId: "root",
      }

      const rightNode1: NetworkNode = {
        id: "right1",
        name: "Bob",
        rank: 2, // Pioneer
        position: [8, -3, -5],
        volume: 1500,
        isActive: true,
        children: ["right2", "right3"],
        parentId: "root",
      }

      const leftNode2: NetworkNode = {
        id: "left2",
        name: "Charlie",
        rank: 2, // Pioneer
        position: [-12, -6, -10],
        volume: 1000,
        isActive: true,
        children: [],
        parentId: "left1",
      }

      const leftNode3: NetworkNode = {
        id: "left3",
        name: "Diana",
        rank: 1, // Visionary
        position: [-4, -6, -10],
        volume: 800,
        isActive: false,
        children: [],
        parentId: "left1",
      }

      const rightNode2: NetworkNode = {
        id: "right2",
        name: "Edward",
        rank: 1, // Visionary
        position: [4, -6, -10],
        volume: 700,
        isActive: true,
        children: [],
        parentId: "right1",
      }

      const rightNode3: NetworkNode = {
        id: "right3",
        name: "Fiona",
        rank: 1, // Visionary
        position: [12, -6, -10],
        volume: 500,
        isActive: true,
        children: [],
        parentId: "right1",
      }

      return [rootNode, leftNode1, rightNode1, leftNode2, leftNode3, rightNode2, rightNode3]
    }

    // Simulate loading
    setTimeout(() => {
      setNetworkData(generateNetworkData())
      setSelectedNode("root")
      setIsLoading(false)
    }, 1500)
  }, [])

  // Handle node selection
  const handleNodeSelect = (nodeId) => {
    setSelectedNode(nodeId)
  }

  // Handle zoom controls
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 2))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5))
  }

  const handleReset = () => {
    setZoomLevel(1)
    setSelectedNode("root")
  }

  // Get selected node data
  const selectedNodeData = networkData.find((node) => node.id === selectedNode)

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="border-b border-slate-700/50 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-100 flex items-center text-base sm:text-lg">
            <Network className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-cyan-500" />
            Holographic Network Visualization
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs">
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1 animate-pulse"></div>
              3D VIEW
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 h-[600px]">
          {/* 3D Visualization */}
          <div className="lg:col-span-2 relative">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full border-2 border-t-transparent border-cyan-500 animate-spin mb-4"></div>
                  <p className="text-slate-300">Loading network data...</p>
                </div>
              </div>
            ) : (
              <>
                <Canvas style={{ background: "linear-gradient(to bottom, #0f172a, #020617)" }}>
                  <NetworkScene
                    nodes={networkData}
                    selectedNode={selectedNode}
                    onNodeSelect={handleNodeSelect}
                    viewMode={viewMode}
                  />
                  <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    enableRotate={true}
                    zoomSpeed={0.5}
                    rotateSpeed={0.5}
                    panSpeed={0.5}
                    minDistance={5}
                    maxDistance={50}
                  />
                </Canvas>

                {/* Controls overlay */}
                <div className="absolute bottom-4 left-4 flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleZoomIn}
                    className="bg-slate-800/70 border-slate-700"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleZoomOut}
                    className="bg-slate-800/70 border-slate-700"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleReset}
                    className="bg-slate-800/70 border-slate-700"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewMode("rank")}
                    className={`bg-slate-800/70 border-slate-700 ${viewMode === "rank" ? "text-cyan-400" : ""}`}
                  >
                    <Users className="h-4 w-4 mr-1" />
                    Rank View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewMode("volume")}
                    className={`bg-slate-800/70 border-slate-700 ${viewMode === "volume" ? "text-cyan-400" : ""}`}
                  >
                    <Activity className="h-4 w-4 mr-1" />
                    Volume View
                  </Button>
                </div>

                <div className="absolute bottom-4 right-4">
                  <Button variant="outline" size="sm" className="bg-slate-800/70 border-slate-700">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Node Details Panel */}
          <div className="border-l border-slate-700/50 bg-slate-900/80 p-4 overflow-y-auto">
            {selectedNodeData ? (
              <>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-slate-100 mb-1">{selectedNodeData.name}</h3>
                  <div className="flex items-center">
                    <div
                      className="h-3 w-3 rounded-full mr-2"
                      style={{ backgroundColor: getRankColor(selectedNodeData.rank) }}
                    ></div>
                    <span className="text-sm text-slate-300">{getRankName(selectedNodeData.rank)}</span>
                  </div>
                </div>

                <Tabs defaultValue="stats">
                  <TabsList className="bg-slate-800/50 w-full">
                    <TabsTrigger value="stats" className="flex-1">
                      Stats
                    </TabsTrigger>
                    <TabsTrigger value="network" className="flex-1">
                      Network
                    </TabsTrigger>
                    <TabsTrigger value="activity" className="flex-1">
                      Activity
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="stats" className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-1">Personal Volume</div>
                        <div className="text-lg font-bold text-cyan-400">{selectedNodeData.volume} PV</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-1">Group Volume</div>
                        <div className="text-lg font-bold text-green-400">{selectedNodeData.volume * 2.5} GV</div>
                      </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                      <div className="text-xs text-slate-500 mb-1">Rank Progress</div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden mt-2">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(selectedNodeData.volume / 100, 100)}%`,
                            background: `linear-gradient(to right, ${getRankColor(selectedNodeData.rank)}, ${getRankColor(selectedNodeData.rank + 1) || "#f43f5e"})`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-slate-500">{getRankName(selectedNodeData.rank)}</span>
                        <span className="text-xs text-slate-500">{getRankName(selectedNodeData.rank + 1)}</span>
                      </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                      <div className="text-xs text-slate-500 mb-1">Earnings</div>
                      <div className="text-lg font-bold text-amber-400">
                        {formatCurrency(selectedNodeData.volume * 0.15)}
                      </div>
                      <div className="text-xs text-green-400 mt-1">+12.5% from last month</div>
                    </div>
                  </TabsContent>

                  <TabsContent value="network" className="mt-4">
                    <div className="space-y-3">
                      {/* Parent node */}
                      {selectedNodeData.parentId && (
                        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                          <div className="text-xs text-slate-500 mb-1">Upline</div>
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center mr-2">
                              <Users className="h-4 w-4 text-slate-400" />
                            </div>
                            <div>
                              <div className="text-sm text-slate-300">
                                {networkData.find((n) => n.id === selectedNodeData.parentId)?.name || "Unknown"}
                              </div>
                              <div className="text-xs text-slate-500">
                                {getRankName(networkData.find((n) => n.id === selectedNodeData.parentId)?.rank || 0)}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Children nodes */}
                      {selectedNodeData.children.length > 0 && (
                        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                          <div className="text-xs text-slate-500 mb-1">Downline</div>
                          <div className="space-y-2 mt-2">
                            {selectedNodeData.children.map((childId) => {
                              const childNode = networkData.find((n) => n.id === childId)
                              if (childNode) {
                                return (
                                  <div key={childId} className="flex items-center">
                                    <div
                                      className="h-8 w-8 rounded-full flex items-center justify-center mr-2"
                                      style={{
                                        backgroundColor: `${getRankColor(childNode.rank)}20`,
                                        borderColor: `${getRankColor(childNode.rank)}50`,
                                        border: "1px solid",
                                      }}
                                    >
                                      <Users className="h-4 w-4" style={{ color: getRankColor(childNode.rank) }} />
                                    </div>
                                    <div>
                                      <div className="text-sm text-slate-300">{childNode.name}</div>
                                      <div className="text-xs text-slate-500">{getRankName(childNode.rank)}</div>
                                    </div>
                                    <div className="ml-auto">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 px-2 text-xs"
                                        onClick={() => setSelectedNode(childId)}
                                      >
                                        View
                                      </Button>
                                    </div>
                                  </div>
                                )
                              }
                              return null
                            })}
                          </div>
                        </div>
                      )}

                      {/* Network stats */}
                      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-1">Network Stats</div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div>
                            <div className="text-xs text-slate-500">Team Size</div>
                            <div className="text-sm text-slate-300">{selectedNodeData.children.length} direct</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500">Active Rate</div>
                            <div className="text-sm text-slate-300">
                              {Math.round(
                                (networkData.filter((n) => n.parentId === selectedNodeData.id && n.isActive).length /
                                  Math.max(1, networkData.filter((n) => n.parentId === selectedNodeData.id).length)) *
                                  100,
                              )}
                              %
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="activity" className="mt-4">
                    <div className="space-y-3">
                      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-1">Recent Activity</div>
                        <div className="space-y-2 mt-2">
                          <div className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5 mr-2">
                              <Activity className="h-3 w-3 text-green-500" />
                            </div>
                            <div>
                              <div className="text-xs text-slate-300">Completed monthly sales target</div>
                              <div className="text-xs text-slate-500">2 days ago</div>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5 mr-2">
                              <Users className="h-3 w-3 text-blue-500" />
                            </div>
                            <div>
                              <div className="text-xs text-slate-300">Recruited new team member</div>
                              <div className="text-xs text-slate-500">5 days ago</div>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5 mr-2">
                              <Award className="h-3 w-3 text-amber-500" />
                            </div>
                            <div>
                              <div className="text-xs text-slate-300">Rank advancement</div>
                              <div className="text-xs text-slate-500">2 weeks ago</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-1">Status</div>
                        <div className="flex items-center mt-2">
                          <div
                            className={`h-2 w-2 rounded-full ${selectedNodeData.isActive ? "bg-green-500" : "bg-red-500"} mr-2`}
                          ></div>
                          <div className="text-sm text-slate-300">
                            {selectedNodeData.isActive ? "Active" : "Inactive"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-slate-400">Select a node to view details</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
