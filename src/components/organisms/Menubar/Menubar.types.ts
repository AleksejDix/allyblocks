import * as React from 'react'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import type { VariantProps } from 'class-variance-authority'
import {
  menubarVariants,
  menubarTriggerVariants,
  menubarContentVariants,
  menubarItemVariants,
  menubarCheckboxItemVariants,
  menubarRadioItemVariants,
  menubarLabelVariants,
  menubarSeparatorVariants,
  menubarShortcutVariants,
  menubarSubTriggerVariants,
  menubarSubContentVariants,
} from './Menubar.variants'

export type MenubarProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root> &
  VariantProps<typeof menubarVariants>

export type MenubarRef = React.ComponentRef<typeof MenubarPrimitive.Root>

export type MenubarMenuProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Menu>

export type MenubarMenuRef = React.ComponentRef<typeof MenubarPrimitive.Menu>

export type MenubarGroupProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Group>

export type MenubarGroupRef = React.ComponentRef<typeof MenubarPrimitive.Group>

export type MenubarPortalProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Portal>

export type MenubarPortalRef = React.ComponentRef<typeof MenubarPrimitive.Portal>

export type MenubarRadioGroupProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioGroup>

export type MenubarRadioGroupRef = React.ComponentRef<typeof MenubarPrimitive.RadioGroup>

export type MenubarTriggerProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger> &
  VariantProps<typeof menubarTriggerVariants>

export type MenubarTriggerRef = React.ComponentRef<typeof MenubarPrimitive.Trigger>

export type MenubarContentProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content> &
  VariantProps<typeof menubarContentVariants>

export type MenubarContentRef = React.ComponentRef<typeof MenubarPrimitive.Content>

export type MenubarItemProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> &
  VariantProps<typeof menubarItemVariants> & {
    inset?: boolean
    variant?: 'default' | 'destructive'
  }

export type MenubarItemRef = React.ComponentRef<typeof MenubarPrimitive.Item>

export type MenubarCheckboxItemProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem> &
  VariantProps<typeof menubarCheckboxItemVariants>

export type MenubarCheckboxItemRef = React.ComponentRef<typeof MenubarPrimitive.CheckboxItem>

export type MenubarRadioItemProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem> &
  VariantProps<typeof menubarRadioItemVariants>

export type MenubarRadioItemRef = React.ComponentRef<typeof MenubarPrimitive.RadioItem>

export type MenubarLabelProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> &
  VariantProps<typeof menubarLabelVariants> & {
    inset?: boolean
  }

export type MenubarLabelRef = React.ComponentRef<typeof MenubarPrimitive.Label>

export type MenubarSeparatorProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator> &
  VariantProps<typeof menubarSeparatorVariants>

export type MenubarSeparatorRef = React.ComponentRef<typeof MenubarPrimitive.Separator>

export type MenubarShortcutProps = React.ComponentPropsWithoutRef<'span'> & VariantProps<typeof menubarShortcutVariants>

export type MenubarShortcutRef = React.ComponentRef<'span'>

export type MenubarSubProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Sub>

export type MenubarSubRef = React.ComponentRef<typeof MenubarPrimitive.Sub>

export type MenubarSubTriggerProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> &
  VariantProps<typeof menubarSubTriggerVariants> & {
    inset?: boolean
  }

export type MenubarSubTriggerRef = React.ComponentRef<typeof MenubarPrimitive.SubTrigger>

export type MenubarSubContentProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent> &
  VariantProps<typeof menubarSubContentVariants>

export type MenubarSubContentRef = React.ComponentRef<typeof MenubarPrimitive.SubContent>
