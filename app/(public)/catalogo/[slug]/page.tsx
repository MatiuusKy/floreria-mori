import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getProductImage, isSupabaseUrl } from '@/lib/product-images'
import { formatPrice } from '@/lib/utils'
import { whatsappURL } from '@/lib/whatsapp'
import type { Product } from '@/types'
import ProductViewTracker from '@/components/ui/ProductViewTracker'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

async function getProduct(slug: string): Promise<Product | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(id, name, slug)')
    .eq('slug', slug)
    .single()
  if (error || !data) return null
  return data as Product
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return { title: 'Producto no encontrado — Florería Mori' }

  return {
    title: `${product.name} — Florería Mori`,
    description: product.description ?? `${product.name} disponible en Florería Mori. Flores frescas a domicilio en Santiago.`,
    openGraph: {
      title: `${product.name} — Florería Mori`,
      description: product.description ?? `${product.name} disponible en Florería Mori.`,
      images: product.image_url ? [{ url: product.image_url }] : [],
    },
    alternates: { canonical: `https://floreriamori.cl/catalogo/${slug}` },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const imageSrc = getProductImage(product.image_url, product.category?.slug)
  const waURL = whatsappURL(product.name, undefined, product.discount_price ?? product.price)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description ?? undefined,
    image: product.image_url ?? imageSrc,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'CLP',
      price: product.discount_price ?? product.price,
      availability: product.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Florería Mori' },
    },
  }

  const displayPrice = product.discount_price ?? product.price
  const hasDiscount = product.discount_price !== null && product.discount_price < product.price
  const discountPct = hasDiscount
    ? Math.round((1 - product.discount_price! / product.price) * 100)
    : 0

  return (
    <>
      <ProductViewTracker name={product.name} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      {/* Back link */}
      <div style={{ background: 'var(--warm-cream)', padding: '20px 24px 0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <Link
            href="/catalogo"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--terra)',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={14} />
            Volver al catálogo
          </Link>
        </div>
      </div>

      {/* Main content */}
      <section style={{ background: 'var(--warm-cream)', padding: '32px 24px 80px' }}>
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'start',
          }}
          className="product-detail-grid"
        >
          {/* Left: image */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                aspectRatio: '1',
                borderRadius: '20px',
                overflow: 'hidden',
                background: 'white',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <Image
                src={imageSrc}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized={isSupabaseUrl(imageSrc)}
              />

              {/* Discount badge */}
              {hasDiscount && (
                <span style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: 'var(--terra)',
                  color: 'white',
                  fontSize: '13px',
                  fontWeight: 700,
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-pill)',
                }}>
                  -{discountPct}% OFF
                </span>
              )}

              {!product.available && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{
                    background: 'rgba(255,255,255,0.9)',
                    color: 'var(--mocha)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '18px',
                    fontWeight: 500,
                    padding: '12px 28px',
                    borderRadius: 'var(--radius-md)',
                  }}>
                    Sin stock por ahora
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right: info */}
          <div style={{ paddingTop: '8px' }}>
            {product.category && (
              <Link
                href={`/catalogo?categoria=${product.category.slug}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--blush)',
                  color: 'var(--terra)',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '5px 14px',
                  borderRadius: 'var(--radius-pill)',
                  textDecoration: 'none',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-body)',
                  marginBottom: '20px',
                }}
              >
                {product.category.name}
              </Link>
            )}

            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              fontWeight: 400,
              color: 'var(--mocha)',
              lineHeight: 1.2,
              marginBottom: '16px',
            }}>
              {product.name}
            </h1>

            {product.description && (
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                fontWeight: 300,
                color: 'var(--gris)',
                lineHeight: 1.8,
                marginBottom: '28px',
              }}>
                {product.description}
              </p>
            )}

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '32px' }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '36px',
                fontWeight: 500,
                color: 'var(--terra)',
              }}>
                {formatPrice(displayPrice)}
              </span>
              {hasDiscount && (
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '18px',
                  color: 'var(--gris-light)',
                  textDecoration: 'line-through',
                }}>
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Badges row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
              {product.same_day_delivery && (
                <span style={badgeStyle('#4a6741')}>🚚 Entrega hoy</span>
              )}
              {product.best_seller && (
                <span style={badgeStyle('var(--terra)')}>🔥 Más vendido</span>
              )}
              {product.limited_stock && (
                <span style={badgeStyle('#d47d55')}>⚡ Stock limitado</span>
              )}
              {product.campaign_tag && (
                <span style={badgeStyle('#c8955a')}>🏷️ {product.campaign_tag}</span>
              )}
            </div>

            {/* CTA */}
            {product.available ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a
                  href={waURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: '#25D366',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 700,
                    padding: '16px 32px',
                    borderRadius: 'var(--radius-pill)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
                    transition: 'opacity 0.2s',
                  }}
                  className="wa-cta-btn"
                >
                  <MessageCircle size={20} />
                  Cotizar por WhatsApp
                </a>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'var(--gris-light)',
                  textAlign: 'center',
                }}>
                  Te respondemos en minutos · Peñalolén, Santiago
                </p>
              </div>
            ) : (
              <div style={{
                background: 'var(--warm-white)',
                borderRadius: 'var(--radius-md)',
                padding: '20px 24px',
                textAlign: 'center',
              }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--mocha)', marginBottom: '12px' }}>
                  Este producto no tiene stock en este momento
                </p>
                <a
                  href="https://wa.me/56929895674?text=Hola%2C%20quisiera%20saber%20cu%C3%A1ndo%20estar%C3%A1%20disponible%3A"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'var(--terra)',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 600,
                    padding: '10px 24px',
                    borderRadius: 'var(--radius-pill)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Consultar disponibilidad
                </a>
              </div>
            )}

            {/* Info cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '32px' }}>
              {[
                { emoji: '🌸', title: 'Flores frescas', desc: 'Seleccionadas cada mañana' },
                { emoji: '🚚', title: 'Entrega a domicilio', desc: 'Zona oriente de Santiago' },
                { emoji: '💬', title: 'Pedido por WhatsApp', desc: 'Respuesta en minutos' },
                { emoji: '🎀', title: 'Personalizable', desc: 'Cuéntanos tu ocasión' },
              ].map(info => (
                <div key={info.title} style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>{info.emoji}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, color: 'var(--mocha)', marginBottom: '2px' }}>{info.title}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gris)', fontWeight: 300 }}>{info.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .wa-cta-btn:hover { opacity: 0.9; }
        @media (max-width: 768px) {
          .product-detail-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </>
  )
}

function badgeStyle(color: string): React.CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    background: color,
    color: 'white',
    fontSize: '11px',
    fontWeight: 700,
    padding: '4px 12px',
    borderRadius: 'var(--radius-pill)',
    fontFamily: 'var(--font-body)',
  }
}
