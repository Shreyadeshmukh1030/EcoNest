"use client"

import useSWR, { mutate } from "swr"

type User = { id: string; name: string; email: string }
type CartItem = { id: string; qty: number }
type WishlistItem = { id: string }

const isClient = () => typeof window !== "undefined"

function getLS<T>(key: string, fallback: T): T {
  if (!isClient()) return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}
function setLS<T>(key: string, value: T) {
  if (!isClient()) return
  window.localStorage.setItem(key, JSON.stringify(value))
}

const fetcher = (key: string) => getLS(key, null)

export function useAuth() {
  const { data } = useSWR<User | null>("auth:user", fetcher, { fallbackData: getLS<User | null>("auth:user", null) })
  return {
    user: data ?? null,
    login: (user: User) => {
      setLS("auth:user", user)
      mutate("auth:user", user, { revalidate: false })
    },
    logout: () => {
      setLS("auth:user", null)
      mutate("auth:user", null, { revalidate: false })
    },
  }
}

export function useCart() {
  const { data } = useSWR<CartItem[]>("cart:items", fetcher, { fallbackData: getLS("cart:items", []) })
  const items = (data ?? []) as CartItem[]
  return {
    items,
    add: (id: string, qty = 1) => {
      const next = [...items]
      const idx = next.findIndex((i) => i.id === id)
      if (idx >= 0) next[idx].qty += qty
      else next.push({ id, qty })
      setLS("cart:items", next)
      mutate("cart:items", next, { revalidate: false })
    },
    remove: (id: string) => {
      const next = items.filter((i) => i.id !== id)
      setLS("cart:items", next)
      mutate("cart:items", next, { revalidate: false })
    },
    clear: () => {
      setLS("cart:items", [])
      mutate("cart:items", [], { revalidate: false })
    },
    setQty: (id: string, qty: number) => {
      const next = items.map((i) => (i.id === id ? { ...i, qty } : i))
      setLS("cart:items", next)
      mutate("cart:items", next, { revalidate: false })
    },
  }
}

export type Promo = { code: string; discountPercent: number; discountFlat: number } | null

export function usePromo() {
  const { data } = useSWR<Promo>("cart:promo", fetcher, { fallbackData: getLS("cart:promo", null) })
  return {
    promo: data ?? null,
    setPromo: (p: Promo) => {
      setLS("cart:promo", p)
      mutate("cart:promo", p, { revalidate: false })
    },
    clearPromo: () => {
      setLS("cart:promo", null)
      mutate("cart:promo", null, { revalidate: false })
    },
  }
}

export function useWishlist() {
  const { data } = useSWR<WishlistItem[]>("wishlist:items", fetcher, { fallbackData: getLS("wishlist:items", []) })
  const items = (data ?? []) as WishlistItem[]
  return {
    items,
    toggle: (id: string) => {
      const exists = items.find((w) => w.id === id)
      const next = exists ? items.filter((w) => w.id !== id) : [...items, { id }]
      setLS("wishlist:items", next)
      mutate("wishlist:items", next, { revalidate: false })
    },
    remove: (id: string) => {
      const next = items.filter((w) => w.id !== id)
      setLS("wishlist:items", next)
      mutate("wishlist:items", next, { revalidate: false })
    },
    clear: () => {
      setLS("wishlist:items", [])
      mutate("wishlist:items", [], { revalidate: false })
    },
  }
}

export function useSearchHistory() {
  const { data } = useSWR<string[]>("search:history", fetcher, { fallbackData: getLS("search:history", []) })
  const terms = (data ?? []) as string[]
  return {
    terms,
    push: (q: string) => {
      const next = Array.from(new Set([q, ...terms])).slice(0, 10)
      setLS("search:history", next)
      mutate("search:history", next, { revalidate: false })
    },
    clear: () => {
      setLS("search:history", [])
      mutate("search:history", [], { revalidate: false })
    },
  }
}
