import { Suspense } from 'react'
import type { Metadata } from 'next'
import CatalogoClient from './CatalogoClient'

export const metadata: Metadata = {
  title: 'Catálogo de flores — Florería Mori',
  description: 'Explora nuestra colección de ramos y arreglos florales. Flores frescas a domicilio en Santiago. Pide por WhatsApp.',
  alternates: { canonical: 'https://floreriamori.cl/catalogo' },
}

function CatalogoSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="h-10 bg-gray-100 rounded w-48 mb-2 animate-pulse" />
      <div className="h-5 bg-gray-100 rounded w-64 mb-8 animate-pulse" />
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
    </div>
  )
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={<CatalogoSkeleton />}>
      <CatalogoClient />
    </Suspense>
  )
}
