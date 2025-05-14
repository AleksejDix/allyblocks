import { type VariantProps } from 'class-variance-authority'
import { cardVariants, cardHeaderVariants, cardFooterVariants, cardBodyVariants } from './Card.variants'

export type CardProps = React.ComponentProps<'div'> & VariantProps<typeof cardVariants>

export type CardHeaderProps = React.ComponentProps<'div'> & VariantProps<typeof cardHeaderVariants>

export type CardFooterProps = React.ComponentProps<'div'> & VariantProps<typeof cardFooterVariants>

export type CardBodyProps = React.ComponentProps<'div'> & VariantProps<typeof cardBodyVariants>

export type CardTitleProps = React.ComponentProps<'div'>

export type CardDescriptionProps = React.ComponentProps<'div'>

export type CardActionProps = React.ComponentProps<'div'>
