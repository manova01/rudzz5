import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { Wrench, Users, Shield, CheckCircle } from "lucide-react"

export default function AboutPage() {
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
                  About Rudzz Auto Repair Marketplace
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Connecting car owners with trusted auto repair professionals since 2020.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild className="bg-rudzz-blue hover:bg-rudzz-blue/90">
                  <Link href="/providers">Find Providers</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-rudzz-green text-rudzz-green hover:bg-rudzz-green/10"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rudzz2-jloJTA9YV1x5OtDeIp5D8BJ4eslYwy.png"
                alt="Rudzz Logo"
                width={400}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Mission</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                At Rudzz, we're on a mission to transform the auto repair industry by creating a transparent,
                trustworthy marketplace that empowers both car owners and service providers.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <Card className="border-2 border-rudzz-blue">
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rudzz-blue/10">
                  <Wrench className="h-8 w-8 text-rudzz-blue" />
                </div>
                <h3 className="text-xl font-bold">Quality Service</h3>
                <p className="text-center text-gray-500">
                  We vet all service providers to ensure they meet our high standards for quality and reliability.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-rudzz-green">
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rudzz-green/10">
                  <Users className="h-8 w-8 text-rudzz-green" />
                </div>
                <h3 className="text-xl font-bold">Community Focus</h3>
                <p className="text-center text-gray-500">
                  We build connections between local providers and customers to strengthen communities.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-rudzz-yellow">
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rudzz-yellow/10">
                  <Shield className="h-8 w-8 text-rudzz-yellow" />
                </div>
                <h3 className="text-xl font-bold">Trust & Transparency</h3>
                <p className="text-center text-gray-500">
                  We promote honest pricing, verified reviews, and clear communication.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Rudzz Team"
                width={600}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Story</h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Rudzz was founded in 2020 by a team of automotive enthusiasts and tech innovators who saw a need for a
                  better way to connect car owners with quality repair services.
                </p>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  After experiencing frustration with finding reliable mechanics and transparent pricing, our founders
                  decided to create a platform that would solve these common pain points in the auto repair industry.
                </p>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Today, Rudzz has grown into a thriving marketplace serving thousands of customers and providers across
                  the country, while maintaining our core values of quality, community, and transparency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Values</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The principles that guide everything we do at Rudzz.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2">
            <div className="flex items-start space-x-4">
              <CheckCircle className="mt-1 h-6 w-6 text-rudzz-blue" />
              <div>
                <h3 className="text-xl font-bold">Integrity</h3>
                <p className="text-gray-500">
                  We believe in honest business practices and transparent communication with all stakeholders.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="mt-1 h-6 w-6 text-rudzz-blue" />
              <div>
                <h3 className="text-xl font-bold">Excellence</h3>
                <p className="text-gray-500">
                  We strive for excellence in our platform, our service, and the providers we partner with.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="mt-1 h-6 w-6 text-rudzz-blue" />
              <div>
                <h3 className="text-xl font-bold">Innovation</h3>
                <p className="text-gray-500">
                  We continuously improve our platform to better serve the evolving needs of our users.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="mt-1 h-6 w-6 text-rudzz-blue" />
              <div>
                <h3 className="text-xl font-bold">Community</h3>
                <p className="text-gray-500">
                  We build meaningful connections between providers and customers to strengthen local communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Team</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Meet the passionate people behind Rudzz.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex flex-col items-center space-y-3">
                <div className="overflow-hidden rounded-full">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="h-[120px] w-[120px] object-cover"
                  />
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="font-bold">{member.name}</h3>
                  <p className="text-sm text-rudzz-blue">{member.role}</p>
                </div>
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join the Rudzz Community</h2>
              <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Whether you're a car owner looking for reliable service or a provider looking to grow your business,
                Rudzz is here to help.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild className="bg-white text-rudzz-blue hover:bg-white/90">
                <Link href="/register">Sign Up Now</Link>
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

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "CEO & Co-Founder",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    name: "Sarah Chen",
    role: "CTO & Co-Founder",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    name: "Michael Rodriguez",
    role: "Head of Operations",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    name: "Jessica Kim",
    role: "Head of Marketing",
    image: "/placeholder.svg?height=120&width=120",
  },
]

