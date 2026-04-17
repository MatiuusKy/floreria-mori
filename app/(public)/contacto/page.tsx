import type { Metadata } from 'next'
import { MessageCircle, Share2, MapPin, Phone } from 'lucide-react'
import { whatsappURL } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contáctanos por WhatsApp o Instagram. Florería Mori en Peñalolén, Santiago. +56 9 2989 5674.',
  alternates: { canonical: 'https://floreriamori.cl/contacto' },
}

export default function ContactoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-heading text-4xl font-bold text-gray-800 mb-2">Contacto</h1>
      <p className="text-gray-500 mb-12">Estamos aquí para ayudarte a encontrar el arreglo perfecto</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <a href={whatsappURL()} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 bg-primary text-white rounded-2xl p-5 hover:bg-green-800 transition-colors">
            <MessageCircle size={28} />
            <div>
              <p className="font-semibold text-lg">WhatsApp</p>
              <p className="text-white/80 text-sm">+56 9 2989 5674</p>
            </div>
          </a>

          <a href="https://www.instagram.com/floreriamori122012/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 bg-gradient-to-r from-secondary to-accent text-white rounded-2xl p-5 hover:opacity-90 transition-opacity">
            <Share2 size={28} />
            <div>
              <p className="font-semibold text-lg">Instagram</p>
              <p className="text-white/80 text-sm">@floreriamori122012</p>
            </div>
          </a>

          <div className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm">
            <MapPin className="text-primary shrink-0" size={28} />
            <div>
              <p className="font-semibold text-gray-800">Ubicación</p>
              <p className="text-gray-500 text-sm">Peñalolén, Santiago, Chile</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm">
            <Phone className="text-primary shrink-0" size={28} />
            <div>
              <p className="font-semibold text-gray-800">Teléfono</p>
              <p className="text-gray-500 text-sm">+56 9 2989 5674</p>
            </div>
          </div>
        </div>

        {/* Google Maps embed */}
        <div className="rounded-2xl overflow-hidden shadow-sm h-80 md:h-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26738.!2d-70.5529!3d-33.4886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d02a6c1d91d1%3A0x4c2cd2c23c3b8a1c!2sPe%C3%B1alol%C3%A9n%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '320px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  )
}
