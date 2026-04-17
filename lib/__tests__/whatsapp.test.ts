import { whatsappURL, WHATSAPP_NUMBER } from '../whatsapp'

describe('whatsappURL', () => {
  it('returns generic URL when no product name given', () => {
    const url = whatsappURL()
    expect(url).toBe(
      `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20me%20gustar%C3%ADa%20consultar%20sobre%20sus%20productos`
    )
  })

  it('includes product name in message when provided', () => {
    const url = whatsappURL('Ramo de Rosas')
    expect(url).toContain('Ramo%20de%20Rosas')
    expect(url).toContain(WHATSAPP_NUMBER)
  })
})
