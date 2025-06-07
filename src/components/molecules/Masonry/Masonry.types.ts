import type { ComponentProps } from 'react'

export type MasonryProps = ComponentProps<'div'> & {
  /**
   * Maximum number of columns for the masonry layout
   * Responsive breakpoints automatically reduce columns on smaller screens:
   * - columns=1: Always 1 column
   * - columns=2: 1 on mobile, 2 on SM+
   * - columns=3: 1 on mobile, 2 on SM+, 3 on LG+
   * - columns=4: 1 on mobile, 2 on SM+, 3 on LG+, 4 on XL+
   * - columns=5: 1 on mobile, 2 on SM+, 3 on MD+, 4 on LG+, 5 on XL+
   * - columns=6: 1 on mobile, 2 on SM+, 3 on MD+, 4 on LG+, 5 on XL+, 6 on 2XL+
   * @default 3
   */
  columns?: 1 | 2 | 3 | 4 | 5 | 6

  /**
   * Gap between columns and items
   * @default 'md'
   */
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /**
   * Content to display in masonry layout
   */
  children?: React.ReactNode
}
