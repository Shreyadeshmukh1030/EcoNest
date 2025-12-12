import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const REVIEWS = [
  {
    name: "Ananya",
    rating: 5,
    text: "Beautiful craftsmanship and zero plastic packaging. Love EcoNest!",
    avatar: "/images/reviews/ananya.jpg",
  },
  {
    name: "Rohit",
    rating: 5,
    text: "The jute rug and bamboo lamp upgraded my living room instantly.",
    avatar: "/images/reviews/rahul.jpg",
  },
  {
    name: "Meera",
    rating: 4,
    text: "Fast delivery and the bonsai looks great on my desk.",
    avatar: "/images/reviews/meera.jpg",
  },
]

export function CustomerReviews() {
  return (
    <section aria-labelledby="reviews-title" className="py-8 md:py-12">
      <h2 id="reviews-title" className="text-2xl font-semibold text-pretty mb-6">
        Customer Reviews
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-border">
                  <Image
                    src={r.avatar || "/placeholder.svg"}
                    alt={`${r.name}'s profile picture`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{r.name}</span>
                    <span aria-label={`${r.rating} out of 5 stars`} className="text-yellow-500">
                      {r.rating}★
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{r.text}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
