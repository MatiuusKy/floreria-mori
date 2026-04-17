import Image from 'next/image'
import { Pencil, Trash2, Star, Flame } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'

interface Props {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
}

export default function ProductCardAdmin({ product, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="relative aspect-square bg-gray-100">
        {product.image_url ? (
          <Image src={product.image_url} alt={product.name} fill className="object-cover" sizes="300px" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-secondary/20 to-accent/20">🌸</div>
        )}
        {product.featured && <span className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1"><Star size={9} />Dest.</span>}
        {product.best_seller && <span className="absolute top-2 right-2 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1"><Flame size={9} />Top</span>}
      </div>
      <div className="p-3">
        <p className="text-xs text-accent font-semibold mb-0.5">{product.category?.name ?? '—'}</p>
        <p className="font-semibold text-gray-800 text-sm leading-tight mb-1 truncate">{product.name}</p>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-primary font-bold text-sm">{formatPrice(product.discount_price ?? product.price)}</span>
          {product.discount_price && <span className="text-gray-400 line-through text-xs">{formatPrice(product.price)}</span>}
          {!product.available && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold ml-auto">Sin stock</span>}
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(product)}
            className="flex-1 flex items-center justify-center gap-1 text-xs font-semibold py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600">
            <Pencil size={12} /> Editar
          </button>
          <button onClick={() => onDelete(product.id)}
            className="flex-1 flex items-center justify-center gap-1 text-xs font-semibold py-1.5 rounded-lg border border-red-100 hover:bg-red-50 text-red-500">
            <Trash2 size={12} /> Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
