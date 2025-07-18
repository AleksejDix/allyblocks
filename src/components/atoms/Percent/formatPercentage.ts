import type { FormatPercentageProps } from './formatPercentage.types'

export function formatPercentage({ value, decimals = 1, locale = 'de-CH' }: FormatPercentageProps): string {
  if (value === null || value === undefined || isNaN(value)) {
    return ''
  }

  // Convert to percentage (multiply by 100)
  const percentage = value * 100

  // Format with proper locale
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(percentage)

  // Add percentage sign with proper spacing for Swiss locales
  return `${formatted} %`
}
