# DataGrid Reusable Cell Components

This directory contains a collection of reusable cell components designed to work seamlessly with TanStack Table and our DataGrid implementation. These components provide consistent UI patterns and reduce code duplication.

## Available Cell Components

### ActionCell

Provides a dropdown menu with actions for each row.

```tsx
<ActionCell
  row={row.original}
  actions={[
    {
      label: 'Edit',
      icon: 'edit',
      onClick: (row) => handleEdit(row),
    },
    {
      label: 'Delete',
      icon: 'trash-2',
      variant: 'destructive',
      separator: true,
      onClick: (row) => handleDelete(row),
    },
  ]}
/>
```

### SortableHeaderCell

Adds sorting functionality to column headers with visual indicators.

```tsx
header: ({ column }) => <SortableHeaderCell column={column}>Column Name</SortableHeaderCell>
```

### CheckboxCell & CheckboxHeaderCell

For row selection functionality.

```tsx
// Header
header: ({ table }) => <CheckboxHeaderCell table={table} />

// Cell
cell: ({ row }) => <CheckboxCell row={row} />
```


### DateCell

Formats and displays dates with various options.

```tsx
<DateCell
  date={timestamp}
  format="relative" // or 'short', 'medium', 'long'
  showTime={true}
/>
```


## Usage Example

```tsx
import { createColumnHelper } from '@tanstack/react-table'
import {
  ActionCell,
  CheckboxHeaderCell,
  CheckboxCell,
  DateCell,
} from '@/components/organisms/DataGrid/Cells'

const columnHelper = createColumnHelper<YourDataType>()

const columns = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => <CheckboxHeaderCell table={table} />,
    cell: ({ row }) => <CheckboxCell row={row} />,
  }),

  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue()
      return <Badge color={status === 'active' ? 'green' : 'gray'}>{status}</Badge>
    },
  }),

  columnHelper.accessor('createdAt', {
    header: 'Created',
    cell: ({ getValue }) => <DateCell date={getValue()} format="relative" />,
  }),

  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => <ActionCell row={row.original} actions={rowActions} />,
  }),
]
```

## Benefits

1. **Consistency**: Ensures uniform UI patterns across all tables
2. **Reusability**: Write once, use everywhere
3. **Type Safety**: Full TypeScript support with proper generics
4. **Accessibility**: Built-in ARIA labels and keyboard support
5. **Customization**: Flexible props for different use cases
6. **Performance**: Optimized rendering with React best practices
