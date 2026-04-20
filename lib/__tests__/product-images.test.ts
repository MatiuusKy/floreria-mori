import {
  getProductImage,
  FALLBACK_IMAGES_BY_SLUG,
  DEFAULT_PRODUCT_IMAGE,
} from '../product-images'

describe('getProductImage', () => {
  describe('when imageUrl is a real URL', () => {
    it('returns the imageUrl as-is', () => {
      expect(getProductImage('https://example.com/img.jpg', 'amor')).toBe('https://example.com/img.jpg')
    })

    it('does not fall through to fallback when imageUrl is provided', () => {
      const real = 'https://supabase.co/storage/v1/object/public/product-images/flower.jpg'
      expect(getProductImage(real, 'condolencias')).toBe(real)
    })
  })

  describe('when imageUrl is null', () => {
    it('returns the category-specific fallback for known slugs', () => {
      for (const slug of Object.keys(FALLBACK_IMAGES_BY_SLUG)) {
        expect(getProductImage(null, slug)).toBe(FALLBACK_IMAGES_BY_SLUG[slug])
      }
    })

    it('returns the default fallback for an unknown slug', () => {
      expect(getProductImage(null, 'unknown-slug')).toBe(DEFAULT_PRODUCT_IMAGE)
    })

    it('returns the default fallback when slug is null', () => {
      expect(getProductImage(null, null)).toBe(DEFAULT_PRODUCT_IMAGE)
    })

    it('returns the default fallback when slug is undefined', () => {
      expect(getProductImage(null, undefined)).toBe(DEFAULT_PRODUCT_IMAGE)
    })

    it('returns the default fallback when slug is empty string', () => {
      expect(getProductImage(null, '')).toBe(DEFAULT_PRODUCT_IMAGE)
    })
  })

  describe('when imageUrl is empty string (cleared via admin)', () => {
    // BUG: ?? does not catch empty string — '' is returned as-is, breaking <Image src="">
    it('should fall through to category fallback, not return empty string', () => {
      expect(getProductImage('', 'amor')).toBe(FALLBACK_IMAGES_BY_SLUG['amor'])
    })

    it('should fall through to default fallback for unknown slug', () => {
      expect(getProductImage('', 'unknown')).toBe(DEFAULT_PRODUCT_IMAGE)
    })

    it('should fall through to default fallback when slug is null', () => {
      expect(getProductImage('', null)).toBe(DEFAULT_PRODUCT_IMAGE)
    })
  })

  describe('FALLBACK_IMAGES_BY_SLUG coverage', () => {
    it('has fallbacks for all expected categories', () => {
      const expected = ['amor', 'cumpleanos', 'eventos', 'arreglos', 'condolencias']
      for (const slug of expected) {
        expect(FALLBACK_IMAGES_BY_SLUG[slug]).toBeDefined()
        expect(FALLBACK_IMAGES_BY_SLUG[slug]).toMatch(/^https:\/\/images\.unsplash\.com/)
      }
    })

    it('DEFAULT_PRODUCT_IMAGE is a valid Unsplash URL', () => {
      expect(DEFAULT_PRODUCT_IMAGE).toMatch(/^https:\/\/images\.unsplash\.com/)
    })
  })
})
