import type { FormatSwissDateProps } from './formatSwissDate.types'

export function formatSwissDate({ date, relative = false, locale = 'de-CH' }: FormatSwissDateProps): string {
  if (!date) {
    return ''
  }

  const dateObj = date instanceof Date ? date : new Date(date)

  if (isNaN(dateObj.getTime())) {
    return ''
  }

  if (relative) {
    const now = new Date()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startOfDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate())
    const diffTime = startOfDate.getTime() - startOfToday.getTime()
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))

    // Only show relative for -7 to +7 days
    if (Math.abs(diffDays) <= 7) {
      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
      return rtf.format(diffDays, 'day')
    }
  }

  // Standard Swiss date format: DD.MM.YYYY
  return dateObj.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
