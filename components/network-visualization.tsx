"use client"

import type { NetworkMember } from "@/types/database"
import { useState } from "react"
import { UserStatusBadge } from "./user-status-badge"

interface NetworkVisualizationProps {
  data: NetworkMember
}

export function NetworkVisualization({ data }: NetworkVisualizationProps) {
  const [selectedUser, setSelectedUser] = useState<NetworkMember | null>(null)

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-2/3 overflow-auto bg-white p-4 rounded-lg shadow">
        <div className="min-w-[800px] min-h-[500px]">
          <NetworkNode node={data} onSelect={setSelectedUser} isSelected={selectedUser?.user_id === data.user_id} />
        </div>
      </div>

      <div className="w-full lg:w-1/3 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          {selectedUser ? "User Details" : "Select a user to view details"}
        </h2>

        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src={selectedUser.user.profile_image || "/placeholder.svg"}
                  alt={selectedUser.user.full_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium">{selectedUser.user.full_name}</h3>
                <p className="text-gray-600">@{selectedUser.user.username}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <UserStatusBadge status={selectedUser.user.status} />
              </div>

              <div>
                <p className="text-sm text-gray-500">Rank</p>
                {selectedUser.user.rank_name && (
                  <span className={`px-2 py-1 rounded bg-${selectedUser.user.rank_color} text-white`}>
                    {selectedUser.user.rank_name}
                  </span>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-500">Position</p>
                <p>{selectedUser.position}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Joined Network</p>
                <p>{new Date(selectedUser.placement_date).toLocaleDateString()}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p>{selectedUser.user.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface NetworkNodeProps {
  node: NetworkMember
  onSelect: (node: NetworkMember) => void
  isSelected: boolean
}

function NetworkNode({ node, onSelect, isSelected }: NetworkNodeProps) {
  const hasChildren = node.children && node.children.length > 0
  const [selectedUser, setSelectedUserInternal] = useState<NetworkMember | null>(null)

  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative p-2 rounded-lg border-2 ${
          isSelected ? "border-blue-500" : "border-gray-300"
        } cursor-pointer hover:bg-gray-50 transition-colors`}
        onClick={() => onSelect(node)}
      >
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mb-2">
            <img
              src={node.user.profile_image || "/placeholder.svg"}
              alt={node.user.full_name}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm font-medium">{node.user.full_name}</p>
          <p className="text-xs text-gray-500">@{node.user.username}</p>

          {node.user.rank_name && (
            <span className={`mt-1 px-1.5 py-0.5 text-xs rounded bg-${node.user.rank_color} text-white`}>
              {node.user.rank_name}
            </span>
          )}
        </div>
      </div>

      {hasChildren && (
        <div className="mt-4">
          <div className="w-px h-8 bg-gray-300 mx-auto"></div>

          <div className="flex justify-center gap-8">
            {node.children.map((child) => (
              <div key={child.user_id} className="flex flex-col items-center">
                <NetworkNode
                  node={child}
                  onSelect={onSelect}
                  isSelected={isSelected && selectedUser?.user_id === child.user_id}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
