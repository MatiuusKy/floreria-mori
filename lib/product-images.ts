export const FALLBACK_IMAGES_BY_SLUG: Record<string, string> = {
  amor:         'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=600&q=80&fit=crop',
  cumpleanos:   'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&q=80&fit=crop',
  eventos:      'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=600&q=80&fit=crop',
  arreglos:     'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&q=80&fit=crop',
  condolencias: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80&fit=crop',
}

export const DEFAULT_PRODUCT_IMAGE =
  'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&q=80&fit=crop'

export function getProductImage(imageUrl: string | null | undefined, categorySlug?: string | null): string {
  // Use || instead of ?? so empty string also falls through to the fallback
  return imageUrl || FALLBACK_IMAGES_BY_SLUG[categorySlug ?? ''] || DEFAULT_PRODUCT_IMAGE
}

// Supabase Storage URLs should bypass Next.js image optimization (use unoptimized={true})
// because the optimization proxy can't reliably fetch from Supabase Storage on Vercel.
export function isSupabaseUrl(url: string): boolean {
  return url.includes('.supabase.co/storage/')
}
