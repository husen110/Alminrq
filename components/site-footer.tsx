const COLUMNS = [
  {
    title: 'Experiences',
    links: [
      { label: 'LED Walls', href: '/#services' },
      { label: 'Stage Production', href: '/#services' },
      { label: 'Audio Systems', href: '/#services' },
      { label: 'Lighting', href: '/#services' },
      { label: 'Configurator', href: '/#configure' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Selected Work', href: '/projects' },
      { label: 'Careers', href: '/about#careers' },
      { label: 'Press', href: '/about#press' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Instagram', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Vimeo', href: '#' },
      { label: 'YouTube', href: '#' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer id="studio" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold tracking-[0.2em]">MINARQ</span>
            </div>
            <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              Premium event technology for the world&apos;s most ambitious
              productions.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {col.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} MINARQ. All rights reserved.</p>
          <p className="tracking-wide">Where Extraordinary Events Begin.</p>
        </div>
      </div>
    </footer>
  )
}
