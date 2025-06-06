import { cva } from 'class-variance-authority'

export const emptyVariants = cva('flex items-center justify-center min-h-full w-full', {
  variants: {},
  defaultVariants: {},
})

export const emptyContentVariants = cva('max-w-md mx-auto p-8', {
  variants: {},
  defaultVariants: {},
})
