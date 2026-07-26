'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { Reveal } from './reveal'

export function Showcase() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15])

  return (
    <section id="showcase" ref={ref} className="relative h-[90svh] w-full overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src="/event-production.png"
          alt="A massive world-class event production with an enormous LED stage over a huge crowd"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/60" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-5">
        <Reveal>
          <span className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
            <span className="h-px w-10 bg-accent" /> Signature Production
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-3xl font-display text-4xl font-bold leading-[1] tracking-tight text-balance md:text-7xl">
            Built for the moments the whole world is watching.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
            From arena keynotes to national ceremonies, MINARQ delivers
            infrastructure that performs flawlessly under the brightest lights.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <a
            href="#contact"
            className="group mt-10 inline-flex items-center gap-2 text-sm font-medium"
          >
            View selected work
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
