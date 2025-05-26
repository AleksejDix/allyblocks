import { cva } from 'class-variance-authority'

export const skeletonVariants = cva(
  [
    // Base styles
    'bg-muted',
    'animate-pulse',
    'rounded-md',
    'inline-block',

    // Accessibility
    'aria-hidden:true',

    // Transitions
    'transition-colors',

    // Reduced motion support
    'motion-reduce:animate-none',
  ],
  {
    variants: {},
    defaultVariants: {},
  },
)
