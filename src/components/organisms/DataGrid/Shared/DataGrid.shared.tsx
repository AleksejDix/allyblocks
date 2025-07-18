import { ChevronUp, ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/molecules/DropdownMenu'
import { Button } from '@/components/atoms/Button'
import { useEffect, useState } from 'react'
import { Icon } from '@/components/atoms/Icon'
import type { Table } from '@tanstack/react-table'

// Shared DataGridColumnVisibility Component
type IconPosition = 'Leading' | 'Trailing'
type ColumnVisibilityProps<TData = unknown> = {
  tableInstance: Table<TData>
  label?: string
  iconName?: Parameters<typeof Icon>[0]['name']
  iconPosition?: IconPosition
}

export function DataGridColumnVisibility<TData = unknown>({
  tableInstance,
  label = 'Columns',
  iconName = 'columns',
  iconPosition = 'Leading',
}: ColumnVisibilityProps<TData>) {
  // Get all leaf columns (columns that can be shown/hidden)
  const columns = tableInstance.getAllLeafColumns()

  // Toggle visibility for a single column
  const toggleColumnVisibility = (columnId: string, visible: boolean) => {
    tableInstance.setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: visible,
    }))
  }

  // Reset all columns to visible
  const resetColumnVisibility = () => {
    const newState: Record<string, boolean> = {}
    columns.forEach((column) => {
      newState[column.id] = true
    })
    tableInstance.setColumnVisibility(newState)
  }

  return (
    <div className="mb-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {iconPosition === 'Trailing' ? label : null}
            <Icon name={iconName} />
            {iconPosition === 'Leading' ? label : null}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {columns.map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={(value) => toggleColumnVisibility(column.id, !!value)}
            >
              <div className="flex items-center justify-between w-full">
                {/* Use meta.label for translation if available */}
                {(column.columnDef.meta as any)?.label ||
                  (typeof column.columnDef.header === 'function'
                    ? column.id
                    : (column.columnDef.header?.toString() ?? column.id))}
              </div>
            </DropdownMenuCheckboxItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex justify-center items-center text-sm text-gray-500"
            onSelect={(e) => {
              e.preventDefault()
              resetColumnVisibility()
            }}
          >
            <Icon name="rotate-ccw" />
            Show All Columns
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// Shared DataGridColumnSorter Component
type ColumnSorterProps<TData = unknown> = {
  tableInstance: Table<TData>
}

export function DataGridColumnSorter<TData = unknown>({ tableInstance }: ColumnSorterProps<TData>) {
  // Local state to track column order so we can update the UI immediately
  const [localColumnOrder, setLocalColumnOrder] = useState<string[]>([])

  // Update local order whenever the table's column order changes
  const columnOrder = tableInstance?.getState().columnOrder
  useEffect(() => {
    if (tableInstance) {
      const visibleColumns = tableInstance.getVisibleLeafColumns()
      // If the table has an explicit column order, use it
      const currentOrder = tableInstance.getState().columnOrder

      if (currentOrder && currentOrder.length > 0) {
        setLocalColumnOrder(currentOrder)
      } else {
        // Otherwise use the default order from visible columns
        setLocalColumnOrder(visibleColumns.map((col) => col.id))
      }
    }
  }, [tableInstance, columnOrder])

  if (!tableInstance) {
    return null
  }

  const visibleColumns = tableInstance.getVisibleLeafColumns()

  // Function to move a column up in order
  const moveColumnUp = (columnId: string) => {
    const index = localColumnOrder.indexOf(columnId)

    if (index > 0) {
      const newOrder = [...localColumnOrder]
      // Swap with previous column
      ;[newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]]

      // Update both local state and table state
      setLocalColumnOrder(newOrder)
      tableInstance.setColumnOrder(newOrder)
    }
  }

  // Function to move a column down in order
  const moveColumnDown = (columnId: string) => {
    const index = localColumnOrder.indexOf(columnId)

    if (index < localColumnOrder.length - 1) {
      const newOrder = [...localColumnOrder]
      // Swap with next column
      ;[newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]

      // Update both local state and table state
      setLocalColumnOrder(newOrder)
      tableInstance.setColumnOrder(newOrder)
    }
  }

  // Reset column ordering to default
  const resetColumnOrder = () => {
    // Setting an empty array resets to default order
    tableInstance.setColumnOrder([])
    // Update local state to match
    setLocalColumnOrder(visibleColumns.map((col) => col.id))
  }

  // Sort visible columns based on localColumnOrder
  const sortedColumns = [...visibleColumns].sort((a, b) => {
    const indexA = localColumnOrder.indexOf(a.id)
    const indexB = localColumnOrder.indexOf(b.id)

    // If a column isn't in the localColumnOrder, put it at the end
    if (indexA === -1) return 1
    if (indexB === -1) return -1

    return indexA - indexB
  })

  return (
    <div className="mb-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Icon name="move-horizontal" className="mr-2 h-4 w-4" />
            Reorder Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {sortedColumns.map((column) => (
            <DropdownMenuItem
              key={column.id}
              className="flex justify-between items-center p-2"
              // Prevent the dropdown from closing when clicking the menu item
              onSelect={(e) => e.preventDefault()}
            >
              <span>{(column.columnDef.meta as any)?.label || column.columnDef.header?.toString() || column.id}</span>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveColumnUp(column.id)
                  }}
                  disabled={localColumnOrder.indexOf(column.id) === 0}
                >
                  <ChevronUp />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveColumnDown(column.id)
                  }}
                  disabled={localColumnOrder.indexOf(column.id) === localColumnOrder.length - 1}
                >
                  <ChevronDown />
                </Button>
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex justify-center items-center text-sm text-gray-500"
            onSelect={(e) => {
              e.preventDefault()
              resetColumnOrder()
            }}
          >
            <Icon name="rotate-ccw" />
            Reset to Default
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
