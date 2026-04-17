import { MapPin, Clock, MessageCircle } from 'lucide-react'
import { whatsappURL } from '@/lib/whatsapp'

export const metadata = {
  title: 'Delivery',
  description: 'Zonas de entrega de Florería Mori en Santiago. Delivery en Peñalolén y comunas cercanas.',
}

const COMUNAS = [
  'Peñalolén', 'La Florida', 'Macul', 'Ñuñoa', 'Providencia',
  'Las Condes', 'Vitacura', 'La Reina', 'San Joaquín', 'La Granja',
]

export default function DeliveryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-heading text-4xl font-bold text-gray-800 mb-2">Delivery</h1>
      <p className="text-gray-500 mb-12">Llevamos tus flores directamente a la puerta</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="text-primary" size={24} />
            <h2 className="font-heading text-2xl font-semibold text-gray-800">Comunas que atendemos</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {COMUNAS.map(c => (
              <div key={c} className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-sm text-sm font-medium text-gray-700">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {c}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-primary/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="text-primary" size={24} />
              <h2 className="font-heading text-xl font-semibold text-gray-800">Horarios y precios</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Los horarios de entrega y el costo de delivery se coordinan directamente con la tienda.
              Escríbenos por WhatsApp y te responderemos a la brevedad con toda la información.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3">¿Tu comuna no está en la lista?</h3>
            <p className="text-sm text-gray-500 mb-4">Contáctanos de todas formas, podemos buscar una solución para ti.</p>
            <a href={whatsappURL()} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-green-800 transition-colors">
              <MessageCircle size={18} /> Consultar delivery
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
