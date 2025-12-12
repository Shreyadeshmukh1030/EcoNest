"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function EcoPlantSection() {
  return (
    <section aria-labelledby="ecoplant-heading" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <header className="mb-6 md:mb-8">
          <h2 id="ecoplant-heading" className="text-3xl md:text-4xl font-serif text-balance">
            EcoPlant Collection
          </h2>
          <p className="text-muted-foreground mt-2 max-w-prose">
            Bring nature home with low-impact greens. Discover carefully curated Bonsai and easy-care Indoor Plants.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/shop#ecoplant-bonsai" aria-label="Browse Bonsai">
            <Card className="overflow-hidden group">
              <CardHeader className="p-0">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/images/plants/bonsai.jpg"
                    alt="Bonsai in minimalist ceramic pot"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <CardTitle className="font-serif">Bonsai</CardTitle>
                  <p className="text-sm text-muted-foreground">Hand-shaped living art for mindful spaces.</p>
                </div>
                <Badge variant="secondary" aria-label="Eco Score A">
                  Eco A
                </Badge>
              </CardContent>
            </Card>
          </Link>

          <Link href="/shop#ecoplant-indoor" aria-label="Browse Indoor Plants">
            <Card className="overflow-hidden group">
              <CardHeader className="p-0">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/images/plants/indoor.jpg"
                    alt="Indoor plant styling in living room"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <CardTitle className="font-serif">Indoor Plants</CardTitle>
                  <p className="text-sm text-muted-foreground">Air-purifying greens for effortless care.</p>
                </div>
                <Badge variant="secondary" aria-label="Eco Score A">
                  Eco A
                </Badge>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default EcoPlantSection
