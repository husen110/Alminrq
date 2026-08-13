'use client'

import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './reveal'

const EVENTS = [
  {
    label: 'Concerts & Live Tours',
    desc: 'Arena-scale rigs built to survive a 40-city run.',
    image: '/minarq-concert-stage.png',
    span: 'lg:col-span-2 lg:row-span-2',
    large: true,
  },
  {
    label: 'Corporate & Keynotes',
    desc: '',
    image: '/hero-corporate-production.png',
    span: '',
    large: false,
  },
  {
    label: 'Weddings & Celebrations',
    desc: '',
    image: '/hero-wedding-production.png',
    span: '',
    large: false,
  },
  {
    label: 'Galas & Summits',
    desc: '',
    image: '/project-summit.png',
    span: '',
    large: false,
  },
  {
    label: 'Product Launches',
    desc: '',
    image: '/hero-launch-production.png',
    span: '',
    large: false,
  },
  {
    label: 'Festivals',
    desc: 'Six-figure crowds, zero downtime, every time.',
    image: '/project-festival.png',
    span: 'lg:col-span-4',
    large: true,
  },
]

export function EventTypes() {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <span className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
                <span className="h-px w-10 bg-accent" /> Where we show up
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="max-w-xl font-display text-4xl font-bold tracking-tight text-balance md:text-6xl">
                One team, every kind of night.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              From a single keynote stage to a 120,000-capacity festival —
              the same crew, the same standard.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7 lg:auto-rows-[200px]">
          {EVENTS.map((event, i) => (
            <Reveal key={event.label} delay={(i % 4) * 0.05} className={event.span}>
              <div className="group relative h-full min-h-[220px] overflow-hidden rounded-2xl shadow-sm">
                <img
                  src={event.image}
                  alt={event.label}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/45 transition-colors duration-500 group-hover:bg-black/55" />

                <span className="absolute right-4 top-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-all group-hover:bg-accent group-hover:text-accent-foreground">
                  <ArrowUpRight className="h-4 w-4" />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <h3 className={`font-display font-semibold tracking-tight text-balance text-white ${event.large ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>
                    {event.label}
                  </h3>
                  {event.desc && (
                    <p className="mt-2 max-w-xs text-pretty text-sm leading-relaxed text-white/70">
                      {event.desc}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
