import { Suspense } from "react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import CommissionsPage from "@/components/dashboard/commissions-page"

export default function CommissionsDashboardPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-4 text-center">Loading commissions data...</div>}>
        <CommissionsPage />
      </Suspense>
    </DashboardLayout>
  )
}
