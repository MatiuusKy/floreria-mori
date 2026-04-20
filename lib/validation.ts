// Shared validation logic for API routes — all functions return null on success or an error string.

type UnknownBody = Record<string, unknown>

export function validateProduct(payload: UnknownBody): string | null {
  const name = payload.name?.toString().trim()
  if (!name) return 'El nombre es requerido.'

  const price = Number(payload.price)
  if (payload.price === undefined || payload.price === null || isNaN(price) || price < 0) {
    return 'El precio debe ser un número válido.'
  }
  if (price === 0) return 'El precio debe ser mayor a $0.'

  if (payload.discount_price !== undefined && payload.discount_price !== null) {
    const discountPrice = Number(payload.discount_price)
    if (isNaN(discountPrice) || discountPrice <= 0) {
      return 'El precio de oferta debe ser un número mayor a $0.'
    }
    if (discountPrice >= price) {
      return 'El precio de oferta debe ser menor al precio original.'
    }
  }

  return null
}

export function validateCategory(body: UnknownBody): string | null {
  const name = body.name?.toString().trim()
  if (!name) return 'El nombre es requerido.'

  const slug = body.slug?.toString().trim()
  if (!slug) return 'El slug es requerido.'
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return 'El slug solo puede contener letras minúsculas, números y guiones.'
  }

  return null
}

export function validateBannerTitle(body: UnknownBody): string | null {
  if (!body.title?.toString().trim()) return 'El título es requerido.'
  return null
}

export function validateUploadFile(file: { type: string; size: number }): string | null {
  const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return 'Solo se permiten imágenes JPG, PNG, WEBP o GIF.'
  }
  if (file.size > MAX_FILE_SIZE) {
    return 'La imagen no puede superar 5 MB.'
  }
  return null
}
