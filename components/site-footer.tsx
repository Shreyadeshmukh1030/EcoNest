export default function SiteFooter() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8 grid md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-6 w-6 rounded-full bg-primary" aria-hidden="true" />
            <span className="font-serif text-lg">EcoNest</span>
          </div>
          <p className="mt-3 text-muted-foreground leading-relaxed">Design that doesn’t cost the Earth.</p>
        </div>
        <nav className="grid grid-cols-2 gap-4" aria-label="Footer">
          <div className="space-y-2">
            <div className="font-medium">Shop</div>
            <a href="/shop" className="text-muted-foreground hover:text-primary">
              Lamps
            </a>
            <a href="/shop" className="text-muted-foreground hover:text-primary">
              Rugs
            </a>
            <a href="/shop" className="text-muted-foreground hover:text-primary">
              Planters
            </a>
            <a href="/shop" className="text-muted-foreground hover:text-primary">
              Wall Art
            </a>
          </div>
          <div className="space-y-2">
            <div className="font-medium">Company</div>
            <a href="/about" className="text-muted-foreground hover:text-primary">
              About
            </a>
            <a href="/impact" className="text-muted-foreground hover:text-primary">
              Impact
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              Contact
            </a>
          </div>
        </nav>
        <form className="space-y-2" aria-label="Newsletter">
          <label htmlFor="email" className="font-medium">
            Newsletter
          </label>
          <div className="flex gap-2">
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-md border border-border bg-background px-3 py-2"
            />
            <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground">Subscribe</button>
          </div>
          <p className="text-xs text-muted-foreground">We respect your privacy.</p>
        </form>
      </div>
      <div className="border-t border-border py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} EcoNest. All rights reserved.
      </div>
    </footer>
  )
}
