'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { LogoMori } from '@/components/LogoMori'

const navLinks = [
  { href: '/catalogo',    label: 'Catálogo' },
  { href: '/#como-pedir', label: 'Cómo Pedir' },
  { href: '/nosotros',    label: 'Nosotros' },
  { href: '/#galeria',    label: 'Galería' },
  { href: '/contacto',    label: 'Ubicación' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* ── Topbar ─────────────────────────────────────────── */}
      <div style={{
        background: 'var(--mocha)',
        padding: '8px 32px',
        fontSize: '11.5px',
        letterSpacing: '1px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0',
        flexWrap: 'wrap',
        color: 'rgba(253,248,244,0.55)',
      }}>
        {[
          { icon: '🚚', text: 'Envíos a domicilio en Santiago y zona oriente', highlight: true,  cls: 'topbar-item-delivery' },
          { icon: '⏰', text: 'Lun–Sáb ', highlight: false, after: '9:00–19:00 hrs', afterHighlight: true, cls: 'topbar-item-hours' },
          { icon: '📍', text: 'Av. Grecia 8628, Peñalolén', highlight: false, cls: 'topbar-item-address' },
        ].map((item, i) => (
          <span key={i} className={item.cls} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {i > 0 && (
              <span style={{
                display: 'inline-block',
                width: '1px',
                height: '12px',
                background: 'rgba(255,255,255,0.12)',
                margin: '0 16px',
              }} />
            )}
            <span>{item.icon}</span>
            <span style={{ color: item.highlight ? 'var(--camel-light)' : 'rgba(253,248,244,0.55)', fontWeight: item.highlight ? 500 : 400 }}>
              {item.text}
            </span>
            {item.after && (
              <span style={{ color: 'var(--camel-light)', fontWeight: 500 }}>{item.after}</span>
            )}
          </span>
        ))}
        {/* Phone link */}
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            display: 'inline-block',
            width: '1px',
            height: '12px',
            background: 'rgba(255,255,255,0.12)',
            margin: '0 16px',
          }} />
          <span>📞</span>
          <a
            href="https://wa.me/56929895674"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--camel-light)', fontWeight: 500, textDecoration: 'none' }}
          >
            +56 9 2989 5674
          </a>
        </span>
      </div>

      {/* ── Header ─────────────────────────────────────────── */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 200,
        background: 'var(--warm-cream)',
        borderBottom: '1px solid rgba(107,62,38,0.1)',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 24px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }} aria-label="Florería Mori — Inicio">
            <LogoMori />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex" style={{ alignItems: 'center', gap: '32px' }}>
            {navLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="nav-link"
                style={{
                  fontSize: '13px',
                  color: 'var(--mocha-light)',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '10px' }}>
            <a
              href="https://www.instagram.com/floreriamori122012/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--mocha)',
                padding: '8px 14px',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid rgba(107,62,38,0.15)',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--blush)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              aria-label="Instagram @floreriamori122012"
            >
              📸 Instagram
            </a>
            <a
              href="https://wa.me/56929895674?text=Hola%20Florería%20Mori!%20Vi%20su%20página%20y%20quisiera%20consultar%20sobre%20sus%20flores%20🌸"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'white',
                padding: '9px 18px',
                borderRadius: 'var(--radius-pill)',
                background: '#25D366',
                boxShadow: '0 4px 14px rgba(37,211,102,0.28)',
                textDecoration: 'none',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,211,102,0.38)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(37,211,102,0.28)'
              }}
            >
              💬 WhatsApp
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú"
            style={{ padding: '8px', color: 'var(--mocha)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div
          className="md:hidden"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 300,
            background: 'var(--warm-cream)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <LogoMori />
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              style={{ padding: '8px', color: 'var(--mocha)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
            {navLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  fontSize: '18px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 500,
                  color: 'var(--mocha)',
                  textDecoration: 'none',
                  padding: '14px 0',
                  borderBottom: '1px solid rgba(107,62,38,0.08)',
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '24px' }}>
            <a
              href="https://wa.me/56929895674?text=Hola%20Florería%20Mori!%20Vi%20su%20página%20y%20quisiera%20consultar%20sobre%20sus%20flores%20🌸"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '15px',
                fontWeight: 600,
                color: 'white',
                padding: '14px',
                borderRadius: 'var(--radius-pill)',
                background: '#25D366',
                textDecoration: 'none',
              }}
            >
              💬 Contactar por WhatsApp
            </a>
            <a
              href="https://www.instagram.com/floreriamori122012/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--mocha)',
                padding: '14px',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid rgba(107,62,38,0.2)',
                textDecoration: 'none',
              }}
            >
              📸 @floreriamori122012
            </a>
          </div>
        </div>
      )}
    </>
  )
}
