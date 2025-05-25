import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import type { VariantProps } from 'class-variance-authority'
import {
  popoverVariants,
  popoverContentVariants,
  popoverTriggerVariants,
  popoverAnchorVariants,
} from './Popover.variants'

export type PopoverProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> &
  VariantProps<typeof popoverVariants>

export type PopoverRef = React.ComponentRef<typeof PopoverPrimitive.Root>

export type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> &
  VariantProps<typeof popoverTriggerVariants>

export type PopoverTriggerRef = React.ComponentRef<typeof PopoverPrimitive.Trigger>

export type PopoverContentProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> &
  VariantProps<typeof popoverContentVariants>

export type PopoverContentRef = React.ComponentRef<typeof PopoverPrimitive.Content>

export type PopoverAnchorProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Anchor> &
  VariantProps<typeof popoverAnchorVariants>

export type PopoverAnchorRef = React.ComponentRef<typeof PopoverPrimitive.Anchor>
