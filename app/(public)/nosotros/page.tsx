import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nosotros — Florería Mori',
  description: 'Conoce nuestra historia. Florería Mori, familia apasionada por las flores en Peñalolén desde 2012. Atención personalizada, flores frescas cada día.',
  alternates: { canonical: 'https://floreriamori.cl/nosotros' },
}

const VALUES = [
  {
    emoji: '🌿',
    title: 'Flores Frescas Cada Día',
    desc: 'Seleccionamos nuestras flores cada mañana directamente en el mercado, garantizando la mejor calidad y durabilidad en cada arreglo.',
  },
  {
    emoji: '❤️',
    title: 'Atención Personalizada',
    desc: 'Cada pedido es único. Nos tomamos el tiempo de entender la ocasión y el presupuesto para crear el arreglo perfecto para ti.',
  },
  {
    emoji: '🏠',
    title: 'Familia con Pasión',
    desc: 'Somos una florería familiar, atendida directamente por sus dueños. Cuando nos contactas, hablas con quienes hacen tu arreglo.',
  },
  {
    emoji: '🚚',
    title: 'Entrega a Domicilio',
    desc: 'Llegamos a Peñalolén, La Florida, Macul, Ñuñoa, Las Condes y toda la zona oriente de Santiago.',
  },
]

const TIMELINE = [
  { year: '2012', title: 'Nuestros inicios', desc: 'Florería Mori abre sus puertas en Av. Grecia 8628, Peñalolén, con el sueño de llevar flores frescas y amor a cada hogar.' },
  { year: '2015', title: 'Bodas y eventos', desc: 'Comenzamos a especializarnos en arreglos para matrimonios y eventos corporativos, consolidando nuestra reputación.' },
  { year: '2019', title: 'Delivery express', desc: 'Lanzamos nuestro servicio de entrega el mismo día, atendiendo pedidos por WhatsApp en minutos.' },
  { year: 'Hoy', title: 'Más de 12 años', desc: 'Seguimos creciendo con el mismo cariño de siempre, atendidos directamente por sus dueños en Peñalolén.' },
]

export default function NosotrosPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ background: 'var(--warm-cream)', padding: '64px 24px 0', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center' }} className="nosotros-hero-grid">
          {/* Left */}
          <div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'var(--blush)', color: 'var(--terra)',
              fontSize: '12px', fontWeight: 600, padding: '6px 14px',
              borderRadius: 'var(--radius-pill)', marginBottom: '20px',
              fontFamily: 'var(--font-body)',
            }}>
              🌸 Peñalolén · Desde 2012
            </span>
            <h1 style={{
              fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400, lineHeight: 1.2, color: 'var(--mocha)', marginBottom: '20px',
            }}>
              Una florería con alma,{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--terra)' }}>atendida por sus dueños</em>
            </h1>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 300,
              color: 'var(--gris)', lineHeight: 1.8, maxWidth: '460px', marginBottom: '32px',
            }}>
              Desde 2012 llevamos alegría floral a los hogares de Peñalolén y toda la zona oriente de Santiago. Somos una familia apasionada por las flores que trabaja directamente con cada cliente, con el cuidado y la dedicación que solo el trato personal puede ofrecer.
            </p>
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              {[{ v: '12+', l: 'Años de experiencia' }, { v: '100%', l: 'Flores frescas' }, { v: '★ 5.0', l: 'Valoración' }].map(s => (
                <div key={s.l}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 500, color: 'var(--terra)', lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gris)', marginTop: '4px' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image */}
          <div style={{ position: 'relative', paddingBottom: '32px', paddingRight: '32px' }}>
            <div style={{
              position: 'relative', width: '100%', aspectRatio: '1',
              borderRadius: '50% 40% 55% 45% / 45% 55% 45% 55%',
              overflow: 'hidden',
            }}>
              <Image
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80&fit=crop"
                alt="Florería Mori — arreglo floral artesanal"
                fill priority className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Floating badge */}
            <div style={{
              position: 'absolute', bottom: '0', left: '-20px',
              background: 'var(--mocha)', borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)', padding: '14px 20px', color: 'white',
            }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 600, color: 'var(--camel-light)' }}>2012</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(253,248,244,0.65)', marginTop: '2px' }}>Fundada en Peñalolén</div>
            </div>
            <div style={{
              position: 'absolute', top: '20px', right: '-8px',
              background: 'white', borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-md)', padding: '12px 16px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>🌺</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, color: 'var(--terra)' }}>Flores</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--gris)' }}>Cada mañana</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HISTORIA / TIMELINE ──────────────────────────────── */}
      <section style={{ background: 'var(--warm-white)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--terra)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
              Nuestra trayectoria
            </p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 400, color: 'var(--mocha)' }}>
              Más de una década floreciendo
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }} className="timeline-grid">
            {TIMELINE.map((item, i) => (
              <div key={item.year} style={{
                padding: '32px 28px',
                borderRight: i < 3 ? '1px solid rgba(107,62,38,0.1)' : 'none',
                position: 'relative',
              }}>
                <div style={{
                  fontFamily: 'var(--font-heading)', fontSize: '48px', fontWeight: 700,
                  color: 'var(--blush-deep)', opacity: 0.6, lineHeight: 1, marginBottom: '8px',
                }}>
                  {item.year}
                </div>
                <div style={{
                  width: '32px', height: '3px', background: 'var(--terra)',
                  borderRadius: '2px', marginBottom: '16px',
                }} />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 500, color: 'var(--mocha)', marginBottom: '10px' }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', fontWeight: 300, color: 'var(--gris)', lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALORES ──────────────────────────────────────────── */}
      <section style={{ background: 'var(--warm-cream)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--terra)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
              Por qué elegirnos
            </p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 400, color: 'var(--mocha)' }}>
              Lo que nos hace únicos
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="values-nos-grid">
            {VALUES.map(v => (
              <div key={v.title} style={{
                background: 'white', borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-sm)', padding: '28px 24px',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }} className="value-card">
                <span style={{ fontSize: '32px', display: 'block', marginBottom: '16px' }}>{v.emoji}</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 500, color: 'var(--mocha)', marginBottom: '10px' }}>
                  {v.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', fontWeight: 300, color: 'var(--gris)', lineHeight: 1.7 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERÍA RÁPIDA ───────────────────────────────────── */}
      <section style={{ background: 'var(--warm-white)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--terra)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>
                Nuestro trabajo
              </p>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, color: 'var(--mocha)' }}>
                Arreglos con alma
              </h2>
            </div>
            <a href="https://www.instagram.com/floreriamori122012/" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--terra)', textDecoration: 'none' }}>
              Ver más en Instagram →
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }} className="nos-gallery-grid">
            {[
              'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=400&q=80&fit=crop',
              'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80&fit=crop',
              'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=400&q=80&fit=crop',
              'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&q=80&fit=crop',
            ].map((src, i) => (
              <a key={i} href="https://www.instagram.com/floreriamori122012/" target="_blank" rel="noopener noreferrer"
                style={{ position: 'relative', aspectRatio: '1', display: 'block', overflow: 'hidden', borderRadius: 'var(--radius-md)' }}
                className="nos-gallery-item">
                <Image src={src} alt={`Arreglo Florería Mori ${i + 1}`} fill className="object-cover"
                  style={{ transition: 'transform 0.4s ease' }}
                  sizes="(max-width: 640px) 50vw, 25vw" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, var(--mocha), #4e2a14)', padding: '72px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--camel-light)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
          ¿Listo para sorprender?
        </p>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 400, color: 'white', marginBottom: '16px', lineHeight: 1.2 }}>
          Contáctanos y creamos<br />el arreglo perfecto para ti
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 300, color: 'rgba(253,248,244,0.65)', marginBottom: '36px', maxWidth: '480px', margin: '0 auto 36px' }}>
          Escríbenos por WhatsApp y te respondemos en minutos. También puedes visitarnos en Av. Grecia 8628, Peñalolén.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://wa.me/56929895674?text=Hola%20Florería%20Mori!%20Vi%20su%20página%20y%20quisiera%20cotizar%20un%20arreglo%20🌸"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#25D366', color: 'white',
              fontSize: '15px', fontWeight: 600, padding: '14px 32px',
              borderRadius: 'var(--radius-pill)', textDecoration: 'none',
              fontFamily: 'var(--font-body)', boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
            }}>
            💬 Escribir por WhatsApp
          </a>
          <Link href="/catalogo"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'transparent', color: 'white',
              fontSize: '15px', fontWeight: 600, padding: '13px 32px',
              borderRadius: 'var(--radius-pill)', textDecoration: 'none',
              fontFamily: 'var(--font-body)', border: '1.5px solid rgba(255,255,255,0.35)',
            }}>
            🌸 Ver catálogo
          </Link>
        </div>
      </section>

      <style>{`
        .nos-gallery-item:hover img { transform: scale(1.06); }
        .value-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md) !important; }
        @media (max-width: 960px) {
          .nosotros-hero-grid { grid-template-columns: 1fr !important; }
          .timeline-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .values-nos-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .nos-gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .timeline-grid { grid-template-columns: 1fr !important; }
          .values-nos-grid { grid-template-columns: 1fr !important; }
          .nos-gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  )
}
