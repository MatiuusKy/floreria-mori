'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Occasion {
  active: { startMonth: number; startDay: number; endMonth: number; endDay: number }
  label: string
  title: string
  subtitle: string
  cta: string
  ctaUrl: string
  bgImage: string
}

const OCCASIONS: Record<string, Occasion> = {
  'dia-de-la-madre': {
    active: { startMonth: 5, startDay: 1, endMonth: 5, endDay: 11 },
    label: 'Colección especial',
    title: 'Feliz Día Mamá',
    subtitle: 'Flores que dicen lo que las palabras no pueden',
    cta: 'Ver colección especial',
    ctaUrl: '/catalogo?ocasion=dia-de-la-madre',
    bgImage: 'https://images.unsplash.com/photo-1490750967868-88df5691cc09?w=900&q=80&fit=crop',
  },
  'san-valentin': {
    active: { startMonth: 2, startDay: 10, endMonth: 2, endDay: 14 },
    label: 'San Valentín',
    title: 'Regala amor',
    subtitle: 'Regala amor en cada pétalo',
    cta: 'Ver colección',
    ctaUrl: '/catalogo?ocasion=san-valentin',
    bgImage: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=900&q=80&fit=crop',
  },
  'navidad': {
    active: { startMonth: 12, startDay: 20, endMonth: 12, endDay: 31 },
    label: 'Navidad',
    title: 'Feliz Navidad',
    subtitle: 'Flores para compartir la magia',
    cta: 'Ver colección navideña',
    ctaUrl: '/catalogo?ocasion=navidad',
    bgImage: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=900&q=80&fit=crop',
  },
}

function getActiveOccasion(): { key: string; data: Occasion } | null {
  const now = new Date()
  const month = now.getMonth() + 1
  const day = now.getDate()
  for (const [key, data] of Object.entries(OCCASIONS)) {
    const { startMonth, startDay, endMonth, endDay } = data.active
    const isInRange =
      (month > startMonth || (month === startMonth && day >= startDay)) &&
      (month < endMonth || (month === endMonth && day <= endDay))
    if (isInRange) return { key, data }
  }
  return null
}

export default function SeasonalBanner() {
  const [dismissed, setDismissed] = useState(false)
  const [visible, setVisible] = useState(false)
  const active = getActiveOccasion()

  useEffect(() => {
    if (!active) return
    const closed = sessionStorage.getItem(`banner_closed_${active.key}`)
    if (!closed) setVisible(true)
  }, [active?.key])

  const handleDismiss = () => {
    if (!active) return
    sessionStorage.setItem(`banner_closed_${active.key}`, '1')
    setDismissed(true)
    setTimeout(() => setVisible(false), 300)
  }

  if (!active || !visible) return null

  const { key, data } = active

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col lg:flex-row transition-opacity duration-300 ${dismissed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* Lado izquierdo — bg-burgundy */}
      <div className="flex flex-col justify-center items-center lg:items-start px-10 lg:px-16 py-16 lg:w-1/2 bg-burgundy relative">
        {/* Botón cerrar */}
        <button
          onClick={handleDismiss}
          aria-label="Cerrar banner"
          className="absolute top-6 left-6 text-white/60 hover:text-white font-body text-xs uppercase tracking-[0.1em] transition-colors"
        >
          ✕ Cerrar
        </button>

        {/* Logo PNG */}
        <img
          src="/images/logo-brand.png"
          alt="Flora Boutique"
          style={{ height: 90, width: 'auto', objectFit: 'contain' }}
          className="mb-6"
        />

        {/* Rombo decorativo */}
        <span className="text-logo-deco text-lg mb-4">✦</span>

        <p className="font-body uppercase tracking-[0.35em] text-xs text-blush mb-4 text-center lg:text-left">
          {data.label}
        </p>

        <h1
          className="font-heading font-normal text-white leading-tight text-center lg:text-left"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          {data.title}
        </h1>

        <p className="font-body text-base text-white/70 mt-4 max-w-sm text-center lg:text-left">
          {data.subtitle}
        </p>

        <Link
          href={data.ctaUrl}
          className="mt-8 bg-white text-burgundy hover:bg-linen px-10 py-4 rounded-none font-body uppercase tracking-[0.15em] text-xs font-medium transition-colors duration-300 inline-block"
        >
          {data.cta}
        </Link>
      </div>

      {/* Lado derecho — imagen floral */}
      <div className="relative lg:w-1/2 min-h-[40vh] lg:min-h-0">
        <Image
          src={data.bgImage}
          alt={data.title}
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  )
}
