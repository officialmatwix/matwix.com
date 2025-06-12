import { Suspense } from "react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import AchievementsPage from "@/components/dashboard/achievements-page"

export default function AchievementsDashboardPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-4 text-center">Loading achievements data...</div>}>
        <AchievementsPage />
      </Suspense>
    </DashboardLayout>
  )
}
