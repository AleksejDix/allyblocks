import { describe, it, expect } from 'vitest'
import { formatNumber } from './formatNumber'

describe('formatNumber', () => {
  it('formats numbers with Swiss notation (apostrophe as thousands separator) by default', () => {
    // Test pattern rather than exact character due to Unicode apostrophe variations
    const result1 = formatNumber({ value: 1000 })
    expect(result1).toMatch(/1.000\.00/)
    expect(result1).toHaveLength(8)
    
    const result2 = formatNumber({ value: 1234567.89 })
    expect(result2).toMatch(/1.234.567\.89/)
    
    expect(formatNumber({ value: 0 })).toBe('0.00')
    
    const result3 = formatNumber({ value: -1000 })
    expect(result3).toMatch(/-1.000\.00/)
  })

  it('handles decimal places', () => {
    const result1 = formatNumber({ value: 1234.567, decimals: 2 })
    expect(result1).toMatch(/1.234\.57/)
    
    const result2 = formatNumber({ value: 1234.567, decimals: 0 })
    expect(result2).toMatch(/1.235/)
    
    const result3 = formatNumber({ value: 1234.567, decimals: 4 })
    expect(result3).toMatch(/1.234\.5670/)
  })

  it('handles locale parameter', () => {
    expect(formatNumber({ value: 1234.56, decimals: 2, locale: 'en-US' })).toBe('1,234.56')
    expect(formatNumber({ value: 1234.56, decimals: 2, locale: 'de-DE' })).toBe('1.234,56')
    
    const swissResult = formatNumber({ value: 1234.56, decimals: 2, locale: 'de-CH' })
    expect(swissResult).toMatch(/1.234\.56/)
  })

  it('handles invalid values', () => {
    expect(formatNumber({ value: NaN })).toBe('')
    expect(formatNumber({ value: null as any })).toBe('')
    expect(formatNumber({ value: undefined as any })).toBe('')
  })
})