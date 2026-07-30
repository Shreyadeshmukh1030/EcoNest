import Image from "next/image"
import Link from "next/link"
import EcoPlantSection from "@/components/ecoplant-section"
import { FreeGift } from "@/components/free-gift"
import { CustomerReviews } from "@/components/customer-reviews"
import { AwarenessQuiz } from "@/components/awareness-quiz"
import RecyclingTipsCarousel from "@/components/recycling-tips-carousel"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { ArrowRight, Leaf, ShieldCheck, Truck, Recycle, Gift, Sparkles, Heart, Trees } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section */}
      <section className="bg-card border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 md:py-14 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-5 border border-emerald-500/20">
              <Leaf className="h-4 w-4" />
              100% Zero-Carbon Handcrafted Home & Botanical Marketplace
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-pretty leading-[1.15]">
              Design Your Home, Sustainably.
            </h1>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              Discover artisan-crafted bamboo furniture, NASA-approved indoor plants, and luxurious sustainable gift
              hampers — delivered with plastic-free cornstarch packaging.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors shadow-md"
              >
                Shop Full Catalog
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
              <Link
                href="/gifts"
                className="inline-flex items-center justify-center rounded-xl bg-amber-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-amber-700 transition-colors shadow-md"
              >
                Gifts to Give 🎁
              </Link>
              <Link
                href="/plants"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-6 py-3.5 text-sm font-semibold hover:bg-muted transition-colors"
              >
                Explore Indoor Plants 🌿
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-sm">
              <Image
                src="/images/hero-living-room.jpg"
                alt="Sustainably designed living room featuring bamboo furniture and indoor plants"
                width={480}
                height={600}
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-sm translate-y-6">
              <Image
                src="/images/plants/bonsai.jpg"
                alt="Bonsai adding a zen touch to an eco-conscious home"
                width={480}
                height={600}
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Quick-Navigation Bar */}
      <section className="bg-muted/40 border-b border-border py-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            <Link
              href="/plants"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border hover:border-emerald-600 hover:shadow-md transition-all group"
            >
              <span className="text-2xl">🪴</span>
              <div>
                <div className="font-bold text-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                  Indoor Plants
                </div>
                <div className="text-[11px] text-muted-foreground">15+ Living SKUs</div>
              </div>
            </Link>

            <Link
              href="/gifts"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border hover:border-amber-600 hover:shadow-md transition-all group"
            >
              <span className="text-2xl">🎁</span>
              <div>
                <div className="font-bold text-sm group-hover:text-amber-600">Gifts to Give</div>
                <div className="text-[11px] text-muted-foreground">8+ Luxury Hampers</div>
              </div>
            </Link>

            <Link
              href="/shop"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border hover:border-primary hover:shadow-md transition-all group"
            >
              <span className="text-2xl">🪑</span>
              <div>
                <div className="font-bold text-sm group-hover:text-primary">Artisan Furniture</div>
                <div className="text-[11px] text-muted-foreground">Bamboo & Teak</div>
              </div>
            </Link>

            <Link
              href="/shop"
              className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border hover:border-primary hover:shadow-md transition-all group"
            >
              <span className="text-2xl">🏮</span>
              <div>
                <div className="font-bold text-sm group-hover:text-primary">Home Décor</div>
                <div className="text-[11px] text-muted-foreground">Lamps & Rugs</div>
              </div>
            </Link>

            <Link
              href="/impact"
              className="col-span-2 sm:col-span-1 flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border hover:border-emerald-600 hover:shadow-md transition-all group"
            >
              <span className="text-2xl">🌍</span>
              <div>
                <div className="font-bold text-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                  Impact Calculator
                </div>
                <div className="text-[11px] text-muted-foreground">Live CO₂ Savings</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. NEW SECTION: 🎁 Curated Sustainable Gifts to Give Grid */}
      <section className="py-14 border-b border-border bg-gradient-to-br from-amber-500/5 via-background to-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
                <Gift className="h-4 w-4" />
                Gifts to Give Collection
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold">Curated Sustainable Hampers</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Luxury plant & candle gift boxes wrapped in organic jute ribbon with complimentary plantable seed cards.
              </p>
            </div>
            <Link
              href="/gifts"
              className="inline-flex items-center text-sm font-bold text-amber-600 hover:underline shrink-0"
            >
              Explore All 8+ Gifts →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Luxury Plant & Candle Gift Box",
                slug: "luxury-plant-terracotta-candle-gift-box",
                badge: "Gift-Ready Hamper",
                price: "₹2,999",
                src: "/gift-hamper-luxury-plant-candle.jpg",
              },
              {
                name: "Bamboo Dining & Coaster Gift Set",
                slug: "artisan-bamboo-dining-coaster-gift-set",
                badge: "100% Organic Bamboo",
                price: "₹1,899",
                src: "/gift-bamboo-dining-coaster-set.jpg",
              },
              {
                name: "Organic Zen Gardening Starter Hamper",
                slug: "organic-zen-indoor-gardening-starter-hamper",
                badge: "Heirloom Seeds Kit",
                price: "₹3,499",
                src: "/gift-zen-indoor-gardening-kit.jpg",
              },
              {
                name: "Zero-Waste Home Welcome Bundle",
                slug: "zero-waste-eco-home-welcome-gift-bundle",
                badge: "Housewarming Special",
                price: "₹2,499",
                src: "/gift-zero-waste-home-bundle.jpg",
              },
            ].map((p) => (
              <Link
                key={p.name}
                href={`/products/${p.slug}`}
                className="rounded-2xl border border-border overflow-hidden group hover:shadow-xl transition-all bg-card block"
              >
                <div className="relative h-60 w-full overflow-hidden bg-muted">
                  <Image
                    src={p.src || "/placeholder.svg"}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute top-3 left-3 bg-amber-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {p.badge}
                  </div>
                </div>
                <div className="p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base group-hover:text-amber-600 transition-colors">{p.name}</h3>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">Includes Seed Card</span>
                    <span className="font-bold text-lg text-emerald-700 dark:text-emerald-400">{p.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NEW SECTION: 🌿 Best-Selling Indoor & Air-Purifying Plants Grid */}
      <section className="py-14 border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
                <Trees className="h-4 w-4" />
                Botanical Nursery
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold">Living Indoor & Air-Purifying Plants</h2>
              <p className="text-muted-foreground text-sm mt-1">
                NASA-recommended indoor air purifiers, bonsai trees, and low-light plants potted in breathable terracotta.
              </p>
            </div>
            <Link
              href="/plants"
              className="inline-flex items-center text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline shrink-0"
            >
              View All 15+ Living Plants →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Monstera Deliciosa Giant Leaf",
                slug: "monstera-deliciosa-giant-leaf",
                badge: "NASA Air Purifier",
                price: "₹1,999",
                src: "/monstera-deliciosa-swiss-cheese-plant.jpg",
              },
              {
                name: "Fiddle Leaf Fig in Basket",
                slug: "fiddle-leaf-fig-in-seagrass-basket",
                badge: "Statement Tree",
                price: "₹2,799",
                src: "/fiddle-leaf-fig-tree-basket.jpg",
              },
              {
                name: "Snake Plant Sansevieria",
                slug: "snake-plant-sansevieria-air-purifier",
                badge: "Low-Light Champion",
                price: "₹1,299",
                src: "/snake-plant-sansevieria-pot.jpg",
              },
              {
                name: "Bonsai Ficus Zen Tree",
                slug: "bonsai-ficus-zen-microcarpa",
                badge: "Hand-Sculpted Zen",
                price: "₹3,499",
                src: "/bonsai-ficus-microcarpa-tree.jpg",
              },
            ].map((p) => (
              <Link
                key={p.name}
                href={`/products/${p.slug}`}
                className="rounded-2xl border border-border overflow-hidden group hover:shadow-xl transition-all bg-background block"
              >
                <div className="relative h-60 w-full overflow-hidden bg-muted">
                  <Image
                    src={p.src || "/placeholder.svg"}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {p.badge}
                  </div>
                </div>
                <div className="p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base group-hover:text-emerald-600 transition-colors">{p.name}</h3>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">Arrives Healthy</span>
                    <span className="font-bold text-lg text-emerald-700 dark:text-emerald-400">{p.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. About Us & Core Guarantees */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
            <Image
              src="/images/about-studio.jpg"
              alt="EcoNest artisan studio with sustainable materials"
              width={900}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <p className="italic text-lg text-accent-foreground/80 font-serif">
              &quot;Sustainability isn&apos;t a trend — it&apos;s our design.&quot;
            </p>
            <h2 className="font-serif text-3xl font-bold">Why Shop on EcoNest?</h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Our mission is to replace single-use plastic with biodegradable home décor, ethically support rural artisan
              weavers, and offset thousands of kilograms of carbon with every purchase.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { label: "100% Biodegradable", desc: "Nature-first materials", icon: Leaf },
                { label: "Handwoven Artisan", desc: "Ethical living wages", icon: ShieldCheck },
                { label: "Free EV Shipping", desc: "On orders above ₹3,000", icon: Truck },
                { label: "Zero Plastic Wrap", desc: "Cornstarch packaging", icon: Recycle },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="rounded-xl border border-border p-4 hover:shadow-md transition-shadow bg-card">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <Icon className="h-4 w-4 text-emerald-600" />
                      {item.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Featured Artisan Home Décor & Furniture Grid */}
      <section className="bg-card py-14 border-y border-border">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-3xl font-bold">Featured Artisan Home Décor & Furniture</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Handcrafted bamboo chairs, jute rugs, terracotta pendants, and upcycled wall art
              </p>
            </div>
            <Link
              href="/shop"
              className="text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center"
            >
              View All Décor & Furniture →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Bamboo Pendant Lamp",
                slug: "bamboo-pendant-lamp",
                tag: "Handcrafted",
                price: "₹2,499",
                src: "/bamboo-pendant-lamp-hanging.jpg",
              },
              {
                name: "Handwoven Jute Rug",
                slug: "handwoven-jute-rug",
                tag: "Biodegradable",
                price: "₹1,999",
                src: "/handwoven-jute-rug-natural.jpg",
              },
              {
                name: "Terracotta Clay Planter",
                slug: "terracotta-clay-planter",
                tag: "Plastic-Free",
                price: "₹799",
                src: "/terracotta-planter-clay-pot.jpg",
              },
              {
                name: "Recycled Wood Wall Panel",
                slug: "recycled-wood-wall-panel",
                tag: "Upcycled Art",
                price: "₹3,299",
                src: "/recycled-wood-wall-panel-art.jpg",
              },
            ].map((p) => (
              <Link
                key={p.name}
                href={`/products/${p.slug}`}
                className="rounded-2xl border border-border overflow-hidden group hover:shadow-xl transition-all bg-background block"
              >
                <div className="relative h-60 w-full overflow-hidden bg-muted">
                  <Image
                    src={p.src || "/placeholder.svg"}
                    alt={`${p.name} product image`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {p.tag}
                  </div>
                </div>
                <div className="p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base group-hover:text-primary transition-colors">{p.name}</h3>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">Artisan Made</span>
                    <span className="font-bold text-lg text-emerald-700 dark:text-emerald-400">{p.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Free Gift Section */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <FreeGift />
      </section>

      {/* 8. Mini Awareness Quiz */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <AwarenessQuiz />
      </section>

      {/* 9. Recycling Tips Carousel */}
      <RecyclingTipsCarousel />

      {/* 10. Customer Rating & Reviews */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-2xl border border-border p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow bg-card mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">Trusted Customer Reviews</h2>
            <p className="text-muted-foreground text-sm mt-1">Verified purchases from over 12,000+ eco-lovers worldwide.</p>
          </div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-emerald-700 dark:text-emerald-400">
            4.8★ <span className="text-base text-muted-foreground font-normal">/ 5.0</span>
          </div>
        </div>
        <CustomerReviews />
      </section>

      {/* 11. Eco-Impact Section */}
      <section className="bg-card border-t border-border mt-12">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-3xl font-bold">Our Cumulative Environmental Impact</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Real-time metrics on carbon saving & tree-planting drives across India
              </p>
            </div>
            <Link
              href="/impact"
              className="text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center"
            >
              Interactive Carbon Calculator →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { k: "Trees Planted", v: "12,500+" },
              { k: "Plastic Saved (kg)", v: "8,900+" },
              { k: "Cities Reached", v: "45+" },
              { k: "Artisans Supported", v: "120+" },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-2xl border border-border p-6 text-center hover:shadow-md transition-shadow bg-background"
              >
                <div className="text-3xl sm:text-4xl font-serif font-bold text-emerald-700 dark:text-emerald-400">
                  {s.v}
                </div>
                <div className="text-xs sm:text-sm font-medium text-muted-foreground mt-1.5">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. NEW SECTION: VIP Newsletter & 15% Discount Banner */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <NewsletterSignup />
      </section>

      {/* 13. EcoPlant Section */}
      <EcoPlantSection />
    </main>
  )
}
