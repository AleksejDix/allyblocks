import { cva } from 'class-variance-authority'

export const keyboardKeyVariants = cva(
  [
    // Layout & Structure
    'inline-flex',
    'items-center',
    'justify-center',
    'shrink-0',
    'whitespace-nowrap',
    'select-none',

    // Visual Design - Keyboard key appearance
    'rounded-md',
    'border',
    'border-border',
    'bg-muted',

    // Clean, modern typography for keyboard keys
    'font-sans',
    'font-medium',
    'text-muted-foreground',
    'tracking-wide', // Better letter spacing for readability
    'leading-none', // Tighter line height for compact appearance

    // Shadow for 3D keyboard key effect
    'shadow-sm',
    'shadow-black/10',
    'dark:shadow-black/20',

    // Subtle gradient for depth
    'bg-gradient-to-b',
    'from-muted',
    'to-muted/80',

    // Accessibility
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-ring',
    'focus-visible:ring-offset-2',

    // Transitions
    'transition-colors',
  ],
  {
    variants: {
      /**
       * Size variants for different use cases
       */
      size: {
        xs: ['h-5', 'min-w-[1.25rem]', 'px-1', 'text-xs', 'rounded-sm'],
        sm: ['h-6', 'min-w-[1.5rem]', 'px-1.5', 'text-xs'],
        md: ['h-7', 'min-w-[1.75rem]', 'px-2', 'text-sm'],
        lg: ['h-8', 'min-w-[2rem]', 'px-2.5', 'text-sm'],
        xl: ['h-9', 'min-w-[2.25rem]', 'px-3', 'text-base'],
      },

      /**
       * Visual variants for different contexts
       */
      variant: {
        default: [
          // Uses base styles
        ],
        outline: ['bg-background', 'border-2', 'from-background', 'to-background', 'shadow-none'],
        ghost: [
          'border-transparent',
          'bg-transparent',
          'from-transparent',
          'to-transparent',
          'shadow-none',
          'text-foreground',
        ],
        pressed: [
          'bg-muted/60',
          'from-muted/60',
          'to-muted/40',
          'shadow-inner',
          'shadow-black/20',
          'dark:shadow-black/40',
          'translate-y-px',
        ],
      },

      /**
       * Special styling for modifier keys
       */
      modifier: {
        true: ['bg-primary/10', 'border-primary/20', 'text-primary', 'from-primary/10', 'to-primary/5'],
        false: [],
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      modifier: false,
    },
  },
)
