"use client"

import type React from "react"

import { useState } from "react"

export default function BookingConfirmationCard() {
  const [name, setName] = useState("")
  const [service, setService] = useState("Oil Change")
  const [datetime, setDatetime] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <form
        onSubmit={onSubmit}
        className="rounded-lg border border-border p-4 space-y-4"
        aria-label="Service Booking Form"
      >
        <div>
          <label htmlFor="custName" className="block text-sm font-medium">
            Customer Name
          </label>
          <input
            id="custName"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium">
            Selected Service
          </label>
          <select
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2"
          >
            <option>Oil Change</option>
            <option>Wash</option>
            <option>Full Service</option>
          </select>
        </div>
        <div>
          <label htmlFor="dt" className="block text-sm font-medium">
            Date & Time
          </label>
          <input
            id="dt"
            type="datetime-local"
            required
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2"
          />
        </div>
        <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground">Confirm Booking</button>
      </form>

      <div className="rounded-lg border border-border p-4">
        <h3 className="font-serif text-xl">Booking Confirmation</h3>
        <div className="mt-4 grid gap-2">
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-sm text-muted-foreground">Customer Name</span>
            <span className="font-medium">{submitted ? name || "—" : "—"}</span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-sm text-muted-foreground">Selected Service</span>
            <span className="font-medium">{submitted ? service : "—"}</span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-sm text-muted-foreground">Date & Time</span>
            <span className="font-medium">
              {submitted ? (datetime ? new Date(datetime).toLocaleString() : "—") : "—"}
            </span>
          </div>
        </div>
        <p className="mt-4 rounded-md border border-primary/40 bg-primary/10 p-3 text-sm">
          Your booking is confirmed! Our technician will reach you soon.
        </p>
      </div>
    </div>
  )
}
