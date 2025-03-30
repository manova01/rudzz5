"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { Button } from "@/components/ui/button"
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "@/lib/constants"

// Use environment variable for the Mapbox token
const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY

interface Provider {
  id: number | string
  businessName: string
  latitude: number
  longitude: number
  address: string
}

interface ProviderMapProps {
  providers: Provider[]
  center?: [number, number]
  zoom?: number
  singleProvider?: boolean
}

export function ProviderMap({ providers, center, zoom = DEFAULT_MAP_ZOOM, singleProvider = false }: ProviderMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize map
  const initializeMap = useCallback(() => {
    if (!mapContainer.current || !mapboxToken) {
      setError("Map container or API key missing")
      return
    }

    try {
      // Set the access token for Mapbox
      mapboxgl.accessToken = mapboxToken

      // Create map instance
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: center || DEFAULT_MAP_CENTER,
        zoom: zoom,
      })

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

      // Set map as loaded when ready
      map.current.on("load", () => {
        setMapLoaded(true)
      })
    } catch (err) {
      console.error("Error initializing map:", err)
      setError("Failed to initialize map")
    }
  }, [center, zoom])

  // Add markers to map
  const addMarkers = useCallback(() => {
    if (!map.current || !mapLoaded || providers.length === 0) return

    // Clear existing markers
    markers.current.forEach((marker) => marker.remove())
    markers.current = []

    // Add new markers
    providers.forEach((provider) => {
      // Create custom popup content
      const popupContent = document.createElement("div")
      popupContent.className = "map-popup"
      popupContent.innerHTML = `
        <h3 class="font-semibold">${provider.businessName}</h3>
        <p class="text-sm">${provider.address}</p>
        <a href="/providers/${provider.id}" class="text-sm text-rudzz-blue hover:underline">View Profile</a>
      `

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setDOMContent(popupContent)

      // Create marker
      const marker = new mapboxgl.Marker({ color: "#2196F3" })
        .setLngLat([provider.longitude, provider.latitude])
        .setPopup(popup)
        .addTo(map.current!)

      markers.current.push(marker)
    })

    // If there are providers and no center was specified, fit the map to show all markers
    if (providers.length > 0 && !center && !singleProvider) {
      const bounds = new mapboxgl.LngLatBounds()
      providers.forEach((provider) => {
        bounds.extend([provider.longitude, provider.latitude])
      })
      map.current.fitBounds(bounds, { padding: 50 })
    }
  }, [providers, mapLoaded, center, singleProvider])

  // Initialize map on component mount
  useEffect(() => {
    if (!map.current) {
      initializeMap()
    }

    // Cleanup function
    return () => {
      if (map.current) {
        // Remove markers
        markers.current.forEach((marker) => marker.remove())
        markers.current = []

        // Destroy map
        map.current.remove()
        map.current = null
      }
    }
  }, [initializeMap])

  // Add markers when map is loaded and providers change
  useEffect(() => {
    addMarkers()
  }, [addMarkers])

  if (error) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
        <p className="mb-4 text-gray-600">{error}</p>
        {providers.length > 0 && (
          <Button asChild className="bg-rudzz-blue hover:bg-rudzz-blue/90">
            <a
              href={`https://maps.google.com/?q=${providers[0].latitude},${providers[0].longitude}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Google Maps
            </a>
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="relative h-full w-full rounded-lg">
      <div ref={mapContainer} className="h-full w-full rounded-lg" />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-rudzz-blue border-t-transparent"></div>
        </div>
      )}
    </div>
  )
}

