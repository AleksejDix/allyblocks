import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  tableVariants,
  tableContainerVariants,
  tableHeaderVariants,
  tableBodyVariants,
  tableRowVariants,
  tableFooterVariants,
  tableCellVariants,
  tableHeadVariants,
  tableCaptionVariants,
} from './Table.variants'
import {
  type TableProps,
  type TableHeaderProps,
  type TableBodyProps,
  type TableFooterProps,
  type TableRowProps,
  type TableHeadProps,
  type TableCellProps,
  type TableCaptionProps,
} from './Table.types'

function Table({ className, containerClassName, size, variant, ...props }: TableProps) {
  return (
    <div data-slot="table-container" className={cn(tableContainerVariants(), containerClassName)}>
      <table data-slot="table" className={cn(tableVariants({ size, variant }), className)} {...props} />
    </div>
  )
}

function TableHeader({ className, ...props }: TableHeaderProps) {
  return <thead data-slot="table-header" className={cn(tableHeaderVariants(), className)} {...props} />
}

function TableBody({ className, ...props }: TableBodyProps) {
  return <tbody data-slot="table-body" className={cn(tableBodyVariants(), className)} {...props} />
}

function TableFooter({ className, ...props }: TableFooterProps) {
  return <tfoot data-slot="table-footer" className={cn(tableFooterVariants(), className)} {...props} />
}

function TableRow({ className, ...props }: TableRowProps) {
  return <tr data-slot="table-row" className={cn(tableRowVariants(), className)} {...props} />
}

function TableHead({ className, align, ...props }: TableHeadProps) {
  return <th data-slot="table-head" className={cn(tableHeadVariants({ align }), className)} {...props} />
}

function TableCell({ className, align, ...props }: TableCellProps) {
  return <td data-slot="table-cell" className={cn(tableCellVariants({ align }), className)} {...props} />
}

function TableCaption({ className, ...props }: TableCaptionProps) {
  return <caption data-slot="table-caption" className={cn(tableCaptionVariants(), className)} {...props} />
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
