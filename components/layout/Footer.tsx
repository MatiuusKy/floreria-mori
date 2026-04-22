'use client'
import Link from 'next/link'
import { LogoMori } from '@/components/LogoMori'
import { trackInstagramClick } from '@/lib/analytics'

const catalogLinks = [
  { label: 'Ramos de Flores',      href: '/catalogo?q=ramo' },
  { label: 'Arreglos en Florero',  href: '/catalogo?q=arreglo' },
  { label: 'Canastos Florales',    href: '/catalogo?q=canasto' },
  { label: 'Bouquets',             href: '/catalogo?q=bouquet' },
  { label: 'Centros de Mesa',      href: '/catalogo?q=centro' },
]

const occasionLinks = [
  { label: 'Amor & Romántico', slug: 'amor' },
  { label: 'Cumpleaños',       slug: 'cumpleanos' },
  { label: 'Nacimientos',      slug: 'arreglos' },
  { label: 'Bodas',            slug: 'eventos' },
  { label: 'Condolencias',     slug: 'condolencias' },
]

const linkStyle: React.CSSProperties = {
  color: 'rgba(253,248,244,0.38)',
  textDecoration: 'none',
  fontSize: '13px',
  transition: 'color 0.2s',
  lineHeight: 1.9,
}

function FooterLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      style={linkStyle}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--camel-light)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,248,244,0.38)')}
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--mocha)', color: 'rgba(253,248,244,0.6)' }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '56px 24px 40px',
        display: 'grid',
        gridTemplateColumns: '2.2fr 1fr 1fr 1.2fr',
        gap: '40px',
      }}
        className="footer-grid"
      >
        {/* ── Col 1: Marca ───────────────────────────────── */}
        <div>
          {/* Logo on dark background: override text colors */}
          <div style={{ filter: 'brightness(1.8) saturate(0.7)' }}>
            <LogoMori />
          </div>
          <p style={{ fontSize: '13px', lineHeight: 1.8, marginTop: '16px', maxWidth: '260px', color: 'rgba(253,248,244,0.45)' }}>
            Florería familiar en Peñalolén desde 2012. Arreglos únicos para cada momento especial, atendido directamente por sus dueños.
          </p>
          {/* Social icons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <a
              href="https://www.instagram.com/floreriamori122012/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackInstagramClick()}
              aria-label="Instagram Florería Mori"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(253,248,244,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(253,248,244,0.15)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(253,248,244,0.08)')}
            >
              📸
            </a>
            <a
              href="https://wa.me/56929895674"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Florería Mori"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(253,248,244,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(253,248,244,0.15)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(253,248,244,0.08)')}
            >
              💬
            </a>
          </div>
        </div>

        {/* ── Col 2: Catálogo ─────────────────────────────── */}
        <div>
          <h4 style={{ color: 'white', fontSize: '13px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
            Catálogo
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {catalogLinks.map(({ label, href }) => (
              <FooterLink key={label} href={href}>{label}</FooterLink>
            ))}
          </div>
        </div>

        {/* ── Col 3: Ocasiones ────────────────────────────── */}
        <div>
          <h4 style={{ color: 'white', fontSize: '13px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
            Ocasiones
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {occasionLinks.map(({ label, slug }) => (
              <FooterLink key={slug} href={`/catalogo?categoria=${slug}`}>{label}</FooterLink>
            ))}
          </div>
        </div>

        {/* ── Col 4: Contacto ─────────────────────────────── */}
        <div>
          <h4 style={{ color: 'white', fontSize: '13px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
            Contacto
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <a href="https://wa.me/56929895674" target="_blank" rel="noopener noreferrer"
              style={{ ...linkStyle, display: 'flex', alignItems: 'flex-start', gap: '8px' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--camel-light)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,248,244,0.38)')}>
              <span>💬</span>
              <span>+56 9 2989 5674</span>
            </a>
            <a href="https://www.instagram.com/floreriamori122012/" target="_blank" rel="noopener noreferrer"
              onClick={() => trackInstagramClick()}
              style={{ ...linkStyle, display: 'flex', alignItems: 'flex-start', gap: '8px' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--camel-light)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,248,244,0.38)')}>
              <span>📸</span>
              <span>@floreriamori122012</span>
            </a>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'rgba(253,248,244,0.38)', fontSize: '13px' }}>
              <span>📍</span>
              <span>Av. Grecia 8628, Peñalolén, Santiago</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'rgba(253,248,244,0.38)', fontSize: '13px' }}>
              <span>⏰</span>
              <span>Lun–Vie 9:00–20:00<br />Sáb 9:00–18:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────── */}
      <style>{`
        @media (max-width: 960px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        textAlign: 'center',
        padding: '16px 24px',
        fontSize: '12px',
        color: 'rgba(253,248,244,0.25)',
      }}>
        © {new Date().getFullYear()} Florería Mori — Todos los derechos reservados &nbsp;·&nbsp; Diseñado con 💐 en Santiago de Chile
      </div>
    </footer>
  )
}
