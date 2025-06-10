import { cva } from 'class-variance-authority'

/**
 * ImageComparison component variants
 */
export const imageComparisonVariants = cva([
  // Base styles
  'relative',
  'w-full',
  'h-full',
  'overflow-hidden',
  'select-none',
  'touch-none',
  'group',
  'aspect-video',
  'rounded-lg',
  'border-2',
  'border-gray-200',
  'ring-2',
  'ring-gray-200',
  'ring-offset-2',
  'ring-offset-white',
  'ring-offset-gray-200',
  'ring-offset-white',
])

/**
 * Slider handle variants
 */
export const handleVariants = cva([
  // Base handle styles
  'absolute',
  'top-1/2',
  '-translate-y-1/2',
  'bottom-1/2',
  'z-10',
  'flex',
  'items-center',
  'justify-center',
  'cursor-ew-resize',
  'touch-none',
  'user-select-none',

  // Focus styles
  'focus:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-blue-500',
  'focus-visible:ring-offset-2',

  // Handle style
  'w-10',
  'h-10',
  'bg-white',
  'rounded-full',
  'shadow-lg',
  'border',
  'border-gray-200',
  'hover:bg-gray-50',
  'transition-colors',
])

/**
 * Divider line variants (the vertical line that shows the split)
 */
export const dividerVariants = cva(['absolute', 'top-0', 'bottom-0', 'w-0.5', 'pointer-events-none', 'bg-white'])

/**
 * Label variants for before/after text
 */
export const labelVariants = cva([
  'absolute',
  'top-4',
  'px-3',
  'py-1.5',
  'text-sm',
  'font-medium',
  'rounded-full',
  'shadow-sm',
  'pointer-events-none',
  'select-none',
])
