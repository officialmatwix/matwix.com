import { Suspense } from "react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import EnhancedAIInsights from "@/components/dashboard/enhanced-ai-insights"

export default function InsightsDashboardPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-4 text-center">Loading enhanced insights...</div>}>
        <EnhancedAIInsights />
      </Suspense>
    </DashboardLayout>
  )
}
