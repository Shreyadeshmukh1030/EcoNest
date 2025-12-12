"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

type Question = {
  q: string
  options: Array<{ label: string; correct: boolean }>
}

const QUESTIONS: Question[] = [
  {
    q: "Where should you throw e-waste?",
    options: [
      { label: "Dry Bin", correct: false },
      { label: "Wet Bin", correct: false },
      { label: "Recycle Bin", correct: true },
      { label: "General Waste", correct: false },
    ],
  },
  {
    q: "Which material is biodegradable?",
    options: [
      { label: "Plastic", correct: false },
      { label: "Bamboo", correct: true },
      { label: "Styrofoam", correct: false },
      { label: "Aluminum", correct: false },
    ],
  },
  {
    q: "What reduces carbon footprint most?",
    options: [
      { label: "Single-use plastic", correct: false },
      { label: "Reusable products", correct: true },
      { label: "Fast fashion", correct: false },
      { label: "Disposable items", correct: false },
    ],
  },
  {
    q: "Best way to save water at home?",
    options: [
      { label: "Keep tap running", correct: false },
      { label: "Long showers", correct: false },
      { label: "Fix leaks promptly", correct: true },
      { label: "Ignore drips", correct: false },
    ],
  },
]

export function AwarenessQuiz() {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({})

  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-serif text-2xl">Mini Awareness Quiz</h2>
        <p className="text-muted-foreground">Test your eco-knowledge! Hover to reveal answers.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {QUESTIONS.map((item, idx) => (
          <Card key={idx} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-base">{item.q}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {item.options.map((opt, oidx) => (
                <button
                  key={oidx}
                  className={`rounded-md border p-3 text-sm font-medium transition-all hover:scale-105 ${
                    revealed[idx]
                      ? opt.correct
                        ? "bg-green-500/20 border-green-500 text-green-700"
                        : "bg-muted/50 text-muted-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                  onClick={() => setRevealed({ ...revealed, [idx]: true })}
                  aria-label={`Option: ${opt.label}`}
                >
                  {opt.label}
                  {revealed[idx] && opt.correct && <span className="ml-2">✓</span>}
                </button>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
