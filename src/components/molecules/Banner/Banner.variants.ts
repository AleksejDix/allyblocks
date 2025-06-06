import { cva } from 'class-variance-authority'

export const bannerVariants = cva([
  'relative',
  'px-4',
  'py-4',
  'w-full',
  'transition-colors',
  'bg-white',
  'border-b',
  'border-gray-200',
])

export const bannerIconVariants = cva(
  'shrink-0 w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center hidden sm:flex',
)

export const bannerContentVariants = cva(['flex-1', 'min-w-0', 'text-left', 'text-gray-900', 'font-medium'])

export const bannerActionsVariants = cva([
  'flex',
  'items-center',
  'gap-3',
  'shrink-0',
  'w-full',
  'justify-start',
  'sm:w-auto',
  'sm:justify-end',
])
