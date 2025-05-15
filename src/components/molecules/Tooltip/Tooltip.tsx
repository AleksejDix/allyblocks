import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '@/lib/utils'
import { UI_CONSTANTS } from '@/lib/constants'
import type { TooltipProps, TooltipContentProps, TooltipTriggerProps, TooltipProviderProps } from './Tooltip.types'

function TooltipProvider({ delayDuration = UI_CONSTANTS.DELAY_DURATION.TOOLTIP, ...props }: TooltipProviderProps) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />
}

function Tooltip({ ...props }: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({ ...props }: TooltipTriggerProps) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

// Export the Portal component for custom use cases
const TooltipPortal = TooltipPrimitive.Portal

function TooltipContent({
  className,
  sideOffset = UI_CONSTANTS.SIDE_OFFSET.TOOLTIP,
  children,
  collisionBoundary,
  collisionPadding = UI_CONSTANTS.COLLISION_PADDING,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
        className={cn(
          'bg-primary text-xs drop-shadow border border-white dark:border-input/50 text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-balance',
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-primary border border-transparent border-r-white border-b-white dark:border-r-input/50 dark:border-b-input/50 fill-primary z-50 size-2.5 -translate-y-1/2 rotate-45" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, TooltipPortal }
