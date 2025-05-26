import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { calloutVariants } from './Callout.variants'

export type CalloutProps = React.ComponentPropsWithoutRef<'div'> & VariantProps<typeof calloutVariants>

export type CalloutRef = React.ComponentRef<'div'>

export type CalloutTitleProps = React.ComponentPropsWithoutRef<'div'>

export type CalloutTitleRef = React.ComponentRef<'div'>

export type CalloutDescriptionProps = React.ComponentPropsWithoutRef<'div'>

export type CalloutDescriptionRef = React.ComponentRef<'div'>

export type CalloutCloseProps = React.ComponentPropsWithoutRef<'button'> & {
  onClick?: () => void
}

export type CalloutCloseRef = React.ComponentRef<'button'>
