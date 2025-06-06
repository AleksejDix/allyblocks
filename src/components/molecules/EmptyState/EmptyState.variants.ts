import { cva } from 'class-variance-authority'

export const emptyStateVariants = cva('flex items-center justify-center min-h-full w-full rounded border', {
  variants: {
    variant: {
      default: '',
      card: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const emptyStateContentVariants = cva('max-w-md mx-auto', {
  variants: {
    variant: {
      default: 'bg-background p-8',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
