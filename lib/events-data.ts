export type EventType = {
  slug: string
  label: string
  desc: string
  image: string
  span: string
  large: boolean
  gallery: string[]
}

export const EVENTS: EventType[] = [
  {
    slug: 'concerts-live-tours',
    label: 'Concerts & Live Tours',
    desc: 'Arena-scale rigs built to survive a 40-city run.',
    image: '/dan-taylor-fT3RcZtiDYQ-unsplash.jpg',
    span: 'lg:col-span-2 lg:row-span-2',
    large: true,
    gallery: [
      '/dan-taylor-fT3RcZtiDYQ-unsplash.jpg',
      '/j-dddd-dgqWef6Dw7k-unsplash.jpg',
      '/duane-loux-6Qk8LTt4u70-unsplash.jpg',
      '/joel-muniz-w3WN3l6KbGc-unsplash.jpg',
      '/william-hook-z0eto_lw72M-unsplash.jpg',
      '/riley-bartel-hUGe9ROdugQ-unsplash.jpg',
      '/thomas-urquhart-SmwFIMPdRHI-unsplash.jpg',
    ],
  },
  {
    slug: 'corporate-keynotes',
    label: 'Corporate & Keynotes',
    desc: '',
    image: '/carlos-gil-AsxOJcsaR4g-unsplash.jpg',
    span: '',
    large: false,
    gallery: ['/carlos-gil-AsxOJcsaR4g-unsplash.jpg', '/yucel-m-2CZ80KN2dZU-unsplash.jpg'],
  },
  {
    slug: 'weddings-celebrations',
    label: 'Weddings & Celebrations',
    desc: '',
    image: '/hero-wedding-production.png',
    span: '',
    large: false,
    gallery: ['/hero-wedding-production.png', '/bhong-bahala-8dYvIyqqibk-unsplash.jpg'],
  },
  {
    slug: 'galas-summits',
    label: 'Galas & Summits',
    desc: '',
    image: '/carlos-gil-u7PnSXyhbeg-unsplash.jpg',
    span: '',
    large: false,
    gallery: ['/carlos-gil-u7PnSXyhbeg-unsplash.jpg'],
  },
  {
    slug: 'product-launches',
    label: 'Product Launches',
    desc: '',
    image: '/alexandre-debieve-PwX1lFZ-dy4-unsplash.jpg',
    span: '',
    large: false,
    gallery: ['/alexandre-debieve-PwX1lFZ-dy4-unsplash.jpg'],
  },
  {
    slug: 'festivals',
    label: 'Festivals',
    desc: 'Six-figure crowds, zero downtime, every time.',
    image: '/dominic-kurniawan-suryaputra-Zkcgfn599U8-unsplash.jpg',
    span: 'lg:col-span-4',
    large: true,
    gallery: [
      '/dominic-kurniawan-suryaputra-Zkcgfn599U8-unsplash.jpg',
      '/gerardo-martin-fernandez-vallejo-61zRQJYIUaE-unsplash.jpg',
      '/mohammad-rahman-ue5xKK1dZBY-unsplash.jpg',
      '/adedotun-adegborioye--xW1mO33bWw-unsplash.jpg',
    ],
  },
]

export function getEventBySlug(slug: string) {
  return EVENTS.find((e) => e.slug === slug)
}
