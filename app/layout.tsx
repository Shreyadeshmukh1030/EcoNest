import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export const metadata: Metadata = {
  title: "EcoNest",
  description: "Design Your Home, Sustainably.",
  generator: "v0.app",
}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased font-sans`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 rounded bg-primary px-3 py-2 text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
