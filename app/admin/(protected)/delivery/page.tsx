'use client'
import { useState, useEffect, useCallback } from 'react'
import { DeliveryZone } from '@/types'
import DeliveryZoneList from '@/components/admin/DeliveryZoneList'

export default function AdminDeliveryPage() {
  const [zones, setZones] = useState<DeliveryZone[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    try {
      const data = await fetch('/api/delivery-zones').then(r => r.json())
      setZones(data)
    } catch {
      // silently fail — UI stays with previous data or empty state
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-gray-800">Zonas de delivery</h1>
        <p className="text-sm text-gray-500 mt-1">
          Gestiona las comunas donde realizas entregas. El precio de referencia es visible para los clientes.
        </p>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Cargando...</p>
      ) : (
        <DeliveryZoneList zones={zones} onRefresh={load} />
      )}
    </div>
  )
}
