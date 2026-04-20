'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import CategoryChip from '@/components/ui/CategoryChip'
import ProductGrid from '@/components/ui/ProductGrid'
import { Product, Category } from '@/types'

const PAGE_SIZE = 12

export default function CatalogoClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [search, setSearch] = useState(searchParams.get('q') ?? '')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(r => r.json()),
      fetch('/api/categories').then(r => r.json()),
    ]).then(([prods, cats]) => {
      setProducts(Array.isArray(prods) ? prods : [])
      setCategories(Array.isArray(cats) ? cats : [])

      const catSlug = searchParams.get('categoria')
      if (catSlug) {
        const found = (cats as Category[]).find(c => c.slug === catSlug)
        if (found) setActiveCategory(found.id)
      }
      setLoading(false)
    }).catch(() => {
      setError(true)
      setLoading(false)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateURL = useCallback((catId: string | null, q: string) => {
    const params = new URLSearchParams()
    if (catId) {
      const cat = categories.find(c => c.id === catId)
      if (cat) params.set('categoria', cat.slug)
    }
    if (q) params.set('q', q)
    const query = params.toString()
    router.replace(query ? `/catalogo?${query}` : '/catalogo', { scroll: false })
  }, [categories, router])

  function handleCategoryClick(catId: string | null) {
    setActiveCategory(catId)
    setPage(1)
    updateURL(catId, search)
  }

  function handleSearchChange(q: string) {
    setSearch(q)
    setPage(1)
    updateURL(activeCategory, q)
  }

  const filtered = products
    .filter(p => p.available)
    .filter(p => activeCategory ? p.category_id === activeCategory : true)
    .filter(p => search ? p.name.toLowerCase().includes(search.toLowerCase()) : true)

  const visible = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < filtered.length

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
            onChange={e => handleSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-primary"
            aria-label="Buscar producto"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filtrar por categoría">
          <CategoryChip label="Todos" active={!activeCategory} onClick={() => handleCategoryClick(null)} />
          {categories.map(cat => (
            <CategoryChip
              key={cat.id}
              label={cat.name}
              active={activeCategory === cat.id}
              onClick={() => handleCategoryClick(cat.id)}
            />
          ))}
        </div>
      </div>

      {error ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No pudimos cargar los productos.</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm font-semibold text-primary underline"
          >
            Intentar de nuevo
          </button>
        </div>
      ) : loading ? (
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
        <>
          <ProductGrid
            products={visible}
            emptyMessage={
              search || activeCategory
                ? 'No encontramos productos con ese filtro.'
                : 'No hay productos disponibles por ahora.'
            }
          />
          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setPage(p => p + 1)}
                className="px-8 py-3 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Ver más productos ({filtered.length - visible.length} restantes)
              </button>
            </div>
          )}
          {!loading && filtered.length > 0 && (
            <p className="text-center text-xs text-gray-400 mt-4">
              Mostrando {visible.length} de {filtered.length} productos
            </p>
          )}
        </>
      )}
    </div>
  )
}
