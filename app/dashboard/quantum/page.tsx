import { Suspense } from "react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import QuantumAIAssistant from "@/components/ai/quantum-ai-assistant"

export default function QuantumDashboardPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-4 text-center">Loading quantum assistant...</div>}>
        <QuantumAIAssistant />
      </Suspense>
    </DashboardLayout>
  )
}
