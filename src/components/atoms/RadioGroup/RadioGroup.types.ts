import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import type { VariantProps } from 'class-variance-authority'
import { radioVariants, radioGroupVariants } from './RadioGroup.variants'

export type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root> &
  VariantProps<typeof radioGroupVariants>

export type RadioProps = React.ComponentProps<typeof RadioGroupPrimitive.Item> & VariantProps<typeof radioVariants>

export type RadioItemProps = React.ComponentProps<'div'>
