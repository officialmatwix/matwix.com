import { Suspense } from "react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import CompensationPlan from "@/components/dashboard/compensation-plan"

export default function CompensationDashboardPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-4 text-center">Loading compensation data...</div>}>
        <CompensationPlan />
      </Suspense>
    </DashboardLayout>
  )
}
