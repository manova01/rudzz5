// API client for provider dashboard
import { API_BASE_URL } from "@/lib/constants"

// Error class for API errors
export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

// Helper function to handle API responses
async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "An unknown error occurred" }))
    throw new ApiError(errorData.message || `Error: ${response.status}`, response.status)
  }
  return response.json()
}

// Get the JWT token from localStorage
function getAuthToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token")
  }
  return null
}

// Create headers with authentication
function createHeaders() {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  const token = getAuthToken()
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  return headers
}

// Base API request function
async function apiRequest(endpoint: string, method = "GET", data?: any, customHeaders?: HeadersInit) {
  const url = `${API_BASE_URL}/${endpoint}`

  const options: RequestInit = {
    method,
    headers: { ...createHeaders(), ...customHeaders },
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(url, options)
    return await handleResponse(response)
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(error instanceof Error ? error.message : "An unknown error occurred", 500)
  }
}

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    apiRequest("providers/auth.php", "POST", { action: "login", email, password }),

  register: (providerData: any) => apiRequest("providers/auth.php", "POST", { action: "register", ...providerData }),

  logout: () => {
    const result = apiRequest("providers/auth.php", "POST", { action: "logout" })
    localStorage.removeItem("auth_token")
    return result
  },
}

// Provider Profile API
export const profileApi = {
  getProfile: () => apiRequest("providers/profile.php"),

  updateProfile: (profileData: any) => apiRequest("providers/profile.php", "PUT", profileData),
}

// Provider Services API
export const servicesApi = {
  getServices: () => apiRequest("providers/services.php"),

  createService: (serviceData: any) => apiRequest("providers/services.php", "POST", serviceData),

  updateService: (serviceId: string, serviceData: any) =>
    apiRequest(`providers/services.php?id=${serviceId}`, "PUT", serviceData),

  deleteService: (serviceId: string) => apiRequest(`providers/services.php?id=${serviceId}`, "DELETE"),
}

// Provider Appointments API
export const appointmentsApi = {
  getAppointments: (options: { limit?: number; status?: string } = {}) => {
    const params = new URLSearchParams()

    if (options.limit) {
      params.append("limit", options.limit.toString())
    }

    if (options.status) {
      params.append("status", options.status)
    }

    const queryString = params.toString() ? `?${params.toString()}` : ""
    return apiRequest(`providers/appointments.php${queryString}`)
  },

  updateAppointmentStatus: (appointmentId: string, status: string) =>
    apiRequest(`providers/appointments.php?id=${appointmentId}`, "PUT", { status }),
}

// Provider Reviews API
export const reviewsApi = {
  getReviews: (options: { limit?: number } = {}) => {
    const params = new URLSearchParams()

    if (options.limit) {
      params.append("limit", options.limit.toString())
    }

    const queryString = params.toString() ? `?${params.toString()}` : ""
    return apiRequest(`providers/reviews.php${queryString}`)
  },
}

// Provider Stats API
export const statsApi = {
  getStats: () => apiRequest("providers/stats.php"),

  getPerformance: () => apiRequest("providers/stats.php?type=performance"),
}

// Export all APIs as a single object
export const api = {
  auth: authApi,
  profile: profileApi,
  services: servicesApi,
  appointments: appointmentsApi,
  reviews: reviewsApi,
  stats: statsApi,
}

// Export individual functions for backward compatibility
export const { login: loginProvider, register: registerProvider, logout: logoutProvider } = authApi

export const { getProfile: fetchProviderProfile, updateProfile: updateProviderProfile } = profileApi

export const { getServices: fetchProviderServices, createService, updateService, deleteService } = servicesApi

export const { getAppointments: fetchProviderAppointments, updateAppointmentStatus } = appointmentsApi

export const { getReviews: fetchProviderReviews } = reviewsApi

export const { getStats: fetchProviderStats, getPerformance: fetchProviderPerformance } = statsApi

