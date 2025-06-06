import * as React from 'react'
import type { BoxProps } from '@/components/atoms/Box'

export type CalloutProps = React.ComponentPropsWithoutRef<'div'>

export type CalloutRef = React.ComponentRef<'div'>

export type CalloutBodyProps = React.ComponentPropsWithoutRef<'div'> & {
  variant?: BoxProps['variant']
}

export type CalloutBodyRef = React.ComponentRef<'div'>

export type CalloutTitleProps = React.ComponentPropsWithoutRef<'div'>

export type CalloutTitleRef = React.ComponentRef<'div'>

export type CalloutDescriptionProps = React.ComponentPropsWithoutRef<'div'>

export type CalloutDescriptionRef = React.ComponentRef<'div'>

export type CalloutCloseProps = React.ComponentPropsWithoutRef<'button'> & {
  onClick?: () => void
}

export type CalloutCloseRef = React.ComponentRef<'button'>
