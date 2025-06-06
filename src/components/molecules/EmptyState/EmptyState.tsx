import { cn } from '@/lib/utils'
import { emptyVariants, emptyContentVariants } from './Empty.variants'
import { type EmptyProps, type EmptyContentProps } from './Empty.types'

function Empty({ className, variant, role = 'region', 'aria-live': ariaLive = 'polite', ...props }: EmptyProps) {
  return (
    <section
      data-slot="empty"
      role={role}
      aria-live={ariaLive}
      className={cn(emptyVariants({ variant }), className)}
      {...props}
    />
  )
}

function EmptyContent({ className, variant, children, ...props }: EmptyContentProps) {
  return (
    <div data-slot="empty-content" className={cn(emptyContentVariants({ variant }), className)} {...props}>
      {children}
    </div>
  )
}

export { Empty, EmptyContent }
