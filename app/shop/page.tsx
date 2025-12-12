import Image from "next/image"

const products = [
  { name: "Bamboo Lamp", tag: "Handcrafted", price: "₹2,499", q: "bamboo lamp on side table" },
  { name: "Jute Rug", tag: "Biodegradable", price: "₹1,999", q: "jute rug in minimal living room" },
  { name: "Clay Planter", tag: "Plastic-free", price: "₹799", q: "clay planter with indoor plant" },
  { name: "Recycled Wall Art", tag: "Upcycled", price: "₹3,299", q: "recycled material wall art decor" },
  { name: "Cork Coasters", tag: "Compostable", price: "₹399", q: "cork coasters on wooden table" },
  { name: "Bamboo Shelf", tag: "Sustainably-sourced", price: "₹4,999", q: "bamboo shelf with plants" },
  { name: "Hemp Cushion", tag: "Organic", price: "₹1,299", q: "hemp cushion on sofa" },
  { name: "Terracotta Vase", tag: "Artisan-made", price: "₹1,199", q: "terracotta vase with flowers" },
]

export default function ShopPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-6">
        <h1 className="font-serif text-4xl text-pretty">Shop</h1>
        <p className="text-muted-foreground mt-2">Curated, eco-friendly home décor.</p>
        <div className="mt-4 rounded-lg overflow-hidden border border-border">
          <Image
            src="/images/hero-living-room.jpg"
            alt="Naturally styled eco-friendly living room"
            width={1600}
            height={700}
            className="w-full h-56 md:h-72 object-cover"
            priority
          />
        </div>
      </header>

      {/* Static filters UI (no JS needed) */}
      <section aria-label="Filters" className="rounded-lg border border-border p-4 mb-6 grid sm:grid-cols-3 gap-3">
        <div>
          <label htmlFor="category" className="block text-sm font-medium">
            Category
          </label>
          <select id="category" className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2">
            <option>All</option>
            <option>Lamps</option>
            <option>Rugs</option>
            <option>Planters</option>
            <option>Wall Art</option>
          </select>
        </div>
        <div>
          <label htmlFor="material" className="block text-sm font-medium">
            Material
          </label>
          <select id="material" className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2">
            <option>All</option>
            <option>Bamboo</option>
            <option>Jute</option>
            <option>Clay</option>
            <option>Recycled</option>
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="block text-sm font-medium">
            Sort
          </label>
          <select id="sort" className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <article key={p.name} className="rounded-lg border border-border overflow-hidden">
            <Image
              src={
                p.name === "Bamboo Lamp"
                  ? "/bamboo-pendant-lamp-hanging.jpg"
                  : p.name === "Jute Rug"
                    ? "/handwoven-jute-rug-natural.jpg"
                    : p.name === "Clay Planter"
                      ? "/terracotta-planter-clay-pot.jpg"
                      : p.name === "Recycled Wall Art"
                        ? "/recycled-wood-wall-panel-art.jpg"
                        : p.name === "Cork Coasters"
                          ? "/cork-bulletin-board-sustainable.jpg"
                          : p.name === "Bamboo Shelf"
                            ? "/floating-bamboo-shelves.jpg"
                            : p.name === "Hemp Cushion"
                              ? "/hemp-jute-rug-textured.jpg"
                              : "/terracotta-planter-clay-pot.jpg"
              }
              alt={`${p.name} product image`}
              width={400}
              height={400}
              className="h-56 w-full object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{p.name}</h3>
                <span className="text-sm text-muted-foreground">{p.price}</span>
              </div>
              <div className="mt-2 inline-flex items-center rounded-full border border-primary px-2 py-1 text-xs">
                {p.tag}
              </div>
              <div className="mt-3">
                <button className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground">Add to Cart</button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-12" aria-labelledby="ecoplant-shop-heading">
        <h2 id="ecoplant-shop-heading" className="font-serif text-3xl">
          EcoPlant: Bonsai & Indoor
        </h2>
        <p className="text-muted-foreground mt-2">Living décor that purifies air and calms your space.</p>

        <div id="ecoplant-bonsai" className="mt-6 grid md:grid-cols-2 gap-6">
          <article className="rounded-lg border border-border overflow-hidden">
            <Image
              src="/images/plants/bonsai.jpg"
              alt="Curated Bonsai selection"
              width={1200}
              height={800}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="font-serif text-2xl">Bonsai</h3>
              <p className="text-muted-foreground mt-1">
                Hand-shaped living art, ideal for meditative desks and tranquil corners.
              </p>
            </div>
          </article>

          <article id="ecoplant-indoor" className="rounded-lg border border-border overflow-hidden">
            <Image
              src="/images/plants/indoor.jpg"
              alt="Assortment of easy-care indoor plants"
              width={1200}
              height={800}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="font-serif text-2xl">Indoor Plants</h3>
              <p className="text-muted-foreground mt-1">
                Air‑purifying greens that thrive with minimal care in modern homes.
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
