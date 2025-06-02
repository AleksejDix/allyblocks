import { cva } from 'class-variance-authority'

// Common state styles that can be reused (matching Textarea)
const focusState =
  'data-[state=focus]:border-ring data-[state=focus]:ring-ring/50 data-[state=focus]:ring-[3px] data-[state=focus]:disabled:border-border data-[state=focus]:disabled:ring-0 data-[state=focus]:aria-invalid:border-destructive data-[state=focus]:aria-invalid:ring-destructive/20 data-[state=focus]:aria-invalid:ring-[3px] dark:data-[state=focus]:aria-invalid:ring-destructive/40'
const activeState =
  'data-[state=active]:border-ring data-[state=active]:ring-ring/50 data-[state=active]:ring-[3px] data-[state=active]:disabled:border-border data-[state=active]:disabled:ring-0 data-[state=active]:aria-invalid:border-destructive data-[state=active]:aria-invalid:ring-destructive/20 data-[state=active]:aria-invalid:ring-[3px] dark:data-[state=active]:aria-invalid:ring-destructive/40'
const focusVisibleState =
  'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:disabled:border-border focus-visible:disabled:ring-0 focus-visible:aria-invalid:border-destructive focus-visible:aria-invalid:ring-destructive/20 focus-visible:aria-invalid:ring-[3px] dark:focus-visible:aria-invalid:ring-destructive/40'
const invalidState =
  'aria-invalid:border-destructive dark:bg-input/30 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/20 aria-invalid:focus-visible:ring-[3px] dark:aria-invalid:focus-visible:ring-destructive/40 aria-invalid[data-state=focus]:border-destructive aria-invalid[data-state=focus]:ring-destructive/20 aria-invalid[data-state=focus]:ring-[3px] dark:aria-invalid[data-state=focus]:ring-destructive/40 aria-invalid:disabled:border-destructive aria-invalid:disabled:ring-0'
const disabledState = 'disabled:cursor-default disabled:opacity-50 disabled:border-border disabled:ring-0'

export const inputVariants = cva(
  [
    'w-full rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none',
    'placeholder:text-muted-foreground',
    disabledState,
    invalidState,
    focusVisibleState,
    focusState,
    activeState,
  ],
  {
    variants: {
      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-2 text-xs',
        md: 'h-9 px-3 text-sm',
        lg: 'h-10 px-4 text-base',
        xl: 'h-12 px-4 text-lg',
      },
      variant: {
        default: '',
        destructive: 'border-destructive bg-destructive/5 text-destructive placeholder:text-destructive/70',
        success:
          'border-green-500 bg-green-50 text-green-900 placeholder:text-green-700 dark:bg-green-950/20 dark:text-green-100 dark:placeholder:text-green-400',
        warning:
          'border-yellow-500 bg-yellow-50 text-yellow-900 placeholder:text-yellow-700 dark:bg-yellow-950/20 dark:text-yellow-100 dark:placeholder:text-yellow-400',
        ghost: 'border-transparent bg-transparent hover:bg-accent hover:border-input',
      },
      borderStyle: {
        default: 'border-solid',
        dashed: 'border-dashed',
        dotted: 'border-dotted',
        none: 'border-none',
      },
      borderWidth: {
        thin: 'border',
        medium: 'border-2',
        thick: 'border-4',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      borderStyle: 'default',
      borderWidth: 'thin',
      fullWidth: true,
    },
  },
)
