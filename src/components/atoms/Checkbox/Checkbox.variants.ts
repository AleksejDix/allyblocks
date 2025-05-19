import { cva } from 'class-variance-authority'

export const checkboxVariants = cva(
  [
    'peer border-input relative',
    'dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0  border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        sm: 'size-3 rounded-xs',
        md: 'size-4 rounded-[4px]',
        lg: 'size-5 rounded-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)
