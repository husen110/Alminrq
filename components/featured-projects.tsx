'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { Reveal } from './reveal'

const PROJECTS = [
  {
    number: '01',
    title: 'The Infinite Reveal',
    location: 'Berlin · Germany',
    image: '/project-keynote.png',
    meta: '18K panoramic LED · 4K broadcast · Spatial audio',
  },
  {
    number: '02',
    title: 'Nocturne',
    location: 'Milan · Italy',
    image: '/project-gala.png',
    meta: 'Transparent LED · Kinetic sculpture · Projection',
  },
  {
    number: '03',
    title: 'Electric Horizon',
    location: 'Barcelona · Spain',
    image: '/project-festival.png',
    meta: '42m stage · 680 fixtures · 120,000 guests',
  },
]

export function FeaturedProjects() {
  return (
    <section id="projects" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto mb-16 max-w-6xl px-5">
        <Reveal>
          <span className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
            <span className="h-px w-10 bg-accent" /> Selected work
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl font-display text-4xl font-bold tracking-tight text-balance md:text-6xl">
              Moments designed to outlive the night.
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              A selection of environments engineered for cultural impact.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="flex flex-col gap-4 px-3 md:px-5">
        {PROJECTS.map((project) => <Project key={project.number} {...project} />)}
      </div>
    </section>
  )
}

function Project({ number, title, location, image, meta }: (typeof PROJECTS)[number]) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.1])
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <article ref={ref} className="group relative h-[72svh] min-h-[560px] overflow-hidden rounded-2xl border border-border">
      <motion.img style={{ scale, y }} src={image} alt={title} className="gpu absolute inset-0 h-[110%] w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-background/30" />
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
        <div className="flex items-start justify-between">
          <span className="font-mono text-xs text-foreground/70">PROJECT / {number}</span>
          <span className="glass rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]">{location}</span>
        </div>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.28em] text-accent">{meta}</p>
            <h3 className="font-display text-4xl font-bold tracking-tight md:text-7xl">{title}</h3>
          </div>
          <a href="#contact" className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/25 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground" aria-label={`View ${title}`}>
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </article>
  )
}
