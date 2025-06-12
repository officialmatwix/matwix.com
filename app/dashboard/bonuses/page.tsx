import { Suspense } from "react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import BonusHistory from "@/components/dashboard/bonus-history"

export default function BonusesDashboardPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-4 text-center">Loading bonus data...</div>}>
        <BonusHistory />
      </Suspense>
    </DashboardLayout>
  )
}
