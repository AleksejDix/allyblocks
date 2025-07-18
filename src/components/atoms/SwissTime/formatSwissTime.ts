import type { FormatSwissTimeProps } from './formatSwissTime.types'

export function formatSwissTime({ time, showSeconds = false, locale = 'de-CH' }: FormatSwissTimeProps): string {
  if (!time) {
    return ''
  }

  const dateObj = time instanceof Date ? time : new Date(time)

  if (isNaN(dateObj.getTime())) {
    return ''
  }

  // Swiss 24-hour format
  return dateObj.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    ...(showSeconds && { second: '2-digit' }),
    hour12: false,
  })
}
