import { cva } from 'class-variance-authority'

export const selectAutocompleteVariants = cva('relative w-full', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export const selectAutocompleteInputVariants = cva(
  'flex w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 text-sm px-2',
        md: 'h-10 text-base px-3',
        lg: 'h-12 text-lg px-4',
      },
      variant: {
        outline: 'border-input',
        filled: 'border-transparent bg-muted',
        ghost: 'border-transparent hover:bg-accent hover:text-accent-foreground',
      },
      error: {
        true: 'border-destructive focus-visible:ring-destructive',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'outline',
      error: false,
    },
  },
)

export const selectAutocompleteTriggerVariants = cva(
  'absolute right-0 top-0 flex h-full items-center justify-center px-2 hover:bg-accent/50 rounded-r-md transition-colors',
  {
    variants: {
      size: {
        sm: 'px-1.5',
        md: 'px-2',
        lg: 'px-2.5',
      },
      variant: {
        outline: '',
        filled: '',
        ghost: '',
      },
      error: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'outline',
      error: false,
    },
  },
)

export const selectAutocompleteListVariants = cva(
  'absolute z-50 mt-1 w-full overflow-auto rounded-md border border-border bg-popover text-popover-foreground shadow-md animate-in fade-in-80',
  {
    variants: {
      position: {
        top: 'bottom-full mb-1',
        bottom: 'top-full mt-1',
      },
    },
    defaultVariants: {
      position: 'bottom',
    },
  },
)

export const selectAutocompleteItemVariants = cva(
  'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
  {
    variants: {
      highlighted: {
        true: 'bg-accent text-accent-foreground',
        false: '',
      },
      selected: {
        true: 'font-medium',
        false: '',
      },
      disabled: {
        true: 'pointer-events-none opacity-50',
        false: '',
      },
      size: {
        sm: 'py-1 px-2 text-sm',
        md: 'py-1.5 px-2 text-base',
        lg: 'py-2 px-3 text-lg',
      },
    },
    defaultVariants: {
      highlighted: false,
      selected: false,
      disabled: false,
      size: 'md',
    },
  },
)

export const selectAutocompleteEmptyVariants = cva('py-6 text-center text-sm text-muted-foreground', {
  variants: {
    size: {
      sm: 'py-4 text-xs',
      md: 'py-6 text-sm',
      lg: 'py-8 text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
