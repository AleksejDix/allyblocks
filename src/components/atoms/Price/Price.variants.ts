import { cva } from 'class-variance-authority'

export const priceVariants = cva('inline-flex items-baseline gap-1', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
    },
    theme: {
      default: '',
      inverted: '',
    },
    layout: {
      horizontal: 'flex-row items-baseline',
      vertical: 'flex-col items-start gap-0',
    },
    discountColor: {
      default: '',
      red: 'text-red-600',
    },
  },
  compoundVariants: [
    {
      theme: 'inverted',
      discountColor: 'red',
      class: 'text-red-400',
    },
  ],
  defaultVariants: {
    size: '4xl',
    theme: 'default',
    layout: 'horizontal',
    discountColor: 'default',
  },
})
