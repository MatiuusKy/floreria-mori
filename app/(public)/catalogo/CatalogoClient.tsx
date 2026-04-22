'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import CategoryChip from '@/components/ui/CategoryChip'
import ProductGrid from '@/components/ui/ProductGrid'
import { Product, Category } from '@/types'

const PAGE_SIZE = 12

const COLOR_OPTIONS = [
  { label: 'Rojo',       value: 'rojo',      hex: '#c0392b' },
  { label: 'Rosa',       value: 'rosa',      hex: '#e91e8c' },
  { label: 'Blanco',     value: 'blanco',    hex: '#f5f0ea' },
  { label: 'Amarillo',   value: 'amarillo',  hex: '#f1c40f' },
  { label: 'Naranja',    value: 'naranja',   hex: '#e67e22' },
  { label: 'Morado',     value: 'morado',    hex: '#8e44ad' },
  { label: 'Verde',      value: 'verde',     hex: '#27ae60' },
  { label: 'Multicolor', value: 'multicolor', hex: 'linear-gradient(135deg,#e91e8c,#f1c40f,#27ae60,#3498db)' },
]

const PRICE_RANGES = [
  { label: 'Menos de $20.000', min: 0,     max: 19999 },
  { label: '$20.000–$35.000',  min: 20000,  max: 35000 },
  { label: 'Más de $35.000',   min: 35001,  max: Infinity },
]

export default function CatalogoClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activePriceRange, setActivePriceRange] = useState<number | null>(null)
  const [activeColor, setActiveColor] = useState<string | null>(null)
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

  const priceRange = activePriceRange !== null ? PRICE_RANGES[activePriceRange] : null

  const filtered = products
    .filter(p => p.available)
    .filter(p => activeCategory ? p.category_id === activeCategory : true)
    .filter(p => search ? p.name.toLowerCase().includes(search.toLowerCase()) : true)
    .filter(p => {
      if (!priceRange) return true
      const price = p.discount_price ?? p.price
      return price >= priceRange.min && price <= priceRange.max
    })
    .filter(p => {
      if (!activeColor) return true
      return (p.colors ?? []).includes(activeColor)
    })

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

        <div className="flex gap-2 flex-wrap" role="group" aria-label="Filtrar por precio">
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--gris-light)', alignSelf: 'center', letterSpacing: '0.5px', fontFamily: 'var(--font-body)' }}>
            PRECIO:
          </span>
          {PRICE_RANGES.map((range, i) => (
            <button
              key={i}
              onClick={() => { setActivePriceRange(activePriceRange === i ? null : i); setPage(1) }}
              style={{
                fontSize: '12px',
                fontWeight: activePriceRange === i ? 600 : 500,
                padding: '5px 14px',
                borderRadius: 'var(--radius-pill)',
                border: activePriceRange === i ? '1.5px solid var(--terra)' : '1.5px solid rgba(107,62,38,0.15)',
                background: activePriceRange === i ? 'var(--terra)' : 'transparent',
                color: activePriceRange === i ? 'white' : 'var(--gris)',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.15s',
              }}
            >
              {range.label}
            </button>
          ))}
        </div>

        <div className="flex gap-3 flex-wrap items-center" role="group" aria-label="Filtrar por color">
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--gris-light)', letterSpacing: '0.5px', fontFamily: 'var(--font-body)' }}>
            COLOR:
          </span>
          {COLOR_OPTIONS.map(color => (
            <button
              key={color.value}
              title={color.label}
              aria-label={`Filtrar por color ${color.label}`}
              onClick={() => { setActiveColor(activeColor === color.value ? null : color.value); setPage(1) }}
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                border: activeColor === color.value ? '2.5px solid var(--mocha)' : '2px solid rgba(0,0,0,0.1)',
                background: color.hex.startsWith('linear') ? color.hex : color.hex,
                cursor: 'pointer',
                outline: activeColor === color.value ? '2px solid var(--camel)' : 'none',
                outlineOffset: '2px',
                transition: 'transform 0.15s',
                transform: activeColor === color.value ? 'scale(1.2)' : 'scale(1)',
                flexShrink: 0,
              }}
            />
          ))}
          {activeColor && (
            <button
              onClick={() => setActiveColor(null)}
              style={{ fontSize: '11px', fontWeight: 600, color: 'var(--terra)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
            >
              × Quitar
            </button>
          )}
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
