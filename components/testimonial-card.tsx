import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface TestimonialCardProps {
  quote: string
  name: string
  location: string
  image?: string
}

export function TestimonialCard({ quote, name, location, image }: TestimonialCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="mb-4 italic text-gray-600">"{quote}"</p>
        <div className="flex items-center">
          <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-gray-200">
            <Image src={image || "/placeholder.svg?height=48&width=48"} alt={name} width={48} height={48} />
          </div>
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-gray-600">{location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

