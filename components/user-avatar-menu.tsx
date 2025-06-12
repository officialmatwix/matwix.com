"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, Settings, CreditCard } from "lucide-react"

interface UserAvatarMenuProps {
  user?: {
    name: string
    email: string
    role: string
  }
}

function UserAvatarMenu({
  user = { name: "Neo Anderson", email: "neo@matrix.com", role: "Gold Member" },
}: UserAvatarMenuProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    // Implement logout functionality
    router.push("/")
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none">
          <Avatar className="h-8 w-8 sm:h-9 sm:w-9 cursor-pointer border-2 border-transparent hover:border-cyan-500 transition-colors">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user.name} />
            <AvatarFallback className="bg-slate-700 text-cyan-500">
              {user.name.charAt(0)}
              {user.name.split(" ")[1]?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2 bg-slate-800 border-slate-700 text-slate-200">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-slate-400">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-700" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer hover:bg-slate-700">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-slate-700">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-slate-700"
            onClick={() => router.push("/dashboard/settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-slate-700" />
        <DropdownMenuItem
          className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-slate-700"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Export as default
export default UserAvatarMenu

// Also export as named export for backward compatibility
export { UserAvatarMenu }
