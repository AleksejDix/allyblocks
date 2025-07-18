// Extend TanStack Table's ColumnMeta interface
declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    // Label for column visibility dropdown and other UI elements
    label?: string
    // Column alignment
    align?: 'left' | 'center' | 'right'
  }
}

export {}