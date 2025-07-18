import { formatFileSize } from './formatFileSize'
import type { FormatFileSizeProps } from './formatFileSize.types'
import { cn } from '@/lib/utils'

export type FileSizeProps = FormatFileSizeProps & {
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * What to display when bytes is null/undefined
   * @default '-'
   */
  emptyText?: string
}

export function FileSize({
  bytes,
  decimals = 2,
  locale = 'de-CH',
  className,
  emptyText = '-',
}: FileSizeProps) {
  const formatted = formatFileSize({ bytes, decimals, locale })

  if (!formatted) {
    return <span className={cn('text-sm text-muted-foreground whitespace-nowrap', className)}>{emptyText}</span>
  }

  return <span className={cn('text-sm whitespace-nowrap', className)}>{formatted}</span>
}
