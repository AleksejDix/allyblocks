import { X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { calloutVariants } from './Callout.variants'
import type { CalloutProps, CalloutTitleProps, CalloutDescriptionProps, CalloutCloseProps } from './Callout.types'

/**
 * Callout component for displaying inline notifications and banners.
 *
 * For action buttons, use ActionGroup and Button components:
 *
 * @example
 * <Callout color="amber">
 *   <CalloutTitle>Title</CalloutTitle>
 *   <CalloutDescription>Description</CalloutDescription>
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

function CalloutTitle({ className, ...props }: CalloutTitleProps) {
  return (
    <div
      data-slot="callout-title"
      className={cn(
        'col-start-1 line-clamp-2 min-h-5 font-semibold tracking-tight text-[15px] leading-tight',
        className,
      )}
      {...props}
    />
  )
}

function CalloutDescription({ className, ...props }: CalloutDescriptionProps) {
  return (
    <div
      data-slot="callout-description"
      className={cn('col-start-1 text-sm leading-relaxed opacity-90 [&_p]:leading-relaxed', className)}
      {...props}
    />
  )
}

function CalloutClose({ className, onClick, ...props }: CalloutCloseProps) {
  return (
    <button
      data-slot="callout-close"
      type="button"
      onClick={onClick}
      className={cn(
        'col-start-2 row-start-1 outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 hover:opacity-70 transition-opacity',
        className,
      )}
      aria-label="Close callout"
      {...props}
    >
      <X className="size-3.5" />
    </button>
  )
}

export { Callout, CalloutTitle, CalloutDescription, CalloutClose }
