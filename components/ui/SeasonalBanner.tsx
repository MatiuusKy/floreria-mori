'use client'
import { useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { Banner } from '@/types'

export default function SeasonalBanner({ banner }: { banner: Banner }) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div style={{ background: 'var(--violet-brand)', color: 'white' }} className="py-3 px-4 flex items-center justify-between gap-4">
      <div className="flex-1 text-center text-sm font-semibold">
        {banner.title}
        {banner.subtitle && <span className="ml-2 font-normal opacity-90">{banner.subtitle}</span>}
        {banner.cta_text && banner.cta_url && (
          <Link href={banner.cta_url}
            className="ml-3 underline underline-offset-2 font-bold hover:opacity-80">
            {banner.cta_text}
          </Link>
        )}
      </div>
      <button onClick={() => setDismissed(true)} aria-label="Cerrar" className="shrink-0 hover:opacity-70">
        <X size={18} />
      </button>
    </div>
  )
}
