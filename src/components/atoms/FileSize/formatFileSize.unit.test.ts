import { describe, it, expect } from 'vitest'
import { formatFileSize } from './formatFileSize'

describe('formatFileSize', () => {
  it('formats file sizes with automatic unit selection', () => {
    expect(formatFileSize({ bytes: 0 })).toBe('0 bytes')
    expect(formatFileSize({ bytes: 500 })).toBe('500 bytes')
    expect(formatFileSize({ bytes: 1024 })).toBe('1.0 KB')
    expect(formatFileSize({ bytes: 1536 })).toBe('1.5 KB')
    expect(formatFileSize({ bytes: 1048576 })).toBe('1.0 MB')
    expect(formatFileSize({ bytes: 1073741824 })).toBe('1.0 GB')
    expect(formatFileSize({ bytes: 1099511627776 })).toBe('1.0 TB')
  })

  it('handles decimal places', () => {
    expect(formatFileSize({ bytes: 1536, decimals: 0 })).toBe('2 KB')
    expect(formatFileSize({ bytes: 1536, decimals: 1 })).toBe('1.5 KB')
    expect(formatFileSize({ bytes: 1536, decimals: 2 })).toBe('1.50 KB')
    expect(formatFileSize({ bytes: 1536, decimals: 3 })).toBe('1.500 KB')
  })

  it('handles locale parameter', () => {
    expect(formatFileSize({ bytes: 1536, decimals: 1, locale: 'en-US' })).toBe('1.5 KB')
    expect(formatFileSize({ bytes: 1536, decimals: 1, locale: 'de-DE' })).toBe('1,5 KB')
    expect(formatFileSize({ bytes: 1536, decimals: 1, locale: 'de-CH' })).toBe('1.5 KB')
  })

  it('handles large file sizes', () => {
    const tb = 1099511627776
    expect(formatFileSize({ bytes: tb * 1000 })).toMatch(/1.000\.0 TB/)
    expect(formatFileSize({ bytes: tb * 1.5 })).toBe('1.5 TB')
  })

  it('handles bytes display with locale formatting', () => {
    expect(formatFileSize({ bytes: 1000, locale: 'de-CH' })).toMatch(/1.000 bytes/)
    expect(formatFileSize({ bytes: 1000, locale: 'en-US' })).toBe('1,000 bytes')
    expect(formatFileSize({ bytes: 1000, locale: 'de-DE' })).toBe('1.000 bytes')
  })

  it('handles invalid values', () => {
    expect(formatFileSize({ bytes: NaN })).toBe('')
    expect(formatFileSize({ bytes: null as any })).toBe('')
    expect(formatFileSize({ bytes: undefined as any })).toBe('')
  })
})