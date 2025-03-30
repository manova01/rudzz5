"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { StarRating } from "@/components/ui/star-rating"
import { CalendarIcon, Clock, Car, MapPin, CreditCard, CheckCircle, ChevronRight } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

// Form schema
const bookingFormSchema = z.object({
  service: z.string({
    required_error: "Please select a service",
  }),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string({
    required_error: "Please select a time",
  }),
  vehicle: z.string({
    required_error: "Please select a vehicle",
  }),
  notes: z.string().optional(),
  paymentMethod: z.enum(["credit_card", "paypal", "apple_pay", "google_pay"], {
    required_error: "Please select a payment method",
  }),
})

type BookingFormValues = z.infer<typeof bookingFormSchema>

export default function BookingPage({ params }) {
  const { providerId } = params
  const searchParams = useSearchParams()
  const preselectedServiceId = searchParams.get("service")

  const [isLoading, setIsLoading] = useState(true)
  const [provider, setProvider] = useState(null)
  const [services, setServices] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [availableTimes, setAvailableTimes] = useState([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [step, setStep] = useState(1)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(null)

  // Initialize form
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      service: preselectedServiceId || "",
      notes: "",
      paymentMethod: "credit_card",
    },
  })

  // Watch for date changes to update available times
  const watchDate = form.watch("date")
  const watchService = form.watch("service")

  useEffect(() => {
    if (watchDate) {
      setSelectedDate(watchDate)
      fetchAvailableTimes(watchDate)
    }
  }, [watchDate])

  useEffect(() => {
    // Simulate API calls to fetch data
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, these would be actual API calls
        await Promise.all([fetchProvider(), fetchServices(), fetchVehicles()])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [providerId])

  const fetchProvider = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock data
    setProvider({
      id: providerId,
      name: "AutoFix Pro",
      image: "/placeholder.svg?height=80&width=80",
      rating: 4.8,
      reviewCount: 124,
      address: "123 Main St, San Francisco, CA 94103",
    })
  }

  const fetchServices = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock data
    const allServices = [
      {
        id: "s1-1",
        name: "Oil Change",
        description: "Full synthetic oil change with filter replacement and fluid top-off.",
        price: 49.99,
        duration: 30,
        category: "Maintenance",
      },
      {
        id: "s1-2",
        name: "Tire Rotation",
        description: "Rotate tires to ensure even wear and extend tire life.",
        price: 29.99,
        duration: 20,
        category: "Maintenance",
      },
      {
        id: "s2-1",
        name: "Brake Pad Replacement",
        description: "Replace front or rear brake pads with premium quality parts.",
        price: 149.99,
        duration: 60,
        category: "Brakes",
      },
      {
        id: "s3-1",
        name: "Engine Diagnostics",
        description: "Computer diagnostics to identify engine issues and check engine light.",
        price: 79.99,
        duration: 60,
        category: "Engine",
      },
    ]

    setServices(allServices)

    // If there's a preselected service, set it in the form
    if (preselectedServiceId) {
      form.setValue("service", preselectedServiceId)
    }
  }

  const fetchVehicles = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock data
    setVehicles([
      {
        id: "v1",
        name: "2019 Toyota Camry",
        licensePlate: "ABC123",
        make: "Toyota",
        model: "Camry",
        year: 2019,
        color: "Silver",
      },
      {
        id: "v2",
        name: "2021 Honda Civic",
        licensePlate: "XYZ789",
        make: "Honda",
        model: "Civic",
        year: 2021,
        color: "Blue",
      },
    ])
  }

  const fetchAvailableTimes = async (date: Date) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock data - generate available times based on the selected date
    // In a real app, this would come from the provider's availability
    const times = []
    const startHour = 8 // 8 AM
    const endHour = 17 // 5 PM

    // Generate times every 30 minutes
    for (let hour = startHour; hour <= endHour; hour++) {
      for (const minute of [0, 30]) {
        // Skip lunch hour (12-1 PM)
        if (hour === 12 && minute === 0) continue
        if (hour === 12 && minute === 30) continue

        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        times.push(timeString)
      }
    }

    setAvailableTimes(times)
  }

  const onSubmit = async (data: BookingFormValues) => {
    try {
      // In a real app, this would be an API call to create the booking
      console.log("Booking data:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Get service details
      const selectedService = services.find((service) => service.id === data.service)

      // Get vehicle details
      const selectedVehicle = vehicles.find((vehicle) => vehicle.id === data.vehicle)

      // Create booking details
      const booking = {
        id: "b" + Math.floor(Math.random() * 10000),
        provider: provider,
        service: selectedService,
        date: format(data.date, "EEEE, MMMM d, yyyy"),
        time: data.time,
        vehicle: selectedVehicle,
        notes: data.notes,
        paymentMethod: data.paymentMethod,
        total: selectedService.price,
        confirmationNumber:
          "RUDZZ" +
          Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0"),
      }

      setBookingDetails(booking)
      setBookingComplete(true)

      toast.success("Booking successful!", {
        description: "Your appointment has been confirmed.",
      })
    } catch (error) {
      console.error("Error creating booking:", error)
      toast.error("Booking failed", {
        description: "There was an error creating your booking. Please try again.",
      })
    }
  }

  const nextStep = () => {
    const currentValues = form.getValues()

    if (step === 1 && !currentValues.service) {
      form.setError("service", {
        type: "manual",
        message: "Please select a service to continue",
      })
      return
    }

    if (step === 2 && (!currentValues.date || !currentValues.time)) {
      if (!currentValues.date) {
        form.setError("date", {
          type: "manual",
          message: "Please select a date to continue",
        })
      }
      if (!currentValues.time) {
        form.setError("time", {
          type: "manual",
          message: "Please select a time to continue",
        })
      }
      return
    }

    if (step === 3 && !currentValues.vehicle) {
      form.setError("vehicle", {
        type: "manual",
        message: "Please select a vehicle to continue",
      })
      return
    }

    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const getServiceById = (id: string) => {
    return services.find((service) => service.id === id)
  }

  const getVehicleById = (id: string) => {
    return vehicles.find((vehicle) => vehicle.id === id)
  }

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case "credit_card":
        return "Credit Card"
      case "paypal":
        return "PayPal"
      case "apple_pay":
        return "Apple Pay"
      case "google_pay":
        return "Google Pay"
      default:
        return method
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          {isLoading ? (
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-40" />
              </div>
              <Skeleton className="h-[500px] w-full rounded-lg" />
            </div>
          ) : bookingComplete ? (
            <div className="mx-auto max-w-3xl">
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rudzz-green">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
                  <CardDescription>Your appointment has been successfully scheduled.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="rounded-lg border bg-gray-50 p-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Confirmation Number</p>
                        <p className="text-lg font-semibold">{bookingDetails.confirmationNumber}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={bookingDetails.provider.image} alt={bookingDetails.provider.name} />
                          <AvatarFallback>{bookingDetails.provider.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{bookingDetails.provider.name}</h3>
                          <p className="text-sm text-gray-500">{bookingDetails.provider.address}</p>
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Service</p>
                          <p>{bookingDetails.service.name}</p>
                          <p className="text-sm text-gray-500">${bookingDetails.service.price.toFixed(2)}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Date & Time</p>
                          <p>{bookingDetails.date}</p>
                          <p className="text-sm text-gray-500">{bookingDetails.time}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Vehicle</p>
                          <p>{bookingDetails.vehicle.name}</p>
                          <p className="text-sm text-gray-500">{bookingDetails.vehicle.licensePlate}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Payment Method</p>
                          <p>{getPaymentMethodLabel(bookingDetails.paymentMethod)}</p>
                          <p className="text-sm text-gray-500">Total: ${bookingDetails.total.toFixed(2)}</p>
                        </div>
                      </div>

                      {bookingDetails.notes && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Notes</p>
                          <p className="text-sm text-gray-700">{bookingDetails.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 sm:flex-row">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                  <Button asChild className="w-full bg-rudzz-blue hover:bg-rudzz-blue/90">
                    <Link href={`/messages/${bookingDetails.provider.id}`}>Message Provider</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl">
              <div className="mb-8">
                <h1 className="text-2xl font-bold">Book an Appointment</h1>
                <p className="text-gray-500">Schedule a service with {provider?.name}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={provider?.image} alt={provider?.name} />
                      <AvatarFallback>{provider?.name?.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-semibold">{provider?.name}</h2>
                      <div className="flex items-center gap-1">
                        <StarRating rating={provider?.rating} size="sm" />
                        <span className="text-xs text-gray-500">
                          ({provider?.rating}) • {provider?.reviewCount} reviews
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/providers/${providerId}`}>View Profile</Link>
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Booking Details</CardTitle>
                    <div className="flex items-center text-sm text-gray-500">Step {step} of 4</div>
                  </div>
                  <div className="mt-2 flex items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? "bg-rudzz-blue text-white" : "border border-gray-200 bg-gray-100 text-gray-400"}`}
                    >
                      1
                    </div>
                    <div className={`h-1 w-full ${step >= 2 ? "bg-rudzz-blue" : "bg-gray-200"}`}></div>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? "bg-rudzz-blue text-white" : "border border-gray-200 bg-gray-100 text-gray-400"}`}
                    >
                      2
                    </div>
                    <div className={`h-1 w-full ${step >= 3 ? "bg-rudzz-blue" : "bg-gray-200"}`}></div>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 3 ? "bg-rudzz-blue text-white" : "border border-gray-200 bg-gray-100 text-gray-400"}`}
                    >
                      3
                    </div>
                    <div className={`h-1 w-full ${step >= 4 ? "bg-rudzz-blue" : "bg-gray-200"}`}></div>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 4 ? "bg-rudzz-blue text-white" : "border border-gray-200 bg-gray-100 text-gray-400"}`}
                    >
                      4
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Step 1: Select Service */}
                      {step === 1 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Select a Service</h3>
                          <FormField
                            control={form.control}
                            name="service"
                            render={({ field }) => (
                              <FormItem className="space-y-4">
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="space-y-3"
                                  >
                                    {services.map((service) => (
                                      <div key={service.id} className="flex">
                                        <RadioGroupItem value={service.id} id={service.id} className="peer sr-only" />
                                        <label
                                          htmlFor={service.id}
                                          className="flex flex-1 cursor-pointer items-start space-x-4 rounded-md border border-gray-200 p-4 hover:bg-gray-50 peer-data-[state=checked]:border-rudzz-blue peer-data-[state=checked]:bg-blue-50"
                                        >
                                          <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                              <div>
                                                <p className="font-medium">{service.name}</p>
                                                <p className="text-sm text-gray-500">{service.category}</p>
                                              </div>
                                              <div className="text-right">
                                                <p className="font-semibold">${service.price.toFixed(2)}</p>
                                                <p className="text-sm text-gray-500">{service.duration} min</p>
                                              </div>
                                            </div>
                                            <p className="mt-2 text-sm text-gray-600">{service.description}</p>
                                          </div>
                                        </label>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}

                      {/* Step 2: Select Date and Time */}
                      {step === 2 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Select Date and Time</h3>
                          <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                              control={form.control}
                              name="date"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Date</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground",
                                          )}
                                        >
                                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                          date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                                          date > new Date(new Date().setDate(new Date().getDate() + 30))
                                        }
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="time"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Time</FormLabel>
                                  <Select
                                    disabled={!selectedDate}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a time" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {availableTimes.length > 0 ? (
                                        availableTimes.map((time) => (
                                          <SelectItem key={time} value={time}>
                                            {time}
                                          </SelectItem>
                                        ))
                                      ) : (
                                        <SelectItem value="none" disabled>
                                          No times available
                                        </SelectItem>
                                      )}
                                    </SelectContent>
                                  </Select>
                                  <FormDescription>
                                    {selectedDate
                                      ? `Available times for ${format(selectedDate, "EEEE, MMMM d, yyyy")}`
                                      : "Please select a date first"}
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}

                      {/* Step 3: Vehicle Information */}
                      {step === 3 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Vehicle Information</h3>
                          <FormField
                            control={form.control}
                            name="vehicle"
                            render={({ field }) => (
                              <FormItem className="space-y-4">
                                <FormLabel>Select a Vehicle</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="space-y-3"
                                  >
                                    {vehicles.map((vehicle) => (
                                      <div key={vehicle.id} className="flex">
                                        <RadioGroupItem value={vehicle.id} id={vehicle.id} className="peer sr-only" />
                                        <label
                                          htmlFor={vehicle.id}
                                          className="flex flex-1 cursor-pointer items-center space-x-4 rounded-md border border-gray-200 p-4 hover:bg-gray-50 peer-data-[state=checked]:border-rudzz-blue peer-data-[state=checked]:bg-blue-50"
                                        >
                                          <Car className="h-5 w-5 text-gray-500" />
                                          <div className="flex-1">
                                            <p className="font-medium">{vehicle.name}</p>
                                            <p className="text-sm text-gray-500">
                                              {vehicle.make} {vehicle.model} • {vehicle.licensePlate}
                                            </p>
                                          </div>
                                        </label>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                <div className="pt-2">
                                  <Button variant="outline" type="button" className="w-full">
                                    + Add a New Vehicle
                                  </Button>
                                </div>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Additional Notes (Optional)</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Any specific issues or requests..."
                                    className="resize-none"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Include any details that might help the service provider.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}

                      {/* Step 4: Review and Payment */}
                      {step === 4 && (
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold">Review and Payment</h3>

                          <div className="rounded-lg border bg-gray-50 p-4">
                            <h4 className="mb-2 font-medium">Booking Summary</h4>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm">
                                    {watchDate && form.getValues("time")
                                      ? `${format(watchDate, "EEE, MMM d")} at ${form.getValues("time")}`
                                      : "Date and time not selected"}
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-auto p-0 text-rudzz-blue"
                                  onClick={() => setStep(2)}
                                >
                                  Change
                                </Button>
                              </div>

                              <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                  <Car className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm">
                                    {form.getValues("vehicle")
                                      ? getVehicleById(form.getValues("vehicle"))?.name
                                      : "Vehicle not selected"}
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-auto p-0 text-rudzz-blue"
                                  onClick={() => setStep(3)}
                                >
                                  Change
                                </Button>
                              </div>

                              <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm">{provider?.address}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-auto p-0 text-rudzz-blue"
                                  onClick={() =>
                                    window.open(`https://maps.google.com/?q=${provider?.address}`, "_blank")
                                  }
                                >
                                  Map
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-medium">Service Details</h4>
                            <div className="rounded-lg border p-4">
                              <div className="flex justify-between">
                                <div>
                                  <p className="font-medium">
                                    {watchService ? getServiceById(watchService)?.name : "No service selected"}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {watchService ? getServiceById(watchService)?.description : ""}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold">
                                    ${watchService ? getServiceById(watchService)?.price.toFixed(2) : "0.00"}
                                  </p>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-auto p-0 text-rudzz-blue"
                                    onClick={() => setStep(1)}
                                  >
                                    Change
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-medium">Payment Method</h4>
                            <FormField
                              control={form.control}
                              name="paymentMethod"
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                      className="space-y-3"
                                    >
                                      <div className="flex">
                                        <RadioGroupItem value="credit_card" id="credit_card" className="peer sr-only" />
                                        <label
                                          htmlFor="credit_card"
                                          className="flex flex-1 cursor-pointer items-center space-x-3 rounded-md border border-gray-200 p-3 hover:bg-gray-50 peer-data-[state=checked]:border-rudzz-blue peer-data-[state=checked]:bg-blue-50"
                                        >
                                          <CreditCard className="h-5 w-5 text-gray-500" />
                                          <span>Credit Card</span>
                                        </label>
                                      </div>

                                      <div className="flex">
                                        <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
                                        <label
                                          htmlFor="paypal"
                                          className="flex flex-1 cursor-pointer items-center space-x-3 rounded-md border border-gray-200 p-3 hover:bg-gray-50 peer-data-[state=checked]:border-rudzz-blue peer-data-[state=checked]:bg-blue-50"
                                        >
                                          <span className="font-semibold text-blue-600">Pay</span>
                                          <span className="font-semibold text-blue-800">Pal</span>
                                        </label>
                                      </div>

                                      <div className="flex">
                                        <RadioGroupItem value="apple_pay" id="apple_pay" className="peer sr-only" />
                                        <label
                                          htmlFor="apple_pay"
                                          className="flex flex-1 cursor-pointer items-center space-x-3 rounded-md border border-gray-200 p-3 hover:bg-gray-50 peer-data-[state=checked]:border-rudzz-blue peer-data-[state=checked]:bg-blue-50"
                                        >
                                          <span className="font-semibold">Apple Pay</span>
                                        </label>
                                      </div>

                                      <div className="flex">
                                        <RadioGroupItem value="google_pay" id="google_pay" className="peer sr-only" />
                                        <label
                                          htmlFor="google_pay"
                                          className="flex flex-1 cursor-pointer items-center space-x-3 rounded-md border border-gray-200 p-3 hover:bg-gray-50 peer-data-[state=checked]:border-rudzz-blue peer-data-[state=checked]:bg-blue-50"
                                        >
                                          <span className="font-semibold">Google Pay</span>
                                        </label>
                                      </div>
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="rounded-lg border-t pt-4">
                            <div className="flex justify-between font-semibold">
                              <span>Total</span>
                              <span>${watchService ? getServiceById(watchService)?.price.toFixed(2) : "0.00"}</span>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              By proceeding with this booking, you agree to our Terms of Service and Cancellation
                              Policy.
                            </p>
                          </div>
                        </div>
                      )}
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {step > 1 ? (
                    <Button variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                  ) : (
                    <Button asChild variant="outline">
                      <Link href={`/providers/${providerId}`}>Cancel</Link>
                    </Button>
                  )}

                  {step < 4 ? (
                    <Button onClick={nextStep} className="bg-rudzz-blue hover:bg-rudzz-blue/90">
                      Continue
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button onClick={form.handleSubmit(onSubmit)} className="bg-rudzz-green hover:bg-rudzz-green/90">
                      Confirm Booking
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

