import type { ReactNode } from "react"
import DashboardLayout from "@/components/dashboard/quantum-dashboard-layout"

export default function AILayout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}
