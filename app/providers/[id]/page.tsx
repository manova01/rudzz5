import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StarRating } from "@/components/ui/star-rating"
import { ProviderMap } from "@/components/provider-map"

export const metadata: Metadata = {
  title: "Provider Profile | Rudzz Auto Repair",
  description: "View provider details and services",
}

// Mock data for provider
const getMockProvider = (id: string) => {
  return {
    id: Number.parseInt(id),
    businessName: "AutoFix Pro",
    rating: 4.8,
    reviewCount: 124,
    description:
      "AutoFix Pro has been serving the community for over 15 years with quality auto repair services. We specialize in all types of repairs and maintenance for all vehicle makes and models.",
    address: "123 Main Street, Anytown, CA 12345",
    phone: "(555) 123-4567",
    email: "info@autofixpro.com",
    website: "https://www.autofixpro.com",
    logoUrl: "/placeholder.svg?height=100&width=100",
    latitude: 34.052235,
    longitude: -118.243683,
    businessHours: {
      monday: { open: "08:00", close: "18:00" },
      tuesday: { open: "08:00", close: "18:00" },
      wednesday: { open: "08:00", close: "18:00" },
      thursday: { open: "08:00", close: "18:00" },
      friday: { open: "08:00", close: "18:00" },
      saturday: { open: "09:00", close: "16:00" },
      sunday: { open: "Closed", close: "Closed" },
    },
    services: [
      {
        id: 1,
        name: "Oil Change",
        description: "Full synthetic oil change with filter replacement",
        price: 49.99,
        category: "Maintenance",
      },
      {
        id: 2,
        name: "Brake Service",
        description: "Brake pad replacement and rotor inspection",
        price: 199.99,
        category: "Repairs",
      },
      {
        id: 3,
        name: "Tire Rotation",
        description: "Rotate and balance all four tires",
        price: 39.99,
        category: "Maintenance",
      },
      {
        id: 4,
        name: "Engine Diagnostic",
        description: "Computer diagnostic of engine performance issues",
        price: 89.99,
        category: "Diagnostics",
      },
    ],
    reviews: [
      {
        id: 1,
        userName: "John D.",
        rating: 5,
        date: "2023-05-15",
        comment: "Great service! They fixed my car quickly and at a reasonable price.",
      },
      {
        id: 2,
        userName: "Sarah M.",
        rating: 4,
        date: "2023-04-22",
        comment: "Professional staff and good work. Slightly pricier than expected.",
      },
      {
        id: 3,
        userName: "Robert J.",
        rating: 5,
        date: "2023-03-10",
        comment: "I've been coming here for years. Always reliable and honest.",
      },
    ],
  }
}

// Function to check if the provider is currently open
function isOpen(provider: any): boolean {
  const now = new Date()
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const currentDay = days[now.getDay()]

  const hours = provider.businessHours[currentDay]
  if (hours.open === "Closed") return false

  const currentTime = now.getHours() * 100 + now.getMinutes()
  const [openHour, openMinute] = hours.open.split(":").map(Number)
  const [closeHour, closeMinute] = hours.close.split(":").map(Number)

  const openTime = openHour * 100 + openMinute
  const closeTime = closeHour * 100 + closeMinute

  return currentTime >= openTime && currentTime < closeTime
}

export default function ProviderProfilePage({ params }: { params: { id: string } }) {
  const provider = getMockProvider(params.id)
  const open = isOpen(provider)

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Provider Info */}
            <div className="md:col-span-2">
              <div className="flex flex-col space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full">
                    <Image
                      src={provider.logoUrl || "/placeholder.svg"}
                      alt={provider.businessName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">{provider.businessName}</h1>
                    <div className="flex items-center space-x-2">
                      <StarRating rating={provider.rating} />
                      <span className="text-sm text-gray-600">({provider.reviewCount} reviews)</span>
                      <span
                        className={`ml-2 rounded-full px-2 py-1 text-xs ${open ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {open ? "Open Now" : "Closed"}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700">{provider.description}</p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="mb-2 font-semibold">Contact Information</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Address:</span> {provider.address}
                        </p>
                        <p>
                          <span className="font-medium">Phone:</span> {provider.phone}
                        </p>
                        <p>
                          <span className="font-medium">Email:</span> {provider.email}
                        </p>
                        <p>
                          <span className="font-medium">Website:</span>{" "}
                          <a
                            href={provider.website}
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {provider.website}
                          </a>
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h3 className="mb-2 font-semibold">Business Hours</h3>
                      <div className="space-y-1 text-sm">
                        {Object.entries(provider.businessHours).map(([day, hours]) => (
                          <div key={day} className="flex justify-between">
                            <span className="capitalize">{day}:</span>
                            <span>{hours.open === "Closed" ? "Closed" : `${hours.open} - ${hours.close}`}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex space-x-4">
                  <Button asChild>
                    <Link href={`/booking/${provider.id}`}>Book Appointment</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/messages/${provider.id}`}>Message</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="h-64 overflow-hidden rounded-lg md:h-auto">
              <ProviderMap
                providers={[
                  {
                    id: provider.id,
                    businessName: provider.businessName,
                    latitude: provider.latitude,
                    longitude: provider.longitude,
                    address: provider.address,
                  },
                ]}
                center={[provider.longitude, provider.latitude]}
                zoom={14}
              />
            </div>
          </div>

          {/* Services and Reviews Tabs */}
          <div className="mt-8">
            <Tabs defaultValue="services">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="services" className="mt-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {provider.services.map((service) => (
                    <Card key={service.id}>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold">{service.name}</h3>
                        <p className="text-sm text-gray-600">{service.description}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="font-medium">${service.price.toFixed(2)}</span>
                          <Button size="sm" asChild>
                            <Link href={`/booking/${provider.id}?service=${service.id}`}>Book</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <div className="space-y-4">
                  {provider.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{review.userName}</h3>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <StarRating rating={review.rating} />
                        <p className="mt-2 text-gray-700">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                  <div className="flex justify-center">
                    <Button variant="outline" asChild>
                      <Link href={`/reviews/write/${provider.id}`}>Write a Review</Link>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

