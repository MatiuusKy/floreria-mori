import { MessageCircle } from 'lucide-react'
import { whatsappURL } from '@/lib/whatsapp'

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappURL()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse md:animate-none"
    >
      <MessageCircle size={26} />
    </a>
  )
}
