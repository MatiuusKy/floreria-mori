'use client'
import Link from 'next/link'
import LogoFloraBoutique from '@/components/LogoFloraBoutique'
import { trackInstagramClick } from '@/lib/analytics'

export default function Footer() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '56929895674'

  return (
    <footer className="bg-charcoal pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Col 1 — Marca */}
          <div className="col-span-2 lg:col-span-1">
            <LogoFloraBoutique variant="full-image" height={80} />
            <p className="font-body text-sm text-white/50 font-light mt-4 leading-relaxed">
              Hecho con amor · Santiago, Chile <span style={{ color: '#C9A0B8', fontSize: '10px' }}>✦</span>
            </p>
            <div className="flex items-center gap-4 mt-5">
              <a
                href="https://instagram.com/floraboutique.cl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                onClick={() => trackInstagramClick()}
                className="text-white/40 hover:text-blush transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-white/40 hover:text-blush transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.115 1.526 5.845L.057 23.5l5.799-1.517A11.924 11.924 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.648-.491-5.177-1.35l-.37-.218-3.445.901.919-3.353-.24-.387A9.959 9.959 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Navegar */}
          <div>
            <h4 className="font-body uppercase tracking-[0.2em] text-xs text-burgundy-light mb-4">Navegar</h4>
            <ul className="space-y-2">
              {[
                { href: '/catalogo', label: 'Catálogo' },
                { href: '/ocasiones', label: 'Ocasiones' },
                { href: '/delivery', label: 'Delivery' },
                { href: '/nosotros', label: 'Nosotros' },
                { href: '/contacto', label: 'Contacto' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-sm text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contacto */}
          <div>
            <h4 className="font-body uppercase tracking-[0.2em] text-xs text-burgundy-light mb-4">Contacto</h4>
            <div className="space-y-2 text-sm text-white/50 leading-relaxed font-body">
              <p>Peñalolén, Santiago</p>
              <p>+56 9 2989 5674</p>
              <p>Lunes a Sábado</p>
              <p>9:00 — 19:00 hrs</p>
            </div>
          </div>

          {/* Col 4 — Zonas de Despacho */}
          <div>
            <h4 className="font-body uppercase tracking-[0.2em] text-xs text-burgundy-light mb-4">Despacho</h4>
            <div className="space-y-2 text-sm text-white/50 font-body">
              <p>Peñalolén · La Reina</p>
              <p>Ñuñoa · Providencia</p>
              <p>Las Condes · Vitacura</p>
              <p>Lo Barnechea · Macul</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.08] mt-14 pt-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-white/20 font-body">© 2025 Flora Boutique · Santiago, Chile</p>
          <p className="text-xs text-white/20 italic font-body">Diseñado con ♥ para flores que enamoran</p>
        </div>
      </div>
    </footer>
  )
}
