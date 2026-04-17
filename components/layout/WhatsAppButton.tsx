'use client'
import { MessageCircle } from 'lucide-react'
import { whatsappURL } from '@/lib/whatsapp'
import { trackWhatsAppClick } from '@/lib/analytics'

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative group flex flex-col items-end">
        {/* Tooltip — visible on hover via CSS group */}
        <div className="absolute bottom-full mb-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white text-gray-700 text-xs font-medium px-3 py-2 rounded-xl shadow-md whitespace-nowrap pointer-events-none">
          ¿Buscas flores para hoy? Escríbenos 🌸
        </div>
        {/* Button */}
        <a
          href={whatsappURL()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp — ¿Buscas flores para hoy? Escríbenos"
          onClick={() => trackWhatsAppClick()}
          className="relative bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          {/* Pulsing ring — visible on mobile, hidden on desktop */}
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25 md:opacity-0" />
          <MessageCircle size={26} className="relative z-10" />
        </a>
      </div>
    </div>
  )
}
