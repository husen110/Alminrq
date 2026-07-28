'use client'

import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Volume2, VolumeX } from 'lucide-react'
import { useRef, useState } from 'react'
import { MagneticButton } from './magnetic-button'

const EASE = [0.16, 1, 0.3, 1] as const
const LINES = ["We don't build events.", 'We build experiences.']

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const pointerX = useMotionValue(50)
  const pointerY = useMotionValue(45)
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 24 })
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 24 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.14])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '55%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.62], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        pointerX.set(((event.clientX - rect.left) / rect.width) * 100)
        pointerY.set(((event.clientY - rect.top) / rect.height) * 100)
      }}
      className="relative h-[100svh] w-full overflow-hidden"
    >
      <motion.div style={{ y: imgY, scale: imgScale }} className="gpu absolute inset-0">
        <img
          src="/hero-stage.png"
          alt="A vast premium event stage at night with curved LED walls emerging from darkness"
          className="h-full w-full object-cover"
        />
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/Concert_stage_with_MINARQ_logo_202607280951.mp4"
          poster="/hero-stage.png"
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          aria-label="MINARQ concert stage production showreel"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/20 to-transparent" />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] hidden opacity-70 md:block"
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]) => `radial-gradient(circle 26rem at ${x}% ${y}%, oklch(0.72 0.12 215 / 0.14), transparent 70%)`,
          ),
        }}
      />
      <div className="grain pointer-events-none absolute inset-0 z-[2] opacity-[0.1] mix-blend-overlay" />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
        {[12, 29, 47, 68, 86].map((left, index) => (
          <motion.span
            key={left}
            className="absolute h-1 w-1 rounded-full bg-foreground/60"
            style={{ left: `${left}%`, top: `${24 + index * 11}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.15, 0.8, 0.15] }}
            transition={{ duration: 4 + index, repeat: Infinity, delay: index * 0.7 }}
          />
        ))}
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-16 md:justify-center md:pb-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.35 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-accent" />
          <span className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Premium event technology</span>
        </motion.div>

        <h1 className="max-w-5xl font-display text-5xl font-bold leading-[0.92] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-[6.6rem]">
          {LINES.map((line, index) => (
            <span key={line} className="block overflow-hidden pb-2">
              <motion.span
                className={index === 1 ? 'block text-foreground' : 'block text-foreground/62'}
                initial={{ y: '115%', rotate: 1 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ duration: 1.15, ease: EASE, delay: 0.48 + index * 0.14 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.95 }}
          className="mt-7 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Immersive LED, precision sound and architectural light — engineered as one seamless world, down to the last pixel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.08 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <MagneticButton as="a" href="#services">Explore experiences <ArrowRight className="h-4 w-4" /></MagneticButton>
          <MagneticButton as="a" href="#contact" variant="outline">Request proposal <ArrowUpRight className="h-4 w-4" /></MagneticButton>
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.35, duration: 0.8 }}
        onClick={() => {
          const nextMuted = !isMuted
          setIsMuted(nextMuted)
          if (videoRef.current) {
            videoRef.current.muted = nextMuted
            void videoRef.current.play()
          }
        }}
        className="glass absolute bottom-7 right-5 z-20 flex items-center gap-2 rounded-full px-4 py-3 text-xs uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-foreground hover:text-background md:bottom-8 md:right-8"
        aria-label={isMuted ? 'Play hero video with sound' : 'Mute hero video'}
        aria-pressed={!isMuted}
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        <span className="hidden sm:inline">{isMuted ? 'Sound on' : 'Sound off'}</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Enter the experience</span>
        <span className="relative h-10 w-px overflow-hidden bg-foreground/15">
          <motion.span className="absolute inset-x-0 top-0 h-4 bg-accent" animate={{ y: [-16, 40] }} transition={{ repeat: Infinity, duration: 1.8 }} />
        </span>
      </motion.div>
    </section>
  )
}
