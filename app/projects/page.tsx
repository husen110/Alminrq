import { CTA } from '@/components/cta'
import { PageShell } from '@/components/page-shell'
import { ProjectCard } from '@/components/project-card'
import { Reveal } from '@/components/reveal'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Selected Work — MINARQ',
  description:
    'A selection of concerts, keynotes, galas and launches engineered by MINARQ — immersive LED, precision sound and architectural light at cultural scale.',
}

type Project = {
  number: string
  title: string
  location: string
  year: string
  image: string
  meta: string
}

const PROJECTS: Project[] = [
  { number: '01', title: 'The Infinite Reveal', location: 'Berlin · Germany', year: '2025', image: '/project-keynote.png', meta: '18K panoramic LED · 4K broadcast · Spatial audio' },
  { number: '02', title: 'Nocturne', location: 'Milan · Italy', year: '2025', image: '/project-gala.png', meta: 'Transparent LED · Kinetic sculpture · Projection' },
  { number: '03', title: 'Electric Horizon', location: 'Barcelona · Spain', year: '2024', image: '/project-festival.png', meta: '42m stage · 680 fixtures · 120,000 guests' },
  { number: '04', title: 'State of the Nation', location: 'Dubai · UAE', year: '2024', image: '/project-summit.png', meta: 'Curved LED · Media servers · Global stream' },
  { number: '05', title: 'Signature Live', location: 'London · UK', year: '2024', image: '/minarq-concert-stage.png', meta: 'Modular LED · Line array · FOH mix' },
  { number: '06', title: 'Vows in Light', location: 'Como · Italy', year: '2023', image: '/hero-wedding-production.png', meta: 'Scenic LED · Concealed audio · Decorative light' },
]

export default function ProjectsPage() {
  return (
    <PageShell>
      {/* Header */}
      <section className="border-b border-border px-5 pb-20 pt-40 md:pb-28 md:pt-52">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
              <span className="h-px w-10 bg-accent" /> Selected work
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-7xl">
              Moments designed to outlive the night.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              A selection of environments engineered for cultural impact —
              across concerts, keynotes, galas and launches on every continent.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="px-5 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.number} delay={(i % 2) * 0.06}>
              <ProjectCard {...p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Editorial pull-quote */}
      <section className="border-t border-border px-5 py-28 md:py-40">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <span className="mb-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
              <span className="h-px w-10 bg-accent" /> In their words
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <blockquote className="font-display text-3xl font-bold leading-[1.15] tracking-tight text-balance sm:text-4xl md:text-6xl">
              &ldquo;They didn&rsquo;t light a stage. They built a world our
              audience is still talking about.&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Executive Producer · Global Product Launch
            </p>
          </Reveal>
        </div>
      </section>

      <CTA />
    </PageShell>
  )
}
