'use client'
import { useState } from 'react'
import { Plus, Trash2, Check, X } from 'lucide-react'
import { DeliveryZone } from '@/types'

interface Props {
  zones: DeliveryZone[]
  onRefresh: () => void
}

export default function DeliveryZoneList({ zones, onRefresh }: Props) {
  const [adding, setAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [editId, setEditId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editPrice, setEditPrice] = useState('')

  async function handleAdd() {
    if (!newName.trim()) return
    await fetch('/api/delivery-zones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName.trim(), reference_price: newPrice.trim() || null }),
    })
    setNewName('')
    setNewPrice('')
    setAdding(false)
    onRefresh()
  }

  async function handleUpdate(zone: DeliveryZone) {
    await fetch(`/api/delivery-zones/${zone.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName.trim(), reference_price: editPrice.trim() || null, active: zone.active }),
    })
    setEditId(null)
    onRefresh()
  }

  async function handleToggleActive(zone: DeliveryZone) {
    await fetch(`/api/delivery-zones/${zone.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: zone.name, reference_price: zone.reference_price, active: !zone.active }),
    })
    onRefresh()
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar esta zona?')) return
    await fetch(`/api/delivery-zones/${id}`, { method: 'DELETE' })
    onRefresh()
  }

  function startEdit(zone: DeliveryZone) {
    setEditId(zone.id)
    setEditName(zone.name)
    setEditPrice(zone.reference_price ?? '')
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="font-semibold text-gray-800">Zonas de delivery</h2>
        <button onClick={() => setAdding(true)}
          className="flex items-center gap-1 text-sm text-primary font-semibold hover:underline">
          <Plus size={14} /> Agregar zona
        </button>
      </div>

      <ul className="divide-y divide-gray-100">
        {adding && (
          <li className="px-6 py-3 flex items-center gap-3 bg-primary/5">
            <input autoFocus value={newName} onChange={e => setNewName(e.target.value)}
              placeholder="Nombre comuna" onKeyDown={e => e.key === 'Enter' && handleAdd()}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary" />
            <input value={newPrice} onChange={e => setNewPrice(e.target.value)}
              placeholder="Precio ref. (ej: desde $2.000)"
              className="w-48 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary" />
            <button onClick={handleAdd} className="text-primary hover:text-green-800"><Check size={16} /></button>
            <button onClick={() => setAdding(false)} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
          </li>
        )}

        {zones.map(zone => (
          <li key={zone.id} className="px-6 py-3 flex items-center gap-3">
            {editId === zone.id ? (
              <>
                <input autoFocus value={editName} onChange={e => setEditName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleUpdate(zone)}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary" />
                <input value={editPrice} onChange={e => setEditPrice(e.target.value)}
                  placeholder="Precio ref."
                  className="w-48 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary" />
                <button onClick={() => handleUpdate(zone)} className="text-primary hover:text-green-800"><Check size={16} /></button>
                <button onClick={() => setEditId(null)} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
              </>
            ) : (
              <>
                <span className={`flex-1 text-sm font-medium ${!zone.active ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{zone.name}</span>
                {zone.reference_price && (
                  <span className="text-xs text-gray-400">{zone.reference_price}</span>
                )}
                <button onClick={() => startEdit(zone)} className="text-xs text-primary hover:underline">Editar</button>
                <button
                  onClick={() => handleToggleActive(zone)}
                  className={`text-xs font-semibold ${zone.active ? 'text-gray-400 hover:text-gray-700' : 'text-primary hover:underline'}`}
                >
                  {zone.active ? 'Desactivar' : 'Activar'}
                </button>
                <button onClick={() => handleDelete(zone.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
              </>
            )}
          </li>
        ))}

        {zones.length === 0 && !adding && (
          <li className="px-6 py-8 text-center text-gray-400 text-sm">No hay zonas configuradas.</li>
        )}
      </ul>
    </div>
  )
}
