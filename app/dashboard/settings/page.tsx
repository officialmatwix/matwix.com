import { Suspense } from "react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import SettingsPage from "@/components/dashboard/settings-page"

export default function SettingsDashboardPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-4 text-center">Loading settings...</div>}>
        <SettingsPage />
      </Suspense>
    </DashboardLayout>
  )
}
