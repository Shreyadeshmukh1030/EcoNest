import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8">
        <h1 className="font-serif text-4xl text-pretty">About EcoNest</h1>
        <p className="text-muted-foreground mt-2 leading-relaxed">
          Our mission is to reduce plastic waste and promote nature-based living through biodegradable materials,
          artisan craftsmanship, and circular design.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-8 items-start">
        <div className="rounded-lg overflow-hidden border border-border">
          <Image
            src="/images/about-studio.jpg"
            alt="EcoNest artisan studio with sustainable materials and tools"
            width={900}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-4">
          <h2 className="font-serif text-2xl">Design Your Home, Sustainably.</h2>
          <p className="text-muted-foreground leading-relaxed">
            We partner with artisans and climate-forward manufacturers to bring you décor that’s beautiful, durable, and
            gentle on the planet. Every product we ship uses eco packaging and supports local communities.
          </p>
          <ul className="grid grid-cols-2 gap-3">
            {[
              { label: "Biodegradable", desc: "Nature-first materials" },
              { label: "Handcrafted", desc: "Made by artisans" },
              { label: "Free Shipping", desc: "On select orders" },
              { label: "Eco Packaging", desc: "Plastic-free" },
            ].map((item) => (
              <li key={item.label} className="rounded-lg border border-border p-4">
                <div className="font-medium">{item.label}</div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
