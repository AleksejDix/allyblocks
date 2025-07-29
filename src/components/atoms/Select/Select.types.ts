import * as React from 'react'
import type { ButtonProps } from '@/components/atoms/Button/Button.types'
import type {
  ActionMenuContentProps as BaseActionMenuContentProps,
  ActionMenuGroupProps as BaseActionMenuGroupProps,
  ActionMenuLabelProps as BaseActionMenuLabelProps,
  ActionMenuSeparatorProps as BaseActionMenuSeparatorProps,
  ActionMenuCheckboxItemProps as BaseActionMenuCheckboxItemProps,
} from '@/components/molecules/ActionMenu'

export type SelectSize = 'sm' | 'default' | 'lg' | 'icon'
export type SelectVariant = 'default' | 'ghost' | 'outline' | 'destructive' | 'secondary' | 'link'
export type SelectWidth = 'auto' | 'full'

export type SelectRootProps = {
  /** Selection mode - single or multiple */
  mode?: 'single' | 'multiple'

  /** The currently selected values */
  value?: string | string[]

  /** Default selected values */
  defaultValue?: string | string[]

  /** Callback when values change */
  onValueChange?: (value: string | string[]) => void

  /** Whether the select is disabled */
  disabled?: boolean

  /** Additional CSS classes */
  className?: string

  /** ID used for accessibility */
  id?: string

  /** Whether the field is required */
  required?: boolean

  /** Children elements */
  children?: React.ReactNode
}

export type SelectTriggerProps = Omit<ButtonProps, 'onChange'> & {
  /** Children elements */
  children?: React.ReactNode
}

export type SelectValueProps = {
  /** Placeholder text when no options are selected */
  placeholder?: string

  /** Text to show before the selected count */
  selectedText?: string

  /** Maximum number of visible selected items before truncation */
  maxDisplayItems?: number

  /** Whether to show item labels or just count */
  showSelectedLabels?: boolean

  /** Additional CSS classes */
  className?: string
}

export type SelectGroupProps = BaseActionMenuGroupProps & {
  /** Children elements */
  children: React.ReactNode
}

export type SelectContentProps = Omit<BaseActionMenuContentProps, 'onAnimationEnd'> & {
  /** Children elements */
  children?: React.ReactNode

  /** Width variant */
  width?: 'auto' | 'trigger' | 'full'

  /** Side of the trigger to render content */
  side?: 'top' | 'right' | 'bottom' | 'left'

  /** Alignment of content relative to trigger */
  align?: 'start' | 'center' | 'end'

  /** Offset distance from the trigger */
  sideOffset?: number
}

export type SelectLabelProps = BaseActionMenuLabelProps & {
  /** Children elements */
  children: React.ReactNode
}

export type SelectSeparatorProps = BaseActionMenuSeparatorProps & {
  /** Additional CSS classes */
  className?: string
}

export type SelectItemContext = {
  /** Item value */
  itemValue: string

  /** Whether the item is checked */
  checked?: boolean

  /** Display text to use when this item is selected */
  displayText?: string
}

export type SelectItemProps = Omit<BaseActionMenuCheckboxItemProps, 'context'> & {
  /** Label content */
  children: React.ReactNode

  /** Whether the item is disabled */
  disabled?: boolean

  /** Item value */
  value: string

  /** Context passed to ActionMenu system */
  context?: Record<string, unknown>
}

// Aliased for cleaner imports
export type SelectProps = SelectRootProps
