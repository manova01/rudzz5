import type React from "react"
import { ProviderSidebar } from "@/components/provider/sidebar"
import { ProviderNav } from "@/components/provider/nav"

export default function ProviderDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ProviderSidebar />
      <div className="flex-1 md:ml-64">
        <ProviderNav />
        <main className="container mx-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

