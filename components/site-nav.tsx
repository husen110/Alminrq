'use client'

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Studio', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between px-5 py-5 transition-colors duration-500 md:px-8',
          scrolled ? 'bg-background border-b border-border' : 'bg-transparent',
        )}
      >
        <a href="/" className="flex items-center gap-2">
          <span className={cn('font-display text-lg font-bold tracking-[0.2em] transition-colors duration-500', scrolled ? 'text-foreground' : 'text-white')}>
            MINARQ
          </span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                'group relative text-sm transition-colors',
                scrolled ? 'text-muted-foreground hover:text-foreground' : 'text-white/70 hover:text-white',
              )}
            >
              {l.label}
              <span className={cn('absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full', scrolled ? 'bg-foreground' : 'bg-white')} />
            </a>
          ))}
        </div>

        <a
          href="/contact"
          className={cn(
            'hidden rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 active:scale-[0.97] active:duration-100 md:inline-block',
            scrolled ? 'border-primary bg-primary text-primary-foreground hover:bg-accent hover:border-accent' : 'border-white text-white hover:bg-white hover:text-black',
          )}
        >
          Request Proposal
        </a>

        <button
          onClick={() => setOpen((o) => !o)}
          className={cn('flex h-9 w-9 items-center justify-center transition-transform active:scale-[0.9] active:duration-100 md:hidden', scrolled ? 'text-foreground' : 'text-white')}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-b border-border bg-background p-5 md:hidden"
          >
            <div className="flex flex-col">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
            </div>
            <a
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-5 block rounded-full border border-primary bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground transition-transform active:scale-[0.97] active:duration-100"
            >
              Request Proposal
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
