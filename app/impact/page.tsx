"use client"

import { useState } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Leaf, Trees, Recycle, Users, Calculator, ArrowRight, ShieldCheck, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const impactData = [
  { year: "2020", trees: 1200, carbonKg: 8000 },
  { year: "2021", trees: 2500, carbonKg: 14500 },
  { year: "2022", trees: 5200, carbonKg: 23000 },
  { year: "2023", trees: 8900, carbonKg: 34500 },
  { year: "2024", trees: 12500, carbonKg: 42000 },
]

export default function ImpactPage() {
  // Calculator state
  const [bambooChairs, setBambooChairs] = useState(2)
  const [juteRugs, setJuteRugs] = useState(1)
  const [clayPlanters, setClayPlanters] = useState(4)
  const [bambooLamps, setBambooLamps] = useState(2)

  // Math: chair saves 18kg CO2 & 4.5kg plastic; rug saves 12kg CO2; planter saves 3kg CO2; lamp saves 8kg CO2
  const totalCo2Saved =
    bambooChairs * 18 + juteRugs * 12 + clayPlanters * 3 + bambooLamps * 8
  const totalPlasticSaved =
    bambooChairs * 4.5 + juteRugs * 2.8 + clayPlanters * 1.5 + bambooLamps * 2.2
  const treesEquivalent = Math.max(1, Math.round(totalCo2Saved / 10))

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      {/* Hero Banner */}
      <header className="mb-10 text-center max-w-3xl mx-auto space-y-3">
        <Badge className="bg-emerald-600 text-white hover:bg-emerald-700 px-3 py-1 text-xs">
          🌍 Our Collective Carbon Footprint
        </Badge>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-pretty">
          Measurable Eco-Impact
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Through sustainable sourcing, biodegradable cornstarch packaging, and zero-carbon electric transit, EcoNest
          has eliminated thousands of kilograms of single-use plastic from home décor.
        </p>
      </header>

      {/* Top Stats Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {[
          { k: "Trees Planted", v: "12,500+", icon: Trees, color: "text-emerald-600" },
          { k: "Plastic Saved (kg)", v: "8,900+", icon: Recycle, color: "text-blue-600" },
          { k: "Carbon Offset (kg)", v: "42,000+", icon: Leaf, color: "text-emerald-700" },
          { k: "Artisan Families", v: "120+", icon: Users, color: "text-amber-600" },
        ].map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.k} className="border border-border bg-card shadow-sm text-center p-6">
              <Icon className={`h-8 w-8 mx-auto mb-2 ${s.color}`} />
              <div className="text-2xl sm:text-3xl font-serif font-bold">{s.v}</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">{s.k}</div>
            </Card>
          )
        })}
      </section>

      {/* Interactive Carbon Calculator Section */}
      <section className="mb-14">
        <Card className="border border-emerald-500/30 bg-gradient-to-br from-card to-emerald-500/5 shadow-md overflow-hidden">
          <CardHeader className="border-b border-border/60 pb-4">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-emerald-600" />
              <CardTitle className="text-xl font-serif">Interactive Household Impact Calculator</CardTitle>
            </div>
            <CardDescription>
              Adjust sliders below to see how swapping conventional furniture for EcoNest pieces reduces your home&apos;s environmental footprint.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 grid lg:grid-cols-2 gap-8 items-center">
            {/* Controls */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-semibold mb-1">
                  <span>Bamboo Lounge Chairs</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">{bambooChairs} items</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={bambooChairs}
                  onChange={(e) => setBambooChairs(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="text-xs text-muted-foreground">Saves 18kg CO₂ & 4.5kg plastic per chair</div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-semibold mb-1">
                  <span>Biodegradable Jute Rugs</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">{juteRugs} items</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={juteRugs}
                  onChange={(e) => setJuteRugs(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="text-xs text-muted-foreground">Saves 12kg CO₂ & 2.8kg plastic per rug</div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-semibold mb-1">
                  <span>Handcrafted Clay Planters</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">{clayPlanters} items</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={20}
                  value={clayPlanters}
                  onChange={(e) => setClayPlanters(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="text-xs text-muted-foreground">Saves 3kg CO₂ & 1.5kg plastic per planter</div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-semibold mb-1">
                  <span>Bamboo & Terracotta Lamps</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">{bambooLamps} items</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={bambooLamps}
                  onChange={(e) => setBambooLamps(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="text-xs text-muted-foreground">Saves 8kg CO₂ & 2.2kg plastic per lamp</div>
              </div>
            </div>

            {/* Calculated Results Box */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 sm:p-8 space-y-6 text-center">
              <Badge className="bg-emerald-600 text-white">Your Personal Household Offset</Badge>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-background/80 border border-border shadow-sm">
                  <div className="text-3xl sm:text-4xl font-bold text-emerald-700 dark:text-emerald-400">
                    {totalCo2Saved} kg
                  </div>
                  <div className="text-xs font-semibold text-muted-foreground mt-1">CO₂ Emissions Avoided</div>
                </div>
                <div className="p-4 rounded-xl bg-background/80 border border-border shadow-sm">
                  <div className="text-3xl sm:text-4xl font-bold text-blue-600">
                    {totalPlasticSaved.toFixed(1)} kg
                  </div>
                  <div className="text-xs font-semibold text-muted-foreground mt-1">Single-Use Plastic Saved</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>
                  Equivalent to planting <strong>{treesEquivalent}</strong> native trees!
                </span>
              </div>

              <Button asChild size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link href="/products">
                  Shop These Items
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Historical Growth Chart Section */}
      <section className="mb-14">
        <Card className="border border-border shadow-sm bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-serif">5-Year Environmental Growth</CardTitle>
            <CardDescription>
              Annual cumulative carbon offset (kg) and tree plantation drives across India.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72 sm:h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={impactData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="year" fontSize={12} />
                <YAxis fontSize={12} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="carbonKg"
                  name="Carbon Saved (kg)"
                  stroke="#059669"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="trees"
                  name="Trees Planted"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      {/* Artisan Showcase */}
      <section className="grid md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <Badge variant="outline" className="text-emerald-700 border-emerald-600/30">
            🤝 Ethical Artisan Partnerships
          </Badge>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">Empowering Rural Craftsmanship</h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            We collaborate directly with bamboo weavers, terracotta artisans, and jute craftsmen across rural India.
            Every product purchased ensures fair living wages, preserves heritage craft techniques, and removes harmful
            plastic alternatives from circulation.
          </p>
          <Button asChild variant="outline" className="border-emerald-600 text-emerald-700 hover:bg-emerald-50">
            <Link href="/about">Read Our Brand Story →</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="aspect-square relative rounded-xl overflow-hidden bg-muted border border-border shadow-sm">
            <Image
              src="/images/impact/planting-drive.jpg"
              alt="Community tree-planting drive supported by EcoNest"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          <div className="aspect-square relative rounded-xl overflow-hidden bg-muted border border-border shadow-sm translate-y-4">
            <Image
              src="/images/impact/artisan-workshop.jpg"
              alt="Artisan workshop crafting eco-friendly home decor"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
