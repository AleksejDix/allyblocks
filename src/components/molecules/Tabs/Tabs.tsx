import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'
import { tabsVariants, tabsListVariants, tabsTriggerVariants, tabsContentVariants } from './Tabs.variants'
import type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps } from './Tabs.types'

function Tabs({ className, orientation = 'horizontal', ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn(tabsVariants({ orientation }), className)}
      orientation={orientation}
      {...props}
    />
  )
}

function TabsList({ className, size = 'default', orientation = 'horizontal', ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabsListVariants({ size, orientation }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, size = 'default', ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ size }), className)}
      {...props}
    />
  )
}

function TabsContent({ className, variant = 'default', ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(tabsContentVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
