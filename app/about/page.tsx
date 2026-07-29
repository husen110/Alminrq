import { CTA } from '@/components/cta'
import { PageShell } from '@/components/page-shell'
import { Reveal } from '@/components/reveal'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Studio — MINARQ',
  description:
    'MINARQ is a premium event-technology studio engineering LED, sound, light and stagecraft into one seamless world for the most ambitious productions.',
}

const STATS = [
  { value: '400+', label: 'Productions delivered' },
  { value: '38', label: 'Countries operated in' },
  { value: '14', label: 'Disciplines in-house' },
  { value: '24/7', label: 'Show-day crew coverage' },
]

const PRINCIPLES = [
  {
    n: '01',
    title: 'One team, one signal chain',
    body: 'LED, audio, lighting and control are engineered by a single studio — no finger-pointing between vendors when the room goes dark.',
  },
  {
    n: '02',
    title: 'Engineered before it is beautiful',
    body: 'Every pixel map, power plan and rigging load is calculated and redundant. Spectacle is the by-product of engineering, not the shortcut around it.',
  },
  {
    n: '03',
    title: 'The technology disappears',
    body: 'When the show starts, no one should see cables, screens or speakers. They should only feel the moment we built for them.',
  },
]

const TIMELINE = [
  {
    year: '2011',
    title: 'A single LED wall',
    body: 'MINARQ starts as a two-person rental shop with one high-resolution wall and a stubborn belief that pixels should never fail on show day.',
  },
  {
    year: '2015',
    title: 'One signal chain',
    body: 'Audio and lighting come in-house. For the first time a single team owns the full path — from content server to the last speaker.',
  },
  {
    year: '2019',
    title: 'Across borders',
    body: 'Touring productions take the studio into 20+ countries, hardening a logistics and redundancy playbook that still runs today.',
  },
  {
    year: '2023',
    title: 'The immersive era',
    body: 'Projection mapping, kinetic rigging and real-time media join the arsenal — fourteen disciplines engineered as one world.',
  },
  {
    year: 'Today',
    title: '400+ productions on',
    body: 'A permanent expert crew delivering the most ambitious live moments on the planet, with the same obsession we started with.',
  },
]

const PROCESS = [
  {
    n: '01',
    title: 'Design',
    body: 'We map the room, the story and the emotion before a single fixture is specified.',
  },
  {
    n: '02',
    title: 'Engineer',
    body: 'Pixel maps, power plans and rigging loads — calculated, redundant and signed off.',
  },
  {
    n: '03',
    title: 'Integrate',
    body: 'LED, sound, light and control are built and tested as one system, not four vendors.',
  },
  {
    n: '04',
    title: 'Operate',
    body: 'Our crew runs the show live, on-site, with 24/7 coverage until the last guest leaves.',
  },
]

const TEAM = [
  { name: 'Directorial lead', role: 'Technical Direction' },
  { name: 'Systems engineer', role: 'Signal & Power' },
  { name: 'LED specialist', role: 'Display Integration' },
  { name: 'Audio lead', role: 'Line Array & FOH' },
  { name: 'Lighting designer', role: 'Programming' },
  { name: 'Show caller', role: 'Live Operations' },
]

export default function AboutPage() {
  return (
    <PageShell>
      {/* Header */}
      <section className="relative border-b border-border px-5 pb-24 pt-40 md:pb-32 md:pt-52">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
              <span className="h-px w-10 bg-accent" /> The studio
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-7xl">
              We are the engineers behind the moments people never forget.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              MINARQ is a premium event-technology studio. We design, integrate
              and operate immersive LED, precision sound and architectural light
              as one seamless world — engineered down to the last pixel.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border px-5 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div>
                <p className="font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                  {s.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Philosophy + image */}
      <section className="px-5 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-border">
              <img
                src="/portrait-director.png"
                alt="MINARQ technical director on a production site"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <span className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
                <span className="h-px w-10 bg-accent" /> How we work
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="max-w-lg font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
                Every pixel. Every frequency. Every second — accounted for.
              </h2>
            </Reveal>
            <div className="mt-10 flex flex-col gap-8">
              {PRINCIPLES.map((p, i) => (
                <Reveal key={p.n} delay={0.05 + i * 0.05}>
                  <div className="flex gap-5 border-t border-border pt-6">
                    <span className="font-mono text-xs text-accent">{p.n}</span>
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-tight">
                        {p.title}
                      </h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-border px-5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
              <span className="h-px w-10 bg-accent" /> The story
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
              Fourteen years of getting the impossible on stage.
            </h2>
          </Reveal>
          <div className="mt-16 flex flex-col">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.05}>
                <div className="grid gap-4 border-t border-border py-8 md:grid-cols-[160px_1fr] md:gap-10">
                  <p className="font-display text-2xl font-bold tracking-tight text-accent md:text-3xl">
                    {t.year}
                  </p>
                  <div className="max-w-2xl">
                    <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                      {t.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {t.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-border px-5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
              <span className="h-px w-10 bg-accent" /> The method
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
              One team, four stages, zero hand-offs.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.05}>
                <div className="flex h-full flex-col gap-6 bg-background p-8 transition-colors hover:bg-muted/40">
                  <span className="font-mono text-xs text-accent">{p.n}</span>
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-t border-border px-5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
              <span className="h-px w-10 bg-accent" /> The team
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
              Specialists who have already done it before.
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3">
            {TEAM.map((m, i) => (
              <Reveal key={m.role} delay={i * 0.05}>
                <div className="group">
                  <div className="overflow-hidden rounded-2xl border border-border">
                    <img
                      src="/placeholder-user.jpg"
                      alt={`MINARQ ${m.role}`}
                      className="aspect-[4/5] w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                    {m.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {m.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section id="careers" className="border-t border-border px-5 py-24 md:py-32">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <span className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
                <span className="h-px w-10 bg-accent" /> Careers
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
                Build the impossible with people who have done it before.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              See open roles
            </a>
          </Reveal>
        </div>
      </section>

      {/* Press */}
      <section id="press" className="border-t border-border px-5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
              <span className="h-px w-10 bg-accent" /> Press
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              For media enquiries, brand assets and interviews, reach the studio
              at{' '}
              <a href="mailto:press@minarq.com" className="text-foreground underline underline-offset-4 hover:text-accent">
                press@minarq.com
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <CTA />
    </PageShell>
  )
}
