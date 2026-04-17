import { Heart, Leaf, Star } from 'lucide-react'

export const metadata = {
  title: 'Nosotros',
  description: 'Conoce la historia de Florería Mori, tu floristería local en Peñalolén, Santiago.',
}

export default function NosotrosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-heading text-4xl font-bold text-gray-800 mb-2">Nuestra historia</h1>
      <p className="text-gray-500 mb-12">Una floristería local con corazón</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-gray-800 mb-4">Quiénes somos</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Florería Mori nació del amor por las flores y el deseo de hacer los momentos especiales aún más memorables.
            Somos una floristería local ubicada en el corazón de Peñalolén, Santiago.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Cada arreglo que creamos lleva cuidado y dedicación, pensado especialmente para la persona que lo recibirá.
            Trabajamos con flores frescas seleccionadas para garantizar la mejor calidad en cada pedido.
          </p>
        </div>
        <div className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-2xl flex items-center justify-center text-8xl aspect-square">
          🌸
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <Leaf className="text-primary" size={28} />, title: 'Local y artesanal', desc: 'Somos un negocio familiar en Peñalolén. Cada arreglo es hecho a mano con dedicación.' },
          { icon: <Heart className="text-primary" size={28} />, title: 'Atención personalizada', desc: 'Te ayudamos a encontrar el arreglo perfecto para cada ocasión y presupuesto.' },
          { icon: <Star className="text-primary" size={28} />, title: 'Calidad garantizada', desc: 'Flores frescas, empaques cuidados y entregas puntuales en toda la zona.' },
        ].map(item => (
          <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <div className="flex justify-center mb-3">{item.icon}</div>
            <h3 className="font-heading font-semibold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
