import { formatSwissTime } from './formatSwissTime'
import type { FormatSwissTimeProps } from './formatSwissTime.types'
import type { JSX } from 'react'
import { cn } from '@/lib/utils'

export type SwissTimeProps = FormatSwissTimeProps & {
  /** Additional CSS classes */
  className?: string
  /** Render as a specific HTML element */
  as?: keyof JSX.IntrinsicElements
}

export function SwissTime({ className, as: Component = 'span', ...formatProps }: SwissTimeProps) {
  const formattedTime = formatSwissTime(formatProps)

  return <Component className={cn('whitespace-nowrap', className)}>{formattedTime}</Component>
}
