'use client'
import { useState, useEffect } from 'react'
import type { Metadata } from 'next'
import { Search } from 'lucide-react'
import CategoryChip from '@/components/ui/CategoryChip'
import ProductGrid from '@/components/ui/ProductGrid'
import { Product, Category } from '@/types'

export const metadata: Metadata = {
  title: 'Catálogo de flores',
  description: 'Explora nuestra colección de ramos y arreglos florales. Flores frescas a domicilio en Santiago. Pide por WhatsApp.',
  alternates: { canonical: 'https://floreriamori.cl/catalogo' },
}

export default function CatalogoPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(r => r.json()),
      fetch('/api/categories').then(r => r.json()),
    ]).then(([prods, cats]) => {
      setProducts(prods)
      setCategories(cats)
      // Read URL param for initial category filter
      const params = new URLSearchParams(window.location.search)
      const cat = params.get('categoria')
      if (cat) {
        const found = cats.find((c: Category) => c.slug === cat)
        if (found) setActiveCategory(found.id)
      }
      setLoading(false)
    })
  }, [])

  const filtered = products
    .filter(p => p.available)
    .filter(p => activeCategory ? p.category_id === activeCategory : true)
    .filter(p => search ? p.name.toLowerCase().includes(search.toLowerCase()) : true)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-heading text-4xl font-bold text-gray-800 mb-2">Catálogo</h1>
      <p className="text-gray-500 mb-8">Explora todos nuestros arreglos florales</p>

      {/* Search + filters */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <CategoryChip label="Todos" active={!activeCategory} onClick={() => setActiveCategory(null)} />
          {categories.map(cat => (
            <CategoryChip
              key={cat.id}
              label={cat.name}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
              <div className="aspect-square bg-gray-100" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-100 rounded w-1/3" />
                <div className="h-5 bg-gray-100 rounded w-3/4" />
                <div className="h-10 bg-gray-100 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ProductGrid
          products={filtered}
          emptyMessage="No encontramos productos en esta categoría."
        />
      )}
    </div>
  )
}
