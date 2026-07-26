'use client'

const ITEMS = [
  'LED Walls',
  'Stage Production',
  'Line Array Audio',
  'Intelligent Lighting',
  'Trussing',
  'Broadcast',
  'Immersive Media',
  'Event Infrastructure',
]

export function Marquee() {
  return (
    <div className="relative border-y border-border bg-background py-6">
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        {[0, 1].map((dup) => (
          <div
            key={dup}
            aria-hidden={dup === 1}
            className="flex shrink-0 animate-[marquee_38s_linear_infinite] items-center gap-12 pr-12"
          >
            {ITEMS.map((item, i) => (
              <div key={`${dup}-${i}`} className="flex items-center gap-12">
                <span className="whitespace-nowrap font-display text-xl font-semibold tracking-tight text-muted-foreground">
                  {item}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </div>
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  )
}
