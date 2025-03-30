import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Wrench, Star, DollarSign } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface ProviderStatsProps {
  isLoading: boolean
  data?: {
    totalServices: number
    servicesDelta: number
    totalAppointments: number
    appointmentsDelta: number
    averageRating: number
    ratingDelta: number
    totalRevenue: number
    revenueDelta: number
  } | null
}

export function ProviderStats({ isLoading, data }: ProviderStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Services</CardTitle>
          <Wrench className="h-4 w-4 text-rudzz-green" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-20" />
          ) : (
            <>
              <div className="text-2xl font-bold">{data?.totalServices || 0}</div>
              <p className="text-xs text-muted-foreground">
                {data?.servicesDelta > 0 ? "+" : ""}
                {data?.servicesDelta || 0} from last month
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Appointments</CardTitle>
          <Users className="h-4 w-4 text-rudzz-blue" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-20" />
          ) : (
            <>
              <div className="text-2xl font-bold">{data?.totalAppointments || 0}</div>
              <p className="text-xs text-muted-foreground">
                {data?.appointmentsDelta > 0 ? "+" : ""}
                {data?.appointmentsDelta || 0} from last month
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rating</CardTitle>
          <Star className="h-4 w-4 text-rudzz-yellow" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-20" />
          ) : (
            <>
              <div className="text-2xl font-bold">{data?.averageRating?.toFixed(1) || "0.0"}</div>
              <p className="text-xs text-muted-foreground">
                {data?.ratingDelta > 0 ? "+" : ""}
                {data?.ratingDelta?.toFixed(1) || "0.0"} from last month
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-rudzz-green" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-20" />
          ) : (
            <>
              <div className="text-2xl font-bold">${data?.totalRevenue?.toLocaleString() || "0"}</div>
              <p className="text-xs text-muted-foreground">
                {data?.revenueDelta > 0 ? "+" : ""}
                {data?.revenueDelta || 0}% from last month
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

