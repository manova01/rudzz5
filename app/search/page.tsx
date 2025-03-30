"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const initialLocation = searchParams.get("location") || ""
  
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [location, setLocation] = useState(initialLocation)
  const [view, setView] = useState<"list" | "map">("list")
  const [results, setResults] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [priceRange, setPriceRange] = useState([0, 200])
  const [rating, setRating] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [features, setFeatures] = useState({
    openNow: false,
    freeEstimates: false,
    mobileService: false,
    warranty: false,
  })
  const [sortBy, setSortBy] = useState("recommended")
  
  useEffect(() => {
    // Simulate API call to fetch search results
    const fetchResults = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an actual API call with filters
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Mock data
        const mockResults = [
          {
            id: "p1",
            name: "AutoFix Pro",
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.8,
            reviewCount: 124,
            address: "123 Main St, San Francisco, CA",
            distance: 1.2,
            description: "Professional auto repair shop specializing in domestic and foreign vehicles. ASE certified technicians with over 20 years of experience.",
            services: ["Oil Change", "Brake Service", "Engine Repair", "Transmission"],
            verified: true,
            priceRange: "$$ - $$$",
            features: ["Open Now", "Free Estimates", "Warranty"],
          },
          {
            id: "p2",
            name: "Quick Lube & Tire",
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.5,
            reviewCount: 89,
            address: "456 Market St, San Francisco, CA",
            distance: 2.4,
            description: "Fast and reliable oil change and tire services. No appointment necessary. Most services completed in 30 minutes or less.",
            services: ["Oil Change", "Tire Rotation", "Tire Replacement", "Fluid Services"],
            verified: true,
            priceRange: "$ - $$",
            features: ["Open Now", "Free Estimates"],
          },
          {
            id: "p3",
            name: "Elite Auto Care",
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.9,
            reviewCount: 203,
            address: "789 Oak St, San Francisco, CA",
            distance: 3.1,
            description: "Luxury and exotic car specialists. Factory-trained technicians and state-of-the-art diagnostic equipment. Concierge service available.",
            services: ["Diagnostics", "Performance Tuning", "Electrical Systems", "Preventive Maintenance"],
            verified: true,
            priceRange: "$$$",
            features: ["Warranty", "Free Estimates"],
          },
          {
            id: "p4",
            name: "Budget Auto Repair",
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.2,
            reviewCount: 67,
            address: "321 Pine St, San Francisco, CA",
            distance: 1.8,
            description: "Affordable auto repair services with honest pricing. Family owned and operated for over 15 years.",
            services: ["Brake Service", "Suspension", "Exhaust System", "AC & Heating"],
            verified: false,
            priceRange: "$ - $$",
            features: ["Free Estimates"],
          },
          {
            id: "p5",
            name: "Mobile Mechanics",
            image: "/placeholder.svg?height=200&width=200",
            rating: 4.7,
            reviewCount: 42,
            address: "Serves San Francisco, CA",
            distance: 0.5,
            description: "We come to you! Mobile auto repair services at your home or office. Convenient scheduling and competitive pricing.",
            services: ["Oil Change", "Battery Replacement", "Brake Service", "Diagnostics"],
            verified: true,
            priceRange: "$$ - $$$",
            features: ["Mobile Service", "Free Estimates"],
          },
        ]
        
        setResults(mockResults)
        setTotalResults(mockResults.length)
      } catch (error) {\
        console.error("Error fetching search results

