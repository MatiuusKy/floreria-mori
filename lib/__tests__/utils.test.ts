import { formatPrice, generateSlug } from '../utils'

describe('formatPrice', () => {
  it('formats number as Chilean peso', () => {
    expect(formatPrice(25000)).toBe('$25.000')
  })
  it('formats discount correctly', () => {
    expect(formatPrice(1000)).toBe('$1.000')
  })
})

describe('generateSlug', () => {
  it('lowercases and replaces spaces with hyphens', () => {
    expect(generateSlug('Ramos de Amor')).toBe('ramos-de-amor')
  })
  it('removes accents', () => {
    expect(generateSlug('Cumpleaños')).toBe('cumpleanos')
  })
})
