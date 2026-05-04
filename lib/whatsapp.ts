import { formatPrice } from './utils'

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '56929895674'

export function whatsappURL(productName?: string, variantName?: string, price?: number): string {
  let text: string

  if (!productName) {
    text = 'Hola Flora Boutique 🌸 vi su catálogo web y me gustaría hacer un pedido'
  } else {
    const lines = [`Hola, quiero consultar por el producto: ${productName}`]
    if (variantName) {
      lines.push(`Tamaño: ${variantName}`)
    }
    if (price !== undefined) {
      lines.push(`Precio: ${formatPrice(price)}`)
    }
    text = lines.join('\n')
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}
