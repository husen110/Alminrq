import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Archivo variable font with the width axis so we can render it expanded
// (font-stretch: 125%) for the big display headlines.
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-space',
  axes: ['wdth'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MINARQ — Where Extraordinary Events Begin',
  description:
    'MINARQ engineers world-class event technology: premium LED walls, immersive stage production, professional audio, intelligent lighting, and complete event infrastructure.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${archivo.variable}`}>
      <body className="bg-background font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
