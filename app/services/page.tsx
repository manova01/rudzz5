import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover the wide range of auto repair and maintenance services available through our trusted providers.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search services..."
                  className="w-full rounded-md border border-gray-200 bg-white pl-8 shadow-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Services</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our most popular auto repair and maintenance services.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3">
            {featuredServices.map((service) => (
              <Card key={service.title} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg?height=225&width=400"}
                    alt={service.title}
                    width={400}
                    height={225}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild className="w-full bg-rudzz-blue hover:bg-rudzz-blue/90">
                    <Link href={`/services/${service.slug}`}>Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Service Categories */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">All Service Categories</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Browse all categories of auto repair and maintenance services.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {allServiceCategories.map((category) => (
              <Link
                key={category.title}
                href={`/services/${category.slug}`}
                className="group relative overflow-hidden rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rudzz-blue/10 text-rudzz-blue">
                    <category.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{category.title}</h3>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Getting your car serviced through Rudzz is simple and convenient.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rudzz-blue text-white">
                  <span className="text-xl font-bold">1</span>
                </div>
                <CardTitle>Find a Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Browse our comprehensive list of auto repair and maintenance services to find what you need.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rudzz-green text-white">
                  <span className="text-xl font-bold">2</span>
                </div>
                <CardTitle>Choose a Provider</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Compare local providers based on ratings, reviews, pricing, and availability.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rudzz-yellow text-black">
                  <span className="text-xl font-bold">3</span>
                </div>
                <CardTitle>Book & Pay</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Schedule your appointment online and pay securely through our platform.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-rudzz-blue py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Get Started?</h2>
              <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find trusted auto repair professionals in your area today.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild className="bg-white text-rudzz-blue hover:bg-white/90">
                <Link href="/providers">Find Providers</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/register">Sign Up Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

import { Wrench, FuelIcon as Oil, Gauge, Battery, Thermometer, Car, Cpu, Hammer } from "lucide-react"

const featuredServices = [
  {
    title: "Oil Change",
    slug: "oil-change",
    description: "Regular oil changes to keep your engine running smoothly",
    image: "/placeholder.svg?height=225&width=400",
  },
  {
    title: "Brake Service",
    slug: "brake-service",
    description: "Brake pad replacement and brake system repairs",
    image: "/placeholder.svg?height=225&width=400",
  },
  {
    title: "Tire Services",
    slug: "tire-services",
    description: "Tire replacement, rotation, and balancing",
    image: "/placeholder.svg?height=225&width=400",
  },
  {
    title: "Engine Repair",
    slug: "engine-repair",
    description: "Complete engine diagnostics and repair services",
    image: "/placeholder.svg?height=225&width=400",
  },
  {
    title: "Transmission",
    slug: "transmission",
    description: "Transmission repair and replacement services",
    image: "/placeholder.svg?height=225&width=400",
  },
  {
    title: "Electrical Systems",
    slug: "electrical-systems",
    description: "Electrical diagnostics and repair services",
    image: "/placeholder.svg?height=225&width=400",
  },
  {
    title: "AC Repair",
    slug: "ac-repair",
    description: "Air conditioning system diagnostics and repair",
    image: "/placeholder.svg?height=225&width=400",
  },
]

const allServiceCategories = [
  {
    title: "Oil Change",
    slug: "oil-change",
    description: "Regular maintenance",
    icon: Oil,
  },
  {
    title: "Brake Service",
    slug: "brake-service",
    description: "Brake system repairs",
    icon: Wrench,
  },
  {
    title: "Tire Services",
    slug: "tire-services",
    description: "Rotation and replacement",
    icon: Car,
  },
  {
    title: "Engine Repair",
    slug: "engine-repair",
    description: "Diagnostics and repair",
    icon: Gauge,
  },
  {
    title: "Transmission",
    slug: "transmission",
    description: "Repair and replacement",
    icon: Wrench,
  },
  {
    title: "Electrical Systems",
    slug: "electrical-systems",
    description: "Diagnostics and repair",
    icon: Battery,
  },
  {
    title: "AC & Heating",
    slug: "ac-heating",
    description: "Climate control services",
    icon: Thermometer,
  },
  {
    title: "AC Technician",
    slug: "ac-technician",
    description: "Specialized AC repairs",
    icon: Thermometer,
  },
  {
    title: "Diagnostics",
    slug: "diagnostics",
    description: "Computer diagnostics",
    icon: Cpu,
  },
  {
    title: "Body Work",
    slug: "body-work",
    description: "Repair and painting",
    icon: Hammer,
  },
  {
    title: "Panel Beating",
    slug: "panel-beating",
    description: "Panel restoration",
    icon: Hammer,
  },
  {
    title: "Paint Services",
    slug: "paint-services",
    description: "Professional painting",
    icon: Car,
  },
  {
    title: "Preventive Maintenance",
    slug: "preventive-maintenance",
    description: "Regular servicing",
    icon: Wrench,
  },
  {
    title: "Suspension",
    slug: "suspension",
    description: "Shocks and struts",
    icon: Car,
  },
  {
    title: "Exhaust System",
    slug: "exhaust-system",
    description: "Muffler and pipes",
    icon: Car,
  },
]

