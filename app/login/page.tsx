"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { toast } from "sonner"
import { Eye, EyeOff, Mail, Phone } from "lucide-react"

// Email login schema
const emailFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
  rememberMe: z.boolean().optional(),
})

// Phone login schema
const phoneFormSchema = z.object({
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .regex(/^[0-9+\-\s()]+$/, { message: "Please enter a valid phone number." }),
  password: z.string().min(1, { message: "Password is required." }),
  rememberMe: z.boolean().optional(),
})

type EmailFormValues = z.infer<typeof emailFormSchema>
type PhoneFormValues = z.infer<typeof phoneFormSchema>

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email")
  const [showPassword, setShowPassword] = useState(false)

  // Email form
  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  // Phone form
  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {
      phone: "",
      password: "",
      rememberMe: false,
    },
  })

  // Handle email form submission
  const onEmailSubmit = async (data: EmailFormValues) => {
    try {
      // In a real app, this would be an API call to authenticate the user
      console.log("Email login data:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Login successful!", {
        description: "Welcome back to Rudzz Auto Repair Marketplace.",
      })

      // Redirect to dashboard
      // router.push("/dashboard")
    } catch (error) {
      toast.error("Login failed", {
        description: "Invalid email or password.",
      })
    }
  }

  // Handle phone form submission
  const onPhoneSubmit = async (data: PhoneFormValues) => {
    try {
      // In a real app, this would be an API call to authenticate the user
      console.log("Phone login data:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Login successful!", {
        description: "Welcome back to Rudzz Auto Repair Marketplace.",
      })

      // Redirect to dashboard
      // router.push("/dashboard")
    } catch (error) {
      toast.error("Login failed", {
        description: "Invalid phone number or password.",
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
            <h1 className="mb-2 text-3xl font-bold">Welcome Back</h1>
            <p className="mb-8 text-gray-500">Sign in to your Rudzz account</p>
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
                  <CardTitle>Sign in with Email</CardTitle>
                  <CardDescription>Enter your email and password to sign in</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...emailForm}>
                    <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
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
                            <div className="flex items-center justify-between">
                              <FormLabel>Password</FormLabel>
                              <Link href="/forgot-password" className="text-xs text-rudzz-blue hover:underline">
                                Forgot password?
                              </Link>
                            </div>
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

                      <FormField
                        control={emailForm.control}
                        name="rememberMe"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Remember me</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full bg-rudzz-blue hover:bg-rudzz-blue/90">
                        Sign In
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="phone">
              <Card>
                <CardHeader>
                  <CardTitle>Sign in with Phone</CardTitle>
                  <CardDescription>Enter your phone number and password to sign in</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...phoneForm}>
                    <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
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
                            <div className="flex items-center justify-between">
                              <FormLabel>Password</FormLabel>
                              <Link href="/forgot-password" className="text-xs text-rudzz-blue hover:underline">
                                Forgot password?
                              </Link>
                            </div>
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

                      <FormField
                        control={phoneForm.control}
                        name="rememberMe"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Remember me</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full bg-rudzz-blue hover:bg-rudzz-blue/90">
                        Sign In
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link href="/register" className="text-rudzz-blue hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

