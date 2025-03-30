import type { FeaturedProvider } from "@/components/featured-providers"

// Sample featured providers data
export const FEATURED_PROVIDERS: FeaturedProvider[] = [
  {
    id: 1,
    name: "AutoFix Pro",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
    location: "Los Angeles, CA",
    specialties: ["Engine Repair", "Transmission", "Electrical Systems"],
    featured: true,
  },
  {
    id: 2,
    name: "Speedy Repairs",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 98,
    location: "San Francisco, CA",
    specialties: ["Brake Service", "Oil Change", "Tire Services"],
    featured: true,
  },
  {
    id: 3,
    name: "Master Mechanics",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 156,
    location: "New York, NY",
    specialties: ["AC & Heating", "Diagnostics", "Body Work"],
    featured: true,
  },
  {
    id: 4,
    name: "Elite Auto Care",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 112,
    location: "Chicago, IL",
    specialties: ["Suspension", "Alignment", "Brake Service"],
    featured: true,
  },
  {
    id: 5,
    name: "Premium Auto Service",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 89,
    location: "Houston, TX",
    specialties: ["Oil Change", "Tire Services", "Engine Repair"],
    featured: true,
  },
]

