import type { ComponentPropsWithoutRef, ComponentRef } from 'react'
import type { VariantProps } from 'class-variance-authority'
import type {
  listboxVariants,
  listboxItemVariants,
  listboxGroupVariants,
  listboxLabelVariants,
} from './Listbox.variants'

/**
 * Props for the Listbox component.
 *
 * A listbox is a widget that allows the user to select one or more items from a list of choices.
 * It provides keyboard navigation with arrow keys, Home/End keys, and proper ARIA semantics.
 * Similar to an HTML select element with size > 1.
 */
export type ListboxProps = ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof listboxVariants> & {
    /**
     * The selected value(s). Can be a string for single selection or array for multiple selection.
     * @default undefined
     */
    value?: string | string[]

    /**
     * Callback fired when the selection changes.
     * @param value - The new selected value(s)
     */
    onValueChange?: (value: string | string[]) => void

    /**
     * Whether multiple items can be selected.
     * @default false
     */
    multiple?: boolean

    /**
     * Whether the listbox is disabled.
     * @default false
     */
    disabled?: boolean

    /**
     * The orientation of the listbox for keyboard navigation.
     * @default 'vertical'
     */
    orientation?: 'horizontal' | 'vertical'

    /**
     * Whether keyboard navigation should loop around when reaching the first/last item.
     * @default true
     */
    loop?: boolean

    /**
     * ARIA label for the listbox.
     */
    'aria-label'?: string

    /**
     * ID of the element that labels the listbox.
     */
    'aria-labelledby'?: string

    /**
     * ID of the element that describes the listbox.
     */
    'aria-describedby'?: string
  }

/**
 * Props for the ListboxItem component.
 */
export type ListboxItemProps = ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof listboxItemVariants> & {
    /**
     * The value of this item. Must be unique within the listbox.
     */
    value: string

    /**
     * Whether this item is disabled.
     * @default false
     */
    disabled?: boolean

    /**
     * Text content for screen readers. If not provided, uses the children.
     */
    textValue?: string
  }

/**
 * Props for the ListboxGroup component.
 */
export type ListboxGroupProps = ComponentPropsWithoutRef<'div'> & VariantProps<typeof listboxGroupVariants>

/**
 * Props for the ListboxLabel component.
 */
export type ListboxLabelProps = ComponentPropsWithoutRef<'div'> & VariantProps<typeof listboxLabelVariants>

/**
 * Ref type for the Listbox component.
 */
export type ListboxRef = ComponentRef<'div'>

/**
 * Ref type for the ListboxItem component.
 */
export type ListboxItemRef = ComponentRef<'div'>

/**
 * Ref type for the ListboxGroup component.
 */
export type ListboxGroupRef = ComponentRef<'div'>

/**
 * Ref type for the ListboxLabel component.
 */
export type ListboxLabelRef = ComponentRef<'div'>
