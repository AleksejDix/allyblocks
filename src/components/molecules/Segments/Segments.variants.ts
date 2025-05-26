import { cva } from 'class-variance-authority'

export const segmentsRootVariants = cva('inline-flex items-center rounded-md bg-muted p-1 text-muted-foreground', {
  variants: {
    size: {
      sm: 'h-8 text-sm gap-1',
      default: 'h-9 text-sm gap-1',
      lg: 'h-10 text-sm gap-1',
    },
    variant: {
      surface: 'bg-muted',
      classic: 'bg-background border border-border',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'surface',
  },
})

export const segmentItemVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm',
  {
    variants: {
      size: {
        sm: 'h-6 px-3 py-1 text-sm',
        default: 'h-7 px-3 py-1.5 text-sm',
        lg: 'h-8 px-4 py-2 text-sm',
      },
      variant: {
        surface: 'data-[state=on]:bg-background data-[state=on]:text-foreground',
        classic: 'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'surface',
    },
  },
)
