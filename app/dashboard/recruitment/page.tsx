import { Suspense } from "react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import RecruitmentPage from "@/components/dashboard/recruitment-page"

export default function RecruitmentDashboardPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-4 text-center">Loading recruitment data...</div>}>
        <RecruitmentPage />
      </Suspense>
    </DashboardLayout>
  )
}
