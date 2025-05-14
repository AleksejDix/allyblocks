import * as SeparatorPrimitive from '@radix-ui/react-separator'

import { cn } from '@/lib/utils'
import type { SeparatorProps } from './Separator.types'
import { separatorVariants } from './Separator.variants'

export function Separator({ className, orientation = 'horizontal', decorative = true, ...props }: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(separatorVariants(), className)}
      {...props}
    />
  )
}
