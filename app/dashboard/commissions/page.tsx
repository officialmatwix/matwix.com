import { getCommissionSummary, getUserCommissions } from "@/app/actions/commission-actions"
import { getUserById } from "@/app/actions/user-actions"

export default async function CommissionsPage() {
  // For demo purposes, we'll show commissions for user ID 2 (John Doe)
  const userId = 2
  const user = await getUserById(userId)

  if (!user) {
    return <div>User not found</div>
  }

  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1

  const commissions = await getUserCommissions(userId, 10, 0)
  const summary = await getCommissionSummary(userId, currentYear, currentMonth)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Commissions for {user.full_name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Direct Commissions</h3>
          <p className="text-3xl font-bold">${summary.direct_total.toFixed(2)}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Level 2 Commissions</h3>
          <p className="text-3xl font-bold">${summary.level2_total.toFixed(2)}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Total Commissions</h3>
          <p className="text-3xl font-bold">${summary.total_amount.toFixed(2)}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Recent Commissions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Source</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {commissions.map((commission) => (
              <tr key={commission.id}>
                <td className="px-4 py-2 border">{commission.id}</td>
                <td className="px-4 py-2 border">{commission.source_name}</td>
                <td className="px-4 py-2 border capitalize">{commission.commission_type.replace("_", " ")}</td>
                <td className="px-4 py-2 border">${commission.amount.toFixed(2)}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-2 py-1 rounded ${
                      commission.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : commission.status === "approved"
                          ? "bg-blue-100 text-blue-800"
                          : commission.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                    }`}
                  >
                    {commission.status}
                  </span>
                </td>
                <td className="px-4 py-2 border">{new Date(commission.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

