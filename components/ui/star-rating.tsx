import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  max?: number
  className?: string
}

export function StarRating({ rating, max = 5, className }: StarRatingProps) {
  return (
    <div className={cn("flex text-yellow-400", className)}>
      {[...Array(max)].map((_, i) => (
        <span key={i}>{i < Math.floor(rating) ? "★" : i < rating && rating % 1 !== 0 ? "★" : "☆"}</span>
      ))}
    </div>
  )
}

