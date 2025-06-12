import { Suspense } from "react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import NetworkPage from "@/components/dashboard/network-page"

export default function NetworkDashboardPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-4 text-center">Loading network data...</div>}>
        <NetworkPage />
      </Suspense>
    </DashboardLayout>
  )
}
