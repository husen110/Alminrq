'use client'

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const
const HEADLINE = "We Don't Display Content. We Create Worlds."

// Real activations, cycled after the showreel ends — each a distinct color
// world, echoing the "We Create Worlds" line rather than looping the video.
const SHOWCASE_IMAGES = [
  '/dan-taylor-fT3RcZtiDYQ-unsplash.jpg',
  '/duane-loux-6Qk8LTt4u70-unsplash.jpg',
  '/william-hook-z0eto_lw72M-unsplash.jpg',
  '/carlos-gil-u7PnSXyhbeg-unsplash.jpg',
  '/dominic-kurniawan-suryaputra-Zkcgfn599U8-unsplash.jpg',
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const [introDone, setIntroDone] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.14])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '55%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.62], [1, 0])

  useEffect(() => {
    if (!introDone) return
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % SHOWCASE_IMAGES.length)
    }, 4500)
    return () => clearInterval(id)
  }, [introDone])

  return (
    <section id="top" ref={ref} className="relative h-[100svh] w-full overflow-hidden">
      <motion.div style={{ y: imgY, scale: imgScale }} className="gpu absolute inset-0 bg-black">
        <video
          className="absolute inset-0 h-full w-full object-contain transition-opacity duration-1000 ease-out sm:object-cover"
          style={{ opacity: introDone ? 0 : 1 }}
          src="/hero-cinematic.mp4"
          poster="/laser-mapping.png"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={() => setIntroDone(true)}
          aria-label="MINARQ cinematic showreel"
        />

        <AnimatePresence>
          {introDone && (
            <motion.img
              key={SHOWCASE_IMAGES[slideIndex]}
              src={SHOWCASE_IMAGES[slideIndex]}
              alt="MINARQ event production showcase"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: EASE }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </AnimatePresence>

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
