export interface Provider {
  id: string
  businessName: string
  name?: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  description: string
  services: string[]
  specialties?: string[]
  businessHours: BusinessHours
  rating: number
  reviewCount: number
  verified: boolean
  featured: boolean
  location: {
    lat: number
    lng: number
  }
  images: string[]
  profileImage: string
}

export interface BusinessHours {
  monday: DayHours
  tuesday: DayHours
  wednesday: DayHours
  thursday: DayHours
  friday: DayHours
  saturday: DayHours
  sunday: DayHours
}

export interface DayHours {
  open: boolean
  openTime: string
  closeTime: string
}

export interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
  category: string
}

export interface Appointment {
  id: string
  userId: string
  providerId: string
  serviceId: string
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  notes: string
  vehicle: Vehicle
}

export interface Vehicle {
  id: string
  userId: string
  make: string
  model: string
  year: number
  licensePlate: string
  vin: string
  color: string
  type: string
}

export interface Review {
  id: string
  userId: string
  providerId: string
  serviceId: string
  appointmentId: string
  rating: number
  comment: string
  date: string
  helpful: number
  response?: {
    comment: string
    date: string
  }
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  profileImage: string
  vehicles: Vehicle[]
  appointments: Appointment[]
  reviews: Review[]
  favorites: string[]
}

