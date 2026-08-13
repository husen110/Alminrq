'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function Showcase() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.25, 1.08, 1.25])
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const overlay = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.35, 0.55, 0.55, 0.35])

  const textOpacity = useTransform(scrollYProgress, [0.1, 0.32, 0.7, 0.92], [0, 1, 1, 0])
  const textScale = useTransform(scrollYProgress, [0.1, 0.4, 1], [1.35, 1, 0.88])
  const textBlur = useTransform(scrollYProgress, [0.1, 0.32, 0.7, 0.92], [10, 0, 0, 10])
  const textFilter = useTransform(textBlur, (v) => `blur(${v}px)`)

  return (
    <section ref={ref} className="relative h-[220svh] w-full">
      <div id="showcase" className="sticky top-0 h-svh w-full overflow-hidden">
        <motion.div style={{ scale: imageScale, y: imageY }} className="absolute inset-0">
          <img
            src="/event-production.png"
            alt="A massive world-class event production with an enormous LED stage over a huge crowd"
            className="h-full w-full object-cover"
          />
        </motion.div>
        <motion.div style={{ opacity: overlay }} className="absolute inset-0 bg-black" />

        <div className="relative flex h-full w-full items-center justify-center px-6">
          <motion.h2
            style={{ opacity: textOpacity, scale: textScale, filter: textFilter }}
            className="max-w-4xl text-balance text-center font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white [text-shadow:0_4px_40px_rgb(0_0_0_/_0.5)] sm:text-5xl md:text-7xl"
          >
            Where the impossible becomes unforgettable.
          </motion.h2>
        </div>
      </div>
    </section>
  )
}
