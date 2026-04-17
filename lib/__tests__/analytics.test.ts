import { buildGAEvent } from '../analytics'

describe('buildGAEvent', () => {
  it('returns event name and properties', () => {
    const e = buildGAEvent('whatsapp_click', { product: 'Ramo de Rosas' })
    expect(e.name).toBe('whatsapp_click')
    expect(e.params.product).toBe('Ramo de Rosas')
  })

  it('works with no properties', () => {
    const e = buildGAEvent('instagram_click')
    expect(e.name).toBe('instagram_click')
    expect(e.params).toEqual({})
  })
})
