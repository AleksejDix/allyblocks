export type Product = {
  id: string
  name: string
  category: 'Electronics' | 'Clothing' | 'Food' | 'Books' | 'Home'
  price: number
  stock: number
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
  rating: number
  reviews: number
  image: string
}

export const products: Product[] = [
  {
    id: 'PRD001',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 79.99,
    stock: 45,
    status: 'in_stock',
    rating: 4.5,
    reviews: 234,
    image: '/api/placeholder/48/48',
  },
  {
    id: 'PRD002',
    name: 'Smart Watch',
    category: 'Electronics',
    price: 299.99,
    stock: 12,
    status: 'low_stock',
    rating: 4.2,
    reviews: 567,
    image: '/api/placeholder/48/48',
  },
  {
    id: 'PRD003',
    name: 'Running Shoes',
    category: 'Clothing',
    price: 129.99,
    stock: 0,
    status: 'out_of_stock',
    rating: 4.8,
    reviews: 123,
    image: '/api/placeholder/48/48',
  },
  {
    id: 'PRD004',
    name: 'Coffee Maker',
    category: 'Home',
    price: 89.99,
    stock: 23,
    status: 'in_stock',
    rating: 4.6,
    reviews: 89,
    image: '/api/placeholder/48/48',
  },
  {
    id: 'PRD005',
    name: 'Programming Book',
    category: 'Books',
    price: 49.99,
    stock: 67,
    status: 'in_stock',
    rating: 4.9,
    reviews: 456,
    image: '/api/placeholder/48/48',
  },
  {
    id: 'PRD006',
    name: 'Organic Honey',
    category: 'Food',
    price: 15.99,
    stock: 8,
    status: 'low_stock',
    rating: 4.7,
    reviews: 234,
    image: '/api/placeholder/48/48',
  },
  {
    id: 'PRD007',
    name: 'Laptop Stand',
    category: 'Electronics',
    price: 39.99,
    stock: 120,
    status: 'in_stock',
    rating: 4.3,
    reviews: 678,
    image: '/api/placeholder/48/48',
  },
  {
    id: 'PRD008',
    name: 'Winter Jacket',
    category: 'Clothing',
    price: 189.99,
    stock: 3,
    status: 'low_stock',
    rating: 4.4,
    reviews: 234,
    image: '/api/placeholder/48/48',
  },
  {
    id: 'PRD009',
    name: 'Cookbook Collection',
    category: 'Books',
    price: 34.99,
    stock: 45,
    status: 'in_stock',
    rating: 4.1,
    reviews: 123,
    image: '/api/placeholder/48/48',
  },
  {
    id: 'PRD010',
    name: 'USB-C Hub',
    category: 'Electronics',
    price: 59.99,
    stock: 0,
    status: 'out_of_stock',
    rating: 4.6,
    reviews: 890,
    image: '/api/placeholder/48/48',
  },
]
