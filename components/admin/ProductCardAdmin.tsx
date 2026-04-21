'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Pencil, Trash2, Star, Flame, Eye, ToggleLeft, ToggleRight } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { getProductImage } from '@/lib/product-images'

interface Props {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
  onRefresh: () => void
}

export default function ProductCardAdmin({ product, onEdit, onDelete, onRefresh }: Props) {
  const [toggling, setToggling] = useState<string | null>(null)

  async function toggle(field: 'available' | 'featured') {
    setToggling(field)
    try {
      await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, [field]: !product[field], category: undefined, created_at: undefined }),
      })
      onRefresh()
    } finally {
      setToggling(null)
    }
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col">
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={getProductImage(product.image_url, product.category?.slug)}
          alt={product.name}
          fill
          className="object-cover"
          sizes="300px"
        />
        {product.featured && (
          <span className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <Star size={9} /> Dest.
          </span>
        )}
        {product.best_seller && (
          <span className="absolute top-2 right-2 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <Flame size={9} /> Top
          </span>
        )}
        {!product.available && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="bg-white/90 text-xs font-bold text-red-600 px-3 py-1 rounded-full">Sin stock</span>
          </div>
        )}

        {/* Preview button */}
        <a
          href={`/catalogo/${product.id}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Ver en sitio"
          className="absolute bottom-2 right-2 bg-white rounded-full p-1.5 shadow hover:bg-gray-50 transition-colors"
        >
          <Eye size={13} className="text-gray-500" />
        </a>
      </div>

      <div className="p-3 flex flex-col flex-1">
        <p className="text-xs text-accent font-semibold mb-0.5">{product.category?.name ?? '—'}</p>
        <p className="font-semibold text-gray-800 text-sm leading-tight mb-1 truncate">{product.name}</p>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-primary font-bold text-sm">{formatPrice(product.discount_price ?? product.price)}</span>
          {product.discount_price && (
            <span className="text-gray-400 line-through text-xs">{formatPrice(product.price)}</span>
          )}
        </div>

        {/* Quick toggles */}
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => toggle('available')}
            disabled={toggling !== null}
            title={product.available ? 'Desactivar disponibilidad' : 'Activar disponibilidad'}
            className={`flex-1 flex items-center justify-center gap-1 text-xs font-semibold py-1.5 rounded-lg border transition-colors ${
              product.available
                ? 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
                : 'border-gray-200 text-gray-400 hover:bg-gray-50'
            } disabled:opacity-50`}
          >
            {toggling === 'available' ? (
              <span className="animate-spin">⟳</span>
            ) : product.available ? (
              <><ToggleRight size={13} /> Activo</>
            ) : (
              <><ToggleLeft size={13} /> Inactivo</>
            )}
          </button>

          <button
            onClick={() => toggle('featured')}
            disabled={toggling !== null}
            title={product.featured ? 'Quitar de destacados' : 'Marcar como destacado'}
            className={`flex-1 flex items-center justify-center gap-1 text-xs font-semibold py-1.5 rounded-lg border transition-colors ${
              product.featured
                ? 'border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                : 'border-gray-200 text-gray-400 hover:bg-gray-50'
            } disabled:opacity-50`}
          >
            {toggling === 'featured' ? (
              <span className="animate-spin">⟳</span>
            ) : (
              <><Star size={11} /> {product.featured ? 'Dest.' : 'Normal'}</>
            )}
          </button>
        </div>

        {/* Edit / Delete */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 flex items-center justify-center gap-1 text-xs font-semibold py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600"
          >
            <Pencil size={12} /> Editar
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 flex items-center justify-center gap-1 text-xs font-semibold py-1.5 rounded-lg border border-red-100 hover:bg-red-50 text-red-500"
          >
            <Trash2 size={12} /> Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
