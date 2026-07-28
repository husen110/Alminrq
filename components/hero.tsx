'use client'

import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, RotateCcw, Volume2, VolumeX } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { MagneticButton } from './magnetic-button'

const EASE = [0.16, 1, 0.3, 1] as const
const LINES = ["We don't build events.", 'We build experiences.']
const SLIDE_DURATION = 5200

type Slide = {
  id: string
  event: string
  focus: string
  image: string
  alt: string
  origin: string
  drift: { x: [string, string]; y: [string, string] }
}

// The supplied concert-stage image opens the slideshow; the rest showcase
// full production systems (LED, speakers, amplifiers, mixers, lighting, decor).
const SLIDES: Slide[] = [
  {
    id: 'concert-signature',
    event: 'Concerts & Live Tours',
    focus: 'Performer focus · Modular LED · Line array · FOH mix',
    image: '/minarq-concert-stage.png',
    alt: 'Concert stage with curved LED walls, suspended line-array speakers and white light beams',
    origin: '55% 45%',
    drift: { x: ['0%', '-3%'], y: ['0%', '2%'] },
  },
  {
    id: 'corporate',
    event: 'Corporate & Keynotes',
    focus: 'Speaker focus · Panoramic LED · Amplified sound · Lighting control',
    image: '/hero-corporate-production.png',
    alt: 'Corporate keynote stage with a panoramic LED wall, line-array speakers and a front-of-house mixing desk',
    origin: '50% 50%',
    drift: { x: ['0%', '3%'], y: ['0%', '-2%'] },
  },
  {
    id: 'wedding',
    event: 'Weddings & Celebrations',
    focus: 'Couple focus · Scenic LED · Concealed audio · Decorative light',
    image: '/hero-wedding-production.png',
    alt: 'Luxury wedding stage with a curved LED screen, warm intelligent lighting and floral decor',
    origin: '50% 42%',
    drift: { x: ['0%', '-3%'], y: ['0%', '-2%'] },
  },
  {
    id: 'launch',
    event: 'Launches & Exhibitions',
    focus: 'Presenter focus · Transparent LED · Distributed sound · Set design',
    image: '/hero-launch-production.png',
    alt: 'Product launch stage with transparent LED columns, presenter lighting and mixing equipment',
    origin: '52% 48%',
    drift: { x: ['0%', '3%'], y: ['0%', '2%'] },
  },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [showSlides, setShowSlides] = useState(false)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  const pointerX = useMotionValue(50)
  const pointerY = useMotionValue(45)
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 24 })
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 24 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.14])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '55%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.62], [1, 0])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const goTo = useCallback((index: number) => {
    setActive((index + SLIDES.length) % SLIDES.length)
  }, [])

  // Auto-advance the slideshow once the opening film has finished.
  useEffect(() => {
    if (!showSlides || paused) return
    const id = window.setTimeout(() => goTo(active + 1), SLIDE_DURATION)
    return () => window.clearTimeout(id)
  }, [showSlides, paused, active, goTo])

  const replayFilm = () => {
    setShowSlides(false)
    setActive(0)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      void videoRef.current.play()
    }
  }

  const toggleSound = () => {
    const next = !isMuted
    setIsMuted(next)
    if (videoRef.current) {
      videoRef.current.muted = next
      void videoRef.current.play()
    }
  }

  const slide = SLIDES[active]

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
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
        />

        {/* Event slideshow — crossfades in after the opening film ends. */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence>
            {showSlides && (
              <motion.img
                key={slide.id}
                src={slide.image}
                alt={slide.alt}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  scale: reduceMotion ? 1 : 1.12,
                  x: reduceMotion ? '0%' : slide.drift.x,
                  y: reduceMotion ? '0%' : slide.drift.y,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 1.3, ease: EASE },
                  scale: { duration: SLIDE_DURATION / 1000 + 1.4, ease: 'linear' },
                  x: { duration: SLIDE_DURATION / 1000 + 1.4, ease: 'linear' },
                  y: { duration: SLIDE_DURATION / 1000 + 1.4, ease: 'linear' },
                }}
                style={{ transformOrigin: slide.origin }}
                className="absolute inset-0 h-full w-full object-cover contrast-[1.12] brightness-105 saturate-[1.08]"
              />
            )}
          </AnimatePresence>
        </div>

        <motion.video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/Concert_stage_with_MINARQ_logo_202607280951.mp4"
          poster="/hero-stage.png"
          autoPlay
          muted={isMuted}
          playsInline
          preload="metadata"
          onEnded={() => setShowSlides(true)}
          animate={{ opacity: showSlides ? 0 : 1 }}
          transition={{ duration: 1.2, ease: EASE }}
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

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-28 md:justify-center md:pb-0"
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
          animate={{ opacity: showSlides ? 0 : 1, y: showSlides ? 12 : 0 }}
          transition={{ duration: showSlides ? 0.55 : 1, ease: EASE, delay: showSlides ? 0 : 0.95 }}
          className="mt-7 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          aria-hidden={showSlides}
        >
          Immersive LED, precision sound and architectural light — engineered as one seamless world, down to the last pixel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showSlides ? 0 : 1, y: showSlides ? 12 : 0 }}
          transition={{ duration: showSlides ? 0.55 : 1, ease: EASE, delay: showSlides ? 0 : 1.08 }}
          className={`mt-9 flex flex-wrap items-center gap-4 ${showSlides ? 'pointer-events-none' : ''}`}
          aria-hidden={showSlides}
        >
          <MagneticButton as="a" href="#services">Explore experiences <ArrowRight className="h-4 w-4" /></MagneticButton>
          <MagneticButton as="a" href="#contact" variant="outline">Request proposal <ArrowUpRight className="h-4 w-4" /></MagneticButton>
        </motion.div>
      </motion.div>

      {/* Slide caption — describes the integrated systems for each event type. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-24 z-10 mx-auto max-w-6xl px-5 md:bottom-10">
        <AnimatePresence mode="wait">
          {showSlides && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex flex-col gap-1"
            >
              <span className="font-display text-lg font-semibold text-foreground md:text-2xl">{slide.event}</span>
              <span className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground md:text-xs">{slide.focus}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Slider controls */}
      <AnimatePresence>
        {showSlides && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.6, ease: EASE }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="absolute inset-x-0 bottom-6 z-20 mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 md:bottom-24"
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => { setPaused(true); goTo(active - 1) }}
                className="glass flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground hover:text-background"
                aria-label="Previous event"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => { setPaused(true); goTo(active + 1) }}
                className="glass flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground hover:text-background"
                aria-label="Next event"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="hidden items-center gap-2 sm:flex" role="tablist" aria-label="Event types">
              {SLIDES.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  aria-label={item.event}
                  onClick={() => { setPaused(true); goTo(index) }}
                  className="group relative h-1.5 overflow-hidden rounded-full bg-foreground/20 transition-all"
                  style={{ width: index === active ? 44 : 18 }}
                >
                  {index === active && !paused && !reduceMotion && (
                    <motion.span
                      key={`${item.id}-${active}`}
                      className="absolute inset-y-0 left-0 bg-accent"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                    />
                  )}
                  {index === active && (paused || reduceMotion) && (
                    <span className="absolute inset-0 bg-accent" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 right-5 z-20 flex items-center gap-2 md:bottom-8 md:right-8">
        {showSlides && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={replayFilm}
            className="glass flex items-center gap-2 rounded-full px-4 py-3 text-xs uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-foreground hover:text-background"
            aria-label="Replay opening film"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">Replay film</span>
          </motion.button>
        )}
        {!showSlides && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.35, duration: 0.8 }}
            onClick={toggleSound}
            className="glass flex items-center gap-2 rounded-full px-4 py-3 text-xs uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-foreground hover:text-background"
            aria-label={isMuted ? 'Play hero video with sound' : 'Mute hero video'}
            aria-pressed={!isMuted}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            <span className="hidden sm:inline">{isMuted ? 'Sound on' : 'Sound off'}</span>
          </motion.button>
        )}
      </div>
    </section>
  )
}
