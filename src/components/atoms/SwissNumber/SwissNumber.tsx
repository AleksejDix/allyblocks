import { formatNumber } from './formatNumber'
import type { FormatNumberProps } from './formatNumber.types'
import { cn } from '@/lib/utils'
import type { JSX } from 'react'

export type SwissNumberProps = FormatNumberProps & {
  /** Additional CSS classes */
  className?: string
  /** Render as a specific HTML element */
  as?: keyof JSX.IntrinsicElements
}

export function SwissNumber({ className, as: Component = 'span', ...formatProps }: SwissNumberProps) {
  const formattedNumber = formatNumber(formatProps)

  return <Component className={cn('whitespace-nowrap', className)}>{formattedNumber}</Component>
}
