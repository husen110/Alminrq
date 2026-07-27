'use client'

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const LINKS = [
  { label: 'Experiences', href: '#services' },
  { label: 'Configure', href: '#configure' },
  { label: 'Projects', href: '#projects' },
  { label: 'Studio', href: '#studio' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={cn(
          'flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500',
          scrolled ? 'glass' : 'bg-transparent',
        )}
      >
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/20">
            <span className="h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-display text-lg font-bold tracking-[0.2em]">MINARQ</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 md:inline-block"
        >
          Request Proposal
        </a>

        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass absolute inset-x-4 top-20 flex flex-col gap-1 rounded-3xl p-4 md:hidden"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-xl bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground"
            >
              Request Proposal
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
