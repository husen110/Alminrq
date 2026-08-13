import { PageShell } from '@/components/page-shell'
import { Reveal } from '@/components/reveal'
import { Mail, MapPin, Phone } from 'lucide-react'
import type { Metadata } from 'next'
import { ContactForm } from './contact-form'

export const metadata: Metadata = {
  title: 'Request a Proposal — MINARQ',
  description:
    'Tell MINARQ about your event. Our production engineers design a technical vision within 48 hours.',
}

const DETAILS = [
  { icon: Mail, label: 'Email', value: 'studio@minarq.com', href: 'mailto:studio@minarq.com' },
  { icon: Phone, label: 'Phone', value: '+1 (000) 000-0000', href: 'tel:+10000000000' },
  { icon: MapPin, label: 'Studios', value: 'London · Dubai · Singapore', href: null },
]

export default function ContactPage() {
  return (
    <PageShell>
      <section className="px-5 pb-24 pt-40 md:pb-32 md:pt-52">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* Left — statement + details */}
          <div>
            <Reveal>
              <span className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
                <span className="h-px w-10 bg-accent" /> Request proposal
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="max-w-lg font-display text-4xl font-bold leading-[1.02] tracking-tight text-balance sm:text-5xl md:text-6xl">
                Let&apos;s build something the world remembers.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
                Tell us about your event. Our production engineers will design a
                technical vision — LED, sound, light and control as one — within
                48 hours.
              </p>
            </Reveal>

            <div className="mt-12 flex flex-col gap-6">
              {DETAILS.map((d, i) => (
                <Reveal key={d.label} delay={0.1 + i * 0.05}>
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground/10 text-accent">
                      <d.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{d.label}</p>
                      {d.href ? (
                        <a href={d.href} className="text-sm text-foreground transition-colors hover:text-accent">
                          {d.value}
                        </a>
                      ) : (
                        <p className="text-sm text-foreground">{d.value}</p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <Reveal delay={0.15}>
            <div className="glass rounded-2xl p-6 md:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
