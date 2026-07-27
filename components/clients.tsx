'use client'

import { motion } from 'framer-motion'
import { Reveal } from './reveal'

const CLIENTS = ['Porsche', 'Samsung', 'Cartier', 'Spotify', 'Nike', 'Adobe', 'Rolex', 'Mercedes-Benz']

export function Clients() {
  return (
    <section className="overflow-hidden border-y border-border py-20">
      <div className="mx-auto mb-12 max-w-6xl px-5 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Trusted behind the curtain</p>
        </Reveal>
      </div>
      <div className="relative flex overflow-hidden">
        <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <motion.div
          className="flex min-w-max items-center gap-16 pr-16 md:gap-24 md:pr-24"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          {[...CLIENTS, ...CLIENTS].map((client, index) => (
            <span key={`${client}-${index}`} className="font-display text-2xl font-semibold tracking-tight text-foreground/35 transition-colors hover:text-foreground/80 md:text-3xl">
              {client}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
