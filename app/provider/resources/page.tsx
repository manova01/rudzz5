import Link from "next/link"
import Image from "next/image"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, Video, Book, BarChart, Calendar } from "lucide-react"

export default function ProviderResourcesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Provider Resources</h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Tools, guides, and resources to help you succeed on the Rudzz platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild className="bg-rudzz-blue hover:bg-rudzz-blue/90">
                    <Link href="#guides">Browse Guides</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-rudzz-green text-rudzz-green hover:bg-rudzz-green/10"
                  >
                    <Link href="/provider/register">Join as Provider</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Provider Resources"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Resource Categories */}
        <section className="py-12 md:py-16" id="guides">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Resource Library</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to grow your business on Rudzz.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-8 max-w-5xl">
              <Tabs defaultValue="getting-started" className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
                  <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                  <TabsTrigger value="marketing">Marketing</TabsTrigger>
                  <TabsTrigger value="operations">Operations</TabsTrigger>
                  <TabsTrigger value="customer-service">Customer Service</TabsTrigger>
                  <TabsTrigger value="finances">Finances</TabsTrigger>
                  <TabsTrigger value="growth">Growth</TabsTrigger>
                </TabsList>

                <TabsContent value="getting-started" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {gettingStartedResources.map((resource, index) => (
                      <ResourceCard key={index} resource={resource} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="marketing" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {marketingResources.map((resource, index) => (
                      <ResourceCard key={index} resource={resource} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="operations" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {operationsResources.map((resource, index) => (
                      <ResourceCard key={index} resource={resource} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="customer-service" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {customerServiceResources.map((resource, index) => (
                      <ResourceCard key={index} resource={resource} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="finances" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {financesResources.map((resource, index) => (
                      <ResourceCard key={index} resource={resource} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="growth" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {growthResources.map((resource, index) => (
                      <ResourceCard key={index} resource={resource} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Featured Webinars */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Webinars</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Learn from industry experts and successful providers.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredWebinars.map((webinar, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      src={webinar.thumbnail || "/placeholder.svg"}
                      alt={webinar.title}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{webinar.title}</CardTitle>
                    <CardDescription>{webinar.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">{webinar.description}</p>
                  </CardContent>
                  <div className="p-4 pt-0">
                    <Button asChild className="w-full bg-rudzz-blue hover:bg-rudzz-blue/90">
                      <Link href={webinar.link}>Watch Now</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Downloadable Tools */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Downloadable Tools</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Templates, checklists, and tools to streamline your business operations.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              {downloadableTools.map((tool, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rudzz-blue/10">
                      <tool.icon className="h-6 w-6 text-rudzz-blue" />
                    </div>
                    <CardTitle className="mt-4">{tool.title}</CardTitle>
                    <CardDescription>{tool.format}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">{tool.description}</p>
                  </CardContent>
                  <div className="p-4 pt-0">
                    <Button asChild variant="outline" className="w-full">
                      <Link href={tool.link}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Link>
                    </Button>
                  </div>
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Grow Your Business?</h2>
                <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of auto repair professionals on the Rudzz platform.
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
      </main>

      <SiteFooter />
    </div>
  )
}

function ResourceCard({ resource }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rudzz-blue/10">
          <resource.icon className="h-6 w-6 text-rudzz-blue" />
        </div>
        <CardTitle>{resource.title}</CardTitle>
        <CardDescription>{resource.type}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{resource.description}</p>
      </CardContent>
      <div className="p-4 pt-0">
        <Button asChild className="w-full bg-rudzz-blue hover:bg-rudzz-blue/90">
          <Link href={resource.link}>View Resource</Link>
        </Button>
      </div>
    </Card>
  )
}

const gettingStartedResources = [
  {
    title: "Provider Onboarding Guide",
    type: "PDF Guide",
    description: "Step-by-step instructions for setting up your provider profile and getting started on Rudzz.",
    icon: FileText,
    link: "/provider/resources/onboarding-guide",
  },
  {
    title: "Platform Overview",
    type: "Video Tutorial",
    description: "A comprehensive overview of the Rudzz platform features and how to use them effectively.",
    icon: Video,
    link: "/provider/resources/platform-overview",
  },
  {
    title: "Service Listing Best Practices",
    type: "PDF Guide",
    description: "Learn how to create compelling service listings that attract more customers.",
    icon: FileText,
    link: "/provider/resources/service-listing-guide",
  },
]

const marketingResources = [
  {
    title: "Marketing Your Services",
    type: "PDF Guide",
    description: "Strategies for promoting your services and attracting more customers on Rudzz.",
    icon: FileText,
    link: "/provider/resources/marketing-guide",
  },
  {
    title: "Photography Tips",
    type: "Video Tutorial",
    description: "Learn how to take high-quality photos of your work to showcase in your profile.",
    icon: Video,
    link: "/provider/resources/photography-tips",
  },
  {
    title: "Social Media Integration",
    type: "PDF Guide",
    description: "How to connect your social media accounts and leverage them to grow your business.",
    icon: FileText,
    link: "/provider/resources/social-media-guide",
  },
]

const operationsResources = [
  {
    title: "Appointment Management",
    type: "Video Tutorial",
    description: "Learn how to efficiently manage your appointments and calendar on Rudzz.",
    icon: Video,
    link: "/provider/resources/appointment-management",
  },
  {
    title: "Service Workflow Optimization",
    type: "PDF Guide",
    description: "Tips for streamlining your service workflow to increase efficiency and customer satisfaction.",
    icon: FileText,
    link: "/provider/resources/workflow-optimization",
  },
  {
    title: "Inventory Management",
    type: "PDF Guide",
    description: "Best practices for managing your parts inventory and reducing costs.",
    icon: FileText,
    link: "/provider/resources/inventory-management",
  },
]

const customerServiceResources = [
  {
    title: "Customer Communication",
    type: "PDF Guide",
    description: "Tips for effective communication with customers before, during, and after service.",
    icon: FileText,
    link: "/provider/resources/customer-communication",
  },
  {
    title: "Handling Difficult Situations",
    type: "Video Tutorial",
    description: "Strategies for resolving conflicts and handling challenging customer interactions.",
    icon: Video,
    link: "/provider/resources/difficult-situations",
  },
  {
    title: "Getting Great Reviews",
    type: "PDF Guide",
    description: "How to provide exceptional service that earns you 5-star reviews.",
    icon: FileText,
    link: "/provider/resources/getting-reviews",
  },
]

const financesResources = [
  {
    title: "Pricing Strategies",
    type: "PDF Guide",
    description: "How to set competitive prices that maximize your revenue and attract customers.",
    icon: FileText,
    link: "/provider/resources/pricing-strategies",
  },
  {
    title: "Tax Considerations",
    type: "Video Tutorial",
    description: "Important tax information for auto repair service providers.",
    icon: Video,
    link: "/provider/resources/tax-considerations",
  },
  {
    title: "Financial Planning",
    type: "PDF Guide",
    description: "Tools and strategies for financial planning and business growth.",
    icon: FileText,
    link: "/provider/resources/financial-planning",
  },
]

const growthResources = [
  {
    title: "Scaling Your Business",
    type: "PDF Guide",
    description: "Strategies for growing your auto repair business and expanding your services.",
    icon: FileText,
    link: "/provider/resources/scaling-business",
  },
  {
    title: "Hiring and Training",
    type: "Video Tutorial",
    description: "Best practices for hiring, training, and retaining skilled technicians.",
    icon: Video,
    link: "/provider/resources/hiring-training",
  },
  {
    title: "Advanced Marketing",
    type: "PDF Guide",
    description: "Advanced marketing strategies to take your business to the next level.",
    icon: FileText,
    link: "/provider/resources/advanced-marketing",
  },
]

const featuredWebinars = [
  {
    title: "Maximizing Your Rudzz Profile",
    date: "March 15, 2023",
    description: "Learn how to optimize your provider profile to attract more customers and increase bookings.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    link: "/provider/resources/webinars/maximizing-profile",
  },
  {
    title: "Customer Service Excellence",
    date: "February 22, 2023",
    description: "Strategies for providing exceptional customer service that leads to repeat business and referrals.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    link: "/provider/resources/webinars/customer-service",
  },
  {
    title: "Financial Management for Auto Repair Shops",
    date: "January 18, 2023",
    description: "Expert advice on managing finances, controlling costs, and increasing profitability.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    link: "/provider/resources/webinars/financial-management",
  },
]

const downloadableTools = [
  {
    title: "Service Pricing Calculator",
    format: "Excel Spreadsheet",
    description:
      "Calculate optimal pricing for your services based on costs, market rates, and desired profit margins.",
    icon: BarChart,
    link: "/provider/resources/downloads/pricing-calculator",
  },
  {
    title: "Appointment Scheduling Template",
    format: "PDF Template",
    description: "A printable template for tracking appointments and managing your schedule.",
    icon: Calendar,
    link: "/provider/resources/downloads/scheduling-template",
  },
  {
    title: "Customer Feedback Form",
    format: "Word Document",
    description: "A customizable form for collecting feedback from your customers to improve your services.",
    icon: FileText,
    link: "/provider/resources/downloads/feedback-form",
  },
  {
    title: "Business Plan Template",
    format: "Word Document",
    description: "A comprehensive template for creating a business plan for your auto repair business.",
    icon: Book,
    link: "/provider/resources/downloads/business-plan-template",
  },
  {
    title: "Marketing Materials Kit",
    format: "ZIP Archive",
    description: "Templates for business cards, flyers, and social media graphics to promote your services.",
    icon: FileText,
    link: "/provider/resources/downloads/marketing-kit",
  },
  {
    title: "Vehicle Inspection Checklist",
    format: "PDF Template",
    description: "A comprehensive checklist for vehicle inspections to ensure thorough service.",
    icon: FileText,
    link: "/provider/resources/downloads/inspection-checklist",
  },
]

