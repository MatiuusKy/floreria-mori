'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Banner } from '@/types'

interface Props {
  banner: Banner | null
  onSave: () => void
}

export default function BannerForm({ banner, onSave }: Props) {
  const router = useRouter()
  const [form, setForm] = useState({
    title: banner?.title ?? '',
    subtitle: banner?.subtitle ?? '',
    cta_text: banner?.cta_text ?? '',
    cta_url: banner?.cta_url ?? '',
    active: banner?.active ?? false,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function set(key: string, value: unknown) {
    setForm(f => ({ ...f, [key]: value }))
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
      onSave()
      router.refresh()
    }
    setSaving(false)
  }

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
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">Texto botón</label>
          <input value={form.cta_text} onChange={e => set('cta_text', e.target.value)}
            placeholder="Ver ofertas"
            className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">Link botón</label>
          <input value={form.cta_url} onChange={e => set('cta_url', e.target.value)}
            placeholder="/catalogo?categoria=amor"
            className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary" />
        </div>
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
