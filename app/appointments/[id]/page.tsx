"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Car, MessageSquare, ArrowLeft, AlertTriangle, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

export default function AppointmentDetailsPage({ params }) {
  const { id } = params
  const [isLoading, setIsLoading] = useState(true)
  const [appointment, setAppointment] = useState(null)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch appointment details
    const fetchAppointment = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        setAppointment({
          id,
          provider: {
            id: "p1",
            name: "AutoFix Pro",
            image: "/placeholder.svg?height=40&width=40",
            address: "123 Main St, San Francisco, CA 94103",
            phone: "+1 (555) 123-4567",
          },
          service: {
            name: "Oil Change",
            description: "Full synthetic oil change with filter replacement and fluid top-off.",
            price: 49.99,
            duration: 30,
          },
          date: "2025-04-15",
          time: "10:00 AM",
          status: "confirmed",
          vehicle: {
            id: "v1",
            name: "2019 Toyota Camry",
            licensePlate: "ABC123",
          },
          notes: "Please check tire pressure as well.",
          confirmationNumber: "RUDZZ123456",
          canCancel: true,
          canReschedule: true,
        })
      } catch (error) {
        console.error("Error fetching appointment:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointment()
  }, [id])

  const handleCancelAppointment = async () => {
    setIsSubmitting(true)
    try {
      // In a real app, this would be an API call to cancel the appointment
      console.log("Cancelling appointment:", id)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update appointment status
      setAppointment({
        ...appointment,
        status: "cancelled",
        canCancel: false,
        canReschedule: false,
      })

      toast.success("Appointment cancelled", {
        description: "Your appointment has been successfully cancelled.",
      })

      // Close dialog
      setIsCancelDialogOpen(false)
    } catch (error) {
      toast.error("Failed to cancel appointment", {
        description: "There was an error cancelling your appointment. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-rudzz-green text-white"
      case "pending":
        return "bg-rudzz-yellow text-black"
      case "completed":
        return "bg-gray-500 text-white"
      case "cancelled":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to Dashboard</span>
                </Link>
              </Button>
              <h1 className="text-2xl font-bold">Appointment Details</h1>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-[400px] w-full rounded-lg" />
              </div>
            ) : appointment ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <div>
                        <CardTitle className="text-xl">{appointment.service.name}</CardTitle>
                        <CardDescription>{appointment.provider.name}</CardDescription>
                      </div>
                      <Badge className={getStatusBadgeColor(appointment.status)}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <div className="space-y-6">
                      <div className="rounded-lg border bg-gray-50 p-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Confirmation Number</p>
                          <p className="text-lg font-semibold">{appointment.confirmationNumber}</p>
                        </div>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-3">
                          <h3 className="font-semibold">Appointment Details</h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-rudzz-blue" />
                              <span>{formatDate(appointment.date)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-rudzz-green" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Car className="h-4 w-4 text-rudzz-yellow" />
                              <span>
                                {appointment.vehicle.name} ({appointment.vehicle.licensePlate})
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h3 className="font-semibold">Provider Information</h3>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={appointment.provider.image} alt={appointment.provider.name} />
                              <AvatarFallback>{appointment.provider.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{appointment.provider.name}</p>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <MapPin className="h-3 w-3" />
                                <span>{appointment.provider.address}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold">Service Details</h3>
                        <div className="rounded-lg border p-4">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">{appointment.service.name}</p>
                              <p className="text-sm text-gray-500">{appointment.service.description}</p>
                              <p className="mt-1 text-sm text-gray-500">
                                Duration: {appointment.service.duration} minutes
                              </p>
                            </div>
                            <p className="font-semibold">${appointment.service.price.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>

                      {appointment.notes && (
                        <div className="space-y-3">
                          <h3 className="font-semibold">Additional Notes</h3>
                          <div className="rounded-lg border p-4">
                            <p className="text-sm">{appointment.notes}</p>
                          </div>
                        </div>
                      )}

                      {appointment.status === "cancelled" && (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                          <div className="flex items-start gap-3">
                            <X className="mt-0.5 h-5 w-5 text-red-500" />
                            <div>
                              <h3 className="font-medium text-red-800">Appointment Cancelled</h3>
                              <p className="text-sm text-red-600">
                                This appointment has been cancelled and is no longer active.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3 sm:flex-row">
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/messages/${appointment.provider.id}`}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message Provider
                      </Link>
                    </Button>

                    {appointment.status === "confirmed" && (
                      <>
                        {appointment.canReschedule && (
                          <Button asChild className="w-full bg-rudzz-blue hover:bg-rudzz-blue/90">
                            <Link href={`/booking/${appointment.provider.id}?reschedule=${appointment.id}`}>
                              <Calendar className="mr-2 h-4 w-4" />
                              Reschedule
                            </Link>
                          </Button>
                        )}

                        {appointment.canCancel && (
                          <Button
                            variant="outline"
                            className="w-full text-red-500 hover:text-red-600"
                            onClick={() => setIsCancelDialogOpen(true)}
                          >
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                          </Button>
                        )}
                      </>
                    )}
                  </CardFooter>
                </Card>

                {appointment.status === "confirmed" && (
                  <Card>
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="mt-0.5 h-5 w-5 text-rudzz-yellow" />
                        <div>
                          <CardTitle>Cancellation Policy</CardTitle>
                          <CardDescription>
                            Please note our cancellation policy before making changes to your appointment.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        Appointments can be cancelled or rescheduled up to 24 hours before the scheduled time without
                        any charges. Late cancellations or no-shows may incur a fee of up to 50% of the service cost.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <AlertTriangle className="mb-2 h-12 w-12 text-gray-400" />
                  <h3 className="text-lg font-medium">Appointment Not Found</h3>
                  <p className="mb-4 text-center text-gray-500">
                    The appointment you're looking for doesn't exist or may have been removed.
                  </p>
                  <Button asChild className="bg-rudzz-blue hover:bg-rudzz-blue/90">
                    <Link href="/dashboard">Back to Dashboard</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Cancel Appointment Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {appointment && (
            <div className="py-4">
              <div className="space-y-2">
                <p className="font-medium">{appointment.service.name}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {formatDate(appointment.date)} at {appointment.time}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>{appointment.provider.name}</span>
                </div>
              </div>
              <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 text-yellow-600" />
                  <p className="text-xs text-yellow-800">
                    Cancelling less than 24 hours before your appointment may result in a cancellation fee.
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
              Keep Appointment
            </Button>
            <Button type="button" variant="destructive" onClick={handleCancelAppointment} disabled={isSubmitting}>
              {isSubmitting ? "Cancelling..." : "Cancel Appointment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
  )
}

