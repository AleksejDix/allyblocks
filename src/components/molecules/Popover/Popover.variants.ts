import { cva } from 'class-variance-authority'

export const popoverVariants = cva('', {
  variants: {
    variant: {
      default: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const popoverTriggerVariants = cva('', {
  variants: {
    variant: {
      default: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const popoverContentVariants = cva(
  'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-(--radix-popover-content-transform-origin) rounded-md border shadow-md outline-hidden',
  {
    variants: {
      size: {
        sm: 'w-56 p-3',
        default: 'w-72 p-4',
        lg: 'w-80 p-6',
        xl: 'w-96 p-8',
      },
      variant: {
        default: '',
        tooltip: 'px-3 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  },
)

export const popoverAnchorVariants = cva('', {
  variants: {
    variant: {
      default: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
