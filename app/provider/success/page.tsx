import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { Star, Quote } from "lucide-react"

export default function SuccessStoriesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Provider Success Stories
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover how auto repair professionals are growing their businesses with Rudzz.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild className="bg-rudzz-blue hover:bg-rudzz-blue/90">
                  <Link href="/provider/register">Join as Provider</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-rudzz-green text-rudzz-green hover:bg-rudzz-green/10"
                >
                  <Link href="/provider/resources">Provider Resources</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Success Stories"
                width={600}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Success Story */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="order-2 lg:order-1">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-rudzz-blue/10 px-3 py-1 text-sm font-medium text-rudzz-blue">
                  Featured Story
                </div>
                <h2 className="text-3xl font-bold tracking-tight">AutoFix Masters: 200% Growth in 6 Months</h2>
                <p className="text-gray-500">
                  Mike Johnson's auto repair shop was struggling to attract new customers in a competitive market. After
                  joining Rudzz, his business experienced unprecedented growth.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm font-medium">Average Rating: 4.9/5</span>
                </div>
                <blockquote className="border-l-4 border-rudzz-blue pl-4 italic text-gray-600">
                  "Joining Rudzz was the best business decision I've made in 15 years of running my shop. The platform
                  brought in a steady stream of new customers, and the scheduling tools helped us optimize our
                  operations."
                </blockquote>
                <p className="text-gray-500">
                  Within six months of joining Rudzz, AutoFix Masters saw a 200% increase in new customers and a 150%
                  increase in revenue. Mike was able to hire two additional technicians and expand his service
                  offerings.
                </p>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Key Results:</h3>
                  <ul className="list-inside list-disc space-y-1 text-gray-500">
                    <li>200% increase in new customers</li>
                    <li>150% increase in monthly revenue</li>
                    <li>Expanded team from 3 to 5 technicians</li>
                    <li>Added 4 new service categories</li>
                    <li>Improved customer satisfaction rating from 4.2 to 4.9</li>
                  </ul>
                </div>
                <div className="pt-4">
                  <Button asChild className="bg-rudzz-blue hover:bg-rudzz-blue/90">
                    <Link href="/provider/success/autofix-masters">Read Full Story</Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="overflow-hidden rounded-xl">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="AutoFix Masters"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="AutoFix Masters Shop"
                  width={200}
                  height={200}
                  className="rounded-lg object-cover"
                />
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="AutoFix Masters Team"
                  width={200}
                  height={200}
                  className="rounded-lg object-cover"
                />
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="AutoFix Masters Work"
                  width={200}
                  height={200}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">More Success Stories</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See how auto repair professionals across the country are thriving on Rudzz.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
            {successStories.map((story, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{story.title}</h3>
                      <p className="text-sm text-gray-500">{story.location}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 fill-current ${i < story.rating ? "text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium">Rating: {story.rating}/5</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Quote className="mt-1 h-5 w-5 shrink-0 text-rudzz-blue opacity-50" />
                      <p className="text-sm italic text-gray-600">{story.quote}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Key Results:</h4>
                      <ul className="list-inside list-disc space-y-1 text-xs text-gray-500">
                        {story.results.map((result, i) => (
                          <li key={i}>{result}</li>
                        ))}
                      </ul>
                    </div>
                    <Button asChild className="w-full bg-rudzz-blue hover:bg-rudzz-blue/90">
                      <Link href={`/provider/success/${story.slug}`}>Read Full Story</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Providers Are Saying</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear directly from service providers about their experience with Rudzz.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex flex-col space-y-4 rounded-lg border bg-white p-6 shadow-sm">
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
                    <p className="text-sm text-gray-500">{testimonial.business}</p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 fill-current ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-rudzz-blue py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Write Your Success Story?</h2>
              <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of auto repair professionals who are growing their businesses with Rudzz.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild className="bg-white text-rudzz-blue hover:bg-white/90">
                <Link href="/provider/register">Join as Provider</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

const successStories = [
  {
    title: "Premium Auto Body",
    slug: "premium-auto-body",
    location: "Los Angeles, CA",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.8,
    quote:
      "Rudzz helped us showcase our panel beating and paint services to a wider audience. Our bookings increased by 75% in just three months.",
    results: [
      "75% increase in bookings",
      "40% of customers are now repeat clients",
      "Expanded service area to neighboring cities",
      "Added 2 new specialized technicians",
    ],
  },
  {
    title: "Quick Tire & Brake",
    slug: "quick-tire-brake",
    location: "New York, NY",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.7,
    quote:
      "The scheduling system alone saved us hours each week. Our customers love the convenience, and we've seen a significant boost in our tire service bookings.",
    results: [
      "120% increase in tire service bookings",
      "Reduced scheduling conflicts by 90%",
      "Improved customer satisfaction score to 4.7/5",
      "Opened a second location due to increased demand",
    ],
  },
  {
    title: "Elite Engine Works",
    slug: "elite-engine-works",
    location: "Chicago, IL",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.9,
    quote:
      "As specialists in engine repair, we needed a way to reach customers looking for our specific expertise. Rudzz's targeted categories helped us connect with the right clients.",
    results: [
      "150% increase in specialized engine repair jobs",
      "Higher average ticket value per customer",
      "Expanded team from 4 to 7 technicians",
      "Invested in new diagnostic equipment",
    ],
  },
  {
    title: "Sunshine Auto Electric",
    slug: "sunshine-auto-electric",
    location: "Miami, FL",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.6,
    quote:
      "Before Rudzz, we struggled to explain our electrical system services to potential customers. The platform's detailed service descriptions helped us communicate our value.",
    results: [
      "90% increase in electrical system repairs",
      "Reduced customer acquisition cost by 60%",
      "Improved online presence and visibility",
      "Added EV servicing to our offerings",
    ],
  },
  {
    title: "Mountain View Mechanics",
    slug: "mountain-view-mechanics",
    location: "Denver, CO",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.8,
    quote:
      "As a new shop in a competitive area, Rudzz helped us establish our reputation quickly through verified reviews and transparent pricing.",
    results: [
      "Built a 4.8-star rating within 6 months",
      "Achieved profitability 3 months ahead of projections",
      "Established a loyal customer base",
      "Became the top-rated shop in our area",
    ],
  },
  {
    title: "Texas Transmission Pros",
    slug: "texas-transmission-pros",
    location: "Austin, TX",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.7,
    quote:
      "Specializing in transmissions meant we needed to reach a specific customer base. Rudzz's search filters helped customers find us when they needed our services most.",
    results: [
      "100% increase in transmission service bookings",
      "Expanded to offer additional drivetrain services",
      "Hired 3 additional specialized technicians",
      "Reduced marketing spend by 40%",
    ],
  },
]

const testimonials = [
  {
    name: "David Chen",
    business: "Chen's Auto Care",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    quote:
      "The Rudzz platform streamlined our entire booking process. We're spending less time on the phone and more time serving customers.",
  },
  {
    name: "Maria Rodriguez",
    business: "Rodriguez Automotive",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    quote:
      "The verification process gave our customers confidence in our services. We've seen a significant increase in first-time customers.",
  },
  {
    name: "James Wilson",
    business: "Wilson's Tire & Auto",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 4,
    quote:
      "Rudzz's marketing tools helped us showcase our tire services to a wider audience. Our specialized services are now fully booked weeks in advance.",
  },
  {
    name: "Sarah Johnson",
    business: "Johnson's Collision Repair",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    quote:
      "As panel beating specialists, we needed a way to showcase our work. Rudzz's photo galleries helped us display our before-and-after transformations.",
  },
  {
    name: "Robert Kim",
    business: "Precision Auto Electric",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    quote:
      "The detailed service categories helped us highlight our electrical system expertise. We're now the go-to shop for complex electrical issues in our area.",
  },
  {
    name: "Lisa Patel",
    business: "Patel's Auto Service",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 4,
    quote:
      "The analytics dashboard gives us valuable insights into our business performance. We've optimized our service offerings based on this data.",
  },
]

