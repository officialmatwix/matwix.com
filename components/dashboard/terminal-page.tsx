"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuantumTerminal } from "@/components/quantum-terminal"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TerminalPage() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-slate-700 bg-slate-800/50"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Terminal</h1>
        </div>
      </div>

      <Card className="bg-slate-900/50 border-slate-700/50">
        <CardHeader className="border-b border-slate-700/50">
          <CardTitle>Quantum Terminal</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[70vh]">
            <QuantumTerminal />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
