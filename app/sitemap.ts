import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

const BASE_URL = 'https://floreriamori.cl'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = (
    [
      { url: BASE_URL,               priority: 1.0, changeFrequency: 'weekly'  as const },
      { url: `${BASE_URL}/catalogo`, priority: 0.9, changeFrequency: 'daily'   as const },
      { url: `${BASE_URL}/delivery`, priority: 0.7, changeFrequency: 'monthly' as const },
      { url: `${BASE_URL}/nosotros`, priority: 0.6, changeFrequency: 'monthly' as const },
      { url: `${BASE_URL}/contacto`, priority: 0.7, changeFrequency: 'monthly' as const },
    ] as const
  ).map(p => ({ ...p, lastModified: new Date() }))

  try {
    const supabase = await createClient()
    const { data: categories } = await supabase.from('categories').select('slug, updated_at')

    const categoryPages: MetadataRoute.Sitemap = (categories ?? []).map(cat => ({
      url: `${BASE_URL}/catalogo?categoria=${cat.slug}`,
      lastModified: cat.updated_at ? new Date(cat.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    return [...staticPages, ...categoryPages]
  } catch {
    return staticPages
  }
}
