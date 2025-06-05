import { cva } from 'class-variance-authority'

// Simple radio button variants
export const radioVariants = cva([
  'peer border-input relative shrink-0 border shadow-xs transition-[color,box-shadow,border-color] outline-none rounded-full size-4',
  'dark:bg-input/30',
  // Default states
  'disabled:cursor-not-allowed disabled:opacity-50 disabled:border-border disabled:ring-0',
  // Focus states
  'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:disabled:border-border focus-visible:disabled:ring-0',
  'data-[state=focus]:border-ring data-[state=focus]:ring-ring/50 data-[state=focus]:ring-[3px] data-[state=focus]:disabled:border-border data-[state=focus]:disabled:ring-0',
  // Active states
  'data-[state=active]:border-ring data-[state=active]:ring-ring/50 data-[state=active]:ring-[3px] data-[state=active]:disabled:border-border data-[state=active]:disabled:ring-0',
  // Checked states
  'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary dark:data-[state=checked]:bg-primary',
  // Hover states
  'hover:border-ring/70 hover:shadow-sm hover:disabled:border-border hover:disabled:shadow-xs',
])

// RadioGroup variants with child radio styling for invalid state
export const radioGroupVariants = cva(
  [
    // Invalid state styling for child radio buttons
    'aria-invalid:[&_[data-slot="radio"]]:border-destructive',
    'aria-invalid:[&_[data-slot="radio"]]:focus-visible:border-destructive aria-invalid:[&_[data-slot="radio"]]:focus-visible:ring-destructive/20 aria-invalid:[&_[data-slot="radio"]]:focus-visible:ring-[3px] dark:aria-invalid:[&_[data-slot="radio"]]:focus-visible:ring-destructive/40',
    'aria-invalid:[&_[data-slot="radio"]]:data-[state=focus]:border-destructive aria-invalid:[&_[data-slot="radio"]]:data-[state=focus]:ring-destructive/20 aria-invalid:[&_[data-slot="radio"]]:data-[state=focus]:ring-[3px] dark:aria-invalid:[&_[data-slot="radio"]]:data-[state=focus]:ring-destructive/40',
    'aria-invalid:[&_[data-slot="radio"]]:data-[state=active]:border-destructive aria-invalid:[&_[data-slot="radio"]]:data-[state=active]:ring-destructive/20 aria-invalid:[&_[data-slot="radio"]]:data-[state=active]:ring-[3px] dark:aria-invalid:[&_[data-slot="radio"]]:data-[state=active]:ring-destructive/40',
    'aria-invalid:[&_[data-slot="radio"]]:data-[state=checked]:bg-destructive aria-invalid:[&_[data-slot="radio"]]:data-[state=checked]:border-destructive',
    'aria-invalid:[&_[data-slot="radio"]]:hover:border-destructive',
    'aria-invalid:[&_[data-slot="radio"]]:disabled:border-destructive aria-invalid:[&_[data-slot="radio"]]:disabled:ring-0',
  ],
  {
    variants: {
      orientation: {
        vertical: 'grid gap-3',
        horizontal: 'flex gap-3 flex-wrap',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  },
)
