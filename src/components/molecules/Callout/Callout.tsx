import { X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { calloutVariants } from './Callout.variants'
import type { CalloutProps, CalloutCloseProps } from './Callout.types'
import { IconButton } from '@/components/atoms/IconButton'

/**
 * Callout component for displaying inline notifications and banners.
 *
 * Use Text component for titles and descriptions:
 *
 * @example
 * <Callout color="amber">
 *   <Text type="heading" size="md" weight={600}>Title</Text>
 *   <Text type="body" size="sm" tone="muted">Description text</Text>
 *   <div className="mt-3">
 *     <ActionGroup>
 *       <Button size="sm" variant="default">Primary</Button>
 *       <Button size="sm" variant="outline">Secondary</Button>
 *     </ActionGroup>
 *   </div>
 *   <CalloutClose />
 * </Callout>
 */
function Callout({ className, color, ...props }: CalloutProps) {
  return <div data-slot="callout" role="region" className={cn(calloutVariants({ color }), className)} {...props} />
}

function CalloutClose({ className, onClick, ...props }: CalloutCloseProps) {
  return (
    <IconButton
      data-slot="callout-close"
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn(
        'col-start-2 row-start-1 outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 hover:opacity-70 transition-opacity',
        className,
      )}
      aria-label="Close callout"
      {...props}
    >
      <X className="size-3.5" />
    </IconButton>
  )
}

export { Callout, CalloutClose }
