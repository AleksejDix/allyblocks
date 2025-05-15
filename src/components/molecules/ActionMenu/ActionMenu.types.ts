import type { ReactNode } from 'react'
import { type ComponentPropsWithoutRef } from 'react'
import type { DropdownMenuContentProps } from '@/components/molecules/DropdownMenu/DropdownMenu.types'
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/molecules/DropdownMenu'
import type { ActionContextType, ActionTriggerProps, ActionProviderProps } from '@/lib/useAction'

/**
 * Type for actionmenu-specific context
 */
export type ActionMenuContextData = Record<string, unknown>

/**
 * Context type for the ActionMenu using shared action mechanism
 */
export type ActionMenuContextType = ActionContextType<ActionMenuContextData>

/**
 * Common props for ActionMenu components
 */
export type ActionMenuProps = {
  /**
   * Optional custom class name
   */
  className?: string
}

/**
 * Props for the ActionMenu component
 */
export type ActionMenuRootProps = ActionMenuProps & ActionProviderProps<ActionMenuContextData>

/**
 * Props for ActionMenuTrigger component
 */
export type ActionMenuTriggerProps = {
  children: ReactNode
  className?: string
  asChild?: boolean
}

/**
 * Props for ActionMenuContent component
 */
export type ActionMenuContentProps = Omit<DropdownMenuContentProps, 'onAnimationEnd'> & {
  /**
   * Optional class name to apply custom styles
   */
  className?: string
  /**
   * The preferred alignment of the menu
   * @default "end"
   */
  align?: 'center' | 'start' | 'end'
  /**
   * The padding between the content and the boundary
   * @default 16
   */
  collisionPadding?: number | { top?: number; right?: number; bottom?: number; left?: number }
  /**
   * Element that the content should avoid overlapping
   * @default undefined
   */
  collisionBoundary?: Element | null | Array<Element | null>
}

/**
 * Props for ActionMenuItem component
 */
export type ActionMenuItemProps = ComponentPropsWithoutRef<typeof DropdownMenuItem> &
  ActionTriggerProps<ActionMenuContextData> & {
    onSelect?: (e: Event) => void
  }

/**
 * Props for ActionMenuGroup component
 */
export type ActionMenuGroupProps = ComponentPropsWithoutRef<typeof DropdownMenuGroup>

/**
 * Props for ActionMenuLabel component
 */
export type ActionMenuLabelProps = ComponentPropsWithoutRef<typeof DropdownMenuLabel>

/**
 * Props for ActionMenuSeparator component
 */
export type ActionMenuSeparatorProps = ComponentPropsWithoutRef<typeof DropdownMenuSeparator>

/**
 * Props for ActionMenuCheckboxItem component
 */
export type ActionMenuCheckboxItemProps = ComponentPropsWithoutRef<typeof DropdownMenuCheckboxItem> & {
  onAction?: (checked: boolean, e: Event) => void
  value?: string
  context?: ActionMenuContextData
}

/**
 * Props for ActionMenuRadioGroup component
 */
export type ActionMenuRadioGroupProps = ComponentPropsWithoutRef<typeof DropdownMenuRadioGroup>

/**
 * Props for ActionMenuRadioItem component
 */
export type ActionMenuRadioItemProps = ComponentPropsWithoutRef<typeof DropdownMenuRadioItem> &
  ActionTriggerProps<ActionMenuContextData>
