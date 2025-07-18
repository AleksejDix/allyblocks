import type { FormatFileSizeProps } from './formatFileSize.types'

const DIVISOR = 1024
const UNITS = ['bytes', 'KB', 'MB', 'GB', 'TB']

export function formatFileSize({ bytes, decimals = 1, locale = 'de-CH' }: FormatFileSizeProps): string {
  if (bytes === null || bytes === undefined || isNaN(bytes)) {
    return ''
  }

  if (bytes === 0) {
    return `0 ${UNITS[0]}`
  }

  // Auto unit selection
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(DIVISOR))
  const clampedIndex = Math.min(unitIndex, UNITS.length - 1)

  if (clampedIndex === 0) {
    return `${bytes.toLocaleString(locale)} ${UNITS[0]}`
  }

  const value = bytes / Math.pow(DIVISOR, clampedIndex)
  const formatted = value.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return `${formatted} ${UNITS[clampedIndex]}`
}
