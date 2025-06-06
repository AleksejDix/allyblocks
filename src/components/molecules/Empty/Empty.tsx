import { cn } from '@/lib/utils'
import { emptyVariants, emptyContentVariants } from './Empty.variants'
import { type EmptyProps } from './Empty.types'
import { Stack } from '@/components/atoms/Stack'

function Empty({
  className,
  gap = 'lg',
  role = 'region',
  'aria-live': ariaLive = 'polite',
  children,
  ...props
}: EmptyProps) {
  return (
    <section data-slot="empty" role={role} aria-live={ariaLive} className={cn(emptyVariants(), className)} {...props}>
      <div data-slot="empty-content" className={cn(emptyContentVariants())}>
        <Stack gap={gap} align="center" justify="center">
          {children}
        </Stack>
      </div>
    </section>
  )
}

export { Empty }
