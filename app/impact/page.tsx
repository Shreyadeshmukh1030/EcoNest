"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const impactData = [
  { year: 2020, trees: 1200, carbonKg: 8000 },
  { year: 2021, trees: 2500, carbonKg: 14500 },
  { year: 2022, trees: 5200, carbonKg: 23000 },
  { year: 2023, trees: 8900, carbonKg: 34500 },
  { year: 2024, trees: 12500, carbonKg: 42000 },
]

export default function ImpactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-6">
        <h1 className="font-serif text-4xl text-pretty">Our Eco Impact</h1>
        <p className="text-muted-foreground mt-2">Infographic-style stats on carbon saving & trees planted.</p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { k: "Trees Planted", v: "12,500+" },
          { k: "Plastic Saved (kg)", v: "8,900+" },
          { k: "Cities Reached", v: "45+" },
          { k: "Artisans Supported", v: "120+" },
        ].map((s) => (
          <div key={s.k} className="rounded-lg border border-border p-4 text-center">
            <div className="text-2xl font-serif">{s.v}</div>
            <div className="text-sm text-muted-foreground">{s.k}</div>
          </div>
        ))}
      </section>

      <section aria-label="Impact gallery" className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="rounded-lg overflow-hidden border border-border">
          <img
            src="/images/impact/planting-drive.jpg"
            alt="Community tree-planting drive supported by EcoNest"
            className="w-full h-56 md:h-72 object-cover"
          />
        </div>
        <div className="rounded-lg overflow-hidden border border-border">
          <img
            src="/images/impact/recycling.jpg"
            alt="Recycling and material recovery efforts"
            className="w-full h-56 md:h-72 object-cover"
          />
        </div>
      </section>

      <section aria-label="Impact Chart" className="rounded-lg border border-border p-4 bg-card">
        <ChartContainer
          config={{
            trees: { label: "Trees Planted", color: "hsl(var(--chart-1))" },
            carbonKg: { label: "Carbon Saved (kg)", color: "hsl(var(--chart-2))" },
          }}
          className="h-[360px]"
        >
          <LineChart data={impactData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Line type="monotone" dataKey="trees" stroke="var(--color-trees)" name="Trees Planted" />
            <Line type="monotone" dataKey="carbonKg" stroke="var(--color-carbonKg)" name="Carbon Saved (kg)" />
          </LineChart>
        </ChartContainer>
      </section>
    </main>
  )
}
