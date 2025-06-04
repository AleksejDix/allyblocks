import { cn } from '@/lib/utils'
import { cardVariants, cardHeaderVariants, cardFooterVariants, cardBodyVariants } from './Card.variants'
import {
  type CardProps,
  type CardHeaderProps,
  type CardFooterProps,
  type CardBodyProps,
  type CardActionProps,
  type BleedProps,
} from './Card.types'

function Card({ className, ...props }: CardProps) {
  return <div data-slot="card" className={cn(cardVariants(), className)} {...props} />
}

function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div data-slot="card-header" className={cn(cardHeaderVariants(), className)} {...props}>
      {children}
    </div>
  )
}

function Bleed({ className, ...props }: BleedProps) {
  return <div data-slot="bleed" className={cn('-m-4', className)} {...props} />
}

function CardAction({ className, ...props }: CardActionProps) {
  return <div data-slot="card-action" className={cn('flex items-center gap-2', className)} {...props} />
}

function CardBody({ className, ...props }: CardBodyProps) {
  return <div data-slot="card-body" className={cn(cardBodyVariants(), className)} {...props} />
}

function CardFooter({ className, ...props }: CardFooterProps) {
  return <div data-slot="card-footer" className={cn(cardFooterVariants(), className)} {...props} />
}

export { Card, CardHeader, CardFooter, CardBody, CardAction, Bleed }
