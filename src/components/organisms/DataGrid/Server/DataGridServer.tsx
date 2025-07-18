import { type ColumnDef, flexRender } from '@tanstack/react-table'
import { type ReactNode, type PropsWithChildren } from 'react'
import { DataGridServerContextProvider } from './DataGridServer.context'
import { useDataGridServer } from './DataGridServer.types'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/atoms/Table'

// Server-side specific types
export type ServerPaginationState = {
  pageIndex: number
  pageSize: number
}

export type ServerSortingState = {
  id: string
  desc: boolean
}[]

export type ServerFilterState = {
  id: string
  value: unknown
}[]

// Main DataGridServer Component
type DataGridServerProps<TData> = {
  columns: ColumnDef<TData, any>[]
  data: TData[]
  children: React.ReactNode
  // Server-side specific props
  totalCount: number
  pageCount: number
  pagination: ServerPaginationState
  onPaginationChange: (pagination: ServerPaginationState) => void
  sorting?: ServerSortingState
  onSortingChange?: (sorting: ServerSortingState) => void
  filters?: ServerFilterState
  onFiltersChange?: (filters: ServerFilterState) => void
  isLoading?: boolean
  // Optional features
  enableRowSelection?: boolean
  rowSelection?: Record<string, boolean>
  onRowSelectionChange?: (selection: Record<string, boolean>) => void
}

export function DataGridServer<TData>({
  columns,
  data,
  children,
  totalCount,
  pageCount,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
  filters,
  onFiltersChange,
  isLoading = false,
  enableRowSelection = false,
  rowSelection,
  onRowSelectionChange,
}: DataGridServerProps<TData>) {
  return (
    <DataGridServerContextProvider
      columns={columns}
      data={data}
      totalCount={totalCount}
      pageCount={pageCount}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
      sorting={sorting}
      onSortingChange={onSortingChange}
      filters={filters}
      onFiltersChange={onFiltersChange}
      isLoading={isLoading}
      enableRowSelection={enableRowSelection}
      rowSelection={rowSelection}
      onRowSelectionChange={onRowSelectionChange}
    >
      {children}
    </DataGridServerContextProvider>
  )
}

// DataGridServerTable Component
export function DataGridServerTable({ children }: PropsWithChildren) {
  const { tableInstance, isLoading } = useDataGridServer()

  if (!tableInstance) {
    return null
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      )}
      <Table variant="striped" className={isLoading ? 'opacity-50' : ''}>
        {children || (
          <>
            <DataGridServerHeader />
            <DataGridServerBody />
            <DataGridServerFooter />
          </>
        )}
      </Table>
    </div>
  )
}

// DataGridServerHeader Component
export function DataGridServerHeader() {
  const { tableInstance } = useDataGridServer()
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
              className="[&>[role=checkbox]]:translate-y-[-3px]"
            >
              {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  )
}

// DataGridServerBody Component
type DataGridServerBodyProps<TData = unknown> = {
  children?: (row: import('@tanstack/react-table').Row<TData>) => ReactNode
}

export function DataGridServerBody<TData = unknown>({ children }: DataGridServerBodyProps<TData>) {
  const { tableInstance } = useDataGridServer<TData>()

  if (!tableInstance) return null

  const rows = tableInstance.getRowModel().rows

  if (rows.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={tableInstance.getAllColumns().length} className="text-center py-8 text-muted-foreground">
            No data available
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

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
                  className="[&>[role=checkbox]]:translate-y-[-3px]"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
        </TableRow>
      ))}
    </TableBody>
  )
}

// DataGridServerFooter Component
export function DataGridServerFooter() {
  const { tableInstance } = useDataGridServer()

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
