'use client'

import { cn } from '@/lib/utils'
import { useActionProvider, useActionHandler } from '@/lib/useAction'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/molecules/DropdownMenu'

import type {
  ActionMenuRootProps,
  ActionMenuTriggerProps,
  ActionMenuContentProps,
  ActionMenuItemProps,
  ActionMenuGroupProps,
  ActionMenuLabelProps,
  ActionMenuSeparatorProps,
  ActionMenuCheckboxItemProps,
  ActionMenuRadioGroupProps,
  ActionMenuRadioItemProps,
} from './ActionMenu.types'

import { ActionMenuContext, useActionMenu } from './ActionMenu.context'
import { UI_CONSTANTS } from '@/lib/constants'

/**
 * ActionMenu - Root component for the menu system
 */
export function ActionMenu({ children, onValueChange }: ActionMenuRootProps) {
  const { action, setAction } = useActionProvider()

  return (
    <ActionMenuContext.Provider value={{ action, setAction, onValueChange }}>
      <DropdownMenu>{children}</DropdownMenu>
    </ActionMenuContext.Provider>
  )
}

/**
 * ActionMenuTrigger - The button that opens the menu
 */
export function ActionMenuTrigger({ children, className, asChild, ...props }: ActionMenuTriggerProps) {
  return (
    <DropdownMenuTrigger asChild={asChild} className={className} {...props}>
      {children}
    </DropdownMenuTrigger>
  )
}

/**
 * ActionMenuContent - The dropdown content container
 */
export function ActionMenuContent({
  children,
  className,
  align = 'end',
  collisionPadding = UI_CONSTANTS.COLLISION_PADDING,
  collisionBoundary,
  ...props
}: ActionMenuContentProps) {
  const actionContext = useActionMenu()
  const handleAnimationEnd = useActionHandler(actionContext)

  return (
    <DropdownMenuContent
      className={className}
      align={align}
      collisionPadding={collisionPadding}
      collisionBoundary={collisionBoundary}
      onAnimationEnd={handleAnimationEnd}
      {...props}
    >
      {children}
    </DropdownMenuContent>
  )
}

/**
 * ActionMenuItem - Individual menu item that triggers an action
 */
export function ActionMenuItem({
  children,
  className,
  onSelect,
  onAction,
  value,
  context,
  ...props
}: ActionMenuItemProps) {
  const { setAction } = useActionMenu()

  // Handle the selection
  const handleSelect = (event: Event) => {
    // If a value is provided or there's a local action, use the pending action mechanism
    if (value || onAction) {
      setAction({
        callback: onAction,
        value,
        context,
        event,
      })
    } else if (onSelect) {
      // Support traditional onSelect for backward compatibility
      onSelect(event)
    }
  }

  return (
    <DropdownMenuItem
      className={cn('flex cursor-pointer items-center hover:bg-accent', className)}
      onSelect={handleSelect}
      {...props}
    >
      {children}
    </DropdownMenuItem>
  )
}

/**
 * ActionMenuGroup - Logical grouping of related menu items
 */
export function ActionMenuGroup({ children, className, ...props }: ActionMenuGroupProps) {
  return (
    <DropdownMenuGroup className={cn(className)} {...props}>
      {children}
    </DropdownMenuGroup>
  )
}

/**
 * ActionMenuLabel - Non-interactive label within the menu
 */
export function ActionMenuLabel({ children, className, ...props }: ActionMenuLabelProps) {
  return (
    <DropdownMenuLabel className={cn(className)} {...props}>
      {children}
    </DropdownMenuLabel>
  )
}

/**
 * ActionMenuSeparator - Visual separator between menu items
 */
export function ActionMenuSeparator({ className, ...props }: ActionMenuSeparatorProps) {
  return <DropdownMenuSeparator className={cn(className)} {...props} />
}

/**
 * ActionMenuCheckboxItem - Menu item with checkbox functionality
 */
export function ActionMenuCheckboxItem({
  children,
  className,
  checked,
  onCheckedChange,
  onAction,
  value,
  context,
  ...props
}: ActionMenuCheckboxItemProps) {
  const { setAction } = useActionMenu()

  const handleCheckedChange = (checked: boolean) => {
    if (onCheckedChange) {
      onCheckedChange(checked)
    }
  }

  const handleSelect = (event: Event) => {
    const newChecked = !checked

    // Schedule the action to run after animation
    setAction({
      callback: onAction ? (e) => onAction(newChecked, e) : undefined,
      value,
      // Include the new checked state in the context
      context: { ...context, checked: newChecked },
      event,
    })

    // Update the checked state through the original handler
    handleCheckedChange(newChecked)
  }

  return (
    <DropdownMenuCheckboxItem
      className={cn('flex items-center', className)}
      checked={checked}
      // Use the original onCheckedChange for controlled behavior
      onCheckedChange={handleCheckedChange}
      // But intercept the selection to handle actions
      onSelect={handleSelect}
      {...props}
    >
      {children}
    </DropdownMenuCheckboxItem>
  )
}

/**
 * ActionMenuRadioGroup - Container for radio items
 */
export function ActionMenuRadioGroup({
  children,
  className,
  value,
  onValueChange: onRadioValueChange,
  ...props
}: ActionMenuRadioGroupProps) {
  return (
    <DropdownMenuRadioGroup className={cn(className)} value={value} onValueChange={onRadioValueChange} {...props}>
      {children}
    </DropdownMenuRadioGroup>
  )
}

/**
 * ActionMenuRadioItem - Menu item with radio selection functionality
 */
export function ActionMenuRadioItem({
  children,
  className,
  value: radioValue,
  onAction,
  value, // Action value, different from radio value
  context,
  ...props
}: ActionMenuRadioItemProps) {
  const { setAction } = useActionMenu()

  const handleSelect = (event: Event) => {
    // Schedule the action to run after animation
    if (onAction || value) {
      setAction({
        callback: onAction,
        value: value, // Use the action value if provided
        // Include the radio value in the context
        context: { ...context, radioValue },
        event,
      })
    }
  }

  return (
    <DropdownMenuRadioItem
      className={cn('flex items-center', className)}
      value={radioValue}
      onSelect={handleSelect}
      {...props}
    >
      {children}
    </DropdownMenuRadioItem>
  )
}
