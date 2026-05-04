'use client'

import Link from 'next/link'
import ScrollExpandHero from '@/components/ui/ScrollExpandHero'

interface HeroSectionProps {
  waHref: string
}

export default function HeroSection({ waHref }: HeroSectionProps) {
  return (
    <ScrollExpandHero
      mediaSrc="/images/logo-brand.png"
      bgImageSrc="/images/fondo_banner.jpeg"
      bgImageMobileSrc="/images/fondo_banner_mobile.jpeg"
    >
      <div className="max-w-3xl mx-auto text-center">

        {/* Separador */}
        <div className="w-12 h-px bg-burgundy mx-auto mb-10" />

        {/* Texto principal */}
        <p
          className="font-heading font-light text-charcoal leading-relaxed"
          style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)' }}
        >
          Flora Boutique es más que una florería online, es un espacio donde cada detalle
          se crea con dedicación para transformar momentos especiales en recuerdos
          inolvidables. Trabajamos con flores frescas y cuidadosamente seleccionadas a
          diario, para asegurar la mejor calidad en cada ramo.
        </p>

        <p
          className="font-heading font-light text-charcoal leading-relaxed mt-6"
          style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)' }}
        >
          Contamos con catálogo y también creamos arreglos personalizados, pensados
          especialmente para cada ocasión. Realizamos envíos de lunes a domingo en toda
          la Región Metropolitana, entregando no solo flores, sino también emociones,
          cercanía y un servicio en el que puedes confiar.
        </p>

        {/* Info logística */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 mb-12">
          <span className="font-body text-[11px] uppercase tracking-[0.25em] text-muted">
            Retiro en Ñuñoa
          </span>
          <span className="hidden sm:block w-px h-4 bg-linen" />
          <span className="font-body text-[11px] uppercase tracking-[0.25em] text-muted">
            Despacho Lun – Dom
          </span>
          <span className="hidden sm:block w-px h-4 bg-linen" />
          <span className="font-body text-[11px] uppercase tracking-[0.25em] text-muted">
            Región Metropolitana
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/catalogo"
            className="bg-burgundy text-white hover:bg-burgundy-hover px-10 py-3.5 rounded-none font-body uppercase tracking-[0.2em] text-xs font-medium transition-colors duration-200"
          >
            Ver catálogo
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-charcoal text-charcoal hover:bg-charcoal hover:text-white px-10 py-3.5 rounded-none font-body uppercase tracking-[0.2em] text-xs font-medium transition-colors duration-200"
          >
            Pedir por WhatsApp
          </a>
        </div>

      </div>
    </ScrollExpandHero>
  )
}
