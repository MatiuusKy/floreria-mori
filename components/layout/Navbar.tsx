'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, MessageCircle } from 'lucide-react'

const links = [
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/delivery', label: 'Delivery' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading text-xl font-semibold text-primary">
          🌸 Florería Mori
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              {l.label}
            </Link>
          ))}
          <a href="https://wa.me/56929895674" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-green-800 transition-colors">
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menú">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-background border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-base font-medium text-gray-700 py-2 border-b border-gray-100">
              {l.label}
            </Link>
          ))}
          <a href="https://wa.me/56929895674" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 rounded-full">
            <MessageCircle size={18} />
            Contactar por WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}
