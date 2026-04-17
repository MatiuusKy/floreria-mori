import Link from 'next/link'
import type { Metadata } from 'next'
import { MessageCircle, Truck, Heart, Star } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { whatsappURL } from '@/lib/whatsapp'
import ProductGrid from '@/components/ui/ProductGrid'
import SeasonalBanner from '@/components/ui/SeasonalBanner'
import { Product, Category, Banner } from '@/types'

export const metadata: Metadata = {
  title: 'Florería Mori — Flores en Peñalolén, Santiago',
  description: 'Arreglos florales únicos en Peñalolén. Ramos, arreglos de cumpleaños, amor y eventos. Contacta por WhatsApp para pedir tus flores.',
  alternates: { canonical: 'https://floreriamori.cl' },
}

const CATEGORY_ICONS: Record<string, string> = {
  ramos: '🌹', arreglos: '💐', cumpleanos: '🎂',
  amor: '❤️', condolencias: '🕊️', eventos: '🎉',
}

export default async function HomePage() {
  const supabase = await createClient()

  const [{ data: products }, { data: categories }, { data: banner }] = await Promise.all([
    supabase.from('products').select('*, category:categories(id,name,slug)').eq('available', true).order('featured', { ascending: false }),
    supabase.from('categories').select('*').order('name'),
    supabase.from('banners').select('*').eq('active', true).maybeSingle(),
  ])

  const featured = (products as Product[] ?? []).filter(p => p.featured).slice(0, 6)
  const bestSellers = (products as Product[] ?? []).filter(p => p.best_seller).slice(0, 6)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Florería Mori',
    description: 'Arreglos florales únicos para cada momento especial en Peñalolén, Santiago.',
    url: 'https://floreriamori.cl',
    telephone: '+56929895674',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Peñalolén',
      addressRegion: 'Región Metropolitana',
      addressCountry: 'CL',
    },
    sameAs: ['https://www.instagram.com/floreriamori122012/'],
  }

  return (
    <>
      {banner && <SeasonalBanner banner={banner as Banner} />}

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-4">✦ Peñalolén, Santiago ✦</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-gray-800 leading-tight mb-6">
            Flores con alma,<br />
            <span className="text-primary">entregadas con amor</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
            Arreglos florales únicos para cada momento especial. Ramos, cumpleaños, amor, eventos y más.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={whatsappURL()} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-full hover:bg-green-800 transition-colors text-base">
              <MessageCircle size={20} /> Comprar por WhatsApp
            </a>
            <Link href="/catalogo"
              className="flex items-center justify-center gap-2 border-2 border-primary text-primary font-semibold px-8 py-3.5 rounded-full hover:bg-primary hover:text-white transition-colors text-base">
              Ver catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-2">Destacados</h2>
          <p className="text-gray-500 mb-8">Nuestras selecciones especiales</p>
          <ProductGrid products={featured} />
          <div className="text-center mt-10">
            <Link href="/catalogo" className="border-2 border-primary text-primary font-semibold px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-colors">
              Ver todo el catálogo
            </Link>
          </div>
        </section>
      )}

      {/* Best sellers */}
      {bestSellers.length > 0 && (
        <section className="bg-white py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-gray-800 mb-2">🔥 Más vendidos</h2>
            <p className="text-gray-500 mb-8">Los favoritos de nuestros clientes</p>
            <ProductGrid products={bestSellers} />
          </div>
        </section>
      )}

      {/* Categories */}
      {(categories as Category[])?.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-8">Explora por categoría</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {(categories as Category[]).map(cat => (
              <Link key={cat.id} href={`/catalogo?categoria=${cat.slug}`}
                className="flex flex-col items-center gap-3 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-center">
                <span className="text-4xl">{CATEGORY_ICONS[cat.slug] ?? '🌸'}</span>
                <span className="text-sm font-semibold text-gray-700">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Trust section */}
      <section className="bg-primary/5 py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: <Star className="text-primary" size={32} />, title: 'Flores frescas', desc: 'Seleccionadas diariamente para garantizar calidad y frescura.' },
            { icon: <Truck className="text-primary" size={32} />, title: 'Entrega en Santiago', desc: 'Delivery en Peñalolén y comunas cercanas. Consulta tu zona.' },
            { icon: <Heart className="text-primary" size={32} />, title: 'Atención personalizada', desc: 'Cada arreglo es único. Te ayudamos a encontrar el regalo perfecto.' },
          ].map(item => (
            <div key={item.title} className="flex flex-col items-center gap-3">
              {item.icon}
              <h3 className="font-heading text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-16 px-4 text-center">
        <h2 className="font-heading text-3xl font-bold text-gray-800 mb-3">Síguenos en Instagram</h2>
        <p className="text-gray-500 mb-6">Descubre nuestros últimos arreglos y promociones</p>
        <a href="https://www.instagram.com/floreriamori122012/" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary to-accent text-white font-semibold px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity">
          📸 @floreriamori122012
        </a>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
