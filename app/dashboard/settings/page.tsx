"use client"

import { useState } from "react"
import Link from "next/link"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { ArrowLeft, Upload, Trash2, Bell, CreditCard, Shield, LogOut } from "lucide-react"

// Profile form schema
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .regex(/^[0-9+\-\s()]+$/, { message: "Please enter a valid phone number." }),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
})

// Notification form schema
const notificationFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(true),
  appointmentReminders: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
  serviceUpdates: z.boolean().default(true),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>
type NotificationFormValues = z.infer<typeof notificationFormSchema>

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94103",
    },
  })

  // Notification form
  const notificationForm = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailNotifications: true,
      smsNotifications: true,
      appointmentReminders: true,
      marketingEmails: false,
      serviceUpdates: true,
    },
  })

  // Handle profile form submission
  const onProfileSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true)
    try {
      // In a real app, this would be an API call to update the profile
      console.log("Profile data:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success("Profile updated successfully", {
        description: "Your profile information has been saved.",
      })
    } catch (error) {
      toast.error("Failed to update profile", {
        description: "There was an error saving your profile. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle notification form submission
  const onNotificationSubmit = async (data: NotificationFormValues) => {
    setIsSubmitting(true)
    try {
      // In a real app, this would be an API call to update notification settings
      console.log("Notification data:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success("Notification settings updated", {
        description: "Your notification preferences have been saved.",
      })
    } catch (error) {
      toast.error("Failed to update notification settings", {
        description: "There was an error saving your preferences. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to Dashboard</span>
                </Link>
              </Button>
              <h1 className="text-2xl font-bold">Account Settings</h1>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information and contact details.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-2 -right-2 flex space-x-1">
                          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-white">
                            <Upload className="h-4 w-4" />
                            <span className="sr-only">Upload</span>
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-white">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-1 text-center sm:text-left">
                        <h3 className="font-medium">Profile Photo</h3>
                        <p className="text-sm text-gray-500">Upload a photo to personalize your account.</p>
                        <p className="text-xs text-gray-500">JPG, GIF or PNG. 1MB max.</p>
                      </div>
                    </div>

                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <FormField
                            control={profileForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={profileForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={profileForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input type="tel" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div>
                          <h3 className="mb-4 font-medium">Address Information</h3>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <FormField
                              control={profileForm.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Street Address</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={profileForm.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>City</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={profileForm.control}
                              name="state"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>State</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={profileForm.control}
                              name="zipCode"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ZIP Code</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <Button type="submit" className="bg-rudzz-blue hover:bg-rudzz-blue/90" disabled={isSubmitting}>
                          {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage how you receive notifications and updates.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...notificationForm}>
                      <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-start gap-3">
                              <Bell className="mt-0.5 h-5 w-5 text-rudzz-blue" />
                              <div>
                                <FormField
                                  control={notificationForm.control}
                                  name="emailNotifications"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between space-y-0">
                                      <div className="space-y-0.5">
                                        <FormLabel>Email Notifications</FormLabel>
                                        <FormDescription>Receive notifications via email.</FormDescription>
                                      </div>
                                      <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-start gap-3">
                              <Bell className="mt-0.5 h-5 w-5 text-rudzz-green" />
                              <div>
                                <FormField
                                  control={notificationForm.control}
                                  name="smsNotifications"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between space-y-0">
                                      <div className="space-y-0.5">
                                        <FormLabel>SMS Notifications</FormLabel>
                                        <FormDescription>Receive notifications via text message.</FormDescription>
                                      </div>
                                      <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-start gap-3">
                              <Bell className="mt-0.5 h-5 w-5 text-rudzz-yellow" />
                              <div>
                                <FormField
                                  control={notificationForm.control}
                                  name="appointmentReminders"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between space-y-0">
                                      <div className="space-y-0.5">
                                        <FormLabel>Appointment Reminders</FormLabel>
                                        <FormDescription>
                                          Receive reminders about upcoming appointments.
                                        </FormDescription>
                                      </div>
                                      <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-start gap-3">
                              <Bell className="mt-0.5 h-5 w-5 text-rudzz-blue" />
                              <div>
                                <FormField
                                  control={notificationForm.control}
                                  name="marketingEmails"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between space-y-0">
                                      <div className="space-y-0.5">
                                        <FormLabel>Marketing Emails</FormLabel>
                                        <FormDescription>Receive promotional offers and updates.</FormDescription>
                                      </div>
                                      <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-start gap-3">
                              <Bell className="mt-0.5 h-5 w-5 text-rudzz-green" />
                              <div>
                                <FormField
                                  control={notificationForm.control}
                                  name="serviceUpdates"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between space-y-0">
                                      <div className="space-y-0.5">
                                        <FormLabel>Service Updates</FormLabel>
                                        <FormDescription>Receive updates about your vehicle services.</FormDescription>
                                      </div>
                                      <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button type="submit" className="bg-rudzz-blue hover:bg-rudzz-blue/90" disabled={isSubmitting}>
                          {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Payment Tab */}
              <TabsContent value="payment">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment methods and billing information.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-16 items-center justify-center rounded bg-blue-100">
                            <CreditCard className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-gray-500">Expires 12/2025</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                            Remove
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-16 items-center justify-center rounded bg-red-100">
                            <CreditCard className="h-6 w-6 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium">Mastercard ending in 5678</p>
                            <p className="text-sm text-gray-500">Expires 08/2024</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button className="bg-rudzz-blue hover:bg-rudzz-blue/90">Add Payment Method</Button>

                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 font-medium">Billing Address</h3>
                      <p className="text-sm text-gray-500">
                        123 Main St
                        <br />
                        San Francisco, CA 94103
                        <br />
                        United States
                      </p>
                      <Button variant="outline" size="sm" className="mt-4">
                        Edit Billing Address
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security and privacy settings.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-3">
                          <Shield className="mt-0.5 h-5 w-5 text-rudzz-blue" />
                          <div>
                            <h3 className="font-medium">Change Password</h3>
                            <p className="text-sm text-gray-500">Update your password to keep your account secure.</p>
                          </div>
                        </div>
                        <Button variant="outline">Change Password</Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-3">
                          <Shield className="mt-0.5 h-5 w-5 text-rudzz-green" />
                          <div>
                            <h3 className="font-medium">Two-Factor Authentication</h3>
                            <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
                          </div>
                        </div>
                        <Button variant="outline">Enable</Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-3">
                          <Shield className="mt-0.5 h-5 w-5 text-rudzz-yellow" />
                          <div>
                            <h3 className="font-medium">Login History</h3>
                            <p className="text-sm text-gray-500">View your recent login activity.</p>
                          </div>
                        </div>
                        <Button variant="outline">View History</Button>
                      </div>
                    </div>

                    <div className="rounded-lg border-t pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-3">
                          <LogOut className="mt-0.5 h-5 w-5 text-red-500" />
                          <div>
                            <h3 className="font-medium">Delete Account</h3>
                            <p className="text-sm text-gray-500">
                              Permanently delete your account and all associated data.
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" className="text-red-500 hover:text-red-600">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

