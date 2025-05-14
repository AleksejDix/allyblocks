import { cva } from 'class-variance-authority'

export const cardVariants = cva('bg-card text-card-foreground rounded-xl overflow-hidden divide-y divide-border', {
  variants: {
    variant: {
      default: 'border',
    },
    size: {
      md: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export const cardHeaderVariants = cva(
  '@container/card-header px-6 pt-4 grid auto-rows-min grid-rows-[auto_auto] items-start has-data-[slot=card-action]:grid-cols-[1fr_auto]',
  {
    variants: {},
    defaultVariants: {},
  },
)

export const cardFooterVariants = cva('px-6 pb-4 bg-muted pt-4', {
  variants: {},
  defaultVariants: {},
})

export const cardBodyVariants = cva('px-6 py-4', {
  variants: {},
  defaultVariants: {},
})
