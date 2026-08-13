'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const
const HEADLINE = "We Don't Display Content. We Create Worlds."

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const [introDone, setIntroDone] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.14])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '55%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.62], [1, 0])

  return (
    <section id="top" ref={ref} className="relative h-[100svh] w-full overflow-hidden">
      <motion.div style={{ y: imgY, scale: imgScale }} className="gpu absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero-cinematic.mp4"
          poster="/laser-mapping.png"
          autoPlay
          loop={introDone}
          muted
          playsInline
          preload="auto"
          onEnded={(e) => {
            setIntroDone(true)
            const v = e.currentTarget
            v.loop = true
            void v.play()
          }}
          aria-label="MINARQ cinematic showreel"
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-16 md:pb-20"
      >
        <h1
          className="max-w-2xl overflow-hidden font-sans font-bold leading-tight tracking-tight text-balance text-white text-[clamp(1.75rem,1.2rem+2.2vw,3rem)]"
          aria-hidden={!introDone}
        >
          <motion.span
            className="block"
            initial={{ y: '115%' }}
            animate={introDone ? { y: 0 } : { y: '115%' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {HEADLINE}
          </motion.span>
        </h1>
      </motion.div>
    </section>
  )
}
