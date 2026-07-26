import { CTA } from '@/components/cta'
import { Hero } from '@/components/hero'
import { Intro } from '@/components/intro'
import { Marquee } from '@/components/marquee'
import { Scale } from '@/components/scale'
import { Services } from '@/components/services'
import { Showcase } from '@/components/showcase'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { SmoothScroll } from '@/components/smooth-scroll'

export default function Page() {
  return (
    <main className="relative bg-background">
      <SmoothScroll />
      <SiteNav />
      <Hero />
      <Marquee />
      <Intro />
      <Services />
      <Showcase />
      <Scale />
      <CTA />
      <SiteFooter />
    </main>
  )
}
