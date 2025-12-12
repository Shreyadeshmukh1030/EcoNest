import Image from "next/image"
import EcoPlantSection from "@/components/ecoplant-section"
import { FreeGift } from "@/components/free-gift"
import { CustomerReviews } from "@/components/customer-reviews"
import { AwarenessQuiz } from "@/components/awareness-quiz"
import RecyclingTipsCarousel from "@/components/recycling-tips-carousel"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-card">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12 grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-pretty">Design Your Home, Sustainably.</h1>
            <p className="mt-3 md:mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              Curated eco décor, furniture, and living plants — crafted with nature-first materials.
            </p>
            <div className="mt-4 md:mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="/products"
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Shop Collection
              </a>
              <a
                href="/impact"
                className="inline-flex items-center rounded-md border border-border px-4 py-2 hover:bg-accent transition-colors"
              >
                See Our Impact
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            <div className="aspect-[4/5] overflow-hidden rounded-lg border border-border">
              <Image
                src="/images/hero-living-room.jpg"
                alt="Sustainably designed living room featuring bamboo furniture and indoor plants"
                width={480}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-lg border border-border translate-y-6">
              <Image
                src="/images/plants/bonsai.jpg"
                alt="Bonsai adding a zen touch to an eco-conscious home"
                width={480}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
          <div className="rounded-lg overflow-hidden border border-border">
            <Image
              src="/images/about-studio.jpg"
              alt="EcoNest artisan studio with sustainable materials"
              width={900}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="italic text-lg text-accent-foreground/80">
              "Sustainability isn't a trend — it's our design."
            </p>
            <h2 className="mt-2 font-serif text-3xl">About EcoNest</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our mission is to reduce plastic waste and promote nature-based living through biodegradable materials,
              artisan craftsmanship, and circular design.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Biodegradable", desc: "Nature-first materials" },
                { label: "Handcrafted", desc: "Made by artisans" },
                { label: "Free Shipping", desc: "On select orders" },
                { label: "Eco Packaging", desc: "Plastic-free" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-sm text-muted-foreground">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="bg-card">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
          <h2 className="font-serif text-3xl">Product Showcase</h2>
          <p className="text-muted-foreground mt-2">Explore Lamps, Rugs, Planters, and Wall Art</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Bamboo Lamp", tag: "Handcrafted", price: "₹2,499", src: "/bamboo-pendant-lamp-hanging.jpg" },
              { name: "Jute Rug", tag: "Biodegradable", price: "₹1,999", src: "/handwoven-jute-rug-natural.jpg" },
              { name: "Clay Planter", tag: "Plastic-free", price: "₹799", src: "/terracotta-planter-clay-pot.jpg" },
              { name: "Recycled Wall Art", tag: "Upcycled", price: "₹3,299", src: "/recycled-wood-wall-panel-art.jpg" },
            ].map((p) => (
              <article
                key={p.name}
                className="rounded-lg border border-border overflow-hidden group hover:shadow-lg transition-all"
              >
                <Image
                  src={p.src || "/placeholder.svg"}
                  alt={`${p.name} product image`}
                  width={400}
                  height={400}
                  className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{p.name}</h3>
                    <span className="text-sm text-muted-foreground">{p.price}</span>
                  </div>
                  <div className="mt-2 inline-flex items-center rounded-full border border-primary px-2 py-1 text-xs">
                    {p.tag}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Free Gift Section */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <FreeGift />
      </section>

      {/* Mini Awareness Quiz */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <AwarenessQuiz />
      </section>

      {/* Recycling Tips Carousel */}
      <RecyclingTipsCarousel />

      {/* Customer Rating */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-lg border border-border p-6 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <h2 className="font-serif text-2xl">Customer Rating</h2>
            <p className="text-muted-foreground">Trusted by eco-lovers worldwide.</p>
          </div>
          <div className="text-3xl font-serif">
            4.8★ <span className="text-base text-muted-foreground">/ 5</span>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="mx-auto max-w-6xl px-4">
        <CustomerReviews />
      </section>

      {/* Eco-Impact Section */}
      <section className="bg-card">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="font-serif text-3xl">Our Eco Impact</h2>
          <p className="text-muted-foreground mt-2">Infographic-style stats on carbon saving & trees planted</p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { k: "Trees Planted", v: "12,500+" },
              { k: "Plastic Saved (kg)", v: "8,900+" },
              { k: "Cities Reached", v: "45+" },
              { k: "Artisans Supported", v: "120+" },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-lg border border-border p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-2xl font-serif text-primary">{s.v}</div>
                <div className="text-sm text-muted-foreground">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EcoPlant Section */}
      <EcoPlantSection />
    </main>
  )
}
