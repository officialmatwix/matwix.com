import { Suspense } from "react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import BankingPage from "@/components/dashboard/banking-page"

export default function BankingDashboardPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-4 text-center">Loading banking data...</div>}>
        <BankingPage />
      </Suspense>
    </DashboardLayout>
  )
}
