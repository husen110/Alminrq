'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { Reveal } from './reveal'

type Service = {
  index: string
  title: string
  desc: string
  image: string
}

const SERVICES: Service[] = [
  { index: '01', title: 'Curved LED Walls', desc: 'Seamless high-resolution canvases that bend around any architecture.', image: '/curved-led-wall.png' },
  { index: '02', title: 'Interactive LED Floors', desc: 'Responsive surfaces that move with performers and audiences alike.', image: '/led-floor.png' },
  { index: '03', title: 'Intelligent Lighting', desc: 'Choreographed moving lights and beams that sculpt every atmosphere.', image: '/intelligent-lighting.png' },
  { index: '04', title: 'Decorative Lighting', desc: 'Warm architectural and ambient light that dresses a room with atmosphere.', image: '/intelligent-lighting.png' },
  { index: '05', title: 'Stage & Set Design', desc: 'Bespoke architectural staging engineered for spectacle and safety.', image: '/transparent-led.png' },
  { index: '06', title: 'Line Array Speakers', desc: 'Concert-grade line arrays tuned for absolute clarity at any scale.', image: '/line-array-audio.png' },
  { index: '07', title: 'Amplifiers', desc: 'Touring-grade amplification delivering clean, headroom-rich power to every speaker.', image: '/line-array-audio.png' },
  { index: '08', title: 'Mixers & Microphones', desc: 'Digital consoles and professional microphones capturing every voice and instrument.', image: '/event-production.png' },
  { index: '09', title: 'Projection Mapping', desc: 'Turning facades and sculptures into living, projected canvases.', image: '/laser-mapping.png' },
  { index: '10', title: 'Broadcast & Streaming', desc: 'Multi-camera capture and live delivery to millions worldwide.', image: '/live-streaming.png' },
  { index: '11', title: 'Power & Distribution', desc: 'Redundant, silent power infrastructure engineered for zero downtime.', image: '/line-array-audio.png' },
  { index: '12', title: 'Show Control', desc: 'A single timeline commanding light, sound, video and motion as one.', image: '/event-production.png' },
  { index: '13', title: 'On-site Crew', desc: 'Elite technicians who design, install and operate every production.', image: '/event-production.png' },
]

export function Services() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const updateScrollState = () => {
    const track = trackRef.current
    if (!track) return
    const max = track.scrollWidth - track.clientWidth
    const pct = max > 0 ? track.scrollLeft / max : 0
    setProgress(pct)
    setAtStart(track.scrollLeft < 4)
    setAtEnd(track.scrollLeft > max - 4)
  }

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.firstElementChild as HTMLElement | null
    const step = (card?.offsetWidth ?? 320) + 20
    track.scrollBy({ left: step * direction, behavior: 'smooth' })
  }

  return (
    <section id="services" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
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
              Every discipline under one roof — engineered, integrated and
              operated by a single expert team.
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.15}>
        <div className="relative">
          <div
            ref={trackRef}
            onScroll={updateScrollState}
            className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 [scroll-padding-left:1.25rem] md:px-[calc((100vw-72rem)/2+1.25rem)]"
          >
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.index}
                initial={{ opacity: 0, scale: 0.88, y: 24 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ root: trackRef, amount: 0.6, once: true }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group relative aspect-[4/5] w-[240px] shrink-0 snap-start overflow-hidden rounded-2xl shadow-sm sm:w-[280px]"
              >
                <img
                  src={s.image || '/placeholder.svg'}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 from-15% via-black/40 via-45% to-transparent" />
                <span className="absolute left-5 top-5 font-mono text-xs text-white/60">{s.index}</span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-lg font-semibold leading-tight tracking-tight text-white sm:text-xl">
                    {s.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-pretty text-xs leading-relaxed text-white/75 sm:text-sm">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
            <div className="w-px shrink-0 md:w-[calc((100vw-72rem)/2)]" aria-hidden />
          </div>

          {/* Scroll affordance — hints there's more to the right without a hard-cut edge. */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" aria-hidden />
        </div>
      </Reveal>

      <div className="mx-auto mt-8 flex max-w-6xl items-center gap-5 px-5">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-foreground/10">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-150 ease-out"
            style={{ width: `${8 + progress * 92}%` }}
          />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground/10 text-foreground transition-all active:scale-[0.9] active:duration-100 hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-30"
            aria-label="Previous discipline"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground/10 text-foreground transition-all active:scale-[0.9] active:duration-100 hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-30"
            aria-label="Next discipline"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
