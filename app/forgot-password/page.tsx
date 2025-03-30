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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { toast } from "sonner"
import { Mail, Phone } from "lucide-react"

// Email recovery schema
const emailFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
})

// Phone recovery schema
const phoneFormSchema = z.object({
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .regex(/^[0-9+\-\s()]+$/, { message: "Please enter a valid phone number." }),
})

type EmailFormValues = z.infer<typeof emailFormSchema>
type PhoneFormValues = z.infer<typeof phoneFormSchema>

export default function ForgotPasswordPage() {
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Email form
  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
    },
  })

  // Phone form
  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {
      phone: "",
    },
  })

  // Handle email form submission
  const onEmailSubmit = async (data: EmailFormValues) => {
    try {
      setIsSubmitting(true)
      // In a real app, this would be an API call to send a password reset email
      console.log("Email recovery data:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success("Recovery email sent!", {
        description: "Please check your email for password reset instructions.",
      })

      emailForm.reset()
    } catch (error) {
      toast.error("Failed to send recovery email", {
        description: "Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle phone form submission
  const onPhoneSubmit = async (data: PhoneFormValues) => {
    try {
      setIsSubmitting(true)
      // In a real app, this would be an API call to send a password reset SMS
      console.log("Phone recovery data:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success("Recovery SMS sent!", {
        description: "Please check your phone for the verification code.",
      })

      phoneForm.reset()
    } catch (error) {
      toast.error("Failed to send recovery SMS", {
        description: "Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
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
            <h1 className="mb-2 text-3xl font-bold">Reset Your Password</h1>
            <p className="mb-8 text-gray-500">We'll send you instructions to reset your password</p>
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
                  <CardTitle>Reset with Email</CardTitle>
                  <CardDescription>Enter your email address to receive reset instructions</CardDescription>
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

                      <Button
                        type="submit"
                        className="w-full bg-rudzz-blue hover:bg-rudzz-blue/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Reset Instructions"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="phone">
              <Card>
                <CardHeader>
                  <CardTitle>Reset with Phone</CardTitle>
                  <CardDescription>Enter your phone number to receive a verification code</CardDescription>
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

                      <Button
                        type="submit"
                        className="w-full bg-rudzz-blue hover:bg-rudzz-blue/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Verification Code"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Remember your password?{" "}
              <Link href="/login" className="text-rudzz-blue hover:underline">
                Back to login
              </Link>
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

