import { type ColumnDef, flexRender } from '@tanstack/react-table'
import { type ReactNode, type PropsWithChildren } from 'react'
import { DataGridClientContextProvider } from './DataGridClient.context'
import { useDataGridClient } from './DataGridClient.types'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/atoms/Table'
import { cn } from '@/lib/utils'

// Main DataGridClient Component
type DataGridClientProps<TData> = {
  columns: ColumnDef<TData, any>[]
  data: TData[]
  children: React.ReactNode
  // Client-specific options
  enableSorting?: boolean
  enableFiltering?: boolean
  enableRowSelection?: boolean
  enableColumnResizing?: boolean
  enablePagination?: boolean
  pageSize?: number
}

export function DataGridClient<TData>({
  columns,
  data,
  children,
  enableSorting = true,
  enableFiltering = true,
  enableRowSelection = false,
  enableColumnResizing = true,
  enablePagination = false,
  pageSize = 10,
}: DataGridClientProps<TData>) {
  return (
    <DataGridClientContextProvider
      columns={columns}
      data={data}
      enableSorting={enableSorting}
      enableFiltering={enableFiltering}
      enableRowSelection={enableRowSelection}
      enableColumnResizing={enableColumnResizing}
      enablePagination={enablePagination}
      pageSize={pageSize}
    >
      {children}
    </DataGridClientContextProvider>
  )
}

// DataGridClientTable Component
export function DataGridClientTable({ children }: PropsWithChildren) {
  const { tableInstance } = useDataGridClient()

  if (!tableInstance) {
    return null
  }

  return (
    <Table variant="striped">
      {children || (
        <>
          <DataGridClientHeader />
          <DataGridClientBody />
          <DataGridClientFooter />
        </>
      )}
    </Table>
  )
}

// DataGridClientHeader Component
export function DataGridClientHeader() {
  const { tableInstance } = useDataGridClient()
  if (!tableInstance) return null

  return (
    <TableHeader>
      {tableInstance.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              colSpan={header.colSpan}
              scope="col"
              style={{ width: header.getSize() }}
              className={cn(
                '[&>[role=checkbox]]:translate-y-[-3px]',
                (header.column.columnDef.meta as any)?.align === 'right' && 'text-right',
                (header.column.columnDef.meta as any)?.align === 'center' && 'text-center',
                !(header.column.columnDef.meta as any)?.align && 'text-left'
              )}
            >
              {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  )
}

// DataGridClientBody Component
type DataGridClientBodyProps<TData = unknown> = {
  children?: (row: import('@tanstack/react-table').Row<TData>) => ReactNode
}

export function DataGridClientBody<TData = unknown>({ children }: DataGridClientBodyProps<TData>) {
  const { tableInstance } = useDataGridClient<TData>()

  if (!tableInstance) return null

  // For client-side, we use the paginated row model if pagination is enabled
  const rows = tableInstance.options.enablePagination
    ? tableInstance.getPaginationRowModel().rows
    : tableInstance.getRowModel().rows

  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow
          key={row.id}
          className="relative hover:bg-input/75"
          role="row"
          aria-selected={row.getIsSelected()}
          tabIndex={-1}
          onClick={() => {
            if (tableInstance.options.enableRowSelection) {
              row.toggleSelected(!row.getIsSelected())
            }
          }}
          onKeyDown={(e) => {
            if (tableInstance.options.enableRowSelection && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault()
              row.toggleSelected(!row.getIsSelected())
            }
          }}
        >
          {children
            ? children(row)
            : row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                  className={cn(
                    '[&>[role=checkbox]]:translate-y-[-3px]',
                    (cell.column.columnDef.meta as any)?.align === 'right' && 'text-right',
                    (cell.column.columnDef.meta as any)?.align === 'center' && 'text-center',
                    !(cell.column.columnDef.meta as any)?.align && 'text-left'
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
        </TableRow>
      ))}
    </TableBody>
  )
}

// DataGridClientFooter Component
export function DataGridClientFooter() {
  const { tableInstance } = useDataGridClient()

  if (!tableInstance) return null

  const hasFooters = () => {
    let hasFooters: boolean = false
    if (tableInstance) {
      tableInstance.getFooterGroups().map((footerGroup) => {
        footerGroup.headers.map((header) => {
          hasFooters = hasFooters || header.column.columnDef.footer != undefined
        })
      })
    }
    return hasFooters
  }

  if (!hasFooters()) return null

  return (
    <TableFooter>
      {tableInstance.getFooterGroups().map((footerGroup) => (
        <TableRow key={footerGroup.id}>
          {footerGroup.headers.map((header) => (
            <TableCell
              key={header.id}
              colSpan={header.colSpan}
              className="bg-primary text-primary-foreground border [&>[role=checkbox]]:translate-y-[-3px]"
            >
              {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableFooter>
  )
}
