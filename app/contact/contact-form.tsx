'use client'

import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { MagneticButton } from '@/components/magnetic-button'

const STUDIO_EMAIL = 'studio@minarq.com'

// Owner's WhatsApp in international format, digits only — no +, spaces or dashes.
// +91 87587 83589 -> '918758783589'.
const OWNER_WHATSAPP = '918758783589'

const EVENT_TYPES = [
  'Concert / Live Tour',
  'Corporate / Keynote',
  'Wedding / Celebration',
  'Launch / Exhibition',
  'Other',
]

const BUDGETS = ['Under $50K', '$50K – $150K', '$150K – $500K', '$500K+']

// No backend on this static site — open WhatsApp with the enquiry pre-filled so
// the visitor sends it straight to the studio. Native <input required> validates.
function buildWhatsAppUrl(data: Record<string, string>): string {
  const text = [
    'New project enquiry',
    '',
    `Name: ${data.name}`,
    `Company: ${data.company || '—'}`,
    `Email: ${data.email}`,
    `Event type: ${data.eventType}`,
    `Event date: ${data.eventDate || '—'}`,
    `Budget: ${data.budget || '—'}`,
    '',
    'Brief:',
    data.message || '—',
  ].join('\n')
  return `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(text)}`
}

const fieldClass =
  'w-full rounded-lg border border-foreground/20 bg-foreground/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent'

export function ContactForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    window.open(buildWhatsAppUrl(data), '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Name *</span>
          <input name="name" required autoComplete="name" placeholder="Your name" className={fieldClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Company</span>
          <input name="company" autoComplete="organization" placeholder="Company / brand" className={fieldClass} />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email *</span>
        <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={fieldClass} />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Event type *</span>
          <select name="eventType" required defaultValue="" className={fieldClass}>
            <option value="" disabled>Select…</option>
            {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Event date</span>
          <input name="eventDate" type="date" className={fieldClass} />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Budget</span>
        <select name="budget" defaultValue="" className={fieldClass}>
          <option value="">Prefer not to say</option>
          {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Tell us about the event *</span>
        <textarea name="message" required rows={5} placeholder="Vision, venue, audience size, dates…" className={`${fieldClass} resize-none`} />
      </label>

      <MagneticButton as="button" className="mt-2 self-start">
        Send on WhatsApp
        <ArrowRight className="h-4 w-4" />
      </MagneticButton>

      {sent && (
        <p aria-live="polite" className="text-sm text-accent">
          Opening WhatsApp — tap send to reach us. No WhatsApp? Email{' '}
          <a href={`mailto:${STUDIO_EMAIL}`} className="underline underline-offset-4">{STUDIO_EMAIL}</a>.
        </p>
      )}
    </form>
  )
}
