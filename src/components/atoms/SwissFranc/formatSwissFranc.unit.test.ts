import { describe, it, expect } from 'vitest'
import { formatSwissFranc } from './formatSwissFranc'

describe('formatSwissFranc', () => {
  it('formats Swiss Franc amounts with default settings', () => {
    // Use regex to match any whitespace character between CHF and amount
    expect(formatSwissFranc({ amount: 1000 })).toMatch(/CHF\s1.000\.00/)
    expect(formatSwissFranc({ amount: 1234567.89 })).toMatch(/CHF\s1.234.567\.89/)
    expect(formatSwissFranc({ amount: 0 })).toMatch(/CHF\s0\.00/)
    expect(formatSwissFranc({ amount: -1000 })).toMatch(/CHF-1.000\.00/)
  })

  it('handles decimal places', () => {
    expect(formatSwissFranc({ amount: 1234.567, decimals: 2 })).toMatch(/CHF\s1.234\.57/)
    expect(formatSwissFranc({ amount: 1234.567, decimals: 0 })).toMatch(/CHF\s1.235/)
    expect(formatSwissFranc({ amount: 1234.567, decimals: 4 })).toMatch(/CHF\s1.234\.5670/)
  })

  it('handles locale parameter', () => {
    expect(formatSwissFranc({ amount: 1234.56, decimals: 2, locale: 'en-US' })).toMatch(/CHF\s1,234\.56/)
    expect(formatSwissFranc({ amount: 1234.56, decimals: 2, locale: 'de-DE' })).toMatch(/1\.234,56\sCHF/)
    expect(formatSwissFranc({ amount: 1234.56, decimals: 2, locale: 'de-CH' })).toMatch(/CHF\s1.234\.56/)
  })

  it('handles invalid values', () => {
    expect(formatSwissFranc({ amount: NaN })).toBe('')
    expect(formatSwissFranc({ amount: null as any })).toBe('')
    expect(formatSwissFranc({ amount: undefined as any })).toBe('')
  })
})