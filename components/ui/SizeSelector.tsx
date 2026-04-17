'use client'
import { useState } from 'react'
import { Variant } from '@/types'
import { formatPrice } from '@/lib/utils'

interface Props {
  variants: Variant[]
  onSelect: (variant: Variant) => void
}

export default function SizeSelector({ variants, onSelect }: Props) {
  const [selected, setSelected] = useState<Variant>(variants[0])

  function handleSelect(v: Variant) {
    setSelected(v)
    onSelect(v)
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {variants.map(v => (
        <button
          key={v.name}
          onClick={() => handleSelect(v)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            selected.name === v.name
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-gray-600 border-gray-200 hover:border-primary'
          }`}
        >
          {v.name} — {formatPrice(v.price)}
        </button>
      ))}
    </div>
  )
}
