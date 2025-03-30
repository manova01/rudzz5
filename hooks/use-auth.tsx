"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api-client"

interface User {
  id: string
  name: string
  email: string
  role: "user" | "provider" | "admin"
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth_token")
        if (token) {
          const profile = await api.profile.getProfile()
          setUser({
            id: profile.id,
            name: profile.name || profile.businessName,
            email: profile.email,
            role: "provider",
          })
        }
      } catch (err) {
        console.error("Auth check failed:", err)
        localStorage.removeItem("auth_token")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.auth.login(email, password)

      if (response.token) {
        localStorage.setItem("auth_token", response.token)

        setUser({
          id: response.user.id,
          name: response.user.name || response.user.businessName,
          email: response.user.email,
          role: "provider",
        })

        router.push("/provider/dashboard")
      } else {
        throw new Error("Login failed: No token received")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: any) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.auth.register(userData)

      if (response.token) {
        localStorage.setItem("auth_token", response.token)

        setUser({
          id: response.user.id,
          name: response.user.name || response.user.businessName,
          email: response.user.email,
          role: "provider",
        })

        router.push("/provider/dashboard")
      } else {
        throw new Error("Registration failed: No token received")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)

    try {
      await api.auth.logout()
      setUser(null)
      router.push("/login")
    } catch (err) {
      console.error("Logout error:", err)
    } finally {
      localStorage.removeItem("auth_token")
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

