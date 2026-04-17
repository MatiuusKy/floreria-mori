import Link from 'next/link'
import { Share2, MessageCircle, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white/80 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-heading text-xl text-white mb-3">🌸 Florería Mori</h3>
          <p className="text-sm leading-relaxed">Arreglos florales únicos para cada momento especial en Peñalolén, Santiago.</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Páginas</h4>
          <ul className="space-y-2 text-sm">
            {[['/', 'Inicio'], ['/catalogo', 'Catálogo'], ['/delivery', 'Delivery'], ['/nosotros', 'Nosotros'], ['/contacto', 'Contacto']].map(([href, label]) => (
              <li key={href}><Link href={href} className="hover:text-secondary transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Contáctanos</h4>
          <div className="space-y-3 text-sm">
            <a href="https://wa.me/56929895674" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-secondary transition-colors">
              <MessageCircle size={16} /> +56 9 2989 5674
            </a>
            <a href="https://www.instagram.com/floreriamori122012/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Share2 size={16} /> @floreriamori122012
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={16} /> Peñalolén, Santiago
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 text-center py-4 text-xs text-white/40">
        © {new Date().getFullYear()} Florería Mori. Todos los derechos reservados.
      </div>
    </footer>
  )
}
