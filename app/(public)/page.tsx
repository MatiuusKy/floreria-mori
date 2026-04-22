import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { whatsappURL } from '@/lib/whatsapp'
import ProductGrid from '@/components/ui/ProductGrid'
import SeasonalBanner from '@/components/ui/SeasonalBanner'
import ScrollRevealInit from '@/components/ui/ScrollRevealInit'
import FlowerGallery from '@/components/ui/FlowerGallery'
import { Product, Banner } from '@/types'

export const metadata: Metadata = {
  title: 'Florería Mori — Flores en Peñalolén, Santiago',
  description: 'Arreglos florales únicos en Peñalolén. Ramos, arreglos de cumpleaños, amor y eventos. Contacta por WhatsApp para pedir tus flores.',
  alternates: { canonical: 'https://floreriamori.cl' },
}

const OCCASION_CARDS = [
  { name: 'Amor & Aniversarios', slug: 'amor',        img: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80&fit=crop', desc: 'Rosas y romanticismo para el momento perfecto', size: 'large' },
  { name: 'Cumpleaños',          slug: 'cumpleanos',  img: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&q=80&fit=crop', desc: 'Celebra con flores frescas', size: 'large' },
  { name: 'Bodas & Eventos',     slug: 'eventos',     img: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=600&q=80&fit=crop', desc: 'El día más especial', size: 'small' },
  { name: 'Nacimientos',         slug: 'nacimientos', img: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&q=80&fit=crop', desc: 'Bienvenida a la vida', size: 'small' },
  { name: 'Condolencias',        slug: 'condolencias',img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80&fit=crop', desc: 'Con respeto y cariño', size: 'small' },
]

const STATIC_PRODUCTS = [
  { id: 's1', name: 'Rosas Ecuatorianas',  category: 'Amor · Romántico',    price: 'Desde $15.000', img: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=600&q=80&fit=crop', badge: { emoji: '❤️', label: 'Favorito', color: '#b5623a' }, wa: 'rosas ecuatorianas 🌹' },
  { id: 's2', name: 'Ramo de Temporada',   category: 'Cumpleaños',           price: 'Desde $18.000', img: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&q=80&fit=crop', badge: null, wa: 'ramo de temporada 🌷' },
  { id: 's3', name: 'Ramo de Novia',       category: 'Bodas · Matrimonios',  price: 'Desde $35.000', img: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=600&q=80&fit=crop', badge: { emoji: '💍', label: 'Matrimonio', color: '#c8955a' }, wa: 'ramo de novia 💍' },
  { id: 's4', name: 'Canasto Floral',      category: 'Nacimientos · Bautizos', price: 'Desde $25.000', img: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&q=80&fit=crop', badge: { emoji: '👶', label: 'Nacimiento', color: '#4a6741' }, wa: 'canasto floral 🌸' },
  { id: 's5', name: 'Corona Fúnebre',      category: 'Condolencias',          price: 'Desde $30.000', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80&fit=crop', badge: null, wa: 'corona fúnebre 🕊️' },
  { id: 's6', name: 'Arreglos para Eventos', category: 'Eventos · Iglesias', price: 'Desde $28.000', img: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&q=80&fit=crop', badge: { emoji: '🏢', label: 'Empresa', color: '#c8955a' }, wa: 'arreglos para eventos 🎉' },
]

const GALLERY_IMGS = [
  'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&q=80&fit=crop',
]

const REVIEWS = [
  {
    initials: 'M',
    name: 'María González',
    location: 'Peñalolén',
    date: 'Marzo 2025',
    tag: 'Rosas Románticas',
    text: '"Llevé rosas a mi mamá por su cumpleaños y lloró de la emoción. El arreglo era precioso y llegó súper fresco. ¡Mil gracias!"',
  },
  {
    initials: 'C',
    name: 'Carlos Muñoz',
    location: 'La Florida',
    date: 'Febrero 2025',
    tag: 'Ramo Cumpleaños',
    text: '"Pedí por WhatsApp a las 10 AM y a las 2 PM ya tenía el arreglo en mi oficina. Servicio increíble y las flores duran mucho."',
  },
  {
    initials: 'A',
    name: 'Ana Rojas',
    location: 'Macul',
    date: 'Enero 2025',
    tag: 'Arreglo Mixto',
    text: '"Los mejores precios de la zona oriente y una calidad excepcional. Ya son mi florería de cabecera para todas las ocasiones."',
  },
]

const STEPS = [
  { num: '01', icon: '🔍', title: 'Elige tu arreglo', desc: 'Revisa el catálogo o cuéntanos la ocasión y el presupuesto.' },
  { num: '02', icon: '💬', title: 'Escríbenos por WhatsApp', desc: '+56 9 2989 5674 — respondemos en minutos.' },
  { num: '03', icon: '✅', title: 'Confirmamos y coordinamos', desc: 'Cotización clara + horario de entrega acordado.' },
  { num: '04', icon: '🎉', title: '¡Recibe tus flores!', desc: 'Despacho a domicilio o retiro en Av. Grecia 8628.' },
]

export default async function HomePage() {
  const supabase = await createClient()

  const [{ data: products }, { data: banner }] = await Promise.all([
    supabase.from('products').select('*, category:categories(id,name,slug)').eq('available', true).order('featured', { ascending: false }),
    supabase.from('banners').select('*').eq('active', true).maybeSingle(),
  ])

  const featured = (products as Product[] ?? []).filter(p => p.featured).slice(0, 6)
  const hasFeatured = featured.length > 0

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Florería Mori',
    description: 'Arreglos florales únicos para cada momento especial en Peñalolén, Santiago.',
    url: 'https://floreriamori.cl',
    telephone: '+56929895674',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Grecia 8628',
      addressLocality: 'Peñalolén',
      addressRegion: 'Región Metropolitana',
      addressCountry: 'CL',
    },
    sameAs: ['https://www.instagram.com/floreriamori122012/'],
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '20:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '18:00' },
    ],
  }

  return (
    <>
      <ScrollRevealInit />

      {banner && <SeasonalBanner banner={banner as Banner} />}

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--warm-cream)', padding: '56px 24px 0', overflow: 'hidden' }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '48px',
          alignItems: 'center',
        }} className="hero-grid">
          {/* Left: text */}
          <div>
            {/* Eyebrow */}
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--blush)',
              color: 'var(--terra)',
              fontSize: '12px',
              fontWeight: 600,
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              marginBottom: '20px',
              fontFamily: 'var(--font-body)',
            }}>
              🌸 Av. Grecia 8628 · Peñalolén · Desde 2012
            </span>

            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 400,
              lineHeight: 1.2,
              color: 'var(--mocha)',
              marginBottom: '20px',
            }}>
              Llevamos flores<br />
              que hablan{' '}
              <em style={{ color: 'var(--terra)', fontStyle: 'italic' }}>por ti</em>
            </h1>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              fontWeight: 300,
              color: 'var(--gris)',
              lineHeight: 1.7,
              maxWidth: '440px',
              marginBottom: '32px',
            }}>
              Arreglos florales únicos para cada momento especial. Bodas, cumpleaños, amor, eventos y más — atendido directamente por sus dueños desde 2012.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <Link
                href="/catalogo"
                style={{
                  background: 'var(--terra)',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 600,
                  padding: '12px 24px',
                  borderRadius: 'var(--radius-pill)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                🌸 Ver Catálogo
              </Link>
              <a
                href={whatsappURL()}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--mocha)',
                  fontSize: '14px',
                  fontWeight: 600,
                  padding: '11px 24px',
                  borderRadius: 'var(--radius-pill)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  border: '1.5px solid var(--blush-deep)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                💬 Cotizar ahora
              </a>
            </div>

            {/* Trust chips */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['Flores frescas cada día', 'Envíos a domicilio', 'Atención personalizada', 'Desde 2012'].map(chip => (
                <span key={chip} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'var(--verde)',
                  fontFamily: 'var(--font-body)',
                }}>
                  <span style={{ color: 'var(--verde)', fontWeight: 700 }}>✓</span> {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Right: hero image + floating cards */}
          <div className="hero-right" style={{ position: 'relative', paddingBottom: '32px', paddingRight: '32px' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1', borderRadius: '60% 40% 50% 50% / 50% 55% 45% 55%', overflow: 'hidden' }}>
              <Image
                src="https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80&fit=crop"
                alt="Hermosas rosas frescas de Florería Mori"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Floating card: años */}
            <div className="hero-float-card" style={{
              position: 'absolute',
              bottom: '0',
              left: '-24px',
              background: 'white',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-md)',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              minWidth: '160px',
            }}>
              <span style={{ fontSize: '24px' }}>🏆</span>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 600, color: 'var(--terra)', lineHeight: 1 }}>12+</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gris)', marginTop: '2px' }}>Años en Peñalolén</div>
              </div>
            </div>

            {/* Floating card: stars */}
            <div className="hero-float-card" style={{
              position: 'absolute',
              top: '16px',
              right: '-8px',
              background: 'white',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-md)',
              padding: '12px 16px',
            }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 600, color: 'var(--camel)', lineHeight: 1 }}>5.0</div>
              <div style={{ fontSize: '12px', color: '#f59e0b', letterSpacing: '1px' }}>★★★★★</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--gris)', marginTop: '2px' }}>Clientes felices</div>
            </div>

            {/* Floating card: delivery */}
            <div className="hero-float-card" style={{
              position: 'absolute',
              bottom: '96px',
              right: '-16px',
              background: 'var(--verde)',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-md)',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <span style={{ fontSize: '16px' }}>🚚</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600 }}>Disponible hoy</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          VALUES STRIP
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--mocha)' }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }} className="values-grid">
          {[
            { icon: '🌹', strong: 'Flores Frescas',      span: 'Seleccionadas cada mañana' },
            { icon: '🚚', strong: 'Delivery a Domicilio', span: 'Zona oriente y más' },
            { icon: '💬', strong: 'Pedido Express',       span: 'Por WhatsApp en minutos' },
            { icon: '🎨', strong: 'Diseño Artesanal',     span: 'Cada arreglo es único' },
          ].map((item, i) => (
            <div
              key={item.strong}
              style={{
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '8px',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <span style={{ fontSize: '28px' }}>{item.icon}</span>
              <strong style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--camel-light)' }}>
                {item.strong}
              </strong>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11.5px', fontWeight: 300, color: 'rgba(253,248,244,0.45)' }}>
                {item.span}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FLOWER GALLERY CAROUSEL
      ══════════════════════════════════════════════════════ */}
      <FlowerGallery />

      {/* ══════════════════════════════════════════════════════
          OCCASIONS — "Te acompañamos en momentos especiales"
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--warm-cream)', padding: '72px 24px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--terra)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
            Ocasiones
          </p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, color: 'var(--mocha)', marginBottom: '32px' }}>
            Te acompañamos en momentos especiales
          </h2>

          {/* Top row: 2 large cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="occ-top-grid">
            {OCCASION_CARDS.filter(c => c.size === 'large').map(card => (
              <Link
                key={card.slug}
                href={`/catalogo?categoria=${card.slug}`}
                className="occ-card"
                style={{
                  position: 'relative',
                  display: 'block',
                  height: '320px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  textDecoration: 'none',
                }}
              >
                <Image
                  src={card.img}
                  alt={card.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ transition: 'transform 0.5s ease' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(60,30,10,0.72) 0%, rgba(60,30,10,0.1) 55%)',
                  transition: 'background 0.3s',
                }} className="occ-overlay" />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 28px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 500, color: 'white', marginBottom: '6px' }}>
                    {card.name}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.75)', marginBottom: '14px' }}>
                    {card.desc}
                  </p>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600,
                    color: 'white', background: 'rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(4px)', padding: '6px 16px',
                    borderRadius: 'var(--radius-pill)', border: '1px solid rgba(255,255,255,0.25)',
                  }}>
                    Ver flores →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom row: 3 small cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="occ-bot-grid">
            {OCCASION_CARDS.filter(c => c.size === 'small').map(card => (
              <Link
                key={card.slug}
                href={`/catalogo?categoria=${card.slug}`}
                className="occ-card"
                style={{
                  position: 'relative',
                  display: 'block',
                  height: '200px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  textDecoration: 'none',
                }}
              >
                <Image
                  src={card.img}
                  alt={card.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ transition: 'transform 0.5s ease' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(60,30,10,0.72) 0%, rgba(60,30,10,0.05) 60%)',
                }} className="occ-overlay" />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px 20px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 500, color: 'white', marginBottom: '4px' }}>
                    {card.name}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
                    {card.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CATALOG (real products or static fallback)
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--warm-cream)', padding: '72px 24px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--terra)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
            Catálogo
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '36px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, color: 'var(--mocha)' }}>
              Nuestros arreglos
            </h2>
            <Link href="/catalogo" style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--terra)',
              textDecoration: 'none',
              padding: '8px 20px',
              border: '1.5px solid var(--terra)',
              borderRadius: 'var(--radius-pill)',
            }}>
              Ver todo el catálogo →
            </Link>
          </div>

          {hasFeatured ? (
            /* Real products from Supabase */
            <ProductGrid products={featured} />
          ) : (
            /* Static showcase products */
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '22px',
            }} className="products-grid">
              {STATIC_PRODUCTS.map(p => (
                <div
                  key={p.id}
                  className="reveal"
                  style={{
                    background: 'white',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-sm)',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                  }}
                >
                  <div style={{ position: 'relative', aspectRatio: '1.1', overflow: 'hidden' }}>
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {p.badge && (
                      <span style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        background: p.badge.color,
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-pill)',
                      }}>
                        {p.badge.emoji} {p.badge.label}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: '16px' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, color: 'var(--gris-light)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>
                      {p.category}
                    </p>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 500, color: 'var(--mocha)', marginBottom: '4px' }}>
                      {p.name}
                    </h3>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '21px', fontWeight: 500, color: 'var(--terra)', marginBottom: '14px' }}>
                      {p.price}
                    </div>
                    <a
                      href={`https://wa.me/56929895674?text=${encodeURIComponent(`Hola! Quiero cotizar ${p.wa}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        background: 'var(--terra)',
                        color: 'white',
                        fontSize: '13px',
                        fontWeight: 600,
                        padding: '10px',
                        borderRadius: 'var(--radius-pill)',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      💬 Cotizar por WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CÓMO PEDIR
      ══════════════════════════════════════════════════════ */}
      <section id="como-pedir" style={{ background: 'linear-gradient(135deg, var(--mocha), #4e2a14)', padding: '72px 24px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--camel-light)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
              Proceso
            </p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, color: 'white' }}>
              ¿Cómo hacer tu pedido?
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }} className="steps-grid">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className="reveal step-card"
                style={{
                  padding: '32px 24px',
                  borderRight: i < 3 ? '2px solid rgba(255,255,255,0.06)' : 'none',
                  textAlign: 'center',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '56px',
                  fontWeight: 600,
                  color: 'var(--camel-light)',
                  opacity: 0.15,
                  lineHeight: 1,
                  marginBottom: '-24px',
                }}>
                  {step.num}
                </div>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>{step.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 500, color: 'white', marginBottom: '8px' }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <a
              href="https://wa.me/56929895674?text=Hola%20Florería%20Mori!%20Vi%20su%20página%20y%20quisiera%20hacer%20un%20pedido%20🌸"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#25D366',
                color: 'white',
                fontSize: '15px',
                fontWeight: 600,
                padding: '14px 32px',
                borderRadius: 'var(--radius-pill)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
                marginBottom: '16px',
              }}
            >
              💬 Hacer mi pedido ahora
            </a>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '12px' }}>
              ⏰ Pedidos antes de las 14:00 hrs · Entrega el mismo día · Lun a Sáb
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          NOSOTROS / ABOUT
      ══════════════════════════════════════════════════════ */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center',
        }} className="about-grid">
          {/* Left: blob image */}
          <div style={{ position: 'relative' }}>
            <div
              className="blob-morph"
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1',
                overflow: 'hidden',
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&q=80&fit=crop"
                alt="Interior de Florería Mori en Peñalolén"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Floating card: founded */}
            <div className="about-float-card" style={{
              position: 'absolute',
              bottom: '-20px',
              left: '-20px',
              background: 'var(--mocha)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              padding: '14px 18px',
              color: 'white',
            }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 600, color: 'var(--camel-light)' }}>2012</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(253,248,244,0.6)', marginTop: '2px' }}>Fundada en Peñalolén</div>
            </div>

            {/* Floating card: fresh */}
            <div className="about-float-card" style={{
              position: 'absolute',
              top: '20px',
              right: '-16px',
              background: 'white',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-md)',
              padding: '14px 18px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>🌿</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, color: 'var(--verde)' }}>Flores</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gris)' }}>100% Frescas</div>
            </div>
          </div>

          {/* Right: text */}
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--terra)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>
              Nuestra historia
            </p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 400, color: 'var(--mocha)', lineHeight: 1.2, marginBottom: '24px' }}>
              Una florería con alma, <em style={{ fontStyle: 'italic', color: 'var(--terra)' }}>atendida por sus dueños</em>
            </h2>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 300, color: 'var(--gris)', lineHeight: 1.8, marginBottom: '16px' }}>
              Desde 2012 llevamos alegría floral a los hogares de Peñalolén y toda la zona oriente de Santiago. Somos una florería familiar, con el cuidado y la dedicación que solo el trato directo con los dueños puede ofrecer.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 300, color: 'var(--gris)', lineHeight: 1.8, marginBottom: '16px' }}>
              Cada arreglo es diseñado y preparado con flores seleccionadas por nosotros cada mañana. No trabajamos con intermediarios: de nuestras manos a las tuyas.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 300, color: 'var(--gris)', lineHeight: 1.8, marginBottom: '36px' }}>
              Nos especializamos en bodas, eventos corporativos, arreglos para iglesias, ramos de amor, cumpleaños y condolencias — siempre con el mismo cariño.
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '32px' }}>
              {[
                { value: '12+', label: 'Años de experiencia' },
                { value: '100%', label: 'Flores frescas' },
                { value: '★5.0', label: 'Valoración' },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 500, color: 'var(--terra)', lineHeight: 1 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gris)', marginTop: '4px' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          GALERÍA / INSTAGRAM
      ══════════════════════════════════════════════════════ */}
      <section id="galeria" style={{ background: 'var(--warm-cream)', padding: '72px 24px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--terra)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>
                Galería
              </p>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, color: 'var(--mocha)' }}>
                Nuestro trabajo
              </h2>
            </div>
            <a
              href="https://www.instagram.com/floreriamori122012/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--terra)',
                textDecoration: 'none',
              }}
            >
              @floreriamori122012 →
            </a>
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }} className="gallery-grid">
            {GALLERY_IMGS.map((src, i) => (
              <a
                key={i}
                href="https://www.instagram.com/floreriamori122012/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ position: 'relative', aspectRatio: '1', display: 'block', overflow: 'hidden', borderRadius: 'var(--radius-sm)' }}
                className="gallery-item"
              >
                <Image
                  src={src}
                  alt={`Arreglo floral Florería Mori ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 20vw"
                  style={{ transition: 'transform 0.4s ease' }}
                />
                {/* Hover overlay */}
                <div className="gallery-overlay" style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(107,62,38,0.55)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  color: 'white',
                  gap: '6px',
                }}>
                  <span style={{ fontSize: '24px' }}>❤️</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600 }}>Ver en IG</span>
                </div>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gris)', marginBottom: '16px' }}>
              ¿Te gustó lo que ves? Síguenos para ver más creaciones
            </p>
            <a
              href="https://www.instagram.com/floreriamori122012/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--terra)',
                color: 'white',
                fontSize: '14px',
                fontWeight: 600,
                padding: '12px 28px',
                borderRadius: 'var(--radius-pill)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
              }}
            >
              📸 Seguir en Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          RESEÑAS
      ══════════════════════════════════════════════════════ */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--terra)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
            Reseñas
          </p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, color: 'var(--mocha)' }}>
            Lo que dicen nuestros clientes
          </h2>
        </div>

        {/* Score bar */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          padding: '28px 32px',
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
          flexWrap: 'wrap',
          marginBottom: '32px',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '56px', fontWeight: 500, color: 'var(--terra)', lineHeight: 1 }}>5.0</div>
            <div style={{ fontSize: '20px', color: '#f59e0b', letterSpacing: '3px', margin: '4px 0' }}>★★★★★</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gris)' }}>De nuestros clientes</div>
          </div>
          <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { stars: '5★', pct: 92 },
              { stars: '4★', pct: 6 },
              { stars: '3★', pct: 2 },
            ].map(({ stars, pct }) => (
              <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gris)', width: '24px' }}>{stars}</span>
                <div style={{ flex: 1, height: '6px', background: 'var(--warm-cream)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: 'var(--camel)', borderRadius: '3px' }} />
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gris)', width: '28px' }}>{pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Review cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="reviews-grid">
          {REVIEWS.map(review => (
            <div
              key={review.name}
              className="reveal review-card"
              style={{
                background: 'white',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-sm)',
                padding: '24px',
                transition: 'box-shadow 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--blush)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '18px',
                  fontWeight: 500,
                  color: 'var(--terra)',
                }}>
                  {review.initials}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: 'var(--mocha)' }}>
                    {review.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gris-light)' }}>
                    {review.location} · {review.date}
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '14px', color: '#f59e0b', letterSpacing: '1px', marginBottom: '12px' }}>★★★★★</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', fontWeight: 300, fontStyle: 'italic', color: 'var(--gris)', lineHeight: 1.7, marginBottom: '14px' }}>
                {review.text}
              </p>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 500,
                color: 'var(--terra)',
                background: 'var(--blush)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
              }}>
                {review.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          UBICACIÓN + MAPA
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--warm-cream)', padding: '72px 24px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--terra)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
              Visítanos
            </p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, color: 'var(--mocha)' }}>
              ¿Dónde estamos?
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '32px', alignItems: 'start' }} className="location-grid">
            {/* Info cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                {
                  icon: '📍',
                  title: 'Dirección',
                  content: 'Av. Grecia 8628, Peñalolén',
                  sub: 'A pasos del supermercado',
                  link: { href: 'https://www.google.com/maps/dir/?api=1&destination=-33.47634148961722,-70.54359912872314', label: 'Cómo llegar →' },
                },
                {
                  icon: '⏰',
                  title: 'Horarios',
                  content: 'Lun–Vie: 9:00–20:00 · Sáb: 9:00–18:00',
                  sub: 'Dom Cerrado · Festivos: consultar',
                  badge: 'Abierto',
                },
                {
                  icon: '💬',
                  title: 'WhatsApp',
                  content: '+56 9 2989 5674',
                  sub: 'Respondemos en minutos',
                  link: { href: 'https://wa.me/56929895674', label: 'Escribir ahora →' },
                },
                {
                  icon: '🚚',
                  title: 'Zona de despacho',
                  content: 'Peñalolén, Ñuñoa, Macul',
                  sub: 'La Florida, Las Condes y más',
                },
              ].map(card => (
                <div key={card.title} style={{
                  background: 'white',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-sm)',
                  padding: '18px 20px',
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: '22px', flexShrink: 0 }}>{card.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--mocha-light)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {card.title}
                      </span>
                      {card.badge && (
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, color: 'white', background: 'var(--verde)', padding: '2px 8px', borderRadius: 'var(--radius-pill)' }}>
                          {card.badge}
                        </span>
                      )}
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', fontWeight: 500, color: 'var(--mocha)', marginBottom: '2px' }}>{card.content}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gris)' }}>{card.sub}</p>
                    {card.link && (
                      <a
                        href={card.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--terra)', textDecoration: 'none', marginTop: '6px', display: 'inline-block' }}
                      >
                        {card.link.label}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', height: '420px' }}>
              <iframe
                src="https://maps.google.com/maps?q=-33.47634148961722,-70.54359912872314&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Florería Mori — Av. Grecia 8628, Peñalolén"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(135deg, var(--blush), var(--camel-light))',
        padding: '80px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative emoji */}
        <span style={{ position: 'absolute', top: '-10px', left: '5%', fontSize: '96px', opacity: 0.05, pointerEvents: 'none', lineHeight: 1 }}>💐</span>
        <span style={{ position: 'absolute', bottom: '-10px', right: '5%', fontSize: '96px', opacity: 0.05, pointerEvents: 'none', lineHeight: 1 }}>🌿</span>

        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 400,
            color: 'var(--mocha)',
            lineHeight: 1.2,
            marginBottom: '16px',
          }}>
            ¿Hay algo que{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--terra)' }}>celebrar</em>{' '}
            hoy?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 300, color: 'var(--mocha-mid)', marginBottom: '36px', lineHeight: 1.7 }}>
            Estamos listos para hacer tu momento especial aún más memorable. Escríbenos y te ayudamos a elegir el arreglo perfecto.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/56929895674?text=Hola%20Florería%20Mori!%20Vi%20su%20página%20web%20y%20quisiera%20cotizar%20un%20arreglo%20floral%20🌸"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#25D366',
                color: 'white',
                fontSize: '15px',
                fontWeight: 600,
                padding: '15px 32px',
                borderRadius: 'var(--radius-pill)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
              }}
            >
              💬 Escribir por WhatsApp
            </a>
            <a
              href="tel:+56929895674"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--mocha)',
                color: 'white',
                fontSize: '15px',
                fontWeight: 600,
                padding: '15px 32px',
                borderRadius: 'var(--radius-pill)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
              }}
            >
              📞 Llamar ahora
            </a>
          </div>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--mocha-mid)', marginTop: '20px', opacity: 0.7 }}>
            ⏰ Pedidos antes de las 14:00 hrs · Entrega el mismo día
          </p>
        </div>
      </section>

      {/* ─── Structured data ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      {/* ─── Gallery hover CSS (injected via style tag) ──── */}
      <style>{`
        .gallery-item:hover .gallery-overlay { opacity: 1 !important; }
        .gallery-item:hover img { transform: scale(1.06); }
        .occ-card:hover img { transform: scale(1.07); }
        .occ-card:hover .occ-overlay { background: linear-gradient(to top, rgba(60,30,10,0.82) 0%, rgba(60,30,10,0.18) 55%) !important; }
        @media (max-width: 960px) {
          .hero-grid    { grid-template-columns: 1fr !important; }
          .values-grid  { grid-template-columns: repeat(2, 1fr) !important; }
          .occ-bot-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .products-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .steps-grid   { grid-template-columns: repeat(2, 1fr) !important; }
          .about-grid   { grid-template-columns: 1fr !important; }
          .location-grid { grid-template-columns: 1fr !important; }
          .reviews-grid  { grid-template-columns: 1fr !important; }
          .gallery-grid  { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .hero-grid    { padding: 32px 16px 0 !important; }
          .hero-right   { padding-bottom: 16px !important; padding-right: 16px !important; }
          .occ-top-grid { grid-template-columns: 1fr !important; }
          .occ-bot-grid { grid-template-columns: 1fr !important; }
          .products-grid { grid-template-columns: 1fr !important; }
          .steps-grid   { grid-template-columns: 1fr !important; }
          .values-grid  { grid-template-columns: 1fr !important; }
          .gallery-grid  { grid-template-columns: repeat(2, 1fr) !important; }
          .step-card    { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06); }
          .reviews-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
