export default function ServicePriceEstimator() {
  return (
    <div className="grid md:grid-cols-[1fr_auto] gap-4 items-end">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="vehicle" className="block text-sm font-medium">
            Vehicle Type
          </label>
          <select id="vehicle" className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2">
            <option>Bike</option>
            <option>Car</option>
          </select>
        </div>
        <div>
          <label htmlFor="stype" className="block text-sm font-medium">
            Service Type
          </label>
          <select id="stype" className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2">
            <option>Oil Change</option>
            <option>Wash</option>
            <option>Full Service</option>
          </select>
        </div>
      </div>

      <div className="rounded-lg border border-primary/40 bg-primary/10 px-5 py-4">
        <div className="text-xs text-muted-foreground">Estimated Price Range</div>
        <div className="font-serif text-2xl">₹1,500 – ₹3,000</div>
      </div>
    </div>
  )
}
