import { cva } from 'class-variance-authority'

export const cardVariants = cva(
  'bg-card text-card-foreground rounded-xl shadow-sm [&>*:first-child]:pt-6 [&>*:last-child]:pb-6 space-y-4',
  {
    variants: {
      variant: {
        default: 'border',
        outline: 'border-2',
        primary: 'border border-primary',
        secondary: 'border border-secondary',
        ghost: 'shadow-none border-none bg-transparent',
        elevated: 'border-none shadow-md',
      },
      size: {
        md: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export const cardHeaderVariants = cva(
  '@container/card-header px-6 grid auto-rows-min grid-rows-[auto_auto] items-start has-data-[slot=card-action]:grid-cols-[1fr_auto]',
  {
    variants: {},
    defaultVariants: {},
  },
)

export const cardFooterVariants = cva('px-6', {
  variants: {},
  defaultVariants: {},
})

export const cardBodyVariants = cva('px-6', {
  variants: {},
  defaultVariants: {},
})
