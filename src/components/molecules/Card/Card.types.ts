import { type VariantProps } from 'class-variance-authority'
import {
  cardVariants,
  cardHeaderVariants,
  cardFooterVariants,
  cardBodyVariants,
  cardSectionVariants,
} from './Card.variants'

export type CardProps = React.ComponentProps<'div'> & {
  /** Whether the card should be sectioned (removes default padding for sectioned content) */
  sectioned?: boolean
}

export type CardHeaderProps = React.ComponentProps<'div'>

export type CardFooterProps = React.ComponentProps<'div'>

export type CardBodyProps = React.ComponentProps<'div'>

export type CardSectionProps = React.ComponentProps<'div'> & {
  /** Title for the section */
  title?: React.ReactNode
  /** Actions for this specific section */
  actions?: React.ReactNode
  /** Whether this section should be subdued */
  subdued?: boolean
}

export type CardTitleProps = React.ComponentProps<'div'> & {
  /** Size variant for the title */
  size?: 'sm' | 'md' | 'lg'
}

export type CardDescriptionProps = React.ComponentProps<'div'>

export type CardActionProps = React.ComponentProps<'div'>
