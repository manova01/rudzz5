import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface Appointment {
  id: string
  customer: {
    name: string
    avatar: string
    initials: string
  }
  service: string
  date: string
  time: string
  status: string
}

interface UpcomingAppointmentsProps {
  isLoading: boolean
  appointments: Appointment[]
}

export function UpcomingAppointments({ isLoading, appointments }: UpcomingAppointmentsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    )
  }

  if (appointments.length === 0) {
    return <p className="text-center text-muted-foreground py-4">No upcoming appointments.</p>
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={appointment.customer.avatar} alt={appointment.customer.name} />
                    <AvatarFallback className="bg-rudzz-blue text-white">
                      {appointment.customer.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{appointment.customer.name}</span>
                </div>
              </TableCell>
              <TableCell>{appointment.service}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-1 h-3 w-3 text-rudzz-blue" />
                    {appointment.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3 text-rudzz-green" />
                    {appointment.time}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  className={`
                    ${appointment.status === "confirmed" ? "bg-rudzz-green text-white" : ""}
                    ${appointment.status === "pending" ? "bg-rudzz-yellow text-black" : ""}
                    ${appointment.status === "cancelled" ? "bg-red-500 text-white" : ""}
                  `}
                >
                  {appointment.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-rudzz-blue text-rudzz-blue hover:bg-rudzz-blue/10"
                  >
                    Details
                  </Button>
                  <Button size="sm" className="bg-rudzz-green hover:bg-rudzz-green/90">
                    Message
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

