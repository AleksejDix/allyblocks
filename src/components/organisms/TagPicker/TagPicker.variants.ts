import { cva } from 'class-variance-authority'

export const tagPickerVariants = cva(
  [
    // Base container styles
    'relative space-y-3',
  ],
  {
    variants: {
      disabled: {
        true: 'opacity-60 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
)

export const tagPickerTagsVariants = cva(
  [
    // Tags container layout
    'flex flex-wrap items-center',
  ],
  {
    variants: {
      size: {
        sm: 'gap-1',
        md: 'gap-2',
        lg: 'gap-2',
      },
      hasSelection: {
        true: '',
        false: 'hidden',
      },
    },
    defaultVariants: {
      size: 'md',
      hasSelection: false,
    },
  },
)

export const tagPickerTriggerVariants = cva(
  [
    // Trigger button styles
    'w-full justify-start text-left font-normal',
  ],
  {
    variants: {
      hasSelection: {
        true: '',
        false: 'text-muted-foreground',
      },
    },
    defaultVariants: {
      hasSelection: false,
    },
  },
)

export const tagPickerOverflowVariants = cva(
  [
    // Overflow indicator styles
    'inline-flex items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-medium',
  ],
  {
    variants: {
      size: {
        sm: 'h-5 px-2 text-xs',
        md: 'h-6 px-2.5 text-xs',
        lg: 'h-7 px-3 text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)
