import { cn } from '@/lib/utils'
import { cardVariants, cardHeaderVariants, cardFooterVariants, cardBodyVariants } from './Card.variants'
import {
  type CardProps,
  type CardHeaderProps,
  type CardFooterProps,
  type CardBodyProps,
  type CardTitleProps,
  type CardDescriptionProps,
  type CardActionProps,
} from './Card.types'

function Card({ className, variant, size, ...props }: CardProps) {
  return <div data-slot="card" className={cn(cardVariants({ variant, size, className }))} {...props} />
}

function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div data-slot="card-header" className={cn(cardHeaderVariants({ className }))} {...props} />
}

function CardTitle({ className, ...props }: CardTitleProps) {
  return <div data-slot="card-title" className={cn('text-pretty font-medium', className)} {...props} />
}

function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm text-pretty', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: CardActionProps) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  )
}

function CardBody({ className, ...props }: CardBodyProps) {
  return <div data-slot="card-body" className={cn(cardBodyVariants({ className }))} {...props} />
}

function CardFooter({ className, ...props }: CardFooterProps) {
  return <div data-slot="card-footer" className={cn(cardFooterVariants({ className }))} {...props} />
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardBody, CardAction }
