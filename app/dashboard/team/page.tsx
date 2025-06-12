import { Suspense } from "react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import TeamPage from "@/components/dashboard/team-page"

export default function TeamDashboardPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-4 text-center">Loading team data...</div>}>
        <TeamPage />
      </Suspense>
    </DashboardLayout>
  )
}
