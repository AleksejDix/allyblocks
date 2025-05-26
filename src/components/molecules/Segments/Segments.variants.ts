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
      classic: 'bg-background border border-border shadow-xs',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'surface',
  },
})

export const segmentItemVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium cursor-pointer select-none transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-xs hover:bg-accent/50 hover:text-accent-foreground',
  {
    variants: {
      size: {
        sm: 'h-6 px-3 py-1 text-sm',
        default: 'h-7 px-3 py-1.5 text-sm',
        lg: 'h-8 px-4 py-2 text-sm',
      },
      variant: {
        surface: 'data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-xs',
        classic: 'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground hover:bg-accent/30',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'surface',
    },
  },
)
