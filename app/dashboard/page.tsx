import { Suspense } from "react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import QuantumDashboardHome from "@/components/dashboard/quantum-dashboard-home"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-4 text-center">Loading quantum dashboard...</div>}>
        <QuantumDashboardHome />
      </Suspense>
    </DashboardLayout>
  )
}
