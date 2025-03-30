import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { CheckCircle } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How Rudzz Works</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover how our platform connects car owners with trusted auto repair professionals.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild className="bg-rudzz-blue hover:bg-rudzz-blue/90">
                <Link href="/providers">Find Providers</Link>
              </Button>
              <Button asChild variant="outline" className="border-rudzz-green text-rudzz-green hover:bg-rudzz-green/10">
                <Link href="/provider/register">Join as Provider</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* For Car Owners */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">For Car Owners</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Getting your car serviced through Rudzz is simple and convenient.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
            <Card className="border-2 border-rudzz-blue">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rudzz-blue text-white">
                  <span className="text-xl font-bold">1</span>
                </div>
                <CardTitle>Search for Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Browse our comprehensive list of auto repair and maintenance services or search for specific services
                  you need.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-rudzz-blue" />
                    <span className="text-sm">Filter by location</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-rudzz-blue" />
                    <span className="text-sm">Compare service options</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-rudzz-blue" />
                    <span className="text-sm">Read detailed descriptions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-2 border-rudzz-green">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rudzz-green text-white">
                  <span className="text-xl font-bold">2</span>
                </div>
                <CardTitle>Choose a Provider</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Compare local service providers based on ratings, reviews, pricing, and availability to find the best
                  match.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-rudzz-green" />
                    <span className="text-sm">View verified reviews</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-rudzz-green" />
                    <span className="text-sm">Check provider credentials</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-rudzz-green" />
                    <span className="text-sm">Compare transparent pricing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-2 border-rudzz-yellow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rudzz-yellow text-black">
                  <span className="text-xl font-bold">3</span>
                </div>
                <CardTitle>Book & Pay</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Schedule your appointment online and pay securely through our platform for a seamless experience.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-rudzz-yellow" />
                    <span className="text-sm">Easy online scheduling</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-rudzz-yellow" />
                    <span className="text-sm">Secure payment processing</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-rudzz-yellow" />
                    <span className="text-sm">Appointment reminders</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Journey */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">The Customer Journey</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Follow the complete process from search to service completion.
              </p>
            </div>
          </div>
          <div className="relative mx-auto mt-12 max-w-5xl">
            {/* Timeline */}
            <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gray-200 md:left-[80px] md:translate-x-0"></div>

            {/* Timeline Items */}
            {customerJourney.map((step, index) => (
              <div key={index} className="relative mb-12 md:mb-16">
                <div className="flex flex-col md:flex-row">
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 top-0 flex -translate-x-1/2 md:left-[80px] md:translate-x-0">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${step.color}`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-16 md:ml-[160px] md:mt-0">
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="mt-2 text-gray-500">{step.description}</p>
                    <div className="mt-4">
                      <Image
                        src={step.image || "/placeholder.svg"}
                        alt={step.title}
                        width={600}
                        height={300}
                        className="rounded-lg border shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Service Providers */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">For Service Providers</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our platform to grow your auto repair business.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">How to Join</h3>
              <ol className="space-y-4">
                {providerSteps.map((step, index) => (
                  <li key={index} className="flex items-start space-x-4">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white ${step.color}`}
                    >
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{step.title}</h4>
                      <p className="text-sm text-gray-500">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="pt-4">
                <Button asChild className="bg-rudzz-green hover:bg-rudzz-green/90">
                  <Link href="/provider/register">Join as Provider</Link>
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Benefits</h3>
              <div className="space-y-4">
                {providerBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${benefit.iconBg}`}
                    >
                      <benefit.icon className={`h-5 w-5 ${benefit.iconColor}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold">{benefit.title}</h4>
                      <p className="text-sm text-gray-500">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Success Stories</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from our satisfied customers and service providers.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="italic text-gray-600">"{testimonial.quote}"</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-rudzz-blue py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Get Started?</h2>
              <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join the Rudzz community today and experience the future of auto repair services.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild className="bg-white text-rudzz-blue hover:bg-white/90">
                <Link href="/register">Sign Up as Customer</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/provider/register">Join as Provider</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

import { Search, Star, Calendar, Car, MessageSquare, BarChart, Shield, Users } from "lucide-react"

const customerJourney = [
  {
    title: "Create an Account",
    description: "Sign up for a free account to access all features of the Rudzz platform.",
    image: "/placeholder.svg?height=300&width=600",
    icon: Users,
    color: "bg-rudzz-blue",
  },
  {
    title: "Search for Services",
    description: "Use our search and filter options to find the specific auto repair services you need.",
    image: "/placeholder.svg?height=300&width=600",
    icon: Search,
    color: "bg-rudzz-green",
  },
  {
    title: "Compare Providers",
    description: "Review ratings, prices, and availability to choose the best service provider for your needs.",
    image: "/placeholder.svg?height=300&width=600",
    icon: Star,
    color: "bg-rudzz-yellow",
  },
  {
    title: "Book Appointment",
    description: "Schedule your service appointment at a time that's convenient for you.",
    image: "/placeholder.svg?height=300&width=600",
    icon: Calendar,
    color: "bg-rudzz-blue",
  },
  {
    title: "Get Your Car Serviced",
    description: "Drop off your vehicle or arrange for pickup/delivery services if available.",
    image: "/placeholder.svg?height=300&width=600",
    icon: Car,
    color: "bg-rudzz-green",
  },
  {
    title: "Pay Securely",
    description: "Make secure payments through our platform for the services rendered.",
    image: "/placeholder.svg?height=300&width=600",
    icon: Shield,
    color: "bg-rudzz-yellow",
  },
]

const providerSteps = [
  {
    title: "Create a Provider Account",
    description: "Sign up as a service provider and create your business profile.",
    color: "bg-rudzz-blue",
  },
  {
    title: "Complete Verification",
    description: "Submit required documents to verify your business credentials.",
    color: "bg-rudzz-green",
  },
  {
    title: "Set Up Your Services",
    description: "Add your service offerings with descriptions, pricing, and availability.",
    color: "bg-rudzz-yellow",
  },
  {
    title: "Manage Your Calendar",
    description: "Set your business hours and manage your appointment calendar.",
    color: "bg-rudzz-blue",
  },
  {
    title: "Start Receiving Bookings",
    description: "Once approved, your profile goes live and customers can book your services.",
    color: "bg-rudzz-green",
  },
]

const providerBenefits = [
  {
    title: "Increased Visibility",
    description: "Get discovered by new customers searching for auto repair services in your area.",
    icon: Search,
    iconBg: "bg-rudzz-blue/10",
    iconColor: "text-rudzz-blue",
  },
  {
    title: "Streamlined Booking",
    description: "Our online booking system makes it easy for customers to schedule appointments.",
    icon: Calendar,
    iconBg: "bg-rudzz-green/10",
    iconColor: "text-rudzz-green",
  },
  {
    title: "Customer Reviews",
    description: "Build your reputation through verified customer reviews and ratings.",
    icon: Star,
    iconBg: "bg-rudzz-yellow/10",
    iconColor: "text-rudzz-yellow",
  },
  {
    title: "Business Insights",
    description: "Access analytics and reporting to track your business performance.",
    icon: BarChart,
    iconBg: "bg-rudzz-blue/10",
    iconColor: "text-rudzz-blue",
  },
  {
    title: "Secure Payments",
    description: "Receive payments securely through our integrated payment system.",
    icon: Shield,
    iconBg: "bg-rudzz-green/10",
    iconColor: "text-rudzz-green",
  },
  {
    title: "Customer Communication",
    description: "Communicate with customers directly through our messaging system.",
    icon: MessageSquare,
    iconBg: "bg-rudzz-yellow/10",
    iconColor: "text-rudzz-yellow",
  },
]

const testimonials = [
  {
    name: "John Smith",
    role: "Car Owner",
    avatar: "/placeholder.svg?height=60&width=60",
    quote:
      "Rudzz made it so easy to find a reliable mechanic for my car. The booking process was seamless, and I saved money compared to what I was paying before!",
  },
  {
    name: "Sarah Johnson",
    role: "Service Provider",
    avatar: "/placeholder.svg?height=60&width=60",
    quote:
      "Since joining Rudzz, my auto repair shop has seen a 30% increase in new customers. The platform is easy to use and has helped streamline our booking process.",
  },
  {
    name: "Michael Chen",
    role: "Car Owner",
    avatar: "/placeholder.svg?height=60&width=60",
    quote:
      "I was always nervous about finding honest mechanics, but Rudzz's verified reviews gave me confidence. I found a great local shop that I now use for all my car needs.",
  },
  {
    name: "Lisa Rodriguez",
    role: "Service Provider",
    avatar: "/placeholder.svg?height=60&width=60",
    quote:
      "The Rudzz platform has helped us organize our business better. We love the scheduling system and the ability to showcase our services to potential customers.",
  },
]

