'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Reveal } from './reveal'

type Mode = {
  id: string
  label: string
  image: string
  headline: string
  atmosphere: string
  glow: string
  equipment: string[]
}

const MODES: Mode[] = [
  {
    id: 'keynote',
    label: 'Product Keynote',
    image: '/project-keynote.png',
    headline: 'A reveal the whole industry watches.',
    atmosphere: 'Precise. Architectural. Cinematic.',
    glow: 'oklch(0.72 0.12 215 / 0.22)',
    equipment: ['Panoramic LED', 'Show control', 'Broadcast', 'Line array'],
  },
  {
    id: 'festival',
    label: 'Festival Stage',
    image: '/project-festival.png',
    headline: 'Raw energy, engineered to the frame.',
    atmosphere: 'Immense. Kinetic. Electric.',
    glow: 'oklch(0.7 0.16 12 / 0.24)',
    equipment: ['Kinetic rigging', 'Intelligent lighting', 'LED towers', 'Power'],
  },
  {
    id: 'gala',
    label: 'Luxury Gala',
    image: '/project-gala.png',
    headline: 'Elegance rendered in light.',
    atmosphere: 'Refined. Intimate. Golden.',
    glow: 'oklch(0.72 0.13 75 / 0.24)',
    equipment: ['Transparent LED', 'Projection', 'Immersive AV', 'Show control'],
  },
  {
    id: 'summit',
    label: 'Corporate Summit',
    image: '/project-summit.png',
    headline: 'Clarity at the scale of a nation.',
    atmosphere: 'Considered. Seamless. Trusted.',
    glow: 'oklch(0.72 0.06 260 / 0.22)',
    equipment: ['Curved LED', 'Media servers', 'Streaming', 'On-site crew'],
  },
]

export function Configurator() {
  const [active, setActive] = useState(0)
  const mode = MODES[active]

  return (
    <section id="configure" className="relative overflow-hidden border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12 max-w-2xl">
          <Reveal>
            <span className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
              <span className="h-px w-10 bg-accent" /> Experience Configurator
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl font-bold tracking-tight text-balance md:text-6xl">
              Choose a world. Watch it come alive.
            </h2>
          </Reveal>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {MODES.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setActive(i)}
              className={`rounded-full border px-5 py-2.5 text-sm transition-all duration-300 ${
                active === i
                  ? 'border-accent bg-accent text-accent-foreground'
                  : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border md:aspect-[16/8]">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <img src={mode.image || '/placeholder.svg'} alt={mode.label} className="h-full w-full object-cover" />
            </motion.div>
          </AnimatePresence>

          <motion.div
            key={mode.id + '-glow'}
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(circle at 30% 40%, ${mode.glow}, transparent 60%)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end gap-4 p-6 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode.id + '-text'}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-xs uppercase tracking-[0.3em] text-accent">{mode.atmosphere}</p>
                <h3 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
                  {mode.headline}
                </h3>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap gap-2">
              {mode.equipment.map((item) => (
                <motion.span
                  key={mode.id + item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="glass rounded-full px-3 py-1.5 text-xs text-foreground/90"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
