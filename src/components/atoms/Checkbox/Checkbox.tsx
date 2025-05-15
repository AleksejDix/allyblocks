import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check, Minus } from 'lucide-react'

import { cn } from '@/lib/utils'
import { checkboxVariants } from './Checkbox.variants'
import type { CheckboxProps } from './Checkbox.types'

export function Checkbox({ className, size, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root data-slot="checkbox" className={cn(checkboxVariants({ size }), className)} {...props}>
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none group/indicator"
      >
        <Check className="h-4 w-4 group-[[data-state=indeterminate]]/indicator:hidden" />
        <Minus className="h-4 w-4 group-[[data-state=checked]]/indicator:hidden" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
