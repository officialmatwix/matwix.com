import { Suspense } from "react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import VisualizationPage from "@/components/dashboard/visualization-page"

export default function VisualizationDashboardPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-4 text-center">Loading visualization data...</div>}>
        <VisualizationPage />
      </Suspense>
    </DashboardLayout>
  )
}
