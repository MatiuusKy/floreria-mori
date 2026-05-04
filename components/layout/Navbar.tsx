'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import LogoFloraBoutique from '@/components/LogoFloraBoutique'
import AnnouncementBar from './AnnouncementBar'

const NAV_LINKS = [
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/ocasiones', label: 'Ocasiones' },
  { href: '/delivery', label: 'Delivery' },
  { href: '/nosotros', label: 'Nosotros' },
]

function InstagramIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.115 1.526 5.845L.057 23.5l5.799-1.517A11.924 11.924 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.648-.491-5.177-1.35l-.37-.218-3.445.901.919-3.353-.24-.387A9.959 9.959 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '56929895674'
  const waHref = `https://wa.me/${waNumber}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="sticky top-0 z-40">
      <AnnouncementBar />
      <header
        className={`bg-white/95 backdrop-blur-sm border-b border-linen h-16 transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-center relative">

          {/* Links izquierda (desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body uppercase tracking-[0.2em] text-[11px] font-medium text-charcoal hover:text-burgundy transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo centrado (absolute) */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" aria-label="Flora Boutique — inicio">
              <LogoFloraBoutique variant="text-svg" height={44} />
            </Link>
          </div>

          {/* Íconos derecha (desktop) */}
          <div className="hidden lg:flex items-center gap-4 ml-auto">
            <a
              href="https://instagram.com/floraboutique.cl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Flora Boutique"
              className="text-muted hover:text-burgundy transition-colors duration-200"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Flora Boutique"
              style={{ color: '#25D366' }}
            >
              <WhatsAppIcon size={18} />
            </a>
          </div>

          {/* Mobile: logo izquierda + hamburger derecha */}
          <div className="flex lg:hidden items-center w-full justify-between">
            <Link href="/" aria-label="Flora Boutique — inicio">
              <LogoFloraBoutique variant="text-svg" height={36} />
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              className="flex flex-col gap-[5px] p-2"
            >
              <span className="block w-6 border-t border-charcoal" />
              <span className="block w-6 border-t border-charcoal" />
              <span className="block w-6 border-t border-charcoal" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-50 bg-white-warm flex flex-col items-center justify-center transition-transform duration-300 ease-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Cerrar menú"
          className="absolute top-6 right-6 text-charcoal text-2xl font-light"
        >
          ✕
        </button>
        <nav className="flex flex-col items-center w-full">
          {NAV_LINKS.map((link, i) => (
            <div key={link.href} className="w-full text-center">
              {i > 0 && <div className="border-t border-linen mx-12" />}
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-6 font-heading font-normal text-charcoal hover:text-burgundy transition-colors"
                style={{ fontSize: '38px' }}
              >
                {link.label}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}
