export const FALLBACK_IMAGES_BY_SLUG: Record<string, string> = {
  amor:         'https://images.unsplash.com/photo-1490750967868-88df5691bbf9?w=600&q=80&fit=crop',
  cumpleanos:   'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop',
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
