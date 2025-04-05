import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface QuickActionsProps {
  brevity?: any
  it?: any
  is?: any
  correct?: any
  and?: any
}

export function QuickActions({ brevity, it, is, correct, and }: QuickActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Quick Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>New File</DropdownMenuItem>
        <DropdownMenuItem>New Folder</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Download</DropdownMenuItem>
        <DropdownMenuItem>Upload</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Share</DropdownMenuItem>
        <DropdownMenuItem>Move to...</DropdownMenuItem>
        <DropdownMenuItem>Rename</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

