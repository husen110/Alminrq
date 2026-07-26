'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Reveal } from './reveal'

const WORDS =
  'We build the invisible engineering behind unforgettable moments — precision systems that turn empty rooms into worlds.'.split(
    ' ',
  )

export function Intro() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.25'],
  })

  return (
    <section className="mx-auto max-w-6xl px-5 py-28 md:py-40">
      <Reveal>
        <span className="mb-10 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
          <span className="h-px w-10 bg-accent" /> Manifesto
        </span>
      </Reveal>

      <p
        ref={ref}
        className="max-w-4xl font-display text-3xl font-semibold leading-[1.15] tracking-tight text-balance sm:text-4xl md:text-5xl"
      >
        {WORDS.map((word, i) => {
          const start = i / WORDS.length
          const end = start + 1 / WORDS.length
          return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
        })}
      </p>
    </section>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  )
}
