import type { ReactNode } from 'react'
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
  const base = cn(
    'inline-flex items-center justify-center gap-2 rounded-full border px-8 py-4 text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-foreground/10 active:scale-[0.97] active:duration-100',
    variant === 'solid'
      ? 'border-primary bg-primary text-primary-foreground hover:bg-accent hover:border-accent'
      : 'border-foreground/25 text-foreground hover:border-foreground hover:bg-foreground/5',
    className,
  )

  const Tag = as === 'a' ? 'a' : 'button'

  return (
    <Tag href={href} onClick={onClick} className={base}>
      {children}
    </Tag>
  )
}
