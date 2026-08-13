import { Clients } from '@/components/clients'
import { CTA } from '@/components/cta'
import { EventTypes } from '@/components/event-types'
import { FeaturedProjects } from '@/components/featured-projects'
import { Hero } from '@/components/hero'
import { Intro } from '@/components/intro'
import { Marquee } from '@/components/marquee'
import { Scale } from '@/components/scale'
import { ScrollProgress } from '@/components/scroll-progress'
import { Services } from '@/components/services'
import { Showcase } from '@/components/showcase'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { SmoothScroll } from '@/components/smooth-scroll'
import { Testimonials } from '@/components/testimonials'

export default function Page() {
  return (
    <main className="relative overflow-clip bg-background">
      <SmoothScroll />
      <ScrollProgress />
      <SiteNav />
      <Hero />
      <Marquee />
      <Intro />
      <EventTypes />
      <Services />
      <Showcase />
      <FeaturedProjects />
      <Clients />
      <Scale />
      <Testimonials />
      <CTA />
      <SiteFooter />
    </main>
  )
}
