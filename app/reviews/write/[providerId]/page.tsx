"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, ArrowLeft, CheckCircle } from "lucide-react"
import { toast } from "sonner"

// Form schema
const reviewFormSchema = z.object({
  rating: z.string({
    required_error: "Please select a rating",
  }),
  service: z.string({
    required_error: "Please select a service",
  }),
  comment: z
    .string()
    .min(10, { message: "Comment must be at least 10 characters." })
    .max(500, { message: "Comment must not exceed 500 characters." }),
})

type ReviewFormValues = z.infer<typeof reviewFormSchema>

export default function WriteReviewPage({ params }) {
  const { providerId } = params
  const [isLoading, setIsLoading] = useState(true)
  const [provider, setProvider] = useState(null)
  const [services, setServices] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  // Initialize form
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: "",
      service: "",
      comment: "",
    },
  })

  useEffect(() => {
    // Simulate API calls to fetch data
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, these would be actual API calls
        await Promise.all([fetchProvider(), fetchServices()])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [providerId])

  const fetchProvider = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock data
    setProvider({
      id: providerId,
      name: "AutoFix Pro",
      image: "/placeholder.svg?height=80&width=80",
      rating: 4.8,
      reviewCount: 124,
      address: "123 Main St, San Francisco, CA 94103",
    })
  }

  const fetchServices = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock data - services the user has received from this provider
    setServices([
      {
        id: "s1",
        name: "Oil Change",
        date: "March 15, 2025",
      },
      {
        id: "s2",
        name: "Brake Pad Replacement",
        date: "February 10, 2025",
      },
      {
        id: "s3",
        name: "Engine Diagnostics",
        date: "January 5, 2025",
      },
    ])
  }

  const onSubmit = async (data: ReviewFormValues) => {
    setIsSubmitting(true)
    try {
      // In a real app, this would be an API call to submit the review
      console.log("Review data:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setReviewSubmitted(true)

      toast.success("Review submitted successfully", {
        description: "Thank you for sharing your feedback!",
      })
    } catch (error) {
      toast.error("Failed to submit review", {
        description: "There was an error submitting your review. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <label
        key={i}
        htmlFor={`rating-${i + 1}`}
        className={`cursor-pointer ${
          Number.parseInt(form.watch("rating") || "0") > i ? "text-rudzz-yellow" : "text-gray-300"
        }`}
      >
        <Star className="h-8 w-8 fill-current" />
      </label>
    ))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl">
            {isLoading ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="mt-1 h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-[400px] w-full rounded-lg" />
              </div>
            ) : reviewSubmitted ? (
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rudzz-green">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Review Submitted!</CardTitle>
                  <CardDescription>Thank you for sharing your feedback about {provider?.name}.</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-6">
                    Your review helps other customers make informed decisions and helps providers improve their
                    services.
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 sm:flex-row">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                  <Button asChild className="w-full bg-rudzz-blue hover:bg-rudzz-blue/90">
                    <Link href={`/providers/${providerId}`}>View Provider Profile</Link>
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <>
                <div className="mb-6 flex items-center gap-2">
                  <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Link href="/dashboard?tab=history">
                      <ArrowLeft className="h-4 w-4" />
                      <span className="sr-only">Back</span>
                    </Link>
                  </Button>
                  <h1 className="text-2xl font-bold">Write a Review</h1>
                </div>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={provider?.image} alt={provider?.name} />
                        <AvatarFallback>{provider?.name?.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{provider?.name}</CardTitle>
                        <CardDescription>{provider?.address}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="rating"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Rating</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex justify-center space-x-1"
                                >
                                  {[1, 2, 3, 4, 5].map((value) => (
                                    <div key={value} className="sr-only">
                                      <RadioGroupItem value={value.toString()} id={`rating-${value}`} />
                                    </div>
                                  ))}
                                  {renderStars(Number.parseInt(field.value || "0"))}
                                </RadioGroup>
                              </FormControl>
                              <FormDescription className="text-center">
                                {field.value === "5" && "Excellent! Couldn't be better."}
                                {field.value === "4" && "Very good! Highly recommend."}
                                {field.value === "3" && "Good. Met expectations."}
                                {field.value === "2" && "Fair. Some room for improvement."}
                                {field.value === "1" && "Poor. Needs significant improvement."}
                                {!field.value && "Click to rate your experience"}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="service"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Service Received</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a service" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {services.map((service) => (
                                    <SelectItem key={service.id} value={service.id}>
                                      {service.name} - {service.date}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>Select the service you received from this provider.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="comment"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Review</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Share your experience with this provider..."
                                  className="min-h-[150px] resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Your honest feedback helps others and helps providers improve.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full bg-rudzz-blue hover:bg-rudzz-blue/90"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit Review"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

