'use client'
import { useState } from 'react'
import { X, Plus, Trash2 } from 'lucide-react'
import { Product, Category, Variant } from '@/types'
import { generateSlug } from '@/lib/utils'
import ImageUpload from './ImageUpload'

interface Props {
  product: Product | null
  categories: Category[]
  onClose: () => void
  onSave: () => void
}

const EMPTY: Omit<Product, 'id' | 'created_at' | 'category'> = {
  name: '', description: '', price: 0, discount_price: null,
  category_id: null, image_url: null, available: true,
  featured: false, best_seller: false, stock: 0, variants: null,
  same_day_delivery: false, limited_stock: false, campaign_tag: null,
}

export default function ProductForm({ product, categories, onClose, onSave }: Props) {
  const [form, setForm] = useState({ ...EMPTY, ...product })
  const [variants, setVariants] = useState<Variant[]>(product?.variants ?? [])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function set(key: string, value: unknown) {
    setForm(f => ({ ...f, [key]: value }))
  }

  function addVariant() {
    setVariants(v => [...v, { name: '', price: 0 }])
  }

  function updateVariant(i: number, field: keyof Variant, value: string | number) {
    setVariants(v => v.map((vr, idx) => idx === i ? { ...vr, [field]: value } : vr))
  }

  function removeVariant(i: number) {
    setVariants(v => v.filter((_, idx) => idx !== i))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload = { ...form, variants: variants.length > 0 ? variants : null }
    const url = product ? `/api/products/${product.id}` : '/api/products'
    const method = product ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const json = await res.json()

    if (!res.ok) {
      setError(json.error ?? 'Error al guardar')
    } else {
      onSave()
      onClose()
    }
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <div className="w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-heading text-lg font-semibold">
            {product ? 'Editar producto' : 'Nuevo producto'}
          </h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <ImageUpload currentUrl={form.image_url} onUpload={url => set('image_url', url)} />

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">Nombre *</label>
            <input required value={form.name} onChange={e => set('name', e.target.value)}
              className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary" />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">Descripción</label>
            <textarea value={form.description ?? ''} onChange={e => set('description', e.target.value)} rows={3}
              className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Precio *</label>
              <input required type="number" value={form.price} onChange={e => set('price', Number(e.target.value))}
                className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Precio descuento</label>
              <input type="number" value={form.discount_price ?? ''} onChange={e => set('discount_price', e.target.value ? Number(e.target.value) : null)}
                className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">Categoría</label>
            <select value={form.category_id ?? ''} onChange={e => set('category_id', e.target.value || null)}
              className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary bg-white">
              <option value="">Sin categoría</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Stock (0 = ilimitado)</label>
              <input type="number" min={0} value={form.stock} onChange={e => set('stock', Number(e.target.value))}
                className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {([
              ['available', 'Disponible'],
              ['featured', 'Destacado (home)'],
              ['best_seller', 'Más vendido (home)'],
              ['same_day_delivery', 'Entrega hoy (badge verde en tarjeta)'],
              ['limited_stock', 'Stock limitado (badge naranja en tarjeta)'],
            ] as [string, string][]).map(([key, label]) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={!!form[key as keyof typeof form]}
                  onChange={e => set(key, e.target.checked)}
                  className="w-4 h-4 accent-primary" />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>

          {/* Variants */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-gray-500 uppercase">Variantes de tamaño</label>
              <button type="button" onClick={addVariant}
                className="flex items-center gap-1 text-xs text-primary font-semibold hover:underline">
                <Plus size={12} /> Agregar
              </button>
            </div>
            {variants.map((v, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input placeholder="Nombre (ej: Pequeño)" value={v.name}
                  onChange={e => updateVariant(i, 'name', e.target.value)}
                  className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                <input type="number" placeholder="Precio" value={v.price}
                  onChange={e => updateVariant(i, 'price', Number(e.target.value))}
                  className="w-24 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                <button type="button" onClick={() => removeVariant(i)} className="text-red-400 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">Etiqueta de campaña</label>
            <input
              value={form.campaign_tag ?? ''}
              onChange={e => set('campaign_tag', e.target.value || null)}
              placeholder="ej: dia-de-la-madre"
              className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
            <p className="text-xs text-gray-400 mt-1">Opcional. Útil para filtrar productos por campaña.</p>
          </div>

          {error && <p className="text-sm text-red-500 bg-red-50 rounded-xl p-3">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50">
              Cancelar
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 bg-primary text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-green-800 disabled:opacity-50">
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
