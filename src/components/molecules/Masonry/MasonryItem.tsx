import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

export type MasonryItemProps = ComponentProps<'div'> & {
  children?: React.ReactNode
}

/**
 * MasonryItem component to wrap items in a masonry layout.
 *
 * Prevents items from breaking across columns and adds proper spacing.
 *
 * @example
 * <Masonry>
 *   <MasonryItem>
 *     <Card>Content</Card>
 *   </MasonryItem>
 * </Masonry>
 */
function MasonryItem({ className, children, ...props }: MasonryItemProps) {
  return (
    <div className={cn('break-inside-avoid mb-6 w-full inline-block', className)} {...props}>
      {children}
    </div>
  )
}

export { MasonryItem }
