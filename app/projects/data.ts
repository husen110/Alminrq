export type ProjectCategory = {
  number: string
  slug: string
  title: string
  tags: string
  description: string
  gallery: string[]
}

const EVENTS_GALLERY = [
  '/dan-taylor-fT3RcZtiDYQ-unsplash.jpg',
  '/j-dddd-dgqWef6Dw7k-unsplash.jpg',
  '/duane-loux-6Qk8LTt4u70-unsplash.jpg',
  '/joel-muniz-w3WN3l6KbGc-unsplash.jpg',
  '/william-hook-z0eto_lw72M-unsplash.jpg',
  '/riley-bartel-hUGe9ROdugQ-unsplash.jpg',
  '/thomas-urquhart-SmwFIMPdRHI-unsplash.jpg',
]

const CORPORATE_GALLERY = [
  '/carlos-gil-AsxOJcsaR4g-unsplash.jpg',
  '/teemu-paananen-bzdhc5b3Bxs-unsplash.jpg',
  '/product-school-8ohCiNjxOls-unsplash.jpg',
  '/marwen-larafa-qzO9a6oQ8AM-unsplash.jpg',
  '/victor-olariu-WVI07RxlucA-unsplash.jpg',
  '/david-veksler-TcnZzYsDERw-unsplash.jpg',
  '/yucel-m-2CZ80KN2dZU-unsplash.jpg',
]

const WEDDING_GALLERY = [
  '/hero-wedding-production.png',
  '/wedding.png',
  '/wed1.png',
  '/entrance.png',
  '/orchestra.png',
  '/bhong-bahala-8dYvIyqqibk-unsplash.jpg',
]

const FESTIVAL_GALLERY = [
  '/dominic-kurniawan-suryaputra-Zkcgfn599U8-unsplash.jpg',
  '/gerardo-martin-fernandez-vallejo-61zRQJYIUaE-unsplash.jpg',
  '/mohammad-rahman-ue5xKK1dZBY-unsplash.jpg',
  '/adedotun-adegborioye--xW1mO33bWw-unsplash.jpg',
  '/carlos-gil-u7PnSXyhbeg-unsplash.jpg',
  '/alexandre-debieve-PwX1lFZ-dy4-unsplash.jpg',
]

export const PROJECTS: ProjectCategory[] = [
  {
    number: '01',
    slug: 'events-functions',
    title: 'Events & Functions',
    tags: 'Concerts · Live Tours · Private Functions',
    description: 'Arena-scale rigs and one-night functions alike — the same crew, the same standard, every time.',
    gallery: EVENTS_GALLERY,
  },
  {
    number: '02',
    slug: 'the-boardroom-reveal',
    title: 'Corporate & Boardroom',
    tags: 'Keynotes · Product Launches · Summits',
    description: 'Panoramic LED, precision audio and lighting control for the moments that move a business forward.',
    gallery: CORPORATE_GALLERY,
  },
  {
    number: '03',
    slug: 'golden-hour-vows',
    title: 'Weddings & Celebrations',
    tags: 'Ceremonies · Receptions · Private Celebrations',
    description: 'Floral LED backdrops, concealed audio and decorative light for the day that outlives the night.',
    gallery: WEDDING_GALLERY,
  },
  {
    number: '04',
    slug: 'festivals-galas',
    title: 'Festivals & Galas',
    tags: 'Outdoor Festivals · Galas · Cultural Events',
    description: 'Six-figure crowds, multi-day builds and zero downtime — production at cultural scale.',
    gallery: FESTIVAL_GALLERY,
  },
]

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug)
}
