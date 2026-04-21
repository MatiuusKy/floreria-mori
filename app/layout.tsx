import type { Metadata } from 'next'
import { Lora, Nunito } from 'next/font/google'
import './globals.css'
import Analytics from '@/components/Analytics'

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://floreriamori.cl'),
  title: {
    default: 'Florería Mori — Flores en Peñalolén, Santiago',
    template: '%s | Florería Mori',
  },
  description: 'Arreglos florales únicos para cada momento especial. Florería local en Peñalolén, Santiago. Ramos, arreglos, cumpleaños y más.',
  keywords: ['florería Peñalolén', 'ramos flores Santiago', 'flores a domicilio Santiago', 'arreglos florales', 'florería Mori', 'flores Santiago'],
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Florería Mori',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Florería Mori — Flores en Peñalolén' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Florería Mori — Flores en Peñalolén, Santiago',
    description: 'Arreglos florales únicos para cada momento. Florería local en Peñalolén, Santiago.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: 'https://floreriamori.cl' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Florería Mori',
  image: 'https://floreriamori.cl/og-image.jpg',
  url: 'https://floreriamori.cl',
  telephone: '+56929895674',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Grecia 8628',
    addressLocality: 'Peñalolén',
    addressRegion: 'Región Metropolitana',
    postalCode: '7960000',
    addressCountry: 'CL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -33.473,
    longitude: -70.558,
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '20:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '18:00' },
  ],
  priceRange: '$',
  servesCuisine: undefined,
  sameAs: ['https://www.instagram.com/floreriamori122012/'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${lora.variable} ${nunito.variable} font-body antialiased`}>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
