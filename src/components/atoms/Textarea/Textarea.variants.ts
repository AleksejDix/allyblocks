import { cva } from 'class-variance-authority'

export const textareaVariants = cva(
  [
    'w-full rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none',
    'placeholder:text-muted-foreground',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30',
  ],
  {
    variants: {
      size: {
        sm: 'min-h-12 px-2 py-1.5 text-sm',
        md: 'min-h-16 px-3 py-2 text-base',
        lg: 'min-h-20 px-4 py-3 text-base',
      },
      autoGrow: {
        true: 'field-sizing-content',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      autoGrow: false,
    },
  },
)
