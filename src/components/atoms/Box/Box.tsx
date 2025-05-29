import React from 'react'
import { cn } from '@/lib/utils'
import { boxVariants } from './Box.variants'
import type { BoxProps, BoxRef } from './Box.types'

const Box = React.forwardRef<BoxRef, BoxProps>(
  ({ className, as: Component = 'div', variant, shadow, width, height, ...props }, ref) => {
    return <Component ref={ref} className={cn(boxVariants({ variant, shadow, width, height }), className)} {...props} />
  },
)

Box.displayName = 'Box'

export { Box }
