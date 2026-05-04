'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product, Variant } from '@/types'
import { formatPrice } from '@/lib/utils'
import { whatsappURL } from '@/lib/whatsapp'
import { trackWhatsAppClick, trackProductView } from '@/lib/analytics'
import SizeSelector from './SizeSelector'
import { getProductImage, isSupabaseUrl } from '@/lib/product-images'

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants?.[0] ?? null
  )

  const displayPrice = selectedVariant
    ? selectedVariant.price
    : product.discount_price ?? product.price

  const waURL = product.available
    ? whatsappURL(product.name, selectedVariant?.name, displayPrice)
    : null

  const imageSrc = getProductImage(product.image_url, product.category?.slug)

  useEffect(() => {
    trackProductView(product.name)
  }, [product.name])

  return (
    <div style={{ opacity: product.available ? 1 : 0.6 }}>
      {/* Imagen */}
      <Link href={`/catalogo/${product.slug}`} className="block relative overflow-hidden bg-linen" style={{ aspectRatio: '3/4' }}>
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          priority={priority}
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          unoptimized={isSupabaseUrl(imageSrc)}
        />

        {/* Badge top-left */}
        {product.available && product.featured && !product.limited_stock && (
          <span className="absolute top-3 left-3 bg-burgundy-mist text-burgundy text-[10px] uppercase tracking-[0.1em] px-3 py-1">
            Destacado
          </span>
        )}
        {product.available && product.limited_stock && (
          <span className="absolute top-3 left-3 bg-blush text-burgundy-hover text-[10px] uppercase tracking-[0.1em] px-3 py-1">
            Stock limitado
          </span>
        )}
        {product.available && product.discount_price && !selectedVariant && (
          <span className="absolute top-3 left-3 bg-blush text-burgundy-hover text-[10px] uppercase tracking-[0.1em] px-3 py-1">
            Oferta
          </span>
        )}

        {/* Sin stock */}
        {!product.available && (
          <span className="absolute top-3 left-3 bg-muted/80 text-white text-[10px] uppercase tracking-[0.1em] px-3 py-1">
            Sin stock
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="mt-3">
        {product.category && (
          <p className="font-body text-[10px] uppercase tracking-[0.15em] text-muted mb-1">
            {product.category.name}
          </p>
        )}

        <Link href={`/catalogo/${product.slug}`} className="no-underline">
          <h3 className="font-heading font-normal text-lg text-charcoal leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Size selector */}
        {product.variants && product.variants.length > 0 && (
          <div className="mt-2 mb-2">
            <SizeSelector variants={product.variants} onSelect={setSelectedVariant} />
          </div>
        )}

        {/* Precio */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-body text-sm font-medium text-burgundy">
            {formatPrice(displayPrice)}
          </span>
          {product.discount_price && !selectedVariant && (
            <span className="font-body text-xs text-muted line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* CTA — texto link estilo Florence */}
        {product.available ? (
          <a
            href={waURL ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick(product.name)}
            className="font-body text-[11px] uppercase tracking-[0.2em] text-charcoal border-b border-charcoal/20 hover:border-burgundy hover:text-burgundy pb-0.5 mt-3 inline-block transition-colors duration-200"
          >
            Pedir por WhatsApp
          </a>
        ) : (
          <span className="font-body text-[11px] uppercase tracking-[0.2em] text-muted mt-3 inline-block">
            Sin stock por ahora
          </span>
        )}
      </div>
    </div>
  )
}
