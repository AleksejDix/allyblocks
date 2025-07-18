import type { FormatNumberProps } from './formatNumber.types'

export function formatNumber({ value, decimals = 2, locale = 'de-CH' }: FormatNumberProps): string {
  if (value === null || value === undefined || isNaN(value)) {
    return ''
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}
