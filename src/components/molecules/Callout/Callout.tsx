import { X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { calloutVariants } from './Callout.variants'
import type { CalloutProps, CalloutCloseProps } from './Callout.types'
import { IconButton } from '@/components/atoms/IconButton'

import { Stack } from '@/components/atoms/Stack'

/**
 * Callout component for displaying inline notifications and banners.
 *
 * Has built-in white background, padding, border, and rounded corners.
 * Uses CalloutBody for consistent 2-column layout with composition.
 *
 * @example
 * <Callout>
 *   <CalloutBody icon="alert-triangle" variant="amber">
 *     <Text as="h2" type="heading" size="lg">Warning Title</Text>
 *     <Text tone="muted">Description text here.</Text>
 *     <ActionGroup>
 *       <Button size="sm">Primary</Button>
 *       <Button size="sm" variant="outline">Secondary</Button>
 *     </ActionGroup>
 *   </CalloutBody>
 *   <CalloutClose />
 * </Callout>
 */
function Callout({ className, children, ...props }: CalloutProps) {
  return (
    <Stack gap="lg" data-slot="callout" role="region" className={cn(calloutVariants(), className)} {...props}>
      {children}
    </Stack>
  )
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
        'absolute top-3 right-3 outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 hover:opacity-70 transition-opacity',
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
