'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Reveal } from './reveal'

const QUOTES = [
  {
    quote: 'MINARQ did not simply execute our vision. They revealed a version of it we had not imagined possible.',
    name: 'Elena Marini',
    role: 'Global Creative Director',
  },
  {
    quote: 'At show time, every system behaved like one instrument. That level of precision changes what a team believes it can create.',
    name: 'Marcus Hale',
    role: 'Executive Producer',
  },
  {
    quote: 'The technology vanished completely. All the audience felt was awe — which is the highest compliment I can give.',
    name: 'Nadia Okafor',
    role: 'Head of Brand Experience',
  },
]

export function Testimonials() {
  const [active, setActive] = useState(0)
  const quote = QUOTES[active]
  const move = (direction: number) => setActive((current) => (current + direction + QUOTES.length) % QUOTES.length)

  return (
    <section className="relative overflow-hidden border-t border-border py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[0.8fr_1.2fr] md:items-stretch">
        <Reveal className="relative min-h-[440px] overflow-hidden rounded-2xl border border-border">
          <img src="/portrait-director.png" alt="Creative director backstage at an event" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex h-16 items-end gap-1" aria-hidden>
            {Array.from({ length: 34 }).map((_, index) => (
              <motion.span
                key={index}
                className="w-1 rounded-full bg-accent/60"
                animate={{ height: [5, 12 + ((index * 7) % 42), 5] }}
                transition={{ duration: 1.4 + (index % 5) * 0.2, repeat: Infinity, delay: index * 0.03 }}
              />
            ))}
          </div>
        </Reveal>

        <div className="flex min-h-[440px] flex-col justify-between rounded-2xl border border-border bg-card p-7 md:p-12">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Voices from the room</p>
            <span className="mt-8 block font-display text-6xl leading-none text-accent">“</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote className="max-w-2xl font-display text-2xl font-semibold leading-snug tracking-tight text-balance md:text-4xl">
                  {quote.quote}
                </blockquote>
                <div className="mt-8">
                  <p className="font-medium">{quote.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{quote.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
            <span className="font-mono text-xs text-muted-foreground">0{active + 1} / 0{QUOTES.length}</span>
            <div className="flex gap-2">
              <button onClick={() => move(-1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-accent hover:text-accent" aria-label="Previous testimonial">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button onClick={() => move(1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-accent hover:text-accent" aria-label="Next testimonial">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
