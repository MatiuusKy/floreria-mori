import { formatPrice } from './utils'

export const WHATSAPP_NUMBER = '56929895674'

export function whatsappURL(productName?: string, variantName?: string, price?: number): string {
  let text: string

  if (!productName) {
    text = 'Hola, me gustaría consultar sobre sus productos'
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
