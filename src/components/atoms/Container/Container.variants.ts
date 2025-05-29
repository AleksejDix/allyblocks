import { cva } from 'class-variance-authority'

export const containerVariants = cva(
  // Base classes - Tailwind's container with responsive behavior
  'container',
  {
    variants: {
      /**
       * Container size variants
       * Uses Tailwind's max-width utilities for custom sizes
       */
      size: {
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-screen-xl',
        '2xl': 'max-w-screen-2xl',
        full: 'max-w-full',
      },

      /**
       * Horizontal padding variants
       */
      padding: {
        none: 'px-0',
        sm: 'px-4',
        md: 'px-6',
        lg: 'px-8',
        xl: 'px-12',
      },

      /**
       * Whether the container should be centered
       */
      centered: {
        true: 'mx-auto',
        false: '',
      },
    },
    defaultVariants: {
      padding: 'md',
      centered: true,
    },
  },
)
