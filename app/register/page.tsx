"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { toast } from "sonner"
import { Eye, EyeOff, Mail, Phone } from "lucide-react"

// Email registration schema
const emailFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
})

// Phone registration schema
const phoneFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .regex(/^[0-9+\-\s()]+$/, { message: "Please enter a valid phone number." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
})

type EmailFormValues = z.infer<typeof emailFormSchema>
type PhoneFormValues = z.infer<typeof phoneFormSchema>

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email")
  const [showPassword, setShowPassword] = useState(false)

  // Email form
  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  // Phone form
  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
    },
  })

  // Handle email form submission
  const onEmailSubmit = async (data: EmailFormValues) => {
    try {
      // In a real app, this would be an API call to register the user
      console.log("Email registration data:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Registration successful!", {
        description: "Welcome to Rudzz Auto Repair Marketplace.",
      })

      // Redirect to login or dashboard
      // router.push("/login")
    } catch (error) {
      toast.error("Registration failed", {
        description: "Please try again later.",
      })
    }
  }

  // Handle phone form submission
  const onPhoneSubmit = async (data: PhoneFormValues) => {
    try {
      // In a real app, this would be an API call to register the user
      console.log("Phone registration data:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Registration successful!", {
        description: "Welcome to Rudzz Auto Repair Marketplace.",
      })

      // Redirect to login or dashboard
      // router.push("/login")
    } catch (error) {
      toast.error("Registration failed", {
        description: "Please try again later.",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />

      <main className="flex-1 py-12">
        <div className="container max-w-md px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <Link href="/" className="mb-4 flex items-center space-x-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rudzz2-jloJTA9YV1x5OtDeIp5D8BJ4eslYwy.png"
                alt="Rudzz Logo"
                width={50}
                height={50}
                className="h-12 w-12"
              />
            </Link>
            <h1 className="mb-2 text-3xl font-bold">Create an Account</h1>
            <p className="mb-8 text-gray-500">Join Rudzz to connect with trusted auto repair professionals.</p>
          </div>

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "email" | "phone")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>Phone</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <Card>
                <CardHeader>
                  <CardTitle>Register with Email</CardTitle>
                  <CardDescription>Enter your information to create an account</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...emailForm}>
                    <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                      <FormField
                        control={emailForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={emailForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={emailForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-0 top-0 h-full px-3"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-gray-500" />
                                  ) : (
                                    <Eye className="h-4 w-4 text-gray-500" />
                                  )}
                                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full bg-rudzz-blue hover:bg-rudzz-blue/90">
                        Create Account
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="text-center text-sm">
                    By creating an account, you agree to our{" "}
                    <Link href="/terms" className="text-rudzz-blue hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-rudzz-blue hover:underline">
                      Privacy Policy
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="phone">
              <Card>
                <CardHeader>
                  <CardTitle>Register with Phone</CardTitle>
                  <CardDescription>Enter your information to create an account</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...phoneForm}>
                    <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
                      <FormField
                        control={phoneForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={phoneForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={phoneForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-0 top-0 h-full px-3"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-gray-500" />
                                  ) : (
                                    <Eye className="h-4 w-4 text-gray-500" />
                                  )}
                                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full bg-rudzz-blue hover:bg-rudzz-blue/90">
                        Create Account
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="text-center text-sm">
                    By creating an account, you agree to our{" "}
                    <Link href="/terms" className="text-rudzz-blue hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-rudzz-blue hover:underline">
                      Privacy Policy
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-rudzz-blue hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

