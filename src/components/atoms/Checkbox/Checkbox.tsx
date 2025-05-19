import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Icon } from '@/components/atoms/Icon'

import { cn } from '@/lib/utils'
import { checkboxVariants } from './Checkbox.variants'
import type { CheckboxProps } from './Checkbox.types'

export function Checkbox({ className, size = 'md', ...props }: CheckboxProps) {
  const iconSize = {
    sm: 10,
    md: 14,
    lg: 16,
  }

  return (
    <CheckboxPrimitive.Root data-slot="checkbox" className={cn(checkboxVariants({ size }), className)} {...props}>
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className=" text-current transition-none group/indicator"
      >
        <Icon
          name="check"
          size={iconSize[size as keyof typeof iconSize]}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-[[data-state=indeterminate]]/indicator:hidden"
        />
        <Icon
          name="minus"
          size={iconSize[size as keyof typeof iconSize]}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  group-[[data-state=checked]]/indicator:hidden"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
