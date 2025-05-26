import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import type { VariantProps } from 'class-variance-authority'
import { tabsVariants, tabsListVariants, tabsTriggerVariants, tabsContentVariants } from './Tabs.variants'

export type TabsProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & VariantProps<typeof tabsVariants>

export type TabsRef = React.ComponentRef<typeof TabsPrimitive.Root>

export type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>

export type TabsListRef = React.ComponentRef<typeof TabsPrimitive.List>

export type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
  VariantProps<typeof tabsTriggerVariants>

export type TabsTriggerRef = React.ComponentRef<typeof TabsPrimitive.Trigger>

export type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> &
  VariantProps<typeof tabsContentVariants>

export type TabsContentRef = React.ComponentRef<typeof TabsPrimitive.Content>
