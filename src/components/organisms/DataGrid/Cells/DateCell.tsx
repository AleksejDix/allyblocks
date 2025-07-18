import { formatSwissDate } from '@/components/atoms/SwissDate'
import { formatSwissTime } from '@/components/atoms/SwissTime'
import { useLocale } from '@/hooks/useLocale'
import { cn } from '@/lib/utils'

export interface DateCellProps {
  date: string | Date | null | undefined
  showTime?: boolean
  relative?: boolean
  className?: string
}

export function DateCell({ date, showTime = false, relative = false, className }: DateCellProps) {
  const locale = useLocale()

  if (!date) {
    return <span className={cn('text-sm text-muted-foreground', className)}>-</span>
  }

  const formattedDate = formatSwissDate({ date, relative, locale })

  if (!formattedDate) {
    return <span className={cn('text-sm text-muted-foreground', className)}>-</span>
  }

  if (!showTime) {
    return <span className={cn('text-sm', className)}>{formattedDate}</span>
  }

  const formattedTime = formatSwissTime({ time: date, locale })

  return (
    <span className={cn('inline-flex items-baseline gap-2 text-sm', className)}>
      <span>{formattedDate}</span>
      <span className="text-muted-foreground">{formattedTime}</span>
    </span>
  )
}
