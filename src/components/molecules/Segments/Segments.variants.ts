import { cva } from 'class-variance-authority'

export const segmentsRootVariants = cva('inline-flex items-center rounded-md bg-muted p-1 text-muted-foreground', {
  variants: {
    size: {
      '1': 'h-6 text-xs',
      '2': 'h-8 text-sm',
      '3': 'h-10 text-sm',
    },
    variant: {
      surface: 'bg-muted',
      classic: 'bg-background border border-border',
    },
  },
  defaultVariants: {
    size: '2',
    variant: 'surface',
  },
})

export const segmentItemVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm',
  {
    variants: {
      size: {
        '1': 'h-4 px-2 py-0 text-xs',
        '2': 'h-6 px-3 py-1 text-sm',
        '3': 'h-8 px-4 py-1.5 text-sm',
      },
      variant: {
        surface: 'data-[state=on]:bg-background data-[state=on]:text-foreground',
        classic: 'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
      },
    },
    defaultVariants: {
      size: '2',
      variant: 'surface',
    },
  },
)
