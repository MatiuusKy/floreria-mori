'use client'
import { useState } from 'react'
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react'
import { Category } from '@/types'
import { generateSlug } from '@/lib/utils'

interface Props {
  categories: Category[]
  onRefresh: () => void
}

export default function CategoryList({ categories, onRefresh }: Props) {
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

  async function create() {
    if (!newName.trim()) return
    await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName.trim(), slug: generateSlug(newName.trim()) }),
    })
    setNewName('')
    onRefresh()
  }

  async function update(id: string) {
    await fetch(`/api/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName.trim(), slug: generateSlug(editName.trim()) }),
    })
    setEditingId(null)
    onRefresh()
  }

  async function remove(id: string) {
    if (!confirm('¿Eliminar esta categoría?')) return
    await fetch(`/api/categories/${id}`, { method: 'DELETE' })
    onRefresh()
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="p-4 border-b flex gap-2">
        <input value={newName} onChange={e => setNewName(e.target.value)}
          placeholder="Nueva categoría..." onKeyDown={e => e.key === 'Enter' && create()}
          className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary" />
        <button onClick={create} className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-800">
          <Plus size={14} /> Agregar
        </button>
      </div>
      <ul className="divide-y divide-gray-100">
        {categories.map(cat => (
          <li key={cat.id} className="flex items-center gap-3 px-4 py-3">
            {editingId === cat.id ? (
              <>
                <input value={editName} onChange={e => setEditName(e.target.value)} autoFocus
                  className="flex-1 border border-primary rounded-xl px-3 py-1.5 text-sm focus:outline-none" />
                <button onClick={() => update(cat.id)} className="text-primary"><Check size={16} /></button>
                <button onClick={() => setEditingId(null)} className="text-gray-400"><X size={16} /></button>
              </>
            ) : (
              <>
                <span className="flex-1 text-sm text-gray-700 font-medium">{cat.name}</span>
                <span className="text-xs text-gray-400">{cat.slug}</span>
                <button onClick={() => { setEditingId(cat.id); setEditName(cat.name) }} className="text-gray-400 hover:text-primary"><Pencil size={14} /></button>
                <button onClick={() => remove(cat.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
              </>
            )}
          </li>
        ))}
        {categories.length === 0 && (
          <li className="px-4 py-8 text-center text-sm text-gray-400">No hay categorías aún</li>
        )}
      </ul>
    </div>
  )
}
