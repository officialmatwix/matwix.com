import { Suspense } from "react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import ProductsPage from "@/components/dashboard/products-page"

export default function ProductsDashboardPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-4 text-center">Loading products data...</div>}>
        <ProductsPage />
      </Suspense>
    </DashboardLayout>
  )
}
