import { createColumnHelper } from '@tanstack/react-table'
import { DataGridClient, DataGridClientTable, DataGridClientColumnVisibility, useDataGridClient } from './'
import { type Product, products } from './data/products'
import { Text } from '@/components/atoms/Text'
import { useState, useMemo } from 'react'
import { Icon } from '@/components/atoms/Icon'
import { Card, CardBody, CardFooter, CardHeader } from '@/components/molecules/Card/Card'
import { ActionGroup } from '@/components/molecules/ActionGroup'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Badge } from '@/components/atoms/Badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/molecules/DropdownMenu'
import { RadixSelect, RadixSelectContent, RadixSelectItem, RadixSelectTrigger, RadixSelectValue } from '@/components/atoms/RadixSelect'
import { Tabs, TabsList, TabsTrigger } from '@/components/molecules/Tabs'
import { Empty } from '@/components/molecules/Empty'
import { Stack } from '@/components/atoms/Stack'
import { Checkbox } from '@/components/atoms/Checkbox'
import { SwissFranc } from '@/components/atoms/SwissFranc'
import { useLocale } from '@/hooks/useLocale'

const columnHelper = createColumnHelper<Product>()

// Stock status component
const StockStatus = ({ status, stock }: { status: Product['status']; stock: number }) => {
  const config = {
    in_stock: { color: 'green' as const, icon: 'package' as const, label: `${stock} in stock` },
    low_stock: { color: 'yellow' as const, icon: 'alert-circle' as const, label: `Only ${stock} left` },
    out_of_stock: { color: 'red' as const, icon: 'alert-circle' as const, label: 'Out of stock' },
  }

  const { color, icon, label } = config[status]

  return (
    <Badge color={color} className="gap-1">
      <Icon name={icon} className="h-3 w-3" />
      {label}
    </Badge>
  )
}

// Rating component
const ProductRating = ({ rating, reviews }: { rating: number; reviews: number }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <Icon name="star" className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
      </div>
      <span className="text-sm text-muted-foreground">({reviews})</span>
    </div>
  )
}

// Product actions
const ProductActions = ({ product: _product }: { product: Product }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Icon name="more-horizontal" className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Icon name="eye" className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="edit" className="mr-2 h-4 w-4" />
          Edit Product
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="copy" className="mr-2 h-4 w-4" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">
          <Icon name="archive" className="mr-2 h-4 w-4" />
          Archive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Price cell component
const PriceCell = ({ value }: { value: number }) => {
  const locale = useLocale()
  return <SwissFranc amount={value} locale={locale} className="text-sm font-medium" />
}

// Create product columns
const productColumns = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(checked) => table.toggleAllPageRowsSelected(!!checked)}
        aria-label="Select all products"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(checked) => row.toggleSelected(!!checked)}
        aria-label={`Select ${row.original.name}`}
      />
    ),
    size: 40,
    enableHiding: false, // Selection column should always be visible
    meta: {
      label: 'Select', // Label for column visibility dropdown
    },
  }),
  columnHelper.accessor('name', {
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 font-medium"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Product
        {column.getIsSorted() === 'asc' ? (
          <Icon name="chevron-up" className="h-4 w-4" />
        ) : column.getIsSorted() === 'desc' ? (
          <Icon name="chevron-down" className="h-4 w-4" />
        ) : (
          <Icon name="chevrons-up-down" className="h-4 w-4 opacity-50" />
        )}
      </button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <img src={row.original.image} alt={row.getValue('name')} className="h-10 w-10 rounded-md object-cover" />
        <div>
          <div className="font-medium">{row.getValue('name')}</div>
          <div className="text-sm text-muted-foreground">{row.original.id}</div>
        </div>
      </div>
    ),
    size: 300,
    enableHiding: false, // Product name is essential and should not be hidden
    meta: {
      label: 'Product Name', // Better label than just "name"
      align: 'left',
    },
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    cell: ({ row }) => <Badge color="gray">{row.getValue('category')}</Badge>,
    meta: {
      label: 'Product Category',
      align: 'left',
    },
  }),
  columnHelper.accessor('price', {
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 font-medium"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Price
        {column.getIsSorted() === 'asc' ? (
          <Icon name="chevron-up" className="h-4 w-4" />
        ) : column.getIsSorted() === 'desc' ? (
          <Icon name="chevron-down" className="h-4 w-4" />
        ) : (
          <Icon name="chevrons-up-down" className="h-4 w-4 opacity-50" />
        )}
      </button>
    ),
    cell: ({ row }) => <PriceCell value={row.getValue('price')} />,
    meta: {
      label: 'Price (CHF)',
      align: 'right',
    },
  }),
  columnHelper.accessor('stock', {
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 font-medium"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Stock
        {column.getIsSorted() === 'asc' ? (
          <Icon name="chevron-up" className="h-4 w-4" />
        ) : column.getIsSorted() === 'desc' ? (
          <Icon name="chevron-down" className="h-4 w-4" />
        ) : (
          <Icon name="chevrons-up-down" className="h-4 w-4 opacity-50" />
        )}
      </button>
    ),
    cell: ({ row }) => <StockStatus status={row.original.status} stock={row.getValue('stock')} />,
    meta: {
      label: 'Stock Status',
      align: 'center',
    },
  }),
  columnHelper.accessor('rating', {
    header: 'Rating',
    cell: ({ row }) => <ProductRating rating={row.getValue('rating')} reviews={row.original.reviews} />,
    meta: {
      label: 'Customer Rating',
      align: 'left',
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: '',
    cell: ({ row }) => <ProductActions product={row.original} />,
    size: 50,
    enableHiding: false, // Actions should always be accessible
    meta: {
      label: 'Actions',
      align: 'right',
    },
  }),
]

// Inventory summary cards
const InventorySummary = () => {
  const { tableInstance } = useDataGridClient<Product>()
  const data = tableInstance?.options.data || []
  const locale = useLocale()

  const stats = useMemo(() => {
    const totalValue = data.reduce((sum, p) => sum + p.price * p.stock, 0)
    const outOfStock = data.filter((p) => p.status === 'out_of_stock').length
    const lowStock = data.filter((p) => p.status === 'low_stock').length

    return { totalValue, outOfStock, lowStock }
  }, [data])

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Text type="body" size="sm" className="text-muted-foreground">
            Total Inventory Value
          </Text>
          <Icon name="trending-up" className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardBody>
          <SwissFranc amount={stats.totalValue} locale={locale} className="text-2xl font-bold" />
          <p className="text-xs text-muted-foreground">+12.5% from last month</p>
        </CardBody>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Text type="body" size="sm" className="text-muted-foreground">
            Low Stock Items
          </Text>
          <Icon name="alert-circle" className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardBody>
          <div className="text-2xl font-bold">{stats.lowStock}</div>
          <p className="text-xs text-muted-foreground">Requires attention</p>
        </CardBody>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Text type="body" size="sm" className="text-muted-foreground">
            Out of Stock
          </Text>
          <Icon name="package" className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardBody>
          <div className="text-2xl font-bold">{stats.outOfStock}</div>
          <p className="text-xs text-muted-foreground">Lost sales opportunity</p>
        </CardBody>
      </Card>
    </div>
  )
}

// Bulk actions for products
const ProductBulkActions = () => {
  const { tableInstance } = useDataGridClient<Product>()
  const selectedRows = tableInstance?.getSelectedRowModel().rows || []

  if (selectedRows.length === 0) return null

  return (
    <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
      <Text size="sm" className="text-muted-foreground">
        {selectedRows.length} products selected
      </Text>
      <Button size="sm" variant="outline">
        Update Prices
      </Button>
      <Button size="sm" variant="outline">
        Update Stock
      </Button>
      <Button size="sm" variant="outline">
        Export Selected
      </Button>
      <Button size="sm" variant="destructive">
        Archive
      </Button>
    </div>
  )
}

// Product inventory management story
export const ProductInventoryManagement = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [stockFilter, setStockFilter] = useState<string>('all')
  const [activeTab, setActiveTab] = useState('all')

  // Filter data
  const filteredData = useMemo(() => {
    let filtered = [...products]

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.id.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((product) => product.category === categoryFilter)
    }

    if (stockFilter !== 'all') {
      filtered = filtered.filter((product) => product.status === stockFilter)
    }

    // Tab filtering
    if (activeTab === 'low-stock') {
      filtered = filtered.filter((p) => p.status === 'low_stock')
    } else if (activeTab === 'out-of-stock') {
      filtered = filtered.filter((p) => p.status === 'out_of_stock')
    }

    return filtered
  }, [searchQuery, categoryFilter, stockFilter, activeTab])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground mt-1">Track and manage your product inventory</p>
        </div>
        <ActionGroup>
          <Button variant="outline">
            <Icon name="upload" className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button>
            <Icon name="package" className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </ActionGroup>
      </div>

      <DataGridClient
        columns={productColumns}
        data={filteredData}
        enableSorting={true}
        enableRowSelection={true}
        enablePagination={true}
        pageSize={10}
      >
        <InventorySummary />

        <Card>
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">All Products</TabsTrigger>
                  <TabsTrigger value="low-stock">
                    Low Stock
                    <Badge color="yellow" className="ml-2">
                      {products.filter((p) => p.status === 'low_stock').length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="out-of-stock">
                    Out of Stock
                    <Badge color="red" className="ml-2">
                      {products.filter((p) => p.status === 'out_of_stock').length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>
                <ActionGroup>
                  <Button variant="outline">
                    <Icon name="bar-chart-3" />
                    Analytics
                  </Button>
                  <Button variant="outline">
                    <Icon name="download" />
                    Export
                  </Button>
                  <DataGridClientColumnVisibility label="Columns" />
                </ActionGroup>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
                <RadixSelect value={categoryFilter} onValueChange={setCategoryFilter}>
                  <RadixSelectTrigger className="w-[150px]">
                    <Icon name="filter" className="mr-2 h-4 w-4" />
                    <RadixSelectValue />
                  </RadixSelectTrigger>
                  <RadixSelectContent>
                    <RadixSelectItem value="all">All Categories</RadixSelectItem>
                    <RadixSelectItem value="Electronics">Electronics</RadixSelectItem>
                    <RadixSelectItem value="Clothing">Clothing</RadixSelectItem>
                    <RadixSelectItem value="Food">Food</RadixSelectItem>
                    <RadixSelectItem value="Books">Books</RadixSelectItem>
                    <RadixSelectItem value="Home">Home</RadixSelectItem>
                  </RadixSelectContent>
                </RadixSelect>
                <RadixSelect value={stockFilter} onValueChange={setStockFilter}>
                  <RadixSelectTrigger className="w-[150px]">
                    <RadixSelectValue />
                  </RadixSelectTrigger>
                  <RadixSelectContent>
                    <RadixSelectItem value="all">All Stock</RadixSelectItem>
                    <RadixSelectItem value="in_stock">In Stock</RadixSelectItem>
                    <RadixSelectItem value="low_stock">Low Stock</RadixSelectItem>
                    <RadixSelectItem value="out_of_stock">Out of Stock</RadixSelectItem>
                  </RadixSelectContent>
                </RadixSelect>
              </div>
            </Tabs>
          </CardHeader>
          <CardBody className="p-0">
            <ProductBulkActions />
            {filteredData.length === 0 ? (
              <Empty className="py-12">
                <Icon name="package" className="h-12 w-12 text-muted-foreground" />
                <Stack gap="xs" align="center">
                  <Text type="heading" size="lg" align="center">
                    No products found
                  </Text>
                  <Text tone="muted" align="center">
                    Try adjusting your search or filters to find what you're looking for.
                  </Text>
                </Stack>
              </Empty>
            ) : (
              <DataGridClientTable />
            )}
          </CardBody>
          <CardFooter className="flex items-center justify-between">
            <Text type="body" size="sm" className="text-muted-foreground">
              {filteredData.length} products
            </Text>
            <Text type="body" size="sm" className="text-muted-foreground">
              Last updated: 5 minutes ago
            </Text>
          </CardFooter>
        </Card>
      </DataGridClient>
    </div>
  )
}

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: ProductInventoryManagement,
} satisfies Meta<typeof ProductInventoryManagement>

export default meta
type Story = StoryObj<typeof meta>

export const InventoryManagement: Story = {
  render: () => <ProductInventoryManagement />,
}
