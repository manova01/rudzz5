import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProviderCard } from "@/components/provider-card"

// Define the provider type
export interface FeaturedProvider {
  id: number | string
  name: string
  image: string
  rating: number
  reviews: number
  location: string
  specialties?: string[]
  featured: boolean
}

interface FeaturedProvidersProps {
  providers: FeaturedProvider[]
  showViewAll?: boolean
}

export function FeaturedProviders({ providers, showViewAll = true }: FeaturedProvidersProps) {
  // Filter to only show featured providers if needed
  const featuredProviders = providers.filter((provider) => provider.featured)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">Featured Providers</h2>
        {featuredProviders.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {featuredProviders.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  id={provider.id}
                  name={provider.name}
                  image={provider.image}
                  rating={provider.rating}
                  reviews={provider.reviews}
                  location={provider.location}
                />
              ))}
            </div>
            {showViewAll && (
              <div className="mt-12 text-center">
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-rudzz-blue text-rudzz-blue hover:bg-rudzz-blue/10"
                >
                  <Link href="/providers">View All Providers</Link>
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No featured providers available at this time.</p>
          </div>
        )}
      </div>
    </section>
  )
}

