import { Icon } from '@/components/atoms/Icon'
import type { Column } from '@tanstack/react-table'

export interface SortableHeaderCellProps<T> {
  column: Column<T>
  children: React.ReactNode
  className?: string
}

export function SortableHeaderCell<T>({ column, children, className = '' }: SortableHeaderCellProps<T>) {
  const sorted = column.getIsSorted()

  return (
    <button
      className={`inline-flex items-center gap-1 font-medium ${className}`}
      onClick={() => column.toggleSorting(sorted === 'asc')}
      type="button"
    >
      {children}
      {sorted === 'asc' ? (
        <Icon name="chevron-up" className="h-4 w-4" />
      ) : sorted === 'desc' ? (
        <Icon name="chevron-down" className="h-4 w-4" />
      ) : (
        <Icon name="chevrons-up-down" className="h-4 w-4 opacity-50" />
      )}
    </button>
  )
}
