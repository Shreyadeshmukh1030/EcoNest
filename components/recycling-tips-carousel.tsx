"use client"

import Image from "next/image"

export default function RecyclingTipsCarousel() {
  const tips = [
    { title: "Use metal bottles", desc: "Ditch single-use plastic", img: "/reusable-metal-water-bottle.jpg" },
    { title: "Segregate waste", desc: "Separate dry, wet, and recyclables", img: "/waste-segregation-bins.jpg" },
    { title: "Carry a tote bag", desc: "Say no to plastic bags", img: "/eco-tote-bag-shopping.jpg" },
    { title: "Compost kitchen waste", desc: "Turn scraps into nutrient-rich soil", img: "/kitchen-compost-bin.jpg" },
    {
      title: "Choose bamboo products",
      desc: "Sustainable alternative to plastic",
      img: "/bamboo-products-eco-friendly.jpg",
    },
    { title: "Buy in bulk", desc: "Reduce packaging waste", img: "/bulk-food-shopping.jpg" },
  ]

  return (
    <section className="bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-serif text-2xl mb-2">Recycling Tips</h2>
        <p className="text-muted-foreground mb-6">Simple habits for a sustainable lifestyle</p>
        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-4 snap-x snap-mandatory" style={{ scrollSnapType: "x mandatory" }}>
            {tips.map((t, i) => (
              <div
                key={i}
                className="min-w-[280px] snap-start rounded-xl overflow-hidden border bg-background shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <Image
                  src={t.img || "/placeholder.svg"}
                  alt={t.title}
                  width={280}
                  height={192}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium mb-1">{t.title}</h3>
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
