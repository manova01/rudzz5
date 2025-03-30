"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Calendar,
  Car,
  ChevronDown,
  ClipboardList,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Star,
  User,
  Wrench,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SidebarProps {
  provider?: {
    name: string
    avatar?: string
    initials: string
  }
}

export function ProviderSidebar({ provider = { name: "Auto Shop", initials: "AS" } }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/provider/dashboard",
      active: pathname === "/provider/dashboard",
    },
    {
      label: "Services",
      icon: Wrench,
      href: "/provider/dashboard/services",
      active: pathname.includes("/provider/dashboard/services"),
    },
    {
      label: "Appointments",
      icon: Calendar,
      href: "/provider/dashboard/appointments",
      active: pathname.includes("/provider/dashboard/appointments"),
    },
    {
      label: "Reviews",
      icon: Star,
      href: "/provider/dashboard/reviews",
      active: pathname.includes("/provider/dashboard/reviews"),
    },
    {
      label: "Messages",
      icon: MessageSquare,
      href: "/provider/dashboard/messages",
      active: pathname.includes("/provider/dashboard/messages"),
    },
    {
      label: "Vehicles",
      icon: Car,
      href: "/provider/dashboard/vehicles",
      active: pathname.includes("/provider/dashboard/vehicles"),
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/provider/dashboard/analytics",
      active: pathname.includes("/provider/dashboard/analytics"),
    },
    {
      label: "Profile",
      icon: User,
      href: "/provider/dashboard/profile",
      active: pathname.includes("/provider/dashboard/profile"),
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/provider/dashboard/settings",
      active: pathname.includes("/provider/dashboard/settings"),
    },
  ]

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed right-4 top-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-white shadow-lg transition-transform duration-300 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo and Provider Info */}
        <div className="flex flex-col items-center justify-center space-y-2 border-b p-6">
          <div className="flex items-center justify-center rounded-lg bg-rudzz-green p-2 text-white">
            <ClipboardList className="h-8 w-8" />
          </div>
          <h1 className="text-xl font-bold text-rudzz-blue">Rudzz</h1>
          <p className="text-sm text-gray-500">Provider Dashboard</p>
        </div>

        {/* Provider Profile */}
        <div className="flex items-center space-x-3 border-b p-4">
          <Avatar className="h-10 w-10 border-2 border-rudzz-yellow">
            <AvatarImage src={provider.avatar} alt={provider.name} />
            <AvatarFallback className="bg-rudzz-blue text-white">{provider.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="truncate font-medium">{provider.name}</p>
            <p className="truncate text-xs text-gray-500">Service Provider</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {routes.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    route.active
                      ? "bg-rudzz-blue text-white"
                      : "text-gray-700 hover:bg-rudzz-blue/10 hover:text-rudzz-blue",
                  )}
                >
                  <route.icon className={cn("mr-2 h-5 w-5", route.active ? "text-white" : "text-gray-500")} />
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t p-4">
          <Button variant="outline" className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600">
            <LogOut className="mr-2 h-5 w-5" />
            Log Out
          </Button>
        </div>
      </aside>
    </>
  )
}

