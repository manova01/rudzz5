// Application constants
export const SITE_NAME = "Rudzz Auto Repair"
export const SITE_DESCRIPTION = "Connecting you with trusted auto repair professionals in your area."

// API constants
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost/rudzz/api"

// Service categories
export const SERVICE_CATEGORIES = [
  { name: "Oil Change", icon: "🔧", description: "Regular maintenance for your vehicle" },
  { name: "Brakes", icon: "🛑", description: "Brake repair and replacement services" },
  { name: "Tires", icon: "🛞", description: "Tire rotation, balancing, and replacement" },
  { name: "Engine", icon: "⚙️", description: "Engine diagnostics and repair" },
  { name: "Transmission", icon: "🔄", description: "Transmission repair and maintenance" },
  { name: "AC & Heating", icon: "❄️", description: "Climate control system services" },
  { name: "AC Technician", icon: "🧊", description: "Specialized air conditioning repair" },
  { name: "Body Work", icon: "🚗", description: "Vehicle body repair and painting" },
]

// Navigation links
export const NAVIGATION_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Providers", href: "/providers" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

// Footer links
export const FOOTER_LINKS = {
  quickLinks: [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Find Providers", href: "/providers" },
    { name: "How It Works", href: "/how-it-works" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
  ],
  legal: [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
}

// Social media links
export const SOCIAL_LINKS = [
  { name: "Facebook", href: "https://facebook.com" },
  { name: "Twitter", href: "https://twitter.com" },
  { name: "Instagram", href: "https://instagram.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
]

// Map configuration
export const DEFAULT_MAP_CENTER = [-74.5, 40] // Default to US
export const DEFAULT_MAP_ZOOM = 10

