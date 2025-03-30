import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ServiceCardProps {
  name: string
  icon: string
  description: string
}

export function ServiceCard({ name, icon, description }: ServiceCardProps) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="flex flex-col items-center p-6 text-center">
        <div className="mb-4 text-4xl">{icon}</div>
        <h3 className="mb-2 text-xl font-semibold">{name}</h3>
        <p className="mb-4 text-sm text-gray-600">{description}</p>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="mt-auto border-rudzz-blue text-rudzz-blue hover:bg-rudzz-blue/10"
        >
          <Link href={`/services#${name.toLowerCase().replace(/\s+/g, "-")}`}>Learn More</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

