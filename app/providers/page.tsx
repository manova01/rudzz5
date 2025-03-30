"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { ProviderCard } from "@/components/provider-card"
import { FEATURED_PROVIDERS } from "@/lib/featured-providers"

export default function ProvidersPage() {
  const [view, setView] = useState<"list" | "map">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [rating, setRating] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [providers, setProviders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch providers
    const fetchProviders = async () => {
      setIsLoading(true)
      // In a real app, this would be an API call with filters
      setTimeout(() => {
        setProviders(sampleProviders)
        setIsLoading(false)
      }, 1000)
    }

    fetchProviders()
  }, [searchQuery, location, priceRange, rating, serviceType])

  // In a real app, you would fetch this data from an API
  const providers2 = FEATURED_PROVIDERS

  // Separate featured providers to show at the top
  const featuredProviders = providers2.filter((provider) => provider.featured)
  const regularProviders = providers2.filter((provider) => !provider.featured)

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-b from-rudzz-blue/10 to-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">Auto Repair Service Providers</h1>
            <p className="mx-auto max-w-2xl text-gray-600">
              Browse our network of trusted auto repair professionals and find the right service provider for your
              vehicle needs.
            </p>
          </div>
        </section>

        {/* Featured Providers Section */}
        {featuredProviders.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 text-2xl font-bold">Featured Providers</h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {featuredProviders.map((provider) => (
                  <ProviderCard
                    key={provider.id}
                    id={provider.id}
                    name={provider.name}
                    image={provider.image}
                    rating={provider.rating}
                    reviews={provider.reviews}
                    location={provider.location}
                    specialties={provider.specialties}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Providers Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-2xl font-bold">All Providers</h2>
            {regularProviders.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {regularProviders.map((provider) => (
                  <ProviderCard
                    key={provider.id}
                    id={provider.id}
                    name={provider.name}
                    image={provider.image}
                    rating={provider.rating}
                    reviews={provider.reviews}
                    location={provider.location}
                    specialties={provider.specialties}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No additional providers available at this time.</p>
            )}
          </div>
        </section>
      </main>

      {/* CTA Section */}
      <section className="bg-rudzz-yellow py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center text-black">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Are You a Service Provider?</h2>
              <p className="max-w-[900px] text-black/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our platform to reach more customers and grow your business.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild className="bg-black text-white hover:bg-black/90">
                <Link href="/provider/register">Join as Provider</Link>
              </Button>
              <Button asChild variant="outline" className="border-black text-black hover:bg-black/10">
                <Link href="/how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

// Sample data for providers
const sampleProviders = [
  {
    id: "1",
    name: "AutoFix Pro",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
    reviewCount: 124,
    address: "123 Main St, San Francisco, CA",
    distance: 1.2,
    description:
      "Professional auto repair shop specializing in domestic and foreign vehicles. ASE certified technicians with over 20 years of experience.",
    services: ["Oil Change", "Brake Service", "Engine Repair", "Transmission"],
    verified: true,
    location: { lat: 37.7749, lng: -122.4194 },
  },
  {
    id: "2",
    name: "Quick Lube & Tire",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.5,
    reviewCount: 89,
    address: "456 Market St, San Francisco, CA",
    distance: 2.4,
    description:
      "Fast and reliable oil change and tire services. No appointment necessary. Most services completed in 30 minutes or less.",
    services: ["Oil Change", "Tire Rotation", "Tire Replacement", "Fluid Services"],
    verified: true,
    location: { lat: 37.7899, lng: -122.4014 },
  },
  {
    id: "3",
    name: "Elite Auto Care",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
    reviewCount: 203,
    address: "789 Oak St, San Francisco, CA",
    distance: 3.1,
    description:
      "Luxury and exotic car specialists. Factory-trained technicians and state-of-the-art diagnostic equipment. Concierge service available.",
    services: ["Diagnostics", "Performance Tuning", "Electrical Systems", "Preventive Maintenance"],
    verified: true,
    location: { lat: 37.7699, lng: -122.4294 },
  },
  {
    id: "4",
    name: "Budget Auto Repair",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.2,
    reviewCount: 67,
    address: "321 Pine St, San Francisco, CA",
    distance: 1.8,
    description: "Affordable auto repair services with honest pricing. Family owned and operated for over 15 years.",
    services: ["Brake Service", "Suspension", "Exhaust System", "AC & Heating"],
    verified: false,
    location: { lat: 37.7879, lng: -122.4074 },
  },
  {
    id: "5",
    name: "Mobile Mechanics",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
    reviewCount: 42,
    address: "Serves San Francisco, CA",
    distance: 0.5,
    description:
      "We come to you! Mobile auto repair services at your home or office. Convenient scheduling and competitive pricing.",
    services: ["Oil Change", "Battery Replacement", "Brake Service", "Diagnostics"],
    verified: true,
    location: { lat: 37.7829, lng: -122.4124 },
  },
]

