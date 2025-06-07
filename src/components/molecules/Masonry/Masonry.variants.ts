import { cva } from 'class-variance-authority'

export const masonryVariants = cva(
  // Base styles for CSS multi-column masonry
  'w-full',
  {
    variants: {
      columns: {
        1: 'columns-1',
        2: 'columns-1 sm:columns-2',
        3: 'columns-1 sm:columns-2 lg:columns-3',
        4: 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4',
        5: 'columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5',
        6: 'columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6',
      },
      gap: {
        xs: 'gap-2',
        sm: 'gap-4',
        md: 'gap-6',
        lg: 'gap-8',
        xl: 'gap-12',
      },
    },
    defaultVariants: {
      columns: 3,
      gap: 'md',
    },
  },
)
