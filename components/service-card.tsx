'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { MouseEvent } from 'react'

type ServiceCardProps = {
  index: string
  title: string
  desc: string
  image: string
  delay: number
}

// Mouse-tracked 3D tilt + a cursor-following light sweep — turns a flat photo
// grid into something that feels like physical hardware catching a beam.
// Grayscale-to-color on hover cues "inactive gear" powering on.
export function ServiceCard({ index, title, desc, image, delay }: ServiceCardProps) {
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.5 })
  const rotateX = useTransform(springY, [0, 1], [9, -9])
  const rotateY = useTransform(springX, [0, 1], [-9, 9])
  const glow = useTransform([mouseX, mouseY], (v) => {
    const [x, y] = v as number[]
    return `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.35), transparent 45%)`
  })

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }
  function handleMouseLeave() {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 900 }}
      className="shrink-0 snap-start"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className="group relative aspect-[4/5] w-[240px] overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-2xl sm:w-[280px]"
      >
        <img
          src={image || '/placeholder.svg'}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-full w-full scale-[1.02] object-cover grayscale transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:grayscale-0"
        />

        <motion.div
          aria-hidden
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 from-15% via-black/35 via-50% to-transparent" />

        <span
          aria-hidden
          className="pointer-events-none absolute -right-3 -top-6 select-none font-display text-[6rem] font-black leading-none text-white/10 transition-colors duration-500 group-hover:text-accent/25"
        >
          {index}
        </span>

        <span className="absolute left-5 top-5 font-mono text-xs text-white/60">{index}</span>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-lg font-semibold leading-tight tracking-tight text-white sm:text-xl">
            {title}
          </h3>
          <p className="mt-2 line-clamp-2 text-pretty text-xs leading-relaxed text-white/75 sm:text-sm">
            {desc}
          </p>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 transition-colors duration-300 group-hover:ring-accent/40" />
      </motion.div>
    </motion.div>
  )
}
