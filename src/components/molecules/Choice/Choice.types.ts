import * as React from 'react'

/**
 * Props for the Choice component (main container)
 */
export type ChoiceProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Children content */
  children: React.ReactNode
  /** Name attribute for radio group */
  name?: string
  /** Default selected value */
  defaultValue?: string
}

/**
 * Props for the ChoiceItem component
 */
export type ChoiceItemProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /** Custom className for the choice item container */
  className?: string
  /** Children content */
  children: React.ReactNode
  /** Value for the radio input */
  value: string
  /** ID for the radio input */
  id?: string
  /** Name attribute for radio group */
  name?: string
}

/**
 * Props for the ChoiceIcon component
 */
export type ChoiceIconProps = {
  /** Icon content */
  children: React.ReactNode
  /** Custom className */
  className?: string
}

/**
 * Props for the ChoiceContent component
 */
export type ChoiceContentProps = {
  /** Content (label, description, etc.) */
  children: React.ReactNode
  /** Custom className */
  className?: string
}

/**
 * Props for the ChoiceLabel component
 */
export type ChoiceLabelProps = React.ComponentProps<'span'> & {
  /** Label text */
  children: React.ReactNode
}

/**
 * Props for the ChoiceDescription component
 */
export type ChoiceDescriptionProps = React.ComponentProps<'p'> & {
  /** Description text */
  children: React.ReactNode
}
