import {
  validateProduct,
  validateCategory,
  validateBannerTitle,
  validateUploadFile,
} from '../validation'

describe('validateProduct', () => {
  describe('name validation', () => {
    it('passes when name is provided', () => {
      expect(validateProduct({ name: 'Ramo de Rosas', price: 15000 })).toBeNull()
    })

    it('fails when name is missing', () => {
      expect(validateProduct({ price: 15000 })).toBe('El nombre es requerido.')
    })

    it('fails when name is empty string', () => {
      expect(validateProduct({ name: '', price: 15000 })).toBe('El nombre es requerido.')
    })

    it('fails when name is only whitespace', () => {
      expect(validateProduct({ name: '   ', price: 15000 })).toBe('El nombre es requerido.')
    })

    it('trims name whitespace before validating', () => {
      expect(validateProduct({ name: '  Ramo  ', price: 15000 })).toBeNull()
    })
  })

  describe('price validation', () => {
    it('passes with a valid positive price', () => {
      expect(validateProduct({ name: 'Test', price: 25000 })).toBeNull()
    })

    it('fails when price is missing', () => {
      expect(validateProduct({ name: 'Test' })).toBeTruthy()
    })

    it('fails when price is NaN', () => {
      expect(validateProduct({ name: 'Test', price: NaN })).toBeTruthy()
    })

    it('fails when price is negative', () => {
      expect(validateProduct({ name: 'Test', price: -1000 })).toBeTruthy()
    })

    // BUG: price 0 gives misleading error "El precio debe ser un número válido."
    // — 0 IS a valid number, error should say "El precio debe ser mayor a 0."
    it('fails when price is 0 with a clear error message', () => {
      const err = validateProduct({ name: 'Test', price: 0 })
      expect(err).toBeTruthy()
      expect(err).toBe('El precio debe ser mayor a $0.')
    })

    it('passes with price of 1', () => {
      expect(validateProduct({ name: 'Test', price: 1 })).toBeNull()
    })

    it('passes with large price', () => {
      expect(validateProduct({ name: 'Test', price: 500000 })).toBeNull()
    })
  })

  describe('discount_price validation', () => {
    it('passes when discount_price is less than price', () => {
      expect(validateProduct({ name: 'Test', price: 20000, discount_price: 15000 })).toBeNull()
    })

    it('passes when discount_price is null (no discount)', () => {
      expect(validateProduct({ name: 'Test', price: 20000, discount_price: null })).toBeNull()
    })

    it('passes when discount_price is undefined (no discount)', () => {
      expect(validateProduct({ name: 'Test', price: 20000 })).toBeNull()
    })

    // BUG: discount_price equal to price is not currently validated
    it('fails when discount_price equals price (no actual discount)', () => {
      expect(validateProduct({ name: 'Test', price: 20000, discount_price: 20000 })).toBeTruthy()
    })

    // BUG: discount_price greater than price is not currently validated
    it('fails when discount_price is greater than price', () => {
      expect(validateProduct({ name: 'Test', price: 20000, discount_price: 25000 })).toBeTruthy()
    })

    it('fails when discount_price is 0 or negative', () => {
      expect(validateProduct({ name: 'Test', price: 20000, discount_price: 0 })).toBeTruthy()
      expect(validateProduct({ name: 'Test', price: 20000, discount_price: -100 })).toBeTruthy()
    })
  })
})

describe('validateCategory', () => {
  it('passes with valid name and slug', () => {
    expect(validateCategory({ name: 'Amor', slug: 'amor' })).toBeNull()
  })

  it('fails when name is missing', () => {
    expect(validateCategory({ slug: 'amor' })).toBe('El nombre es requerido.')
  })

  it('fails when name is empty', () => {
    expect(validateCategory({ name: '', slug: 'amor' })).toBe('El nombre es requerido.')
  })

  it('fails when name is whitespace only', () => {
    expect(validateCategory({ name: '   ', slug: 'amor' })).toBe('El nombre es requerido.')
  })

  it('fails when slug is missing', () => {
    expect(validateCategory({ name: 'Amor' })).toBe('El slug es requerido.')
  })

  it('fails when slug is empty', () => {
    expect(validateCategory({ name: 'Amor', slug: '' })).toBe('El slug es requerido.')
  })

  it('fails when slug contains uppercase letters', () => {
    expect(validateCategory({ name: 'Amor', slug: 'Amor' })).toBeTruthy()
  })

  it('fails when slug contains spaces', () => {
    expect(validateCategory({ name: 'Amor', slug: 'amor romantico' })).toBeTruthy()
  })

  it('fails when slug contains special characters', () => {
    expect(validateCategory({ name: 'Amor', slug: 'amor&romantico' })).toBeTruthy()
  })

  it('fails when slug contains accented characters', () => {
    expect(validateCategory({ name: 'Cumpleaños', slug: 'cumpleaños' })).toBeTruthy()
  })

  it('passes with numbers in slug', () => {
    expect(validateCategory({ name: 'Top 10', slug: 'top-10' })).toBeNull()
  })

  it('passes with hyphens in slug', () => {
    expect(validateCategory({ name: 'Dia Madre', slug: 'dia-de-la-madre' })).toBeNull()
  })
})

describe('validateBannerTitle', () => {
  it('passes with a valid title', () => {
    expect(validateBannerTitle({ title: 'Especial Día de la Madre' })).toBeNull()
  })

  it('fails when title is missing', () => {
    expect(validateBannerTitle({})).toBe('El título es requerido.')
  })

  it('fails when title is empty string', () => {
    expect(validateBannerTitle({ title: '' })).toBe('El título es requerido.')
  })

  it('fails when title is whitespace only', () => {
    expect(validateBannerTitle({ title: '   ' })).toBe('El título es requerido.')
  })
})

describe('validateUploadFile', () => {
  const MB = 1024 * 1024

  it('passes for jpeg under 5MB', () => {
    expect(validateUploadFile({ type: 'image/jpeg', size: 2 * MB })).toBeNull()
  })

  it('passes for png under 5MB', () => {
    expect(validateUploadFile({ type: 'image/png', size: 1 * MB })).toBeNull()
  })

  it('passes for webp under 5MB', () => {
    expect(validateUploadFile({ type: 'image/webp', size: 3 * MB })).toBeNull()
  })

  it('passes for gif under 5MB', () => {
    expect(validateUploadFile({ type: 'image/gif', size: 500 * 1024 })).toBeNull()
  })

  it('fails for pdf', () => {
    expect(validateUploadFile({ type: 'application/pdf', size: 1 * MB })).toBeTruthy()
  })

  it('fails for svg (not in allowed list)', () => {
    expect(validateUploadFile({ type: 'image/svg+xml', size: 10 * 1024 })).toBeTruthy()
  })

  it('fails for executable', () => {
    expect(validateUploadFile({ type: 'application/octet-stream', size: 1 * MB })).toBeTruthy()
  })

  it('fails for empty MIME type', () => {
    expect(validateUploadFile({ type: '', size: 1 * MB })).toBeTruthy()
  })

  it('fails when file is exactly 5MB + 1 byte', () => {
    expect(validateUploadFile({ type: 'image/jpeg', size: 5 * MB + 1 })).toBeTruthy()
  })

  it('passes when file is exactly 5MB', () => {
    expect(validateUploadFile({ type: 'image/jpeg', size: 5 * MB })).toBeNull()
  })

  it('fails when file is over 5MB', () => {
    expect(validateUploadFile({ type: 'image/jpeg', size: 10 * MB })).toBeTruthy()
  })

  it('returns the correct error message for wrong type', () => {
    expect(validateUploadFile({ type: 'application/pdf', size: 1 * MB }))
      .toBe('Solo se permiten imágenes JPG, PNG, WEBP o GIF.')
  })

  it('returns the correct error message for oversized file', () => {
    expect(validateUploadFile({ type: 'image/jpeg', size: 10 * MB }))
      .toBe('La imagen no puede superar 5 MB.')
  })
})
