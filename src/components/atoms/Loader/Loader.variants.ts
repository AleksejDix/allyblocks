import { cva } from 'class-variance-authority'

export const loaderVariants = cva('flex items-center justify-center', {
  variants: {
    overlay: {
      true: 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
      false: '',
    },
  },
  defaultVariants: {
    overlay: false,
  },
})

export const loaderIconVariants = cva('animate-spin', {
  variants: {
    size: {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-6 w-6',
      xl: 'h-8 w-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
