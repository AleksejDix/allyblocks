import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import type { VariantProps } from 'class-variance-authority'
import { radixSelectTriggerVariants, radixSelectContentVariants, radixSelectItemVariants } from './RadixSelect.variants'

/**
 * @deprecated Use Select with mode="single" instead
 * Base RadixSelect component props
 */
export type RadixSelectProps = React.ComponentProps<typeof SelectPrimitive.Root>

/**
 * @deprecated Use Select with mode="single" instead
 * RadixSelectGroup component props
 */
export type RadixSelectGroupProps = React.ComponentProps<typeof SelectPrimitive.Group>

/**
 * @deprecated Use Select with mode="single" instead
 * RadixSelectValue component props
 */
export type RadixSelectValueProps = React.ComponentProps<typeof SelectPrimitive.Value>

/**
 * @deprecated Use Select with mode="single" instead
 * RadixSelectTrigger component props with variant support
 */
export type RadixSelectTriggerProps = React.ComponentProps<typeof SelectPrimitive.Trigger> &
  VariantProps<typeof radixSelectTriggerVariants> & {
    /**
     * The content to display within the trigger
     */
    children?: React.ReactNode
  }

/**
 * @deprecated Use Select with mode="single" instead
 * RadixSelectContent component props with variant support
 */
export type RadixSelectContentProps = React.ComponentProps<typeof SelectPrimitive.Content> &
  VariantProps<typeof radixSelectContentVariants>

/**
 * @deprecated Use Select with mode="single" instead
 * RadixSelectLabel component props
 */
export type RadixSelectLabelProps = React.ComponentProps<typeof SelectPrimitive.Label>

/**
 * @deprecated Use Select with mode="single" instead
 * RadixSelectItem component props with variant support
 */
export type RadixSelectItemProps = React.ComponentProps<typeof SelectPrimitive.Item> &
  VariantProps<typeof radixSelectItemVariants> & {
    /**
     * The content to display within the item
     */
    children: React.ReactNode
  }

/**
 * @deprecated Use Select with mode="single" instead
 * RadixSelectSeparator component props
 */
export type RadixSelectSeparatorProps = React.ComponentProps<typeof SelectPrimitive.Separator>

/**
 * @deprecated Use Select with mode="single" instead
 * RadixSelectScrollUpButton component props
 */
export type RadixSelectScrollUpButtonProps = React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>

/**
 * @deprecated Use Select with mode="single" instead
 * RadixSelectScrollDownButton component props
 */
export type RadixSelectScrollDownButtonProps = React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>
