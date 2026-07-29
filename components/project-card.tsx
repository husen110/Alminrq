'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'

type ProjectCardProps = {
  number: string
  title: string
  location: string
  year: string
  image: string
  meta: string
}

// Subtle scroll parallax: the image drifts slower than the page as the card
// passes through the viewport. The image layer is oversized (128% tall) so the
// translation never exposes an edge. Disabled under prefers-reduced-motion.
export function ProjectCard({ number, title, location, year, image, meta }: ProjectCardProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%'])

  return (
    <a
      ref={ref}
      href="/contact"
      className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-border"
    >
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[14%] h-[128%]">
        <img
          src={image}
          alt={title}
          className="gpu h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/10" />
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
        <div className="flex items-start justify-between">
          <span className="font-mono text-xs text-foreground/70">PROJECT / {number}</span>
          <span className="glass rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.2em]">
            {year}
          </span>
        </div>
        <div>
          <p className="mb-2 text-[11px] uppercase tracking-[0.24em] text-accent">{meta}</p>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-4xl">{title}</h2>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {location}
              </p>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-foreground/25 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>
        </div>
      </div>
    </a>
  )
}
