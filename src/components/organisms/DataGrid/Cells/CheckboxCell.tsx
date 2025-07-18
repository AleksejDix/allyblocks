import { Checkbox } from '@/components/atoms/Checkbox'
import type { Table, Row } from '@tanstack/react-table'

export interface CheckboxHeaderCellProps<T> {
  table: Table<T>
  ariaLabel?: string
}

export function CheckboxHeaderCell<T>({ table, ariaLabel = 'Select all' }: CheckboxHeaderCellProps<T>) {
  return (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      onCheckedChange={(checked) => table.toggleAllPageRowsSelected(!!checked)}
      aria-label={ariaLabel}
    />
  )
}

export interface CheckboxCellProps<T> {
  row: Row<T>
  ariaLabel?: (row: T) => string
}

export function CheckboxCell<T>({ row, ariaLabel }: CheckboxCellProps<T>) {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(checked) => row.toggleSelected(!!checked)}
      aria-label={ariaLabel ? ariaLabel(row.original) : `Select row`}
    />
  )
}
