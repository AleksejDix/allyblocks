import { cva } from 'class-variance-authority'

export const tableVariants = cva('w-full caption-bottom text-sm', {
  variants: {
    size: {
      sm: [
        // Header styling
        '[&_th]:h-8',
        '[&_th]:px-2',
        '[&_th]:py-0.5',
        // Cell styling
        '[&_td]:px-2',
        '[&_td]:py-0.5',
        // Row height
        '[&_tr]:h-9',
        // Checkbox positioning - header
        '[&_th:has([role=checkbox])_[role=checkbox]]:translate-y-[2px]',
        '[&_th:has([role=checkbox])_[role=checkbox]]:translate-x-[1.5px]',
        // Cell padding - header
        '[&_th:has([role=checkbox])]:pl-2',
        // Checkbox positioning - cell
        '[&_td:has([role=checkbox])_[role=checkbox]]:translate-y-[2px]',
        '[&_td:has([role=checkbox])_[role=checkbox]]:translate-x-[1.5px]',
      ].join(' '),

      md: [
        // Header styling
        '[&_th]:h-10',
        '[&_th]:px-3',
        '[&_th]:py-1',
        // Cell styling
        '[&_td]:px-3',
        '[&_td]:py-1',
        // Row height
        '[&_tr]:h-10',
        // Checkbox positioning - header
        '[&_th:has([role=checkbox])_[role=checkbox]]:translate-y-[2px]',
        '[&_th:has([role=checkbox])_[role=checkbox]]:translate-x-[0px]',
        // Cell padding - header
        '[&_th:has([role=checkbox])]:pl-3',
        // Checkbox positioning - cell
        '[&_td:has([role=checkbox])_[role=checkbox]]:translate-y-[2px]',
        '[&_td:has([role=checkbox])_[role=checkbox]]:translate-x-[0px]',
      ].join(' '),

      lg: [
        // Header styling
        '[&_th]:h-12',
        '[&_th]:px-3',
        '[&_th]:py-1',
        // Cell styling
        '[&_td]:px-3',
        '[&_td]:py-1',
        // Row height
        '[&_tr]:h-12',
        // Checkbox positioning - header
        '[&_th:has([role=checkbox])_[role=checkbox]]:translate-y-[2px]',
        '[&_th:has([role=checkbox])_[role=checkbox]]:translate-x-[-2px]',
        // Cell padding - header
        '[&_th:has([role=checkbox])]:pl-4',
        '[&_td:has([role=checkbox])]:pl-4',
        // Checkbox positioning - cell
        '[&_td:has([role=checkbox])_[role=checkbox]]:translate-y-[2px]',
        '[&_td:has([role=checkbox])_[role=checkbox]]:translate-x-[-2px]',
      ].join(' '),
    },
    variant: {
      striped: '[&_tbody_tr:nth-child(even)]:bg-muted/25 [&_thead]:bg-muted/50',
      bordered:
        'border border-border [&_th]:border-r [&_td]:border-r [&_th:last-child]:border-r-0 [&_td:last-child]:border-r-0 [&_thead]:bg-muted/50',
      'striped-bordered':
        '[&_tbody_tr:nth-child(even)]:bg-muted/25 [&_thead]:bg-muted/50 border border-border [&_th]:border-r [&_td]:border-r [&_th:last-child]:border-r-0 [&_td:last-child]:border-r-0',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export const tableContainerVariants = cva('relative w-full overflow-x-auto', {
  variants: {},
  defaultVariants: {},
})

export const tableHeaderVariants = cva('[&_tr]:border-b', {
  variants: {},
  defaultVariants: {},
})

export const tableBodyVariants = cva('[&_tr:last-child]:border-0', {
  variants: {},
  defaultVariants: {},
})

export const tableRowVariants = cva('border-b ', {
  variants: {},
  defaultVariants: {},
})

export const tableFooterVariants = cva('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', {
  variants: {},
  defaultVariants: {},
})

export const tableHeadVariants = cva(
  'text-left align-middle font-medium text-foreground [&:has([role=checkbox])]:w-9',
  {
    variants: {
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      align: 'left',
    },
  },
)

export const tableCellVariants = cva('align-middle [&:has([role=checkbox])]:w-9', {
  variants: {
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    align: 'left',
  },
})

export const tableCaptionVariants = cva('text-muted-foreground mt-4 text-sm', {
  variants: {},
  defaultVariants: {},
})
