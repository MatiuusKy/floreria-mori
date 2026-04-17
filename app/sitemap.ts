import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://floreriamori.cl'

  const staticPages = [
    { url: baseUrl, priority: 1.0 },
    { url: `${baseUrl}/catalogo`, priority: 0.9 },
    { url: `${baseUrl}/delivery`, priority: 0.7 },
    { url: `${baseUrl}/nosotros`, priority: 0.6 },
    { url: `${baseUrl}/contacto`, priority: 0.7 },
  ].map(p => ({ ...p, lastModified: new Date(), changeFrequency: 'weekly' as const }))

  return staticPages
}
