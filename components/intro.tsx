'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Reveal } from './reveal'

const STATEMENTS = [
  { overline: '01 / Vision', text: 'Empty rooms are only the beginning.' },
  { overline: '02 / Engineering', text: 'Every pixel. Every frequency. Every second.' },
  { overline: '03 / Emotion', text: 'Technology disappears. The feeling remains.' },
]

export function Intro() {
  return (
    <section className="relative border-t border-border">
      <div className="pointer-events-none sticky top-0 h-screen overflow-hidden">
        <div className="cinematic-grid absolute inset-0 opacity-20" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>
      <div className="relative -mt-[100svh]">
        {STATEMENTS.map((statement, index) => (
          <Statement key={statement.text} {...statement} index={index} />
        ))}
      </div>
    </section>
  )
}

function Statement({ overline, text, index }: { overline: string; text: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.28, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -80])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.96])

  return (
    <div ref={ref} className="flex min-h-[92svh] items-center px-5">
      <motion.div style={{ opacity, y, scale }} className="mx-auto w-full max-w-6xl">
        <Reveal>
          <span className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
            <span className="h-px w-10 bg-accent" /> {overline}
          </span>
        </Reveal>
        <p className="max-w-5xl font-display text-4xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-5xl md:text-7xl">
          <span className="text-muted-foreground">{String(index + 1).padStart(2, '0')}.</span>{' '}
          {text}
        </p>
      </motion.div>
    </div>
  )
}
