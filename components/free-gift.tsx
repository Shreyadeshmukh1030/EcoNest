import Image from "next/image"
import { Gift } from "lucide-react"

export function FreeGift() {
  return (
    <section
      aria-labelledby="gift-title"
      className="my-8 rounded-md border bg-card text-card-foreground overflow-hidden"
    >
      <div className="grid md:grid-cols-[1fr,auto] gap-4">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <Gift className="h-5 w-5 text-primary" aria-hidden="true" />
            <h3 id="gift-title" className="font-medium text-lg">
              Free Gift with Every Order
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Get a complimentary Seed Packet on orders above ₹999. Good for you, good for the planet.
          </p>
        </div>
        <div className="relative h-32 md:h-auto md:w-48">
          <Image src="/images/gifts/free-seeds.jpg" alt="Free seed packet gift" fill className="object-cover" />
        </div>
      </div>
    </section>
  )
}
