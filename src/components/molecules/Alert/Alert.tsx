import * as React from 'react'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { alertVariants } from './Alert.variants'
import type { AlertProps, AlertTitleProps, AlertDescriptionProps, AlertCloseProps } from './Alert.types'

/**
 * Alert component for displaying inline notifications and banners.
 *
 * For action buttons, use ActionGroup and Button components:
 *
 * @example
 * <Alert color="amber">
 *   <Icon className="h-4 w-4" />
 *   <AlertTitle>Title</AlertTitle>
 *   <AlertDescription>Description</AlertDescription>
 *   <div className="col-start-2 mt-3">
 *     <ActionGroup>
 *       <Button size="sm" variant="default">Primary</Button>
 *       <Button size="sm" variant="outline">Secondary</Button>
 *     </ActionGroup>
 *   </div>
 *   <AlertClose />
 * </Alert>
 */
function Alert({ className, color, ...props }: AlertProps) {
  return <div data-slot="alert" role="alert" className={cn(alertVariants({ color }), className)} {...props} />
}

function AlertTitle({ className, ...props }: AlertTitleProps) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'col-start-2 line-clamp-2 min-h-5 font-semibold tracking-tight text-[15px] leading-tight',
        className,
      )}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return (
    <div
      data-slot="alert-description"
      className={cn('col-start-2 text-sm leading-relaxed opacity-90 [&_p]:leading-relaxed', className)}
      {...props}
    />
  )
}

function AlertClose({ className, onClick, ...props }: AlertCloseProps) {
  return (
    <button
      data-slot="alert-close"
      type="button"
      onClick={onClick}
      className={cn(
        'col-start-3 row-start-1 outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 hover:opacity-70 transition-opacity',
        className,
      )}
      aria-label="Close alert"
      {...props}
    >
      <X className="size-3.5" />
    </button>
  )
}

export { Alert, AlertTitle, AlertDescription, AlertClose }
