import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { alertVariants } from './Alert.variants'

export type AlertProps = React.ComponentPropsWithoutRef<'div'> & VariantProps<typeof alertVariants>

export type AlertRef = React.ComponentRef<'div'>

export type AlertTitleProps = React.ComponentPropsWithoutRef<'div'>

export type AlertTitleRef = React.ComponentRef<'div'>

export type AlertDescriptionProps = React.ComponentPropsWithoutRef<'div'>

export type AlertDescriptionRef = React.ComponentRef<'div'>

export type AlertCloseProps = React.ComponentPropsWithoutRef<'button'> & {
  onClick?: () => void
}

export type AlertCloseRef = React.ComponentRef<'button'>
