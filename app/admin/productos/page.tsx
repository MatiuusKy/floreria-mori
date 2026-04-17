'use client'
import { useState, useEffect, useCallback } from 'react'
import { Plus } from 'lucide-react'
import { Product, Category } from '@/types'
import ProductCardAdmin from '@/components/admin/ProductCardAdmin'
import ProductForm from '@/components/admin/ProductForm'
import CategoryChip from '@/components/ui/CategoryChip'

export default function AdminProductosPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [editing, setEditing] = useState<Product | null | undefined>(undefined)
  const [filterCat, setFilterCat] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    const [prods, cats] = await Promise.all([
      fetch('/api/products').then(r => r.json()),
      fetch('/api/categories').then(r => r.json()),
    ])
    setProducts(prods)
    setCategories(cats)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar este producto?')) return
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    load()
  }

  const filtered = products
    .filter(p => filterCat ? p.category_id === filterCat : true)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-gray-800">Productos</h1>
        <button onClick={() => setEditing(null)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-800">
          <Plus size={16} /> Nuevo producto
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        <CategoryChip label="Todos" active={!filterCat} onClick={() => setFilterCat(null)} />
        {categories.map(c => (
          <CategoryChip key={c.id} label={c.name} active={filterCat === c.id} onClick={() => setFilterCat(c.id)} />
        ))}
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(p => (
            <ProductCardAdmin key={p.id} product={p} onEdit={setEditing} onDelete={handleDelete} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-gray-400 py-12">No hay productos en esta categoría.</p>
          )}
        </div>
      )}

      {editing !== undefined && (
        <ProductForm
          product={editing}
          categories={categories}
          onClose={() => setEditing(undefined)}
          onSave={load}
        />
      )}
    </div>
  )
}
