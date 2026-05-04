import { whatsappURL, WHATSAPP_NUMBER } from '../whatsapp'
import { formatPrice } from '../utils'

describe('whatsappURL', () => {
  it('returns generic URL when no product name given', () => {
    const url = whatsappURL()
    expect(url).toContain(`https://wa.me/${WHATSAPP_NUMBER}?text=`)
    expect(url).toContain('Hola')
  })

  it('includes product name in message when provided', () => {
    const url = whatsappURL('Ramo de Rosas')
    expect(url).toContain('Ramo%20de%20Rosas')
    expect(url).toContain(WHATSAPP_NUMBER)
  })

  it('includes price when provided', () => {
    const url = whatsappURL('Ramo de Rosas', undefined, 15000)
    expect(url).toContain('Precio')
    expect(url).toContain(encodeURIComponent(formatPrice(15000)))
  })

  it('includes variant and price when both provided', () => {
    const url = whatsappURL('Ramo de Rosas', 'Grande', 34990)
    expect(url).toContain('Tama%C3%B1o%3A%20Grande')
    expect(url).toContain('Precio')
    expect(url).toContain(encodeURIComponent(formatPrice(34990)))
  })

  it('includes variant without price', () => {
    const url = whatsappURL('Ramo de Rosas', 'Pequeño')
    expect(url).toContain('Ramo%20de%20Rosas')
    expect(url).not.toContain('Precio')
  })
})
