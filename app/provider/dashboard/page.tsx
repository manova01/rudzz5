"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProviderOverview } from "@/components/provider/overview"
import { RecentReviews } from "@/components/provider/recent-reviews"
import { ProviderStats } from "@/components/provider/stats"
import { UpcomingAppointments } from "@/components/provider/upcoming-appointments"
import { fetchProviderStats, fetchProviderReviews, fetchProviderAppointments } from "@/lib/api-client"

export default function ProviderDashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [reviews, setReviews] = useState([])
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true)
        const [statsData, reviewsData, appointmentsData] = await Promise.all([
          fetchProviderStats(),
          fetchProviderReviews({ limit: 3 }),
          fetchProviderAppointments({ limit: 5 }),
        ])

        setStats(statsData)
        setReviews(reviewsData)
        setAppointments(appointmentsData)
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome to your service provider dashboard</p>
        </div>
        <Button asChild className="bg-rudzz-green hover:bg-rudzz-green/90">
          <Link href="/provider/dashboard/services/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Link>
        </Button>
      </div>

      <ProviderStats isLoading={isLoading} data={stats} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="overflow-hidden lg:col-span-4">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between space-y-0 border-b p-6 pb-4">
              <h3 className="text-lg font-medium">Performance Overview</h3>
            </div>
            <div className="p-6 pt-4">
              <ProviderOverview isLoading={isLoading} />
            </div>
          </div>
        </Card>
        <Card className="overflow-hidden lg:col-span-3">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between space-y-0 border-b p-6 pb-4">
              <h3 className="text-lg font-medium">Recent Reviews</h3>
              <Button variant="ghost" size="sm" asChild className="text-rudzz-blue hover:text-rudzz-blue/90">
                <Link href="/provider/dashboard/reviews">View all</Link>
              </Button>
            </div>
            <div className="p-6 pt-4">
              <RecentReviews isLoading={isLoading} reviews={reviews} />
            </div>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between space-y-0 border-b p-6 pb-4">
          <h3 className="text-lg font-medium">Upcoming Appointments</h3>
          <Button variant="ghost" size="sm" asChild className="text-rudzz-blue hover:text-rudzz-blue/90">
            <Link href="/provider/dashboard/appointments">View all</Link>
          </Button>
        </div>
        <div className="p-6 pt-4">
          <UpcomingAppointments isLoading={isLoading} appointments={appointments} />
        </div>
      </Card>
    </div>
  )
}

