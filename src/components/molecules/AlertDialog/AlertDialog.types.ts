import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

export type AlertDialogProps = React.ComponentProps<typeof AlertDialogPrimitive.Root>

export type AlertDialogTriggerProps = React.ComponentProps<typeof AlertDialogPrimitive.Trigger>

export type AlertDialogPortalProps = React.ComponentProps<typeof AlertDialogPrimitive.Portal>

export type AlertDialogOverlayProps = React.ComponentProps<typeof AlertDialogPrimitive.Overlay> & {
  className?: string
}

export type AlertDialogContentProps = React.ComponentProps<typeof AlertDialogPrimitive.Content> & {
  className?: string
}

export type AlertDialogHeaderProps = React.ComponentProps<'div'> & {
  className?: string
}

export type AlertDialogFooterProps = React.ComponentProps<'div'> & {
  className?: string
}

export type AlertDialogTitleProps = React.ComponentProps<typeof AlertDialogPrimitive.Title> & {
  className?: string
}

export type AlertDialogDescriptionProps = React.ComponentProps<typeof AlertDialogPrimitive.Description> & {
  className?: string
}

export type AlertDialogActionProps = React.ComponentProps<typeof AlertDialogPrimitive.Action> & {
  className?: string
}

export type AlertDialogCancelProps = React.ComponentProps<typeof AlertDialogPrimitive.Cancel> & {
  className?: string
}
