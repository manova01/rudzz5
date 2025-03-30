import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ServiceCard } from "@/components/service-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { FeaturedProviders } from "@/components/featured-providers"
import { SERVICE_CATEGORIES } from "@/lib/constants"
import { FEATURED_PROVIDERS } from "@/lib/featured-providers"

export default function Home() {
  // Sample testimonials
  const testimonials = [
    {
      quote:
        "I found a great mechanic through Rudzz who fixed my car for half the price the dealership quoted me. Highly recommend!",
      name: "Sarah Johnson",
      location: "Los Angeles, CA",
    },
    {
      quote:
        "The booking process was so easy, and the mechanic was professional and knowledgeable. Will definitely use again!",
      name: "Michael Chen",
      location: "San Francisco, CA",
    },
    {
      quote:
        "I love being able to see reviews before choosing a mechanic. Saved me from a lot of headaches and found a shop I now trust.",
      name: "Jessica Williams",
      location: "Chicago, IL",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-rudzz-blue/10 to-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
              Find Trusted Auto Repair Services <span className="text-rudzz-blue">Near You</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 md:text-xl">
              Connect with qualified mechanics and auto repair shops in your area for all your vehicle maintenance and
              repair needs.
            </p>
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button size="lg" asChild className="bg-rudzz-blue hover:bg-rudzz-blue/90">
                <Link href="/providers">Find Providers</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-rudzz-blue text-rudzz-blue hover:bg-rudzz-blue/10"
              >
                <Link href="/how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Our Services</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {SERVICE_CATEGORIES.map((category, index) => (
                <ServiceCard key={index} name={category.name} icon={category.icon} description={category.description} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button size="lg" asChild className="bg-rudzz-blue hover:bg-rudzz-blue/90">
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rudzz-blue/20 text-2xl font-bold text-rudzz-blue">
                  1
                </div>
                <h3 className="mb-2 text-xl font-semibold">Search</h3>
                <p className="text-gray-600">Find auto repair providers in your area based on your specific needs.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rudzz-green/20 text-2xl font-bold text-rudzz-green">
                  2
                </div>
                <h3 className="mb-2 text-xl font-semibold">Book</h3>
                <p className="text-gray-600">Schedule an appointment with your chosen provider at a convenient time.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rudzz-yellow/20 text-2xl font-bold text-accent-foreground">
                  3
                </div>
                <h3 className="mb-2 text-xl font-semibold">Get Service</h3>
                <p className="text-gray-600">
                  Receive quality auto repair service and pay securely through our platform.
                </p>
              </div>
            </div>
            <div className="mt-12 text-center">
              <Button size="lg" asChild className="bg-rudzz-blue hover:bg-rudzz-blue/90">
                <Link href="/how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Providers */}
        <FeaturedProviders providers={FEATURED_PROVIDERS} />

        {/* Testimonials */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">What Our Users Say</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  quote={testimonial.quote}
                  name={testimonial.name}
                  location={testimonial.location}
                  image="/placeholder.svg?height=48&width=48"
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-rudzz-blue py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold">Ready to Get Started?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg">
              Join thousands of satisfied customers who have found reliable auto repair services through our platform.
            </p>
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button size="lg" variant="secondary" asChild className="bg-rudzz-green hover:bg-rudzz-green/90">
                <Link href="/register">Sign Up Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-rudzz-blue"
                asChild
              >
                <Link href="/providers">Find Providers</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

