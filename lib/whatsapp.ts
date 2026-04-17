export const WHATSAPP_NUMBER = '56929895674'

export function whatsappURL(productName?: string, variantName?: string): string {
  let text: string
  if (productName && variantName) {
    text = `Hola, quiero consultar por el producto: ${productName} (${variantName})`
  } else if (productName) {
    text = `Hola, quiero consultar por el producto: ${productName}`
  } else {
    text = 'Hola, me gustaría consultar sobre sus productos'
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}
