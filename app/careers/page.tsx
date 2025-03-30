import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { MapPin, Clock, DollarSign } from "lucide-react"

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join Our Team at Rudzz</h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Help us transform the auto repair industry with technology and innovation.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild className="bg-rudzz-blue hover:bg-rudzz-blue/90">
                  <Link href="#open-positions">View Open Positions</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-rudzz-green text-rudzz-green hover:bg-rudzz-green/10"
                >
                  <Link href="#why-rudzz">Why Rudzz?</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Rudzz Team"
                width={600}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Rudzz Section */}
      <section className="py-12 md:py-16" id="why-rudzz">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Work at Rudzz?</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join a team that's passionate about transforming the auto repair industry.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2 border-rudzz-blue/20">
                <CardHeader className="pb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rudzz-blue/10">
                    <benefit.icon className="h-6 w-6 text-rudzz-blue" />
                  </div>
                  <CardTitle className="mt-4">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Values</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                These principles guide our work and culture at Rudzz.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2">
            {values.map((value, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <h3 className="text-xl font-bold text-rudzz-blue">{value.title}</h3>
                <p className="text-gray-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-12 md:py-16" id="open-positions">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Open Positions</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our team and help shape the future of auto repair services.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-5xl py-12">
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="border-l-4 border-rudzz-blue p-6">
                    <div className="flex flex-col space-y-4 md:flex-row md:items-start md:justify-between md:space-y-0">
                      <div>
                        <h3 className="text-xl font-bold">{position.title}</h3>
                        <div className="mt-2 flex flex-wrap gap-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="mr-1 h-4 w-4" />
                            {position.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="mr-1 h-4 w-4" />
                            {position.type}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <DollarSign className="mr-1 h-4 w-4" />
                            {position.salary}
                          </div>
                        </div>
                        <p className="mt-4 text-gray-500">{position.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {position.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="inline-flex items-center rounded-full bg-rudzz-blue/10 px-2.5 py-0.5 text-xs font-medium text-rudzz-blue"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Button asChild className="bg-rudzz-blue hover:bg-rudzz-blue/90">
                          <Link href={`/careers/${position.id}`}>Apply Now</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Application Process</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Here's what to expect when you apply to join our team.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-5xl py-12">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 top-0 h-full w-0.5 bg-rudzz-blue/20 md:left-1/2 md:-ml-0.5"></div>

              {/* Timeline Items */}
              {applicationSteps.map((step, index) => (
                <div key={index} className="relative mb-12 md:mb-16">
                  <div className="flex flex-col md:flex-row">
                    {/* Timeline Dot */}
                    <div className="absolute left-4 top-0 flex md:left-1/2 md:-ml-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rudzz-blue text-white">
                        <span className="text-sm font-bold">{index + 1}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="ml-12 md:ml-0 md:w-1/2 md:pr-8 md:text-right">
                      {index % 2 === 0 ? (
                        <div className="md:pr-12">
                          <h3 className="text-xl font-bold">{step.title}</h3>
                          <p className="mt-2 text-gray-500">{step.description}</p>
                        </div>
                      ) : (
                        <div className="md:hidden">
                          <h3 className="text-xl font-bold">{step.title}</h3>
                          <p className="mt-2 text-gray-500">{step.description}</p>
                        </div>
                      )}
                    </div>
                    <div className="ml-12 md:ml-0 md:w-1/2 md:pl-8">
                      {index % 2 === 1 ? (
                        <div className="md:pl-12">
                          <h3 className="text-xl font-bold">{step.title}</h3>
                          <p className="mt-2 text-gray-500">{step.description}</p>
                        </div>
                      ) : (
                        <div className="hidden md:block">
                          <h3 className="text-xl font-bold">{step.title}</h3>
                          <p className="mt-2 text-gray-500">{step.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-rudzz-blue py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Join Our Team?</h2>
              <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our open positions and take the next step in your career.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild className="bg-white text-rudzz-blue hover:bg-white/90">
                <Link href="#open-positions">View Open Positions</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/contact">Contact Recruiting</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

import { Heart, Users, Target, Sparkles } from "lucide-react"

const benefits = [
  {
    title: "Competitive Compensation",
    description: "We offer competitive salaries, equity options, and comprehensive benefits packages.",
    icon: DollarSign,
  },
  {
    title: "Flexible Work",
    description: "Enjoy flexible work arrangements including remote options and flexible hours.",
    icon: Clock,
  },
  {
    title: "Health & Wellness",
    description: "Comprehensive health insurance, wellness programs, and mental health support.",
    icon: Heart,
  },
  {
    title: "Professional Growth",
    description: "Continuous learning opportunities, mentorship, and career advancement paths.",
    icon: Target,
  },
  {
    title: "Collaborative Culture",
    description: "Work with talented individuals in a supportive and inclusive environment.",
    icon: Users,
  },
  {
    title: "Meaningful Impact",
    description: "Help transform an industry and make a difference in people's lives.",
    icon: Sparkles,
  },
]

const values = [
  {
    title: "Innovation",
    description: "We embrace new ideas and technologies to continuously improve our platform and services.",
  },
  {
    title: "Integrity",
    description: "We operate with honesty, transparency, and ethical standards in all our interactions.",
  },
  {
    title: "Customer Focus",
    description: "We put our users first, designing solutions that address their real needs and pain points.",
  },
  {
    title: "Excellence",
    description: "We strive for excellence in everything we do, from code quality to customer service.",
  },
  {
    title: "Collaboration",
    description: "We believe in the power of teamwork and diverse perspectives to solve complex problems.",
  },
  {
    title: "Inclusivity",
    description: "We foster an inclusive environment where everyone feels welcome, valued, and respected.",
  },
]

const openPositions = [
  {
    id: "software-engineer",
    title: "Senior Software Engineer",
    location: "San Francisco, CA (Remote Option)",
    type: "Full-time",
    salary: "Competitive",
    description:
      "We're looking for a Senior Software Engineer to help build and scale our platform. You'll work on challenging problems and contribute to our core services.",
    skills: ["React", "Node.js", "TypeScript", "AWS", "API Design"],
  },
  {
    id: "product-manager",
    title: "Product Manager",
    location: "San Francisco, CA (Remote Option)",
    type: "Full-time",
    salary: "Competitive",
    description:
      "Join our product team to help define and execute our product strategy. You'll work closely with engineering, design, and business teams.",
    skills: ["Product Strategy", "User Research", "Agile", "Data Analysis", "Roadmapping"],
  },
  {
    id: "ux-designer",
    title: "UX/UI Designer",
    location: "San Francisco, CA (Remote Option)",
    type: "Full-time",
    salary: "Competitive",
    description:
      "Help create intuitive and delightful user experiences for our platform. You'll design interfaces that are both beautiful and functional.",
    skills: ["UI Design", "User Research", "Figma", "Prototyping", "Design Systems"],
  },
  {
    id: "marketing-manager",
    title: "Growth Marketing Manager",
    location: "San Francisco, CA (Remote Option)",
    type: "Full-time",
    salary: "Competitive",
    description:
      "Drive user acquisition and engagement through innovative marketing strategies. You'll own key growth metrics and campaigns.",
    skills: ["Digital Marketing", "Growth Hacking", "Analytics", "A/B Testing", "SEO/SEM"],
  },
  {
    id: "customer-success",
    title: "Customer Success Manager",
    location: "San Francisco, CA (Remote Option)",
    type: "Full-time",
    salary: "Competitive",
    description:
      "Help our service providers succeed on our platform. You'll provide support, training, and strategic guidance to maximize their success.",
    skills: [
      "Customer Support",
      "Relationship Management",
      "Problem Solving",
      "Communication",
      "Auto Industry Knowledge",
    ],
  },
]

const applicationSteps = [
  {
    title: "Application Review",
    description:
      "Our recruiting team reviews your application and resume to assess your qualifications and experience.",
  },
  {
    title: "Initial Interview",
    description: "A 30-45 minute phone or video call to discuss your background, skills, and interest in the role.",
  },
  {
    title: "Technical Assessment",
    description: "Depending on the role, you may complete a skills assessment, coding challenge, or case study.",
  },
  {
    title: "Team Interviews",
    description:
      "Meet with potential teammates and cross-functional partners to dive deeper into your experience and skills.",
  },
  {
    title: "Final Interview",
    description:
      "Connect with senior leadership to discuss your potential impact and alignment with our mission and values.",
  },
  {
    title: "Offer & Onboarding",
    description:
      "If selected, you'll receive an offer and begin our comprehensive onboarding process to set you up for success.",
  },
]

