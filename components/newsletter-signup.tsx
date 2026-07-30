"use client"

import React, { useState } from "react"
import { Sparkles, CheckCircle2 } from "lucide-react"

export function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-600/15 via-emerald-500/10 to-amber-500/10 p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4">
      <Sparkles className="h-8 w-8 text-amber-500 mx-auto" />
      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold">
        Join the EcoNest Green Community & Get 15% Off
      </h2>
      <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
        Subscribe to receive insider access to new artisan harvests, limited plant cuttings, and your welcome coupon code.
      </p>

      {submitted ? (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 max-w-md mx-auto flex items-center justify-center gap-2 font-semibold">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>Welcome to EcoNest VIP! Use coupon code <strong>EARTH20</strong> at checkout for 20% off!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address..."
            className="flex-1 h-12 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <button
            type="submit"
            className="h-12 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shrink-0 shadow-md"
          >
            Get 15% Off Coupon
          </button>
        </form>
      )}
      <p className="text-[11px] text-muted-foreground">
        🔒 We respect your privacy. No spam, unsubscribe anytime.
      </p>
    </div>
  )
}
