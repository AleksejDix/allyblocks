import { cn } from '@/lib/utils'
import {
  cardVariants,
  cardHeaderVariants,
  cardFooterVariants,
  cardBodyVariants,
  cardSectionVariants,
  cardSectionHeaderVariants,
} from './Card.variants'
import {
  type CardProps,
  type CardHeaderProps,
  type CardFooterProps,
  type CardBodyProps,
  type CardSectionProps,
  type CardTitleProps,
  type CardDescriptionProps,
  type CardActionProps,
} from './Card.types'

function Card({ className, sectioned, ...props }: CardProps) {
  return (
    <div data-slot="card" className={cn(cardVariants(), sectioned && 'divide-y divide-border', className)} {...props} />
  )
}

function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div data-slot="card-header" className={cn(cardHeaderVariants(), className)} {...props}>
      {children}
    </div>
  )
}

function CardSection({ className, title, actions, subdued, children, ...props }: CardSectionProps) {
  const hasTitle = Boolean(title)

  return (
    <div
      data-slot="card-section"
      className={cn(cardSectionVariants(), subdued && 'bg-muted/30', hasTitle && 'space-y-3', className)}
      {...props}
    >
      {hasTitle && (
        <div className={cn(cardSectionHeaderVariants())}>
          <div className="flex-1">
            {typeof title === 'string' ? <h3 className="text-sm font-medium text-foreground">{title}</h3> : title}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}

function CardTitle({ className, size = 'md', ...props }: CardTitleProps) {
  const sizeClasses = {
    sm: 'text-sm font-medium',
    md: 'text-lg font-medium',
    lg: 'text-xl font-semibold',
  }

  return (
    <div
      data-slot="card-title"
      className={cn('text-pretty text-foreground', sizeClasses[size], className)}
      {...props}
    />
  )
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
  return <div data-slot="card-action" className={cn('flex items-center gap-2', className)} {...props} />
}

function CardBody({ className, ...props }: CardBodyProps) {
  return <div data-slot="card-body" className={cn(cardBodyVariants(), className)} {...props} />
}

function CardFooter({ className, ...props }: CardFooterProps) {
  return <div data-slot="card-footer" className={cn(cardFooterVariants(), className)} {...props} />
}

export { Card, CardHeader, CardSection, CardFooter, CardTitle, CardDescription, CardBody, CardAction }
