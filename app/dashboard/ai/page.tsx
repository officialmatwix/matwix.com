import { Suspense } from "react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import AIInsightsDashboard from "@/components/dashboard/ai-insights-dashboard"

export default function AIDashboardPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-4 text-center">Loading AI insights...</div>}>
        <AIInsightsDashboard />
      </Suspense>
    </DashboardLayout>
  )
}
