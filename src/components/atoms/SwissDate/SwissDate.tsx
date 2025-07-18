import { formatSwissDate } from './formatSwissDate'
import type { FormatSwissDateProps } from './formatSwissDate.types'
import { cn } from '@/lib/utils'

export type SwissDateProps = FormatSwissDateProps & {
  /** CSS class name */
  className?: string
  /** Placeholder text when date is empty */
  placeholder?: string
}

export function SwissDate({
  date,
  relative = false,
  locale = 'de-CH',
  className,
  placeholder = '-',
}: SwissDateProps) {
  const formatted = formatSwissDate({ date, relative, locale })

  return <span className={cn('text-sm whitespace-nowrap', className)}>{formatted || placeholder}</span>
}
