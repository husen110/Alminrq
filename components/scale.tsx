'use client'

import { animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Reveal } from './reveal'

const STATS = [
  { value: 500, suffix: '+', label: 'Events delivered worldwide' },
  { value: 120, suffix: '+', label: 'Cities transformed' },
  { value: 98, suffix: '%', label: 'Client satisfaction' },
  { value: 99.9, suffix: '%', label: 'Show-time uptime', decimals: 1 },
]

function Counter({
  value,
  suffix,
  decimals = 0,
}: {
  value: number
  suffix: string
  decimals?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    })
    return () => controls.stop()
  }, [inView, value, decimals])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export function Scale() {
  return (
    <section id="scale" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-16 max-w-2xl">
          <Reveal>
            <span className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
              <span className="h-px w-10 bg-accent" /> Scale
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Engineered precision, measured in outcomes.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="bg-card">
              <div className="flex h-full flex-col justify-between gap-8 p-6 md:p-8">
                <span className="font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                  <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {s.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
