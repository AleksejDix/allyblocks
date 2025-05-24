import { cva } from 'class-variance-authority'

export const tagVariants = cva(
  [
    // Layout and focus
    'flex items-center gap-1',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  ],
  {
    variants: {
      removing: {
        true: 'opacity-50 pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      removing: false,
    },
  },
)

export const tagButtonVariants = cva(
  [
    // Base button styles
    'shrink-0',
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-4 rounded-sm [&_svg]:size-[10px]',
        md: 'h-4 w-4 rounded-sm [&_svg]:size-3',
        lg: 'h-5 w-5 rounded [&_svg]:size-[14px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)
