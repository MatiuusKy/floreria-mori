'use client'
import { useState } from 'react'
import Image from 'next/image'
import { MessageCircle, Star, Flame } from 'lucide-react'
import { Product, Variant } from '@/types'
import { formatPrice } from '@/lib/utils'
import { whatsappURL } from '@/lib/whatsapp'
import SizeSelector from './SizeSelector'

export default function ProductCard({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants?.[0] ?? null
  )

  const displayPrice = selectedVariant
    ? selectedVariant.price
    : product.discount_price ?? product.price

  const waURL = product.available
    ? whatsappURL(product.name, selectedVariant?.name, displayPrice)
    : null

  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${!product.available ? 'opacity-60' : ''}`}>
      {/* Image */}
      <div className="relative aspect-square bg-gray-100">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-secondary to-accent">
            🌸
          </div>
        )}
        {/* Badges */}
        {product.featured && product.available && (
          <span className="absolute top-2 left-2 flex items-center gap-1 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
            <Star size={10} /> Destacado
          </span>
        )}
        {product.best_seller && product.available && (
          <span className="absolute top-2 right-2 flex items-center gap-1 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full">
            <Flame size={10} /> Más vendido
          </span>
        )}
        {product.discount_price && !selectedVariant && product.available && (
          <span className="absolute bottom-2 right-2 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full">
            -{Math.round((1 - product.discount_price / product.price) * 100)}% OFF
          </span>
        )}
        {!product.available && (
          <span className="absolute top-2 left-2 bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Sin stock
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        {product.category && (
          <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">
            {product.category.name}
          </p>
        )}
        <h3 className="font-heading text-base font-semibold text-gray-800 mb-1">{product.name}</h3>
        {product.description && (
          <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>
        )}

        {/* Size selector */}
        {product.variants && product.variants.length > 0 && (
          <div className="mb-3">
            <SizeSelector
              variants={product.variants}
              onSelect={setSelectedVariant}
            />
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-primary">{formatPrice(displayPrice)}</span>
          {product.discount_price && !selectedVariant && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.price)}</span>
          )}
        </div>

        {/* CTA */}
        {product.available ? (
          <a
            href={waURL ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-primary text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-green-800 transition-colors"
          >
            <MessageCircle size={16} />
            Consultar por WhatsApp
          </a>
        ) : (
          <button disabled className="w-full bg-gray-100 text-gray-400 text-sm font-semibold py-2.5 rounded-xl cursor-not-allowed">
            Sin stock por ahora
          </button>
        )}
      </div>
    </div>
  )
}
