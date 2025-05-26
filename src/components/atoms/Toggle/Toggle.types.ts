import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import type { VariantProps } from 'class-variance-authority'
import { toggleVariants } from './Toggle.variants'

export type ToggleProps = React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>

export type ToggleRef = React.ComponentRef<typeof TogglePrimitive.Root>
