"use client"
const quiz = [
  { q: "Where should you throw e-waste?", options: ["Dry Bin", "Wet Bin", "Recycle Bin"], correct: "Recycle Bin" },
  { q: "Best bottle type to reduce plastic?", options: ["Plastic", "Metal", "Paper"], correct: "Metal" },
  { q: "What to do with old clothes?", options: ["Trash", "Burn", "Donate/Recycle"], correct: "Donate/Recycle" },
]
export default function MiniAwarenessQuiz() {
  return (
    <section className="container py-12">
      <h2 className="text-2xl font-semibold">Mini Awareness Quiz</h2>
      <p className="text-muted-foreground mt-1">Hover a question to reveal the correct answer.</p>
      <div className="mt-6 grid md:grid-cols-3 gap-6">
        {quiz.map((item, i) => (
          <div key={i} className="group border rounded-lg p-4 transition-colors hover:bg-muted/50">
            <p className="font-medium">{item.q}</p>
            <div className="mt-3 grid gap-2">
              {item.options.map((opt) => (
                <div
                  key={opt}
                  data-correct={opt === item.correct}
                  className="rounded-lg border p-3 transition-all group-hover:[&[data-correct='true']]:bg-green-100 group-hover:[&[data-correct='true']]:border-green-400 group-hover:[&[data-correct='false']]:opacity-70"
                >
                  {opt}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
