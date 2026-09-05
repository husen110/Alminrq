'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import type { ProjectCategory } from '@/app/projects/data'

export function ProjectTypeRow({ number, slug, title, tags, description, gallery }: ProjectCategory) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [1.12, 1, 1.1])
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-5%', '5%'])

  return (
    <div ref={ref} className="group relative h-[72svh] min-h-[480px] overflow-hidden rounded-2xl">
      <motion.img
        style={{ scale, y }}
        src={gallery[0]}
        alt={title}
        className="gpu absolute inset-0 h-[110%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 from-10% via-black/30 via-45% to-transparent" />

      <a href={`/projects/${slug}`} className="absolute inset-0" aria-label={`View ${title}`} />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-10">
        <div className="flex items-end gap-5 md:gap-8">
          <span className="font-display text-5xl font-bold leading-none text-accent md:text-7xl">
            {number}
          </span>
          <div className="mb-1.5 h-10 w-px shrink-0 bg-white/25 md:mb-2 md:h-14" />
          <div className="min-w-0">
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/60">{tags}</p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-balance text-white md:text-4xl">
              {title}
            </h2>
            <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-white/70 hidden md:block">
              {description}
            </p>
          </div>
        </div>
        <span className="glass flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white transition-all duration-300 group-hover:-rotate-12 group-hover:bg-accent group-hover:text-accent-foreground">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
    </div>
  )
}
