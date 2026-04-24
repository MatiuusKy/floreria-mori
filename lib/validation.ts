// Shared validation logic for API routes — all functions return null on success or an error string.

type UnknownBody = Record<string, unknown>

const SAFE_URL_RE = /^(\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]*|https:\/\/wa\.me\/[0-9]+(\?text=[^<>"]*)?)/

export function validateProduct(payload: UnknownBody): string | null {
  const name = payload.name?.toString().trim()
  if (!name) return 'El nombre es requerido.'
  if (name.length > 200) return 'El nombre no puede superar 200 caracteres.'

  const desc = payload.description?.toString()
  if (desc && desc.length > 2000) return 'La descripción no puede superar 2000 caracteres.'

  const price = Number(payload.price)
  if (payload.price === undefined || payload.price === null || isNaN(price) || price < 0) {
    return 'El precio debe ser un número válido.'
  }
  if (price === 0) return 'El precio debe ser mayor a $0.'
  if (price > 10_000_000) return 'El precio parece inválido.'

  if (payload.discount_price !== undefined && payload.discount_price !== null) {
    const discountPrice = Number(payload.discount_price)
    if (isNaN(discountPrice) || discountPrice <= 0) {
      return 'El precio de oferta debe ser un número mayor a $0.'
    }
    if (discountPrice >= price) {
      return 'El precio de oferta debe ser menor al precio original.'
    }
  }

  if (payload.stock !== undefined) {
    const stock = Number(payload.stock)
    if (isNaN(stock) || stock < 0 || !Number.isInteger(stock)) {
      return 'El stock debe ser un número entero no negativo.'
    }
  }

  if (payload.campaign_tag !== undefined && payload.campaign_tag !== null) {
    const tag = payload.campaign_tag.toString()
    if (tag.length > 80) return 'La etiqueta de campaña no puede superar 80 caracteres.'
  }

  if (payload.variants !== undefined && payload.variants !== null) {
    if (!Array.isArray(payload.variants)) return 'Las variantes deben ser un arreglo.'
    for (const v of payload.variants as unknown[]) {
      const variant = v as Record<string, unknown>
      if (!variant.name?.toString().trim()) return 'Cada variante debe tener un nombre.'
      if (variant.name.toString().length > 100) return 'El nombre de variante no puede superar 100 caracteres.'
      const vp = Number(variant.price)
      if (isNaN(vp) || vp <= 0) return 'Cada variante debe tener un precio válido mayor a $0.'
    }
  }

  return null
}

export function validateCategory(body: UnknownBody): string | null {
  const name = body.name?.toString().trim()
  if (!name) return 'El nombre es requerido.'
  if (name.length > 100) return 'El nombre no puede superar 100 caracteres.'

  const slug = body.slug?.toString().trim()
  if (!slug) return 'El slug es requerido.'
  if (slug.length > 100) return 'El slug no puede superar 100 caracteres.'
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return 'El slug solo puede contener letras minúsculas, números y guiones.'
  }

  return null
}

export function validateDeliveryZone(body: UnknownBody): string | null {
  const name = body.name?.toString().trim()
  if (!name) return 'El nombre es requerido.'
  if (name.length > 150) return 'El nombre no puede superar 150 caracteres.'

  if (body.reference_price !== undefined && body.reference_price !== null) {
    const price = Number(body.reference_price)
    if (isNaN(price) || price < 0) return 'El precio de referencia debe ser un número válido.'
    if (price > 10_000_000) return 'El precio de referencia parece inválido.'
  }

  return null
}

export function validateBannerTitle(body: UnknownBody): string | null {
  const title = body.title?.toString().trim()
  if (!title) return 'El título es requerido.'
  if (title.length > 200) return 'El título no puede superar 200 caracteres.'

  const subtitle = body.subtitle?.toString()
  if (subtitle && subtitle.length > 300) return 'El subtítulo no puede superar 300 caracteres.'

  const ctaText = body.cta_text?.toString()
  if (ctaText && ctaText.length > 80) return 'El texto del botón no puede superar 80 caracteres.'

  if (body.cta_url !== undefined && body.cta_url !== null && body.cta_url !== '') {
    const url = body.cta_url.toString()
    if (!SAFE_URL_RE.test(url)) {
      return 'La URL del botón debe ser una ruta interna (ej: /catalogo) o un enlace de WhatsApp.'
    }
  }

  return null
}

// 5 MB — shared with upload/route.ts and ImageUpload.tsx
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024

// Note: used in tests only. Production upload validates via magic bytes (upload/route.ts)
// because client-provided Content-Type is untrusted.
export function validateUploadFile(file: { type: string; size: number }): string | null {
  const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!ALLOWED_MIME_TYPES.includes(file.type)) return 'Solo se permiten imágenes JPG, PNG, WEBP o GIF.'
  if (file.size > MAX_UPLOAD_BYTES) return 'La imagen no puede superar 5 MB.'
  return null
}
