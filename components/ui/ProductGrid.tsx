import { Product } from '@/types'
import ProductCard from './ProductCard'

interface Props {
  products: Product[]
  emptyMessage?: string
}

export default function ProductGrid({ products, emptyMessage = 'No hay productos disponibles.' }: Props) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <div className="text-5xl mb-4">🌿</div>
        <p className="font-heading text-lg mb-2">{emptyMessage}</p>
        <a href="https://wa.me/56929895674" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-green-800 transition-colors">
          Consultar por WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p, index) => <ProductCard key={p.id} product={p} priority={index < 3} />)}
    </div>
  )
}
