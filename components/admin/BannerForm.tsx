'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Banner, Category, Product } from '@/types'

type LinkMode = 'catalogo' | 'categoria' | 'producto' | 'manual'

function detectMode(url: string | null | undefined): LinkMode {
  if (!url) return 'catalogo'
  if (url === '/catalogo') return 'catalogo'
  if (url.startsWith('/catalogo?categoria=')) return 'categoria'
  if (/^\/catalogo\/[^?]+$/.test(url)) return 'producto'
  return 'manual'
}

interface Props {
  banner: Banner | null
  categories: Category[]
  products: Pick<Product, 'id' | 'slug' | 'name'>[]
}

export default function BannerForm({ banner, categories, products }: Props) {
  const router = useRouter()

  const initialMode = detectMode(banner?.cta_url)
  const [form, setForm] = useState({
    title: banner?.title ?? '',
    subtitle: banner?.subtitle ?? '',
    cta_text: banner?.cta_text ?? '',
    cta_url: banner?.cta_url ?? '/catalogo',
    active: banner?.active ?? false,
  })
  const [linkMode, setLinkMode] = useState<LinkMode>(initialMode)
  const [selectedCategoria, setSelectedCategoria] = useState(() => {
    if (initialMode === 'categoria') {
      return banner?.cta_url?.replace('/catalogo?categoria=', '') ?? ''
    }
    return categories[0]?.slug ?? ''
  })
  const [selectedProducto, setSelectedProducto] = useState(() => {
    if (initialMode === 'producto') {
      return banner?.cta_url?.replace('/catalogo/', '') ?? ''
    }
    return products[0]?.slug ?? ''
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function set(key: string, value: unknown) {
    setForm(f => ({ ...f, [key]: value }))
  }

  function buildUrl(mode: LinkMode, cat: string, prod: string): string {
    if (mode === 'catalogo') return '/catalogo'
    if (mode === 'categoria') return cat ? `/catalogo?categoria=${cat}` : '/catalogo'
    if (mode === 'producto') return prod ? `/catalogo/${prod}` : '/catalogo'
    return form.cta_url
  }

  function handleModeChange(mode: LinkMode) {
    setLinkMode(mode)
    const url = buildUrl(mode, selectedCategoria, selectedProducto)
    setForm(f => ({ ...f, cta_url: url }))
  }

  function handleCategoriaChange(slug: string) {
    setSelectedCategoria(slug)
    setForm(f => ({ ...f, cta_url: slug ? `/catalogo?categoria=${slug}` : '/catalogo' }))
  }

  function handleProductoChange(slug: string) {
    setSelectedProducto(slug)
    setForm(f => ({ ...f, cta_url: slug ? `/catalogo/${slug}` : '/catalogo' }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    const payload = banner ? { ...form, id: banner.id } : form
    const method = banner ? 'PUT' : 'POST'
    const res = await fetch('/api/banner', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const json = await res.json()

    if (!res.ok) {
      setError(json.error ?? 'Error al guardar')
    } else {
      setSuccess(true)
      router.refresh()
    }
    setSaving(false)
  }

  const modeButtons: { key: LinkMode; label: string }[] = [
    { key: 'catalogo',  label: 'Catálogo' },
    { key: 'categoria', label: 'Categoría' },
    { key: 'producto',  label: 'Producto' },
    { key: 'manual',    label: 'URL manual' },
  ]

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-4 max-w-lg">
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase">Título *</label>
        <input required value={form.title} onChange={e => set('title', e.target.value)}
          placeholder="Especial Día de la Madre 🌹"
          className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary" />
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase">Subtítulo</label>
        <input value={form.subtitle} onChange={e => set('subtitle', e.target.value)}
          placeholder="Hasta el 31 de mayo"
          className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary" />
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase">Texto botón</label>
        <input value={form.cta_text} onChange={e => set('cta_text', e.target.value)}
          placeholder="Ver ofertas"
          className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary" />
      </div>

      {/* Link destination selector */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Destino del botón</label>
        <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-3">
          {modeButtons.map(btn => (
            <button
              key={btn.key}
              type="button"
              onClick={() => handleModeChange(btn.key)}
              className={`flex-1 text-xs font-semibold py-1.5 rounded-lg transition-all ${
                linkMode === btn.key
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {linkMode === 'catalogo' && (
          <p className="text-sm text-gray-500 bg-gray-50 rounded-xl px-3 py-2">
            El botón llevará al catálogo completo: <code className="text-xs text-gray-700">/catalogo</code>
          </p>
        )}

        {linkMode === 'categoria' && (
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Selecciona categoría</label>
            <select
              value={selectedCategoria}
              onChange={e => handleCategoriaChange(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
            >
              {categories.length === 0 && <option value="">Sin categorías</option>}
              {categories.map(cat => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
            {selectedCategoria && (
              <p className="text-xs text-gray-400 mt-1">
                Link: <code>/catalogo?categoria={selectedCategoria}</code>
              </p>
            )}
          </div>
        )}

        {linkMode === 'producto' && (
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Selecciona producto</label>
            <select
              value={selectedProducto}
              onChange={e => handleProductoChange(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
            >
              {products.length === 0 && <option value="">Sin productos activos</option>}
              {products.map(p => (
                <option key={p.id} value={p.slug}>{p.name}</option>
              ))}
            </select>
            {selectedProducto && (
              <p className="text-xs text-gray-400 mt-1">
                Link: <code>/catalogo/{selectedProducto}</code>
              </p>
            )}
          </div>
        )}

        {linkMode === 'manual' && (
          <div>
            <label className="text-xs text-gray-500 mb-1 block">URL personalizada</label>
            <input
              value={form.cta_url}
              onChange={e => set('cta_url', e.target.value)}
              placeholder="https://wa.me/56929895674 o /catalogo?categoria=amor"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
          </div>
        )}
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" checked={form.active} onChange={e => set('active', e.target.checked)}
          className="w-4 h-4 accent-primary" />
        <span className="text-sm text-gray-700 font-medium">Activar banner en el sitio</span>
      </label>

      {error && <p className="text-sm text-red-500 bg-red-50 rounded-xl p-3">{error}</p>}
      {success && <p className="text-sm text-green-600 bg-green-50 rounded-xl p-3">Banner guardado correctamente.</p>}

      <button type="submit" disabled={saving}
        className="w-full bg-primary text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-green-800 disabled:opacity-50">
        {saving ? 'Guardando...' : 'Guardar banner'}
      </button>
    </form>
  )
}
