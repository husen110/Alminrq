'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { MagneticButton } from './magnetic-button'

const EASE = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section id="top" ref={ref} className="relative h-[100svh] w-full overflow-hidden">
      {/* Background image with parallax */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        <img
          src="/hero-stage.png"
          alt="A vast premium event stage at night with curved LED walls emerging from darkness"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
      </motion.div>

      <div className="grain pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-16 md:justify-center md:pb-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.4 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-accent" />
          <span className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Premium Event Technology
          </span>
        </motion.div>

        <h1 className="max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl">
          {['Where', 'Extraordinary', 'Events Begin.'].map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.5 + i * 0.12 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1 }}
          className="mt-8 max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          We engineer immersive LED, stage, audio and lighting systems for the
          world&apos;s most ambitious productions — down to the last pixel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.15 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton as="a" href="#services">
            Explore Experiences
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </MagneticButton>
          <MagneticButton as="a" href="#contact" variant="outline">
            Request Proposal
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-accent"
            animate={{ y: [-16, 40] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  )
}
