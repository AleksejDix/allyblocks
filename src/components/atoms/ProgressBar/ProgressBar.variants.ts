import { cva } from 'class-variance-authority'

export const progressBarVariants = cva(
  [
    // Layout & Structure
    'relative',
    'w-full',
    'overflow-hidden',
    'bg-muted',
    'rounded-full',

    // Accessibility
    'aria-invalid:ring-destructive/20',
    'dark:aria-invalid:ring-destructive/40',
    'aria-invalid:border-destructive',

    // Focus States
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-ring',
    'focus-visible:ring-offset-2',

    // Transitions
    'transition-[color,box-shadow]',
  ],
  {
    variants: {
      variant: {
        default: '',
        success: '',
        warning: '',
        error: '',
      },
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export const progressBarFillVariants = cva(
  [
    // Layout & Fill
    'h-full',
    'rounded-full',
    'transition-all',
    'duration-300',
    'ease-in-out',

    // Animation for indeterminate state
    'data-[indeterminate=true]:animate-pulse',
    'data-[indeterminate=true]:w-1/3',
    'data-[indeterminate=true]:bg-gradient-to-r',
    'data-[indeterminate=true]:from-transparent',
    'data-[indeterminate=true]:via-primary',
    'data-[indeterminate=true]:to-transparent',
  ],
  {
    variants: {
      variant: {
        default: ['bg-primary'],
        success: ['bg-green-500', 'dark:bg-green-600'],
        warning: ['bg-yellow-500', 'dark:bg-yellow-600'],
        error: ['bg-red-500', 'dark:bg-red-600'],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export const progressBarLabelVariants = cva([
  // Layout
  'flex',
  'items-center',
  'justify-between',
  'mb-1',

  // Typography
  'text-sm',
  'font-medium',
  'text-foreground',
])

export const progressBarValueVariants = cva([
  // Typography
  'text-xs',
  'font-medium',
  'text-muted-foreground',
  'tabular-nums',
])
