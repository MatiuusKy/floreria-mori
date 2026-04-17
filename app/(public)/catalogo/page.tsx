import type { Metadata } from 'next'
import CatalogoClient from './CatalogoClient'

export const metadata: Metadata = {
  title: 'Catálogo de flores',
  description: 'Explora nuestra colección de ramos y arreglos florales. Flores frescas a domicilio en Santiago. Pide por WhatsApp.',
  alternates: { canonical: 'https://floreriamori.cl/catalogo' },
}

export default function CatalogoPage() {
  return <CatalogoClient />
}
