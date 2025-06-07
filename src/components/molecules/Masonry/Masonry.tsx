import { cn } from '@/lib/utils'
import { masonryVariants } from './Masonry.variants'
import type { MasonryProps } from './Masonry.types'

/**
 * Masonry component for creating responsive Pinterest-style layouts without JavaScript.
 *
 * Uses CSS multi-column layout to automatically arrange items in a masonry grid.
 * Responsive breakpoints:
 * - Mobile: 1 column
 * - SM (640px+): 2 columns
 * - LG (1024px+): 3 columns (for columns=3+)
 * - XL (1280px+): 4 columns (for columns=4+)
 * - 2XL (1536px+): 6 columns (for columns=6)
 *
 * @example
 * <Masonry columns={3} gap="md">
 *   <MasonryItem>
 *     <Card>Item 1</Card>
 *   </MasonryItem>
 * </Masonry>
 */
function Masonry({ columns = 3, gap = 'md', className, children, ...props }: MasonryProps) {
  const gapValue = {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  }[gap]

  return (
    <div
      className={cn(masonryVariants({ columns }), className)}
      style={{
        columnGap: gapValue,
        columnFill: 'balance',
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export { Masonry }
