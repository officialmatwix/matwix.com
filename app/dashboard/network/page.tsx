import { getNetworkStructure } from "@/app/actions/network-actions"
import { NetworkVisualization } from "@/components/network-visualization"

export default async function NetworkPage() {
  const rootUserId = 1 // Admin user
  const networkData = await getNetworkStructure(rootUserId, 3)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Network Structure</h1>

      {networkData ? (
        <NetworkVisualization data={networkData} />
      ) : (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
          <p>No network data found for the root user.</p>
        </div>
      )}
    </div>
  )
}

