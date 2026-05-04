'use client'
import Link from 'next/link'
import { LogoFlora } from '@/components/LogoFlora'
import { trackInstagramClick } from '@/lib/analytics'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '56929895674'

const navLinks = [
  { label: 'Catálogo',            href: '/catalogo' },
  { label: 'Delivery',            href: '/delivery' },
  { label: 'Nosotros',            href: '/nosotros' },
  { label: 'Contacto',            href: '/contacto' },
  { label: 'Política de privacidad', href: '/privacidad' },
]

const catalogLinks = [
  { label: 'Ramos de Flores',     href: '/catalogo?q=ramo' },
  { label: 'Arreglos en Florero', href: '/catalogo?q=arreglo' },
  { label: 'Amor & Romántico',    href: '/catalogo?categoria=amor' },
  { label: 'Cumpleaños',          href: '/catalogo?categoria=cumpleanos' },
  { label: 'Condolencias',        href: '/catalogo?categoria=condolencias' },
]

const linkStyle: React.CSSProperties = {
  color: 'rgba(253,248,246,0.45)',
  textDecoration: 'none',
  fontSize: '13px',
  transition: 'color 0.2s',
  lineHeight: 2,
  fontFamily: 'var(--font-body)',
}

function FooterLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      style={linkStyle}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-light)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,248,246,0.45)')}
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--charcoal)', color: 'rgba(253,248,246,0.6)' }}>
      {/* Gold separator */}
      <div style={{ height: '1px', background: 'rgba(201,169,110,0.3)' }} />

      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '56px 24px 40px',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1.2fr',
        gap: '40px',
      }}
        className="footer-grid"
      >
        {/* ── Col 1: Marca ───────────────────────────────── */}
        <div>
          <LogoFlora inverted />
          <p style={{ fontSize: '13px', lineHeight: 1.8, marginTop: '16px', maxWidth: '260px', color: 'rgba(253,248,246,0.45)', fontFamily: 'var(--font-body)' }}>
            Floristería premium en Santiago. Ramos, arreglos y flores a domicilio. Despacho el mismo día.
          </p>
          {/* Social icons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <a
              href="https://www.instagram.com/floraboutique.cl/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackInstagramClick()}
              aria-label="Instagram Flora Boutique"
              style={{
                width: '36px', height: '36px',
                background: 'rgba(253,248,246,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(253,248,246,0.15)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(253,248,246,0.08)')}
            >
              📸
            </a>
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Flora Boutique"
              style={{
                width: '36px', height: '36px',
                background: 'rgba(253,248,246,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(253,248,246,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(253,248,246,0.08)')}
            >
              💬
            </a>
          </div>
        </div>

        {/* ── Col 2: Navegación ────────────────────────── */}
        <div>
          <h4 style={{ color: 'white', fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
            Navegación
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {navLinks.map(({ label, href }) => (
              <FooterLink key={label} href={href}>{label}</FooterLink>
            ))}
          </div>
        </div>

        {/* ── Col 3: Catálogo ─────────────────────────── */}
        <div>
          <h4 style={{ color: 'white', fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
            Catálogo
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {catalogLinks.map(({ label, href }) => (
              <FooterLink key={label} href={href}>{label}</FooterLink>
            ))}
          </div>
        </div>

        {/* ── Col 4: Contacto ─────────────────────────── */}
        <div>
          <h4 style={{ color: 'white', fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
            Contacto
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
              style={{ ...linkStyle, display: 'flex', alignItems: 'flex-start', gap: '8px' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-light)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,248,246,0.45)')}>
              <span>💬</span>
              <span>WhatsApp</span>
            </a>
            <a href="https://www.instagram.com/floraboutique.cl/" target="_blank" rel="noopener noreferrer"
              onClick={() => trackInstagramClick()}
              style={{ ...linkStyle, display: 'flex', alignItems: 'flex-start', gap: '8px' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-light)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(253,248,246,0.45)')}>
              <span>📸</span>
              <span>@floraboutique.cl</span>
            </a>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'rgba(253,248,246,0.45)', fontSize: '13px', fontFamily: 'var(--font-body)' }}>
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
        borderTop: '1px solid rgba(201,169,110,0.15)',
        textAlign: 'center',
        padding: '16px 24px',
        fontSize: '12px',
        color: 'rgba(253,248,246,0.25)',
        fontFamily: 'var(--font-body)',
      }}>
        © {new Date().getFullYear()} Flora Boutique — Todos los derechos reservados &nbsp;·&nbsp; Diseñado con 💐 en Santiago de Chile
      </div>
    </footer>
  )
}
