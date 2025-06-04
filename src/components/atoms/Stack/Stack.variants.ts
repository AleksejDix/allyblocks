import { cva } from 'class-variance-authority'

export const stackVariants = cva('flex flex-col', {
  variants: {
    gap: {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      '2xl': 'gap-12',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      around: 'justify-around',
      between: 'justify-between',
      evenly: 'justify-evenly',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },
    direction: {
      column: 'flex-col',
      'column-reverse': 'flex-col-reverse',
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse',
    },
  },
  defaultVariants: {
    gap: 'md',
    justify: 'start',
    align: 'stretch',
    direction: 'column',
  },
})
