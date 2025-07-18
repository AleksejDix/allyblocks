import { createColumnHelper } from '@tanstack/react-table'
import { DataGridClient, DataGridClientTable } from './'
import {
  ActionCell,
  SortableHeaderCell,
  CheckboxHeaderCell,
  CheckboxCell,
  DateCell,
} from './Cells'
import { FileSize } from '@/components/atoms/FileSize'
import { SwissFranc } from '@/components/atoms/SwissFranc'
import { SwissNumber } from '@/components/atoms/SwissNumber'
import { Percent } from '@/components/atoms/Percent'
import { Avatar } from '@/components/atoms/Avatar'
import { Text } from '@/components/atoms/Text'
import { ProgressBar } from '@/components/atoms/ProgressBar'
import { Icon } from '@/components/atoms/Icon'
import { Badge } from '@/components/atoms/Badge'
import { useLocale } from '@/hooks/useLocale'
import { cn } from '@/lib/utils'
import type { Meta, StoryObj } from '@storybook/react-vite'

// Example data type
interface Product {
  id: string
  name: string
  category: string
  priceCHF: number
  stock: number
  stockValue: number
  status: 'available' | 'low_stock' | 'out_of_stock'
  rating: number
  reviews: number
  image: string
  lastUpdated: string
  salesProgress: number
  fileSize?: number
  growthRate: number
  owner: {
    name: string
    avatar: string
    role: string
  }
}

const products: Product[] = [
  {
    id: 'P001',
    name: 'Wireless Headphones',
    category: 'Electronics',
    priceCHF: 265.50,
    stock: 150,
    stockValue: 39825,
    status: 'available',
    rating: 4.5,
    reviews: 1234,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
    lastUpdated: '2024-01-15T10:30:00Z',
    salesProgress: 75,
    fileSize: 2.4 * 1024 * 1024, // 2.4 MB firmware
    growthRate: 12.5,
    owner: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      role: 'Product Manager',
    },
  },
  {
    id: 'P002',
    name: 'Smart Watch',
    category: 'Electronics',
    priceCHF: 177.00,
    stock: 12,
    stockValue: 2124,
    status: 'low_stock',
    rating: 4.2,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200',
    lastUpdated: '2024-01-14T15:45:00Z',
    salesProgress: 90,
    fileSize: 15.3 * 1024 * 1024, // 15.3 MB companion app
    growthRate: -5.2,
    owner: {
      name: 'Michael Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      role: 'Category Lead',
    },
  },
  {
    id: 'P003',
    name: 'Laptop Stand',
    category: 'Accessories',
    priceCHF: 44.20,
    stock: 0,
    stockValue: 0,
    status: 'out_of_stock',
    rating: 4.8,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200',
    lastUpdated: '2024-01-10T09:15:00Z',
    salesProgress: 100,
    fileSize: 543 * 1024, // 543 KB product manual
    growthRate: 8.7,
    owner: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      role: 'Inventory Manager',
    },
  },
]

const columnHelper = createColumnHelper<Product>()

const ProductTableWithReusableCells = () => {
  const locale = useLocale()
  
  const columns = [
    // Checkbox column
    columnHelper.display({
      id: 'select',
      header: ({ table }) => <CheckboxHeaderCell table={table} />,
      cell: ({ row }) => <CheckboxCell row={row} ariaLabel={(product) => `Select ${product.name}`} />,
      size: 40,
      meta: {
        label: 'Select All', // Translation for column visibility dropdown
      },
    }),

    // Owner column with avatar
    columnHelper.accessor('owner', {
      header: 'Owner',
      cell: ({ getValue }) => {
        const owner = getValue()
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <img src={owner.avatar} alt={owner.name} className="h-full w-full rounded-full object-cover" />
            </Avatar>
            <div>
              <div className="font-medium">{owner.name}</div>
              <Text size="sm" tone="muted">{owner.role}</Text>
            </div>
          </div>
        )
      },
      size: 250,
      meta: {
        label: 'Product Owner',
        align: 'left',
      },
    }),

    // Product name column
    columnHelper.accessor('name', {
      header: ({ column }) => <SortableHeaderCell column={column}>Product</SortableHeaderCell>,
      cell: ({ getValue }) => getValue(),
      size: 200,
    }),

    // Price CHF column
    columnHelper.accessor('priceCHF', {
      header: ({ column }) => <SortableHeaderCell column={column}>Price</SortableHeaderCell>,
      cell: ({ getValue }) => {
        const amount = getValue()
        return <SwissFranc amount={amount} locale={locale} className="text-sm" />
      },
      meta: {
        label: 'Price (CHF)',
        align: 'right',
      },
    }),

    // Stock column
    columnHelper.accessor('stock', {
      header: ({ column }) => <SortableHeaderCell column={column}>Stock</SortableHeaderCell>,
      cell: ({ getValue }) => {
        const value = getValue()
        return <SwissNumber value={value} decimals={0} locale={locale} className="text-sm" />
      },
      meta: {
        label: 'Stock Quantity',
        align: 'right',
      },
    }),

    // Stock Value column
    columnHelper.accessor('stockValue', {
      header: 'Stock Value',
      cell: ({ getValue }) => {
        const amount = getValue()
        return <SwissFranc amount={amount} decimals={0} locale={locale} className="text-sm" />
      },
      meta: {
        label: 'Total Value',
        align: 'right',
      },
    }),

    // Stock status column
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ getValue }) => {
        const status = getValue()
        const statusConfig = {
          available: { label: 'Available', color: 'green' as const, icon: 'check-circle' as const },
          low_stock: { label: 'Low Stock', color: 'yellow' as const, icon: 'alert-circle' as const },
          out_of_stock: { label: 'Out of Stock', color: 'red' as const, icon: 'x-circle' as const },
        }
        const config = statusConfig[status as keyof typeof statusConfig]
        
        return config ? (
          <Badge color={config.color}>
            <Icon name={config.icon} className="h-3 w-3" />
            {config.label}
          </Badge>
        ) : (
          <span className="text-muted-foreground">Unknown</span>
        )
      },
      meta: {
        label: 'Availability Status',
        align: 'center',
      },
    }),

    // Growth rate column
    columnHelper.accessor('growthRate', {
      header: 'Growth',
      cell: ({ getValue }) => {
        const value = getValue()
        const showPlus = value > 0
        return (
          <span className={cn(
            'text-sm tabular-nums',
            value > 0 && 'text-green-600 dark:text-green-400',
            value < 0 && 'text-red-600 dark:text-red-400'
          )}>
            {showPlus && '+'}
            <Percent value={value} decimals={1} locale={locale} as="span" />
          </span>
        )
      },
      meta: {
        label: 'Growth Rate',
        align: 'right',
      },
    }),

    // Rating column
    columnHelper.accessor('rating', {
      header: 'Rating',
      cell: ({ getValue, row }) => {
        const rating = getValue()
        const reviews = row.original.reviews
        const stars = Array.from({ length: 5 }, (_, i) => i + 1)
        
        return (
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {stars.map((star) => (
                <Icon
                  key={star}
                  name="star"
                  className={cn(
                    'h-4 w-4',
                    star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-transparent text-gray-300'
                  )}
                />
              ))}
              <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
            </div>
            <Text size="sm" tone="muted">({reviews})</Text>
          </div>
        )
      },
    }),

    // Last updated column
    columnHelper.accessor('lastUpdated', {
      header: ({ column }) => <SortableHeaderCell column={column}>Updated</SortableHeaderCell>,
      cell: ({ getValue }) => <DateCell date={getValue()} relative={true} />,
    }),

    // Last updated with time column
    columnHelper.accessor('lastUpdated', {
      id: 'lastUpdatedWithTime',
      header: 'Full Date',
      cell: ({ getValue }) => <DateCell date={getValue()} showTime={true} />,
    }),

    // Sales progress column
    columnHelper.accessor('salesProgress', {
      header: 'Sales',
      cell: ({ getValue }) => {
        const value = getValue()
        const color = value > 80 ? 'red' : value > 50 ? 'yellow' : 'green'
        
        return (
          <div className="flex items-center gap-2 min-w-[100px]">
            <ProgressBar value={value} size="md" color={color} className="flex-1" />
            <Text size="sm" className="text-right min-w-[3rem]">
              {value}%
            </Text>
          </div>
        )
      },
    }),

    // File size column
    columnHelper.accessor('fileSize', {
      header: 'File Size',
      cell: ({ getValue }) => <FileSize bytes={getValue()} />,
    }),

    // Actions column
    columnHelper.display({
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <ActionCell
          row={row.original}
          actions={[
            {
              label: 'View Details',
              icon: 'eye',
              onClick: (product) => console.log('View:', product),
            },
            {
              label: 'Edit',
              icon: 'edit',
              onClick: (product) => console.log('Edit:', product),
            },
            {
              label: 'Delete',
              icon: 'trash-2',
              variant: 'destructive',
              separator: true,
              onClick: (product) => console.log('Delete:', product),
            },
          ]}
        />
      ),
      size: 50,
    }),
  ]

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">DataGrid Cell Components</h1>
        <p className="text-muted-foreground">
          Complete showcase of all available cell components with Swiss formatting
        </p>
      </div>

      <DataGridClient columns={columns} data={products} enableSorting={true} enableRowSelection={true}>
        <DataGridClientTable />
      </DataGridClient>
    </div>
  )
}

const meta = {
  component: ProductTableWithReusableCells,
} satisfies Meta<typeof ProductTableWithReusableCells>

export default meta
type Story = StoryObj<typeof meta>

export const AllCellTypes: Story = {}
