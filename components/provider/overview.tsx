"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import { fetchProviderPerformance } from "@/lib/api-client"

interface ProviderOverviewProps {
  isLoading: boolean
}

export function ProviderOverview({ isLoading }: ProviderOverviewProps) {
  const [performanceData, setPerformanceData] = useState([])
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    const loadPerformanceData = async () => {
      try {
        setIsLoadingData(true)
        const data = await fetchProviderPerformance()
        setPerformanceData(data)
      } catch (error) {
        console.error("Failed to load performance data:", error)
      } finally {
        setIsLoadingData(false)
      }
    }

    loadPerformanceData()
  }, [])

  if (isLoading || isLoadingData) {
    return <Skeleton className="h-[300px] w-full" />
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={performanceData}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "0.375rem",
            }}
            itemStyle={{ color: "#000" }}
            labelStyle={{ fontWeight: "bold", marginBottom: "0.5rem" }}
          />
          <Bar
            dataKey="revenue"
            fill="#2196F3" // Rudzz blue
            radius={[4, 4, 0, 0]}
            name="Revenue"
          />
          <Bar
            dataKey="appointments"
            fill="#4CAF50" // Rudzz green
            radius={[4, 4, 0, 0]}
            name="Appointments"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

