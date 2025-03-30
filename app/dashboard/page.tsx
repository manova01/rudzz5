"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { StarRating } from "@/components/ui/star-rating"
import { Calendar, Clock, MapPin, Heart, Settings, MessageSquare, History } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserDashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("appointments")
  const [upcomingAppointments, setUpcomingAppointments] = useState([])
  const [pastAppointments, setPastAppointments] = useState([])
  const [favoriteProviders, setFavoriteProviders] = useState([])
  const [messages, setMessages] = useState([])

  useEffect(() => {
    // Simulate API calls to fetch user data
    const fetchUserData = async () => {
      setIsLoading(true)
      try {
        // In a real app, these would be actual API calls
        await Promise.all([fetchAppointments(), fetchFavorites(), fetchMessages()])
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const fetchAppointments = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock data
    setUpcomingAppointments([
      {
        id: "1",
        provider: {
          id: "p1",
          name: "AutoFix Pro",
          image: "/placeholder.svg?height=40&width=40",
          rating: 4.8,
        },
        service: "Oil Change",
        date: "2025-04-15",
        time: "10:00 AM",
        status: "confirmed",
        price: 49.99,
        address: "123 Main St, San Francisco, CA",
      },
      {
        id: "2",
        provider: {
          id: "p2",
          name: "Quick Lube & Tire",
          image: "/placeholder.svg?height=40&width=40",
          rating: 4.5,
        },
        service: "Tire Rotation",
        date: "2025-04-22",
        time: "2:30 PM",
        status: "pending",
        price: 29.99,
        address: "456 Market St, San Francisco, CA",
      },
    ])

    setPastAppointments([
      {
        id: "3",
        provider: {
          id: "p3",
          name: "Elite Auto Care",
          image: "/placeholder.svg?height=40&width=40",
          rating: 4.9,
        },
        service: "Brake Service",
        date: "2025-03-10",
        time: "11:00 AM",
        status: "completed",
        price: 149.99,
        address: "789 Oak St, San Francisco, CA",
      },
      {
        id: "4",
        provider: {
          id: "p1",
          name: "AutoFix Pro",
          image: "/placeholder.svg?height=40&width=40",
          rating: 4.8,
        },
        service: "Oil Change",
        date: "2025-02-15",
        time: "9:30 AM",
        status: "completed",
        price: 49.99,
        address: "123 Main St, San Francisco, CA",
      },
    ])
  }

  const fetchFavorites = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock data
    setFavoriteProviders([
      {
        id: "p1",
        name: "AutoFix Pro",
        image: "/placeholder.svg?height=80&width=80",
        rating: 4.8,
        reviewCount: 124,
        address: "123 Main St, San Francisco, CA",
        services: ["Oil Change", "Brake Service", "Engine Repair"],
      },
      {
        id: "p3",
        name: "Elite Auto Care",
        image: "/placeholder.svg?height=80&width=80",
        rating: 4.9,
        reviewCount: 203,
        address: "789 Oak St, San Francisco, CA",
        services: ["Diagnostics", "Performance Tuning", "Electrical Systems"],
      },
    ])
  }

  const fetchMessages = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock data
    setMessages([
      {
        id: "m1",
        provider: {
          id: "p1",
          name: "AutoFix Pro",
          image: "/placeholder.svg?height=40&width=40",
        },
        lastMessage: "Your appointment has been confirmed for April 15th at 10:00 AM.",
        timestamp: "2025-04-10T14:30:00",
        unread: true,
      },
      {
        id: "m2",
        provider: {
          id: "p2",
          name: "Quick Lube & Tire",
          image: "/placeholder.svg?height=40&width=40",
        },
        lastMessage: "We've received your booking request and will confirm shortly.",
        timestamp: "2025-04-09T10:15:00",
        unread: false,
      },
    ])
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

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 7) {
      return date.toLocaleDateString("en-US", { weekday: "long" })
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-gray-500">Manage your appointments, favorites, and messages</p>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" className="flex items-center gap-2">
                <Link href="/dashboard/settings">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </Button>
              <Button asChild className="flex items-center gap-2 bg-rudzz-blue hover:bg-rudzz-blue/90">
                <Link href="/providers">
                  <span>Find Providers</span>
                </Link>
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="appointments" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Appointments</span>
                <span className="sm:hidden">Appts</span>
              </TabsTrigger>
              <TabsTrigger value="favorites" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Favorites</span>
                <span className="sm:hidden">Favs</span>
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Messages</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                <span>History</span>
              </TabsTrigger>
            </TabsList>

            {/* Appointments Tab */}
            <TabsContent value="appointments" className="space-y-6">
              <div>
                <h2 className="mb-4 text-xl font-semibold">Upcoming Appointments</h2>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                            <div className="flex-1 space-y-2">
                              <div className="h-4 w-1/3 rounded bg-gray-200"></div>
                              <div className="h-3 w-1/4 rounded bg-gray-200"></div>
                              <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                            </div>
                            <div className="h-8 w-24 rounded bg-gray-200"></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <Card key={appointment.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={appointment.provider.image} alt={appointment.provider.name} />
                              <AvatarFallback>{appointment.provider.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                  <h3 className="font-semibold">{appointment.service}</h3>
                                  <p className="text-sm text-gray-500">{appointment.provider.name}</p>
                                </div>
                                <Badge className={getStatusBadgeColor(appointment.status)}>
                                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                </Badge>
                              </div>
                              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <Calendar className="mr-1 h-4 w-4 text-rudzz-blue" />
                                  {formatDate(appointment.date)}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="mr-1 h-4 w-4 text-rudzz-green" />
                                  {appointment.time}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="mr-1 h-4 w-4 text-rudzz-yellow" />
                                  {appointment.address}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-row gap-2 sm:flex-col">
                              <Button asChild variant="outline" size="sm" className="flex-1">
                                <Link href={`/appointments/${appointment.id}`}>Details</Link>
                              </Button>
                              <Button asChild size="sm" className="flex-1 bg-rudzz-blue hover:bg-rudzz-blue/90">
                                <Link href={`/messages/${appointment.provider.id}`}>Message</Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <Calendar className="mb-2 h-12 w-12 text-gray-400" />
                      <h3 className="text-lg font-medium">No Upcoming Appointments</h3>
                      <p className="mb-4 text-center text-gray-500">
                        You don't have any upcoming appointments scheduled.
                      </p>
                      <Button asChild className="bg-rudzz-blue hover:bg-rudzz-blue/90">
                        <Link href="/providers">Book an Appointment</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites" className="space-y-6">
              <div>
                <h2 className="mb-4 text-xl font-semibold">Favorite Providers</h2>
                {isLoading ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2].map((i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center gap-4">
                            <div className="h-20 w-20 rounded-full bg-gray-200"></div>
                            <div className="space-y-2 text-center">
                              <div className="mx-auto h-4 w-24 rounded bg-gray-200"></div>
                              <div className="mx-auto h-3 w-16 rounded bg-gray-200"></div>
                              <div className="mx-auto h-3 w-32 rounded bg-gray-200"></div>
                            </div>
                            <div className="h-8 w-full rounded bg-gray-200"></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : favoriteProviders.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {favoriteProviders.map((provider) => (
                      <Card key={provider.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center">
                            <Avatar className="mb-4 h-20 w-20">
                              <AvatarImage src={provider.image} alt={provider.name} />
                              <AvatarFallback className="text-lg">{provider.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <h3 className="text-lg font-semibold">{provider.name}</h3>
                            <div className="mb-1 flex items-center gap-1">
                              <StarRating rating={provider.rating} />
                              <span className="text-sm text-gray-500">
                                ({provider.rating}) • {provider.reviewCount} reviews
                              </span>
                            </div>
                            <p className="mb-3 text-center text-sm text-gray-500">{provider.address}</p>
                            <div className="mb-4 flex flex-wrap justify-center gap-1">
                              {provider.services.slice(0, 3).map((service) => (
                                <Badge key={service} variant="outline" className="bg-gray-100">
                                  {service}
                                </Badge>
                              ))}
                              {provider.services.length > 3 && (
                                <Badge variant="outline" className="bg-gray-100">
                                  +{provider.services.length - 3} more
                                </Badge>
                              )}
                            </div>
                            <Button asChild className="w-full bg-rudzz-blue hover:bg-rudzz-blue/90">
                              <Link href={`/providers/${provider.id}`}>View Profile</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <Heart className="mb-2 h-12 w-12 text-gray-400" />
                      <h3 className="text-lg font-medium">No Favorite Providers</h3>
                      <p className="mb-4 text-center text-gray-500">
                        You haven't added any providers to your favorites yet.
                      </p>
                      <Button asChild className="bg-rudzz-blue hover:bg-rudzz-blue/90">
                        <Link href="/providers">Browse Providers</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-6">
              <div>
                <h2 className="mb-4 text-xl font-semibold">Recent Messages</h2>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                            <div className="flex-1 space-y-2">
                              <div className="flex justify-between">
                                <div className="h-4 w-24 rounded bg-gray-200"></div>
                                <div className="h-3 w-16 rounded bg-gray-200"></div>
                              </div>
                              <div className="h-3 w-full rounded bg-gray-200"></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <Link key={message.id} href={`/messages/${message.provider.id}`}>
                        <Card
                          className={`transition-colors hover:bg-gray-50 ${message.unread ? "border-rudzz-blue" : ""}`}
                        >
                          <CardContent className="p-6">
                            <div className="flex gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={message.provider.image} alt={message.provider.name} />
                                <AvatarFallback>{message.provider.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <h3 className={`font-semibold ${message.unread ? "text-rudzz-blue" : ""}`}>
                                    {message.provider.name}
                                  </h3>
                                  <span className="text-xs text-gray-500">{formatTimestamp(message.timestamp)}</span>
                                </div>
                                <p
                                  className={`text-sm ${message.unread ? "font-medium text-gray-900" : "text-gray-500"}`}
                                >
                                  {message.lastMessage}
                                </p>
                              </div>
                              {message.unread && (
                                <div className="flex h-2 w-2 shrink-0 rounded-full bg-rudzz-blue"></div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <MessageSquare className="mb-2 h-12 w-12 text-gray-400" />
                      <h3 className="text-lg font-medium">No Messages</h3>
                      <p className="mb-4 text-center text-gray-500">You don't have any messages yet.</p>
                      <Button asChild className="bg-rudzz-blue hover:bg-rudzz-blue/90">
                        <Link href="/providers">Find Providers</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-6">
              <div>
                <h2 className="mb-4 text-xl font-semibold">Service History</h2>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                            <div className="flex-1 space-y-2">
                              <div className="h-4 w-1/3 rounded bg-gray-200"></div>
                              <div className="h-3 w-1/4 rounded bg-gray-200"></div>
                              <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                            </div>
                            <div className="h-8 w-24 rounded bg-gray-200"></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : pastAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {pastAppointments.map((appointment) => (
                      <Card key={appointment.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={appointment.provider.image} alt={appointment.provider.name} />
                              <AvatarFallback>{appointment.provider.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                  <h3 className="font-semibold">{appointment.service}</h3>
                                  <p className="text-sm text-gray-500">{appointment.provider.name}</p>
                                </div>
                                <Badge className={getStatusBadgeColor(appointment.status)}>
                                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                </Badge>
                              </div>
                              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <Calendar className="mr-1 h-4 w-4 text-rudzz-blue" />
                                  {formatDate(appointment.date)}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="mr-1 h-4 w-4 text-rudzz-green" />
                                  {appointment.time}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="mr-1 h-4 w-4 text-rudzz-yellow" />
                                  {appointment.address}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-row gap-2 sm:flex-col">
                              <Button asChild variant="outline" size="sm" className="flex-1">
                                <Link href={`/appointments/${appointment.id}`}>Details</Link>
                              </Button>
                              <Button asChild size="sm" className="flex-1 bg-rudzz-green hover:bg-rudzz-green/90">
                                <Link href={`/reviews/write/${appointment.provider.id}`}>Write Review</Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <History className="mb-2 h-12 w-12 text-gray-400" />
                      <h3 className="text-lg font-medium">No Service History</h3>
                      <p className="mb-4 text-center text-gray-500">
                        You don't have any past appointments or services.
                      </p>
                      <Button asChild className="bg-rudzz-blue hover:bg-rudzz-blue/90">
                        <Link href="/providers">Book Your First Service</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

