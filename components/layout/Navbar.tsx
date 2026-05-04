'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { LogoFlora } from '@/components/LogoFlora'
import AnnouncementBar from './AnnouncementBar'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '56929895674'
const WA_MSG = encodeURIComponent('Hola Flora Boutique 🌸 vi su catálogo web y me gustaría hacer un pedido')

const navLinks = [
  { href: '/catalogo',           label: 'Catálogo' },
  { href: '/catalogo?ocasion=1', label: 'Ocasiones' },
  { href: '/catalogo',           label: 'Flores Preservadas' },
  { href: '/delivery',           label: 'Delivery' },
  { href: '/nosotros',           label: 'Nosotros' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <AnnouncementBar />

      {/* ── Header ─────────────────────────────────────────── */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 200,
        background: 'rgba(253,248,246,0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(232,213,170,0.4)',
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
          <Link href="/" style={{ textDecoration: 'none' }} aria-label="Flora Boutique — Inicio">
            <LogoFlora />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex" style={{ alignItems: 'center', gap: '28px' }}>
            {navLinks.map(l => (
              <Link
                key={l.href + l.label}
                href={l.href}
                className="nav-link"
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  color: 'var(--charcoal)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--violet-brand)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--charcoal)')}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '10px' }}>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 600,
                color: 'white',
                padding: '9px 20px',
                background: '#25D366',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              aria-label="Contactar por WhatsApp"
            >
              💬 WhatsApp
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú"
            style={{ padding: '8px', color: 'var(--charcoal)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className="md:hidden"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 300,
            background: 'var(--cream)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <LogoFlora />
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              style={{ padding: '8px', color: 'var(--charcoal)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {navLinks.map(l => (
              <Link
                key={l.href + l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  color: 'var(--charcoal)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '2.5px',
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(44,31,40,0.06)',
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '24px' }}>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: 600,
                color: 'white',
                padding: '14px',
                background: '#25D366',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
              }}
            >
              💬 Contactar por WhatsApp
            </a>
            <a
              href="https://www.instagram.com/floraboutique.cl/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--charcoal)',
                padding: '14px',
                border: '1px solid rgba(44,31,40,0.15)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
              }}
            >
              📸 @floraboutique.cl
            </a>
          </div>
        </div>
      )}
    </>
  )
}
