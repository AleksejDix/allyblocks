import { cva } from 'class-variance-authority'

export const datePickerVariants = cva(['relative'], {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base',
    },
    variant: {
      default: '',
      outline: '',
      ghost: '',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
})

export const datePickerInputVariants = cva(
  [
    'flex',
    'h-9',
    'w-full',
    'rounded-md',
    'border',
    'border-input',
    'bg-transparent',
    'px-3',
    'py-1',
    'text-sm',
    'shadow-xs',
    'transition-colors',
    'placeholder:text-muted-foreground',
    'focus:outline-none',
    'focus:border-ring',
    'focus:ring-ring/50',
    'focus:ring-[3px]',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
    'aria-invalid:border-destructive',
    'aria-invalid:ring-destructive/20',
    'aria-invalid:ring-[3px]',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-9 px-3 text-sm',
        lg: 'h-10 px-4 text-base',
      },
      variant: {
        default: '',
        outline: 'border-2',
        ghost: 'border-transparent bg-transparent hover:bg-accent hover:border-input',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  },
)

export const datePickerTriggerVariants = cva(
  [
    'absolute',
    'right-0',
    'top-0',
    'flex',
    'h-full',
    'items-center',
    'justify-center',
    'rounded-r-md',
    'px-3',
    'text-muted-foreground',
    'transition-colors',
    'hover:text-foreground',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-ring/50',
    'focus:ring-offset-2',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        sm: 'px-2',
        md: 'px-3',
        lg: 'px-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export const datePickerPopoverVariants = cva([
  'w-auto',
  'p-0',
  'bg-popover',
  'border',
  'border-border',
  'rounded-md',
  'shadow-md',
])

export const datePickerCalendarVariants = cva(['p-3'])
