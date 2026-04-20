import { formatPrice, generateSlug } from '../utils'

describe('formatPrice — extended', () => {
  it('formats zero as $0', () => {
    expect(formatPrice(0)).toBe('$0')
  })

  it('formats 100 correctly', () => {
    expect(formatPrice(100)).toBe('$100')
  })

  it('formats 1000 with period separator (es-CL locale)', () => {
    expect(formatPrice(1000)).toBe('$1.000')
  })

  it('formats 1000000 with two period separators', () => {
    expect(formatPrice(1000000)).toBe('$1.000.000')
  })

  it('formats a typical flower price', () => {
    expect(formatPrice(34990)).toBe('$34.990')
  })

  it('handles negative prices (should not occur in practice, just documents behavior)', () => {
    // negative numbers are blocked by API validation, but function itself doesn't throw
    expect(() => formatPrice(-1000)).not.toThrow()
  })
})

describe('generateSlug — extended', () => {
  it('handles empty string', () => {
    expect(generateSlug('')).toBe('')
  })

  it('handles whitespace-only string', () => {
    expect(generateSlug('   ')).toBe('')
  })

  it('strips leading and trailing spaces', () => {
    expect(generateSlug('  amor  ')).toBe('amor')
  })

  it('collapses multiple spaces into single hyphen', () => {
    expect(generateSlug('ramo  de  flores')).toBe('ramo-de-flores')
  })

  it('removes special characters like & and !', () => {
    const slug = generateSlug('Amor & Romántico')
    expect(slug).not.toContain('&')
    expect(slug).not.toContain(' ')
  })

  // BUG: special chars like & are removed AFTER spaces are already converted to hyphens,
  // leaving double hyphens: "amor--romantico" instead of "amor-romantico"
  it('should not produce consecutive hyphens', () => {
    expect(generateSlug('Amor & Romántico')).toBe('amor-romantico')
  })

  it('should not produce consecutive hyphens with multiple special chars', () => {
    expect(generateSlug('hello & world!')).toBe('hello-world')
  })

  it('handles all expected Chilean accent patterns', () => {
    expect(generateSlug('Día de la Madre')).toBe('dia-de-la-madre')
    expect(generateSlug('Año Nuevo')).toBe('ano-nuevo')
    expect(generateSlug('Cumpleaños')).toBe('cumpleanos')
    expect(generateSlug('Piñata')).toBe('pinata')
  })

  it('already-valid slugs pass through unchanged', () => {
    expect(generateSlug('ramos-de-flores')).toBe('ramos-de-flores')
    expect(generateSlug('amor')).toBe('amor')
  })

  it('removes numbers from nowhere (numbers are kept)', () => {
    expect(generateSlug('Top 10 Ramos')).toBe('top-10-ramos')
  })

  it('strips dots', () => {
    expect(generateSlug('S.A. corp')).toBe('sa-corp')
  })
})
