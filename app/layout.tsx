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
  keywords: ['florería Peñalolén', 'ramos flores Santiago', 'flores a domicilio Santiago', 'arreglos florales'],
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Florería Mori',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${lora.variable} ${nunito.variable} font-body antialiased`}>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
