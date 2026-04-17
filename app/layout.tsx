import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
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
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${montserrat.variable} font-body bg-background text-[#333333] antialiased`}>
        {children}
      </body>
    </html>
  )
}
