import type { FormatSwissFrancProps } from './formatSwissFranc.types'

export function formatSwissFranc({ amount, decimals = 2, locale = 'de-CH' }: FormatSwissFrancProps): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return ''
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'CHF',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount)
}
