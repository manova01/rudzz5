"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface NavProps {
  provider?: {
    name: string
    avatar?: string
    initials: string
  }
  notifications?: {
    id: string
    title: string
    description: string
    time: string
    read: boolean
  }[]
}

export function ProviderNav({
  provider = { name: "Auto Shop", initials: "AS" },
  notifications = [
    {
      id: "1",
      title: "New Appointment",
      description: "John Doe booked an oil change",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: "2",
      title: "New Review",
      description: "Jane Smith left a 5-star review",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      title: "Appointment Reminder",
      description: "You have 3 appointments tomorrow",
      time: "3 hours ago",
      read: true,
    },
  ],
}: NavProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
      <div className="flex items-center gap-2 md:hidden">
        <Link href="/provider/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-rudzz-green text-white">
            <span className="text-sm font-bold">R</span>
          </div>
          <span className="text-lg font-bold text-rudzz-blue">Rudzz</span>
        </Link>
      </div>

      <div className="hidden w-full max-w-sm md:flex">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-md border border-gray-200 bg-white pl-8 text-sm shadow-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rudzz-yellow p-0 text-xs font-bold text-black">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <div className="py-4 text-center text-sm text-gray-500">No notifications</div>
            ) : (
              notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="cursor-pointer p-0">
                  <div className={`flex w-full gap-4 p-3 ${!notification.read ? "bg-blue-50" : ""}`}>
                    <div
                      className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                        !notification.read ? "bg-rudzz-blue" : "bg-transparent"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-gray-500">{notification.description}</p>
                      <p className="mt-1 text-xs text-gray-400">{notification.time}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center text-sm font-medium text-rudzz-blue">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 rounded-full px-2 py-1.5 hover:bg-gray-100">
              <Avatar className="h-8 w-8 border-2 border-rudzz-yellow">
                <AvatarImage src={provider.avatar} alt={provider.name} />
                <AvatarFallback className="bg-rudzz-blue text-white">{provider.initials}</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium md:inline-block">{provider.name}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/provider/dashboard/profile" className="flex w-full">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/provider/dashboard/settings" className="flex w-full">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 hover:text-red-600">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

