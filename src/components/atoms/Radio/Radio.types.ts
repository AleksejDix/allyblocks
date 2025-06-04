import * as React from 'react'
import * as RadioPrimitive from '@radix-ui/react-radio-group'
import type { VariantProps } from 'class-variance-authority'
import { radioVariants } from './Radio.variants'

export type RadioProps = React.ComponentProps<typeof RadioPrimitive.Item> & VariantProps<typeof radioVariants>
