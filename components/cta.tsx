'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { MagneticButton } from './magnetic-button'
import { Reveal } from './reveal'

export function CTA() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden py-32 md:py-48">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <img
          src="/intelligent-lighting.png"
          alt=""
          aria-hidden
          className="h-full w-full object-cover opacity-40"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
        <Reveal>
          <span className="mb-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
            <span className="h-px w-10 bg-accent" /> Request Proposal
            <span className="h-px w-10 bg-accent" />
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-balance md:text-7xl">
            Let&apos;s build something the world remembers.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-lg text-pretty leading-relaxed text-muted-foreground">
            Tell us about your event. Our production engineers will design a
            technical vision within 48 hours.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton as="a" href="mailto:studio@minarq.com">
              Start a Project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton as="a" href="tel:+10000000000" variant="outline">
              Talk to the studio
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
