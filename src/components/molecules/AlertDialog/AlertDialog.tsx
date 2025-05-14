'use client'

import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/atoms/Button'
import { useActionProvider, useActionHandler } from '@/lib/useAction'
import {
  alertDialogContentVariants,
  alertDialogDescriptionVariants,
  alertDialogFooterVariants,
  alertDialogHeaderVariants,
  alertDialogOverlayVariants,
  alertDialogTitleVariants,
} from './AlertDialog.variant'
import type {
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogContentProps,
  AlertDialogDescriptionProps,
  AlertDialogFooterProps,
  AlertDialogHeaderProps,
  AlertDialogOverlayProps,
  AlertDialogPortalProps,
  AlertDialogProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps,
} from './AlertDialog.types'
import { AlertDialogContext, useAlertDialog } from './AlertDialog.context'

function AlertDialog({ children, onValueChange, ...props }: AlertDialogProps) {
  const { action, setAction } = useActionProvider()

  return (
    <AlertDialogContext.Provider value={{ action, setAction, onValueChange }}>
      <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props}>
        {children}
      </AlertDialogPrimitive.Root>
    </AlertDialogContext.Provider>
  )
}

function AlertDialogTrigger({ ...props }: AlertDialogTriggerProps) {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
}

function AlertDialogPortal({ ...props }: AlertDialogPortalProps) {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
}

function AlertDialogOverlay({ className, ...props }: AlertDialogOverlayProps) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(alertDialogOverlayVariants(), className)}
      {...props}
    />
  )
}

function AlertDialogContent({ className, ...props }: AlertDialogContentProps) {
  const actionContext = useAlertDialog()
  const handleAnimationEnd = useActionHandler(actionContext)

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(alertDialogContentVariants(), className)}
        onAnimationEnd={handleAnimationEnd}
        {...props}
      />
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
  return <div data-slot="alert-dialog-header" className={cn(alertDialogHeaderVariants(), className)} {...props} />
}

function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
  return <div data-slot="alert-dialog-footer" className={cn(alertDialogFooterVariants(), className)} {...props} />
}

function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(alertDialogTitleVariants(), className)}
      {...props}
    />
  )
}

function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(alertDialogDescriptionVariants(), className)}
      {...props}
    />
  )
}

function AlertDialogAction({ className, onAction, value, context, ...props }: AlertDialogActionProps) {
  const dialogContext = useAlertDialog()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (value || onAction) {
      dialogContext.setAction({
        callback: onAction,
        value,
        context,
        event: event as unknown as Event,
      })
    }
    // The original onClick will be called by Radix
  }

  return <AlertDialogPrimitive.Action className={cn(buttonVariants(), className)} onClick={handleClick} {...props} />
}

function AlertDialogCancel({ className, onAction, value, context, ...props }: AlertDialogCancelProps) {
  const dialogContext = useAlertDialog()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (value || onAction) {
      dialogContext.setAction({
        callback: onAction,
        value,
        context,
        event: event as unknown as Event,
      })
    }
    // The original onClick will be called by Radix
  }

  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: 'outline' }), className)}
      onClick={handleClick}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
