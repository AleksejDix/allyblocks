import { formatSwissFranc } from './formatSwissFranc'
import type { FormatSwissFrancProps } from './formatSwissFranc.types'
import type { JSX } from 'react'
import { cn } from '@/lib/utils'

export type SwissFrancProps = FormatSwissFrancProps & {
  /** Additional CSS classes */
  className?: string
  /** Render as a specific HTML element */
  as?: keyof JSX.IntrinsicElements
}

export function SwissFranc({ className, as: Component = 'span', ...formatProps }: SwissFrancProps) {
  const formattedAmount = formatSwissFranc(formatProps)

  return <Component className={cn('whitespace-nowrap', className)}>{formattedAmount}</Component>
}
