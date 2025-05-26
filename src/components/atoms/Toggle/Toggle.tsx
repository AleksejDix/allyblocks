'use client'

import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cn } from '@/lib/utils'
import { toggleVariants } from './Toggle.variants'
import type { ToggleProps } from './Toggle.types'

function Toggle({ className, variant, size, ...props }: ToggleProps) {
  return (
    <TogglePrimitive.Root data-slot="toggle" className={cn(toggleVariants({ variant, size, className }))} {...props} />
  )
}

export { Toggle }
