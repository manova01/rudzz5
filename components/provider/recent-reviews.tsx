import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

interface Review {
  id: string
  customer: {
    name: string
    avatar: string
    initials: string
  }
  rating: number
  comment: string
  date: string
}

interface RecentReviewsProps {
  isLoading: boolean
  reviews: Review[]
}

export function RecentReviews({ isLoading, reviews }: RecentReviewsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-start space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (reviews.length === 0) {
    return <p className="text-center text-muted-foreground py-4">No reviews yet.</p>
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage src={review.customer.avatar} alt={review.customer.name} />
            <AvatarFallback className="bg-rudzz-blue text-white">{review.customer.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold">{review.customer.name}</h4>
              <span className="text-xs text-muted-foreground">{review.date}</span>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${i < review.rating ? "fill-rudzz-yellow" : "fill-gray-200"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-gray-600">{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

