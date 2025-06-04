import * as RadioPrimitive from '@radix-ui/react-radio-group'

import { cn } from '@/lib/utils'
import { radioVariants } from './Radio.variants'
import type { RadioProps } from './Radio.types'

export function Radio({ className, size = 'md', ...props }: RadioProps) {
  return (
    <RadioPrimitive.Item data-slot="radio" className={cn(radioVariants({ size }), className)} {...props}>
      <RadioPrimitive.Indicator
        data-slot="radio-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-current" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Item>
  )
}
