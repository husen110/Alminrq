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
    image: '/dan-taylor-fT3RcZtiDYQ-unsplash.jpg',
  },
  {
    number: '02',
    title: 'Nocturne',
    location: 'Milan · Italy',
    image: '/frankie-cordoba-ckUXcJHxE5Q-unsplash.jpg',
  },
  {
    number: '03',
    title: 'Electric Horizon',
    location: 'Barcelona · Spain',
    image: '/emiliano-vittoriosi-2S3hitWVbrU-unsplash.jpg',
  },
  {
    number: '04',
    title: 'Vows in Light',
    location: 'Como · Italy',
    image: '/phil-hearing-0Drv0CLo9HU-unsplash.jpg',
  },
  {
    number: '05',
    title: 'State of the Nation',
    location: 'Dubai · UAE',
    image: '/teemu-paananen-bzdhc5b3Bxs-unsplash.jpg',
  },
  {
    number: '06',
    title: 'Family Welcomes You',
    location: 'Jaipur · India',
    image: '/luis-morera-DnDKT6wYhlU-unsplash.jpg',
  },
  {
    number: '07',
    title: 'Garden of Lotus',
    location: 'Udaipur · India',
    image: '/adhika-bagus-prasada-8SBwDqLXFy4-unsplash.jpg',
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

function Project({ number, title, location, image }: (typeof PROJECTS)[number]) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.1])
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <article ref={ref} className="group relative h-[72svh] min-h-[560px] overflow-hidden rounded-2xl">
      <motion.img
        style={{ scale, y }}
        src={image}
        alt={title}
        className="gpu absolute inset-0 h-[110%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 from-10% via-black/25 via-45% to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-10">
        <div className="flex items-end gap-5 md:gap-8">
          <span className="font-display text-5xl font-bold leading-none text-accent md:text-7xl">
            {number}
          </span>
          <div className="mb-1.5 h-10 w-px shrink-0 bg-white/25 md:mb-2 md:h-14" />
          <div className="min-w-0">
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/60">
              {location}
            </p>
            <h3 className="font-display text-2xl font-bold tracking-tight text-balance text-white md:text-4xl">
              {title}
            </h3>
          </div>
        </div>
        <a
          href="#contact"
          className="glass flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white transition-all duration-300 active:scale-90 active:duration-100 group-hover:-rotate-12 group-hover:bg-accent group-hover:text-accent-foreground"
          aria-label={`View ${title}`}
        >
          <ArrowUpRight className="h-5 w-5" />
        </a>
      </div>
    </article>
  )
}
