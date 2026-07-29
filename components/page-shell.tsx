import type { ReactNode } from 'react'
import { ScrollProgress } from './scroll-progress'
import { SiteFooter } from './site-footer'
import { SiteNav } from './site-nav'
import { SmoothScroll } from './smooth-scroll'

// Shared chrome for interior routes (about / projects / contact) so they
// inherit the homepage nav, footer and smooth-scroll without repetition.
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative overflow-clip bg-background">
      <SmoothScroll />
      <ScrollProgress />
      <SiteNav />
      {children}
      <SiteFooter />
    </main>
  )
}
