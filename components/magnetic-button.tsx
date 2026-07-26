'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

export function MagneticButton({
  children,
  className,
  variant = 'solid',
  onClick,
  as = 'button',
  href,
}: {
  children: ReactNode
  className?: string
  variant?: 'solid' | 'outline'
  onClick?: () => void
  as?: 'button' | 'a'
  href?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18 })
  const sy = useSpring(y, { stiffness: 260, damping: 18 })

  function handleMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * 0.35)
    y.set(relY * 0.35)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  const base = cn(
    'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-sm font-medium tracking-wide transition-colors',
    variant === 'solid'
      ? 'bg-primary text-primary-foreground'
      : 'border border-white/20 text-foreground hover:border-white/40',
    className,
  )

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'solid' && (
        <span className="absolute inset-0 z-0 translate-y-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
      )}
      {variant === 'outline' && (
        <span className="absolute inset-0 z-0 scale-x-0 bg-white/5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" style={{ transformOrigin: 'left' }} />
      )}
    </>
  )

  const MotionTag = as === 'a' ? motion.a : motion.button

  return (
    <MotionTag
      // @ts-expect-error ref typing across a/button
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={base}
    >
      {inner}
    </MotionTag>
  )
}
