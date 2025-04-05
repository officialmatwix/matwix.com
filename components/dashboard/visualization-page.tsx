"use client"

import { Card, CardContent } from "@/components/ui/card"
import ParticleText from "@/components/particle-text"

export default function VisualizationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Visualization</h1>
      </div>

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="h-[calc(100vh-12rem)] w-full">
            <ParticleText />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

