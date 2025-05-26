import { cva } from 'class-variance-authority'

export const segmentsRootVariants = cva('inline-flex items-center rounded-md px-0.5 py-0.5 text-muted-foreground', {
  variants: {
    size: {
      sm: 'h-8 text-sm gap-1',
      md: 'h-9 text-sm gap-1',
      lg: 'h-10 text-sm gap-1',
    },
    variant: {
      surface: 'bg-muted border border-border shadow-xs dark:bg-input/30 dark:border-input',
      classic: 'bg-background border border-border shadow-xs dark:bg-input/30 dark:border-input',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'surface',
  },
})

export const segmentItemVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium cursor-pointer select-none transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border border-transparent hover:bg-accent/50 hover:text-accent-foreground dark:hover:bg-input/50',
  {
    variants: {
      size: {
        sm: 'h-6.5 px-3 py-1 text-sm',
        md: 'h-7.5 px-3 py-1.5 text-sm',
        lg: 'h-8.5 px-6 py-2 text-sm',
      },
      variant: {
        surface:
          'data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:border-border data-[state=on]:shadow-xs hover:bg-black/5 dark:data-[state=on]:bg-input dark:data-[state=on]:border-input',
        classic:
          'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:border-accent  hover:g-black/5 dark:data-[state=on]:bg-input data-[state=on]:border-input ',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'surface',
    },
  },
)
