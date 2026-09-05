'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Reveal } from './reveal'
import { ServiceCard } from './service-card'

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
  { index: '06', title: 'Line Array Speakers', desc: 'Concert-grade line arrays tuned for absolute clarity at any scale.', image: '/jonathan-phillips-QZUHZCoNFJw-unsplash.jpg' },
  { index: '07', title: 'Amplifiers', desc: 'Touring-grade amplification delivering clean, headroom-rich power to every speaker.', image: '/adi-goldstein-vmFzD3NeWGE-unsplash.jpg' },
  { index: '08', title: 'Mixers & Microphones', desc: 'Digital consoles and professional microphones capturing every voice and instrument.', image: '/kane-reinholdtsen-LETdkk7wHQk-unsplash.jpg' },
  { index: '09', title: 'Projection Mapping', desc: 'Turning facades and sculptures into living, projected canvases.', image: '/laser-mapping.png' },
  { index: '10', title: 'Broadcast & Streaming', desc: 'Multi-camera capture and live delivery to millions worldwide.', image: '/paul-einerhand-elp3BDAWHlQ-unsplash.jpg' },
  { index: '11', title: 'Power & Distribution', desc: 'Redundant, silent power infrastructure engineered for zero downtime.', image: '/line-array-audio.png' },
  { index: '12', title: 'Show Control', desc: 'A single timeline commanding light, sound, video and motion as one.', image: '/markus-spiske-UCbMZ0S-w28-unsplash.jpg' },
  { index: '13', title: 'On-site Crew', desc: 'Elite technicians who design, install and operate every production.', image: '/riley-bartel-hUGe9ROdugQ-unsplash.jpg' },
  { index: '14', title: 'Analog Mixing Consoles', desc: 'Warm, hands-on analog channels for engineers who mix by feel.', image: '/jonathan-farber-9ySl8JnvZMQ-unsplash.jpg' },
  { index: '15', title: 'Digital FOH Consoles', desc: 'Networked front-of-house desks with total scene recall.', image: '/adrien-delforge-lttzwXdUr38-unsplash.jpg' },
  { index: '16', title: 'Multi-channel Fader Banks', desc: 'Dozens of channels, one fingertip away from perfect balance.', image: '/rima-kruciene-gpKe3hmIawg-unsplash.jpg' },
  { index: '17', title: 'Live Sound Processing', desc: 'Real-time EQ, compression and routing tuned to the room.', image: '/denis-cardoso-qSnKHlzJn6c-unsplash.jpg' },
  { index: '18', title: 'Studio Recording Consoles', desc: 'Broadcast-grade desks for sessions that demand precision.', image: '/caught-in-joy-KhBjIa04XuA-unsplash.jpg' },
  { index: '19', title: 'Signal Metering & Monitoring', desc: 'Every channel watched, every peak controlled, nothing left to chance.', image: '/caught-in-joy-llIZXpsK8Hs-unsplash.jpg' },
  { index: '20', title: 'Broadcast Mixing Panels', desc: 'Multi-source control for live-to-air and streamed productions.', image: '/saso-tusar-QtgGYlug6Cw-unsplash.jpg' },
  { index: '21', title: 'Digital Audio Processing', desc: 'Plugin-driven mastering and sidechain shaping for a polished mix.', image: '/phil-hearing-UCrjM4-6Msw-unsplash.jpg' },
  { index: '22', title: 'Wireless Digital Mixing', desc: 'Tablet-controlled consoles that free engineers to walk the room.', image: '/oscar-ivan-esquivel-arteaga-_WQpzTHDAD8-unsplash.jpg' },
  { index: '23', title: 'Studio Monitor Speakers', desc: 'Reference-grade monitoring for a true, uncolored mix.', image: '/sandy-kawadkar-i-FJ4obOoyM-unsplash.jpg' },
  { index: '24', title: 'Powered Monitor Speakers', desc: 'Self-amplified nearfields built for accuracy at any volume.', image: '/josh-sorenson-u8-QI4tRES0-unsplash.jpg' },
  { index: '25', title: 'Stage Vocal Microphones', desc: 'Handheld capsules built to cut through a packed house.', image: '/matthias-wagner-QrqeusbpFMM-unsplash.jpg' },
  { index: '26', title: 'Live Mixing Interfaces', desc: 'Illuminated channel strips built for fast, confident cues.', image: '/james-kovin-F2h_WbKnX4o-unsplash.jpg' },
  { index: '27', title: 'Studio Production Suites', desc: 'Full DAW rigs pairing outboard gear with in-the-box mixing.', image: '/techivation-avhSF7skf7s-unsplash.jpg' },
]

// Circular strip: the list is rendered three times back to back. Whenever the
// scroll position drifts into the first or third copy, we silently snap back
// by exactly one copy's width — since the copies are identical, the jump is
// invisible and scrolling feels endless in both directions.
export function Services() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.scrollLeft = track.scrollWidth / 3
  }, [])

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    const setWidth = track.scrollWidth / 3
    if (track.scrollLeft < setWidth * 0.5) {
      track.scrollLeft += setWidth
    } else if (track.scrollLeft > setWidth * 1.5) {
      track.scrollLeft -= setWidth
    }
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
            onScroll={handleScroll}
            className="scrollbar-hide flex gap-5 overflow-x-auto px-5 pb-2 md:px-[calc((100vw-var(--container-max))/2+1.25rem)]"
          >
            {[0, 1, 2].flatMap((setIndex) =>
              SERVICES.map((s, i) => (
                <ServiceCard key={`${setIndex}-${s.index}`} {...s} delay={(i % 4) * 0.06} />
              )),
            )}
          </div>

          {/* Edge fades — there's always more in either direction, so both sides hint at it. */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" aria-hidden />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" aria-hidden />
        </div>
      </Reveal>

      <div className="mx-auto mt-8 flex max-w-6xl items-center justify-center gap-3 px-5">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground/10 text-foreground transition-all active:scale-[0.9] active:duration-100 hover:bg-accent hover:text-accent-foreground"
          aria-label="Previous discipline"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground/10 text-foreground transition-all active:scale-[0.9] active:duration-100 hover:bg-accent hover:text-accent-foreground"
          aria-label="Next discipline"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}
