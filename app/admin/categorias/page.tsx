'use client'
import { useState, useEffect, useCallback } from 'react'
import { Category } from '@/types'
import CategoryList from '@/components/admin/CategoryList'

export default function AdminCategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([])

  const load = useCallback(async () => {
    try {
      const data = await fetch('/api/categories').then(r => r.json())
      setCategories(data)
    } catch {
      // silently fail — UI stays with previous data or empty state
    }
  }, [])

  useEffect(() => { load() }, [load])

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-gray-800 mb-6">Categorías</h1>
      <CategoryList categories={categories} onRefresh={load} />
    </div>
  )
}
