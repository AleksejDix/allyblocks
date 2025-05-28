import { cva } from 'class-variance-authority'

// Common state styles that can be reused
const focusState =
  'data-[state=focus]:border-ring data-[state=focus]:ring-ring/50 data-[state=focus]:ring-[3px] data-[state=focus]:disabled:border-border data-[state=focus]:disabled:ring-0 data-[state=focus]:aria-invalid:border-destructive data-[state=focus]:aria-invalid:ring-destructive/20 data-[state=focus]:aria-invalid:ring-[3px] dark:data-[state=focus]:aria-invalid:ring-destructive/40'
const activeState =
  'data-[state=active]:border-ring data-[state=active]:ring-ring/50 data-[state=active]:ring-[3px] data-[state=active]:disabled:border-border data-[state=active]:disabled:ring-0 data-[state=active]:aria-invalid:border-destructive data-[state=active]:aria-invalid:ring-destructive/20 data-[state=active]:aria-invalid:ring-[3px] dark:data-[state=active]:aria-invalid:ring-destructive/40'
const focusVisibleState =
  'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:disabled:border-border focus-visible:disabled:ring-0 focus-visible:aria-invalid:border-destructive focus-visible:aria-invalid:ring-destructive/20 focus-visible:aria-invalid:ring-[3px] dark:focus-visible:aria-invalid:ring-destructive/40'
const invalidState =
  'aria-invalid:border-destructive dark:bg-input/30 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/20 aria-invalid:focus-visible:ring-[3px] dark:aria-invalid:focus-visible:ring-destructive/40 aria-invalid[data-state=focus]:border-destructive aria-invalid[data-state=focus]:ring-destructive/20 aria-invalid[data-state=focus]:ring-[3px] dark:aria-invalid[data-state=focus]:ring-destructive/40 aria-invalid:disabled:border-destructive aria-invalid:disabled:ring-0'
const disabledState = 'disabled:cursor-default disabled:opacity-50 disabled:border-border disabled:ring-0'

export const textareaVariants = cva(
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
