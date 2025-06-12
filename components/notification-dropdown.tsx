"use client"

import { useState, useRef, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMLMData } from "@/hooks/use-mlm-data"

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mlmData = useMLMData()
  const notifications = mlmData?.notifications || [] // Add fallback empty array
  const [unreadCount, setUnreadCount] = useState(3)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleMarkAllRead = () => {
    setUnreadCount(0)
  }

  return (
    <div className="relative" ref={dropdownRef} style={{ zIndex: 100 }}>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <Card
          className="absolute right-0 mt-2 w-80 overflow-hidden border border-slate-700 bg-slate-900/95 backdrop-blur-sm shadow-xl"
          style={{ zIndex: 100 }}
        >
          <div className="flex items-center justify-between border-b border-slate-700 p-3">
            <h3 className="font-medium text-slate-100">Notifications</h3>
            <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={handleMarkAllRead}>
              Mark all read
            </Button>
          </div>
          <ScrollArea className="h-[300px]">
            <div className="space-y-0.5">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 p-3 hover:bg-slate-800/50 ${
                    notification.unread ? "bg-slate-800/20" : ""
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full ${
                      notification.type === "commission"
                        ? "bg-green-500/20 text-green-400"
                        : notification.type === "team"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-purple-500/20 text-purple-400"
                    }`}
                  >
                    {notification.type === "commission" ? "$" : notification.type === "team" ? "T" : "S"}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-200">{notification.message}</p>
                    <p className="text-xs text-slate-400">{notification.time}</p>
                  </div>
                  {notification.unread && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t border-slate-700 p-2 text-center">
            <Button variant="ghost" size="sm" className="text-xs text-slate-400 hover:text-slate-300">
              View all notifications
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
