import { cva } from 'class-variance-authority'

export const choiceVariants = cva(['grid', 'gap-2'])

export const choiceItemVariants = cva([
  'relative',
  'flex',
  'w-full',
  'items-start',
  'gap-3',
  'rounded-md',
  'border',
  'border-gray-200',
  'p-4',
  'outline-none',
  'transition-[color,box-shadow]',
  'cursor-pointer',
  // Selected state - black border
  'has-[input:checked]:border-black',
  'has-[input:checked]:bg-gray-50',
  // Hover state
  'hover:bg-gray-50',
  'hover:border-gray-300',
  // Focus state - matching Input component
  'focus-visible:border-ring',
  'focus-visible:ring-ring/50',
  'focus-visible:ring-[3px]',
  'focus-within:border-ring',
  'focus-within:ring-ring/50',
  'focus-within:ring-[3px]',
  // Disabled state
  'has-[input:disabled]:opacity-50',
  'has-[input:disabled]:cursor-not-allowed',
  'has-[input:disabled]:bg-gray-50',
  'has-[input:disabled]:border-gray-200',
  'has-[input:disabled]:hover:bg-gray-50',
  'has-[input:disabled]:hover:border-gray-200',
  'has-[input:disabled]:ring-0',
])

export const choiceIconVariants = cva(['shrink-0', 'flex', 'items-center', 'justify-center'])

export const choiceContentVariants = cva(['flex', 'grow', 'flex-col', 'gap-1'])

export const choiceLabelVariants = cva([
  'text-sm',
  'font-medium',
  'leading-none',
  'cursor-pointer',
  'peer-disabled:cursor-not-allowed',
  'peer-disabled:opacity-70',
])

export const choiceDescriptionVariants = cva(['text-xs', 'text-gray-600', 'leading-relaxed'])

export const choiceRadioVariants = cva(['absolute', 'right-4', 'top-4', 'h-4', 'w-4', 'cursor-pointer', 'peer'])
