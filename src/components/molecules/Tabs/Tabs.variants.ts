import { cva } from 'class-variance-authority'

export const tabsVariants = cva(
  [
    // Layout & Structure
    'flex',
    'flex-col',
    'gap-2',
  ],
  {
    variants: {
      orientation: {
        horizontal: ['flex-col'],
        vertical: ['flex-row', 'gap-4'],
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  },
)

export const tabsListVariants = cva(
  [
    // Layout & Structure
    'flex',
    'items-center',
    'justify-start',
    'gap-1',
    'py-2',

    // Visual Design
    'border-border',
  ],
  {
    variants: {
      size: {
        sm: [],
        default: [],
        lg: [],
      },
      orientation: {
        horizontal: [
          // Horizontal layout
          'flex-row',
          'w-full',
          'border-b',
        ],
        vertical: [
          // Vertical layout
          'flex-col',
          'h-fit',
          'w-48',
          'border-r',
          'border-b-0',
          'pr-2',
        ],
      },
    },
    defaultVariants: {
      size: 'default',
      orientation: 'horizontal',
    },
  },
)

export const tabsTriggerVariants = cva(
  [
    // Layout & Structure
    'relative',
    'inline-flex',
    'items-center',
    'justify-start',
    'gap-2',
    'whitespace-nowrap',

    // Typography
    'text-sm',
    'font-medium',

    // Visual Design
    'rounded-md',
    'text-muted-foreground',

    // Interactive Cursor
    'cursor-pointer',

    // Icons
    '[&_svg]:pointer-events-none',
    '[&_svg]:shrink-0',
    '[&_svg]:size-4',

    // Interactive States
    'hover:bg-accent',
    'hover:text-accent-foreground',
    'data-[state=active]:bg-accent',
    'data-[state=active]:text-accent-foreground',

    // Active Indicator Base (Before Element)
    'data-[state=active]:before:absolute',
    'data-[state=active]:before:bg-primary',
    "data-[state=active]:before:content-['']",
    'data-[state=active]:before:transition-all',
    'data-[state=active]:before:duration-200',
    'data-[state=active]:before:ease-in-out',

    // Focus States
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-ring',
    'focus-visible:ring-offset-2',

    // Disabled States
    'disabled:pointer-events-none',
    'disabled:opacity-50',
    'disabled:grayscale',

    // Transitions
    'transition-all',
  ],
  {
    variants: {
      size: {
        sm: ['h-8', 'gap-1.5', 'px-3'],
        default: ['h-9', 'px-3', 'py-2'],
        lg: ['h-10', 'px-6'],
      },
      orientation: {
        horizontal: [
          // Bottom indicator for horizontal tabs
          'data-[state=active]:before:top-[calc(100%+7px)]',
          'data-[state=active]:before:left-0',
          'data-[state=active]:before:right-0',
          'data-[state=active]:before:h-0.5',
        ],
        vertical: [
          // Right indicator for vertical tabs
          'data-[state=active]:before:left-[calc(100%+7px)]',
          'data-[state=active]:before:top-0',
          'data-[state=active]:before:bottom-0',
          'data-[state=active]:before:w-0.5',
          // Vertical layout styling
          'w-full',
          'justify-start',
        ],
      },
    },
    defaultVariants: {
      size: 'default',
      orientation: 'horizontal',
    },
  },
)

export const tabsContentVariants = cva(
  [
    // Layout & Structure
    'mt-2',

    // Focus States
    'ring-offset-background',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-ring',
    'focus-visible:ring-offset-2',
  ],
  {
    variants: {
      variant: {
        default: [],
        padded: ['p-4'],
        card: ['rounded-lg', 'border', 'bg-card', 'p-6'],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)
