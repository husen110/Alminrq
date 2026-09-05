import { CTA } from '@/components/cta'
import { PageShell } from '@/components/page-shell'
import { Reveal } from '@/components/reveal'
import { EVENTS, getEventBySlug } from '@/lib/events-data'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const event = getEventBySlug(slug)
  if (!event) return {}
  return {
    title: `${event.label} — MINARQ`,
    description: event.desc || `${event.label} — premium event technology by MINARQ.`,
  }
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = getEventBySlug(slug)
  if (!event) notFound()

  return (
    <PageShell>
      <section className="px-5 pb-16 pt-40 md:pb-20 md:pt-52">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <a
              href="/#services"
              className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Where we show up
            </a>
          </Reveal>
          <Reveal delay={0.05}>
            <span className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
              <span className="h-px w-10 bg-accent" /> Experiences
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-7xl">
              {event.label}
            </h1>
          </Reveal>
          {event.desc && (
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                {event.desc}
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className="border-t border-border px-5 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2">
          {event.gallery.map((src, i) => (
            <Reveal key={src} delay={(i % 4) * 0.05} className={i === 0 ? 'sm:col-span-2' : ''}>
              <div
                className={`overflow-hidden rounded-2xl ${
                  i === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={src}
                  alt={`${event.label} — photo ${i + 1}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA />
    </PageShell>
  )
}
