// lib/analytics.ts

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

type EventParams = Record<string, string | number | boolean | undefined>

export function buildGAEvent(name: string, params: EventParams = {}) {
  return { name, params }
}

export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === 'undefined') return
  if (window.gtag) {
    window.gtag('event', name, params)
  }
  if (window.fbq) {
    window.fbq('trackCustom', name, params)
  }
}

export function trackWhatsAppClick(productName?: string): void {
  trackEvent('whatsapp_click', { product: productName ?? 'generic' })
  // Standard Meta Pixel conversion event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact')
  }
}

export function trackCategoryFilter(categoryName: string): void {
  trackEvent('category_filter', { category: categoryName })
}

export function trackProductView(productName: string): void {
  trackEvent('product_view', { product: productName })
  // Standard Meta Pixel ViewContent event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', { content_name: productName, content_type: 'product' })
  }
}

export function trackInstagramClick(): void {
  trackEvent('instagram_click')
}
