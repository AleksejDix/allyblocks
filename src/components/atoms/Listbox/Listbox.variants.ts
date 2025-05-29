import { cva } from 'class-variance-authority'

export const listboxVariants = cva(
  [
    // Base styles for a form control listbox
    'relative',
    'w-full',
    'min-h-[80px]',
    'overflow-auto',
    'rounded-md',
    'border',
    'border-border',
    'bg-background',
    'text-foreground',
    'shadow-sm',
    'focus-within:ring-2',
    'focus-within:ring-ring',
    'focus-within:ring-offset-2',
    'focus-within:ring-offset-background',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        sm: 'text-sm p-1',
        md: 'text-sm p-2',
        lg: 'text-base p-2',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export const listboxItemVariants = cva(
  [
    // Base styles for selectable options
    'relative',
    'flex',
    'w-full',
    'cursor-pointer',
    'select-none',
    'items-center',
    'rounded-sm',
    'px-2',
    'py-1.5',
    'text-sm',
    'outline-none',
    'transition-colors',
    'hover:bg-accent',
    'hover:text-accent-foreground',
    'focus:bg-accent',
    'focus:text-accent-foreground',
    'data-[highlighted=true]:bg-accent',
    'data-[highlighted=true]:text-accent-foreground',
    'data-[selected=true]:bg-primary',
    'data-[selected=true]:text-primary-foreground',
    'data-[disabled]:pointer-events-none',
    'data-[disabled]:opacity-50',
  ],
  {
    variants: {
      size: {
        sm: 'text-xs py-1 px-1.5',
        md: 'text-sm py-1.5 px-2',
        lg: 'text-base py-2 px-2.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export const listboxGroupVariants = cva([
  // Simple container for grouped options
  'space-y-1',
])

export const listboxLabelVariants = cva([
  'px-2',
  'py-1',
  'text-xs',
  'font-medium',
  'text-muted-foreground',
  'uppercase',
  'tracking-wide',
])

export const listboxSeparatorVariants = cva(['bg-border', '-mx-1', 'my-1', 'h-px'])

export const listboxShortcutVariants = cva(['text-muted-foreground', 'ml-auto', 'text-xs', 'tracking-widest'])
