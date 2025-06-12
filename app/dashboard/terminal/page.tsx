import { Suspense } from "react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import TerminalPage from "@/components/dashboard/terminal-page"

export default function TerminalDashboardPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-4 text-center">Loading terminal...</div>}>
        <TerminalPage />
      </Suspense>
    </DashboardLayout>
  )
}
