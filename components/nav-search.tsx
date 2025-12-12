"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useSearchHistory } from "@/lib/store"

export default function NavSearch() {
  const [q, setQ] = useState("")
  const router = useRouter()
  const { push } = useSearchHistory()
  return (
    <form
      className="w-full max-w-sm"
      onSubmit={(e) => {
        e.preventDefault()
        const term = q.trim()
        if (!term) return
        push(term)
        router.push(`/search?q=${encodeURIComponent(term)}`)
      }}
    >
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search furniture, decor, plants..."
        aria-label="Search products"
      />
    </form>
  )
}
