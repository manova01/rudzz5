import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StarRating } from "@/components/ui/star-rating"
import { Badge } from "@/components/ui/badge"

interface ProviderCardProps {
  id: number | string
  name: string
  image: string
  rating: number
  reviews: number
  location: string
  specialties?: string[]
}

export function ProviderCard({ id, name, image, rating, reviews, location, specialties }: ProviderCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 w-full">
        <Image src={image || "/placeholder.svg?height=300&width=300"} alt={name} fill className="object-cover" />
      </div>
      <CardContent className="p-6">
        <h3 className="mb-2 text-xl font-semibold">{name}</h3>
        <div className="mb-2 flex items-center">
          <StarRating rating={rating} />
          <span className="ml-2 text-sm text-gray-600">
            {rating} ({reviews} reviews)
          </span>
        </div>
        <p className="mb-4 text-sm text-gray-600">{location}</p>

        {specialties && specialties.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1">
            {specialties.slice(0, 3).map((specialty, index) => (
              <Badge key={index} variant="outline" className="bg-rudzz-blue/10 text-rudzz-blue">
                {specialty}
              </Badge>
            ))}
            {specialties.length > 3 && (
              <Badge variant="outline" className="bg-gray-100">
                +{specialties.length - 3} more
              </Badge>
            )}
          </div>
        )}

        <Button asChild className="w-full bg-rudzz-blue hover:bg-rudzz-blue/90">
          <Link href={`/providers/${id}`}>View Profile</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

