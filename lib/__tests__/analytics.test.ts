/**
 * @jest-environment jsdom
 */
import { buildGAEvent, trackEvent, trackWhatsAppClick, trackCategoryFilter, trackProductView, trackInstagramClick } from '../analytics'

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

describe('trackEvent', () => {
  beforeEach(() => {
    // Clean up window mocks between tests
    delete (window as Window & { gtag?: unknown }).gtag
    delete (window as Window & { fbq?: unknown }).fbq
  })

  it('calls window.gtag when available', () => {
    const gtag = jest.fn()
    ;(window as Window & { gtag: unknown }).gtag = gtag
    trackEvent('test_event', { foo: 'bar' })
    expect(gtag).toHaveBeenCalledWith('event', 'test_event', { foo: 'bar' })
  })

  it('calls window.fbq when available', () => {
    const fbq = jest.fn()
    ;(window as Window & { fbq: unknown }).fbq = fbq
    trackEvent('test_event', { foo: 'bar' })
    expect(fbq).toHaveBeenCalledWith('trackCustom', 'test_event', { foo: 'bar' })
  })

  it('does not throw when neither gtag nor fbq are present', () => {
    expect(() => trackEvent('test_event')).not.toThrow()
  })
})

describe('named event helpers', () => {
  let gtag: jest.Mock

  beforeEach(() => {
    gtag = jest.fn()
    ;(window as Window & { gtag: unknown }).gtag = gtag
  })

  afterEach(() => {
    delete (window as Window & { gtag?: unknown }).gtag
  })

  it('trackWhatsAppClick fires whatsapp_click with product name', () => {
    trackWhatsAppClick('Ramo de Rosas')
    expect(gtag).toHaveBeenCalledWith('event', 'whatsapp_click', { product: 'Ramo de Rosas' })
  })

  it('trackWhatsAppClick fires with "generic" when no product', () => {
    trackWhatsAppClick()
    expect(gtag).toHaveBeenCalledWith('event', 'whatsapp_click', { product: 'generic' })
  })

  it('trackCategoryFilter fires category_filter', () => {
    trackCategoryFilter('Ramos')
    expect(gtag).toHaveBeenCalledWith('event', 'category_filter', { category: 'Ramos' })
  })

  it('trackProductView fires product_view', () => {
    trackProductView('Ramo de Rosas')
    expect(gtag).toHaveBeenCalledWith('event', 'product_view', { product: 'Ramo de Rosas' })
  })

  it('trackInstagramClick fires instagram_click', () => {
    trackInstagramClick()
    expect(gtag).toHaveBeenCalledWith('event', 'instagram_click', {})
  })
})
