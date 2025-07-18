import { formatPercentage } from './formatPercentage'
import type { FormatPercentageProps } from './formatPercentage.types'
import type { JSX } from 'react'
import { cn } from '@/lib/utils'

export type PercentProps = FormatPercentageProps & {
  /** Additional CSS classes */
  className?: string
  /** Render as a specific HTML element */
  as?: keyof JSX.IntrinsicElements
}

export function Percent({ className, as: Component = 'span', ...formatProps }: PercentProps) {
  const formattedPercentage = formatPercentage(formatProps)

  return <Component className={cn('whitespace-nowrap', className)}>{formattedPercentage}</Component>
}
