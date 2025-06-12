import { Suspense } from "react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import AcademyLayout from "@/components/academy/academy-layout"

export default function AcademyDashboardPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-4 text-center">Loading academy data...</div>}>
        <AcademyLayout />
      </Suspense>
    </DashboardLayout>
  )
}
