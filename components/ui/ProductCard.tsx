'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Product, Variant } from '@/types'
import { formatPrice } from '@/lib/utils'
import { whatsappURL } from '@/lib/whatsapp'
import { trackWhatsAppClick } from '@/lib/analytics'
import SizeSelector from './SizeSelector'

function getBadge(product: Product): { emoji: string; label: string; color: string } | null {
  if (!product.available) return null
  if (product.limited_stock) return { emoji: '⚡', label: 'Stock limitado', color: '#d47d55' }
  if (product.campaign_tag) return { emoji: '🏷️', label: product.campaign_tag, color: '#c8955a' }
  if (product.best_seller) return { emoji: '🔥', label: 'Más vendido', color: '#b5623a' }
  if (product.featured) return { emoji: '❤️', label: 'Favorito', color: '#b5623a' }
  if (product.same_day_delivery) return { emoji: '🚚', label: 'Entrega hoy', color: '#4a6741' }
  return null
}

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants?.[0] ?? null
  )
  const [hovered, setHovered] = useState(false)

  const displayPrice = selectedVariant
    ? selectedVariant.price
    : product.discount_price ?? product.price

  const waURL = product.available
    ? whatsappURL(product.name, selectedVariant?.name, displayPrice)
    : null

  const badge = getBadge(product)

  return (
    <div
      className="reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        borderRadius: 'var(--radius-md)',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        overflow: 'hidden',
        opacity: product.available ? 1 : 0.6,
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '1.1', overflow: 'hidden', background: 'var(--warm-cream)' }}>
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            priority={priority}
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.4s ease' }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '64px',
            background: 'linear-gradient(135deg, var(--blush), var(--camel-light))',
          }}>
            🌸
          </div>
        )}

        {/* Badge top-left */}
        {badge && (
          <span style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 2,
            background: badge.color,
            color: 'white',
            fontSize: '11px',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 'var(--radius-pill)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            {badge.emoji} {badge.label}
          </span>
        )}

        {/* Out of stock badge */}
        {!product.available && (
          <span style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: 'var(--gris)',
            color: 'white',
            fontSize: '11px',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 'var(--radius-pill)',
          }}>
            Sin stock
          </span>
        )}

        {/* Wishlist heart — appears on hover */}
        <button
          aria-label="Guardar en favoritos"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 2,
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'white',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '15px',
            cursor: 'pointer',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.25s ease',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          🤍
        </button>

        {/* Discount badge */}
        {product.discount_price && !selectedVariant && product.available && (
          <span style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            background: 'var(--terra)',
            color: 'white',
            fontSize: '11px',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 'var(--radius-pill)',
          }}>
            -{Math.round((1 - product.discount_price / product.price) * 100)}% OFF
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '16px' }}>
        {product.category && (
          <p style={{
            fontSize: '10px',
            fontWeight: 600,
            color: 'var(--gris-light)',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            marginBottom: '4px',
            fontFamily: 'var(--font-body)',
          }}>
            {product.category.name}
          </p>
        )}

        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '17px',
          fontWeight: 500,
          color: 'var(--mocha)',
          marginBottom: '4px',
          lineHeight: 1.3,
        }}>
          {product.name}
        </h3>

        {product.description && (
          <p style={{
            fontSize: '12.5px',
            fontWeight: 300,
            color: 'var(--gris)',
            marginBottom: '12px',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {product.description}
          </p>
        )}

        {/* Size selector */}
        {product.variants && product.variants.length > 0 && (
          <div style={{ marginBottom: '12px' }}>
            <SizeSelector variants={product.variants} onSelect={setSelectedVariant} />
          </div>
        )}

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '21px', fontWeight: 500, color: 'var(--terra)' }}>
            {formatPrice(displayPrice)}
          </span>
          {product.discount_price && !selectedVariant && (
            <span style={{ fontSize: '14px', color: 'var(--gris-light)', textDecoration: 'line-through' }}>
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* CTA */}
        {product.available ? (
          <a
            href={waURL ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick(product.name)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              width: '100%',
              background: 'var(--terra)',
              color: 'white',
              fontSize: '13px',
              fontWeight: 600,
              padding: '10px',
              borderRadius: 'var(--radius-pill)',
              textDecoration: 'none',
              transition: 'background 0.2s',
              fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--mocha)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--terra)')}
          >
            💬 Cotizar por WhatsApp
          </a>
        ) : (
          <button
            disabled
            style={{
              width: '100%',
              background: 'var(--warm-cream)',
              color: 'var(--gris-light)',
              fontSize: '13px',
              fontWeight: 600,
              padding: '10px',
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              cursor: 'not-allowed',
              fontFamily: 'var(--font-body)',
            }}
          >
            Sin stock por ahora
          </button>
        )}
      </div>
    </div>
  )
}
