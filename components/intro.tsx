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
    <section className="relative overflow-hidden">
      <div>
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
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.98])
  const numeralY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const flip = index % 2 === 1

  return (
    <div ref={ref} className="relative flex min-h-[70svh] items-center overflow-hidden px-5">
      <motion.span
        aria-hidden
        style={{ y: numeralY }}
        className={`gpu pointer-events-none absolute top-1/2 -translate-y-1/2 select-none font-display text-[42vw] font-bold leading-none text-foreground/[0.04] ${
          flip ? 'right-[-6vw]' : 'left-[-6vw]'
        }`}
      >
        {String(index + 1).padStart(2, '0')}
      </motion.span>

      <motion.div
        style={{ opacity, y, scale }}
        className={`relative mx-auto flex w-full max-w-6xl flex-col ${flip ? 'items-end text-right' : 'items-start text-left'}`}
      >
        <Reveal>
          <span className={`mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-accent ${flip ? 'flex-row-reverse' : ''}`}>
            <span className="h-px w-10 bg-accent" /> {overline}
          </span>
        </Reveal>
        <p className="max-w-4xl border-b border-border pb-10 font-display text-4xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-5xl md:text-7xl">
          <span className="text-accent">{String(index + 1).padStart(2, '0')}.</span>{' '}
          {text}
        </p>
      </motion.div>
    </div>
  )
}
