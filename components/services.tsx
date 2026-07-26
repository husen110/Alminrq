'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Reveal } from './reveal'

type Service = {
  index: string
  title: string
  desc: string
  image: string
}

const SERVICES: Service[] = [
  {
    index: '01',
    title: 'Curved LED Walls',
    desc: 'Seamless high-resolution canvases that bend around any architecture.',
    image: '/curved-led-wall.png',
  },
  {
    index: '02',
    title: 'Transparent Displays',
    desc: 'See-through LED that floats graphics in mid-air without hiding the room.',
    image: '/transparent-led.png',
  },
  {
    index: '03',
    title: 'Interactive LED Floors',
    desc: 'Responsive surfaces that move with performers and audiences alike.',
    image: '/led-floor.png',
  },
  {
    index: '04',
    title: 'Line Array Audio',
    desc: 'Concert-grade sound systems tuned for absolute clarity at scale.',
    image: '/line-array-audio.png',
  },
  {
    index: '05',
    title: 'Intelligent Lighting',
    desc: 'Choreographed moving lights and beams that sculpt every atmosphere.',
    image: '/intelligent-lighting.png',
  },
]

export function Services() {
  const [active, setActive] = useState(0)

  return (
    <section id="services" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <span className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
                <span className="h-px w-10 bg-accent" /> Experiences
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="max-w-xl font-display text-4xl font-bold tracking-tight text-balance md:text-6xl">
                A complete arsenal of premium technology.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              Fourteen disciplines under one roof — engineered, integrated and
              operated by a single expert team.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Interactive list */}
          <ul className="flex flex-col">
            {SERVICES.map((s, i) => (
              <li key={s.index}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex w-full items-center gap-5 border-b border-border py-6 text-left transition-colors"
                >
                  <span
                    className={`font-mono text-xs transition-colors ${
                      active === i ? 'text-accent' : 'text-muted-foreground'
                    }`}
                  >
                    {s.index}
                  </span>
                  <span className="flex-1">
                    <span
                      className={`block font-display text-2xl font-semibold tracking-tight transition-all duration-300 md:text-3xl ${
                        active === i
                          ? 'translate-x-2 text-foreground'
                          : 'text-muted-foreground group-hover:text-foreground'
                      }`}
                    >
                      {s.title}
                    </span>
                    <AnimatePresence initial={false}>
                      {active === i && (
                        <motion.span
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="block overflow-hidden"
                        >
                          <span className="mt-2 block max-w-sm pl-2 text-sm leading-relaxed text-muted-foreground">
                            {s.desc}
                          </span>
                          {/* Mobile image */}
                          <span className="mt-4 block overflow-hidden rounded-xl lg:hidden">
                            <img
                              src={s.image || '/placeholder.svg'}
                              alt={s.title}
                              className="h-52 w-full object-cover"
                            />
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Sticky preview (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-2xl border border-border">
              <AnimatePresence mode="wait">
                <motion.img
                  key={SERVICES[active].image}
                  src={SERVICES[active].image}
                  alt={SERVICES[active].title}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-mono text-xs text-accent">
                  {SERVICES[active].index} / 05
                </span>
                <p className="mt-1 font-display text-2xl font-semibold">
                  {SERVICES[active].title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
