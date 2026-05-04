import type { Metadata } from 'next'
import { Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'
import Analytics from '@/components/Analytics'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.floraboutique.cl'),
  title: {
    default: 'Flora Boutique — Flores a domicilio en Santiago',
    template: '%s | Flora Boutique',
  },
  description: 'Floristería premium en Santiago. Ramos, arreglos y flores a domicilio. Despacho el mismo día en zona oriente. Pide por WhatsApp.',
  keywords: ['flores a domicilio santiago', 'floristería santiago', 'ramos de flores', 'arreglos florales', 'zona oriente', 'flores santiago', 'Flora Boutique'],
  openGraph: {
    title: 'Flora Boutique — Flores a domicilio en Santiago',
    description: 'Floristería premium. Despacho mismo día. Pide por WhatsApp.',
    url: 'https://www.floraboutique.cl',
    siteName: 'Flora Boutique',
    locale: 'es_CL',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Flora Boutique — Flores a domicilio en Santiago' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flora Boutique — Flores a domicilio en Santiago',
    description: 'Floristería premium. Despacho mismo día. Pide por WhatsApp.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: 'https://www.floraboutique.cl' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Flora Boutique',
  image: 'https://www.floraboutique.cl/og-image.jpg',
  url: 'https://www.floraboutique.cl',
  telephone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ? `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}` : undefined,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Santiago',
    addressRegion: 'Región Metropolitana',
    addressCountry: 'CL',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '20:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '18:00' },
  ],
  priceRange: '$$',
  sameAs: ['https://www.instagram.com/floraboutique.cl/'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body className="bg-white-warm text-charcoal font-body antialiased">
        <Analytics />
        {children}
      </body>
    </html>
  )
}
