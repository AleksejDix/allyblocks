import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

export type DropdownMenuProps = React.ComponentProps<typeof DropdownMenuPrimitive.Root>

export type DropdownMenuPortalProps = React.ComponentProps<typeof DropdownMenuPrimitive.Portal>

export type DropdownMenuTriggerProps = React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>

export type DropdownMenuContentProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & {
  /**
   * Optional class name to apply custom styles
   */
  className?: string
  /**
   * The distance in pixels from the trigger
   * @default 4
   */
  sideOffset?: number
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
  /**
   * Function called when animation ends
   */
  onAnimationEnd?: () => void
}

export type DropdownMenuGroupProps = React.ComponentProps<typeof DropdownMenuPrimitive.Group>

export type DropdownMenuItemVariant = 'default' | 'destructive'

export type DropdownMenuItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  /**
   * Whether the item is inset to accommodate icons
   */
  inset?: boolean

  /**
   * Style variant of the menu item
   * @default "default"
   */
  variant?: DropdownMenuItemVariant
}

export type DropdownMenuCheckboxItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>

export type DropdownMenuRadioGroupProps = React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>

export type DropdownMenuRadioItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>

export type DropdownMenuLabelProps = React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  /**
   * Whether the label is inset to accommodate icons
   */
  inset?: boolean
}

export type DropdownMenuSeparatorProps = React.ComponentProps<typeof DropdownMenuPrimitive.Separator>

export type DropdownMenuShortcutProps = React.ComponentProps<'span'>

export type DropdownMenuSubProps = React.ComponentProps<typeof DropdownMenuPrimitive.Sub>

export type DropdownMenuSubTriggerProps = React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  /**
   * Whether the sub trigger is inset to accommodate icons
   */
  inset?: boolean
}

export type DropdownMenuSubContentProps = React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>
