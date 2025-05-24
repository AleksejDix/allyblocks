import { memo, useCallback } from 'react'
import { X } from 'lucide-react'
import { Badge } from '@/components/atoms/Badge'
import { cn } from '@/lib/utils'
import type { TagProps } from './Tag.types'

/**
 * Tag component for removable labels, multi-selection, and document tagging.
 *
 * Features:
 * - Built on top of Badge component (inherits all Badge features)
 * - Removable via X button or keyboard (Delete/Backspace)
 * - Proper accessibility with ARIA labels and keyboard navigation
 * - All Badge color and size variants supported
 * - Optional remove functionality
 * - Exit animation support
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Tag onRemove={() => handleRemove('react')}>
 *   React
 * </Tag>
 *
 * // Multi-selection tags
 * <Tag color="blue" size="sm" onRemove={() => handleRemove('js')}>
 *   JavaScript
 * </Tag>
 *
 * // Document tagging
 * <Tag color="green" onRemove={() => handleRemove('important')}>
 *   #important
 * </Tag>
 *
 * // Non-removable tag
 * <Tag removable={false} onRemove={() => {}}>
 *   Read-only
 * </Tag>
 * ```
 */
export const Tag = memo(function Tag({
  children,
  onRemove,
  removeLabel = 'Remove tag',
  removable = true,
  removing = false,
  className,
  color,
  size,
  ...props
}: TagProps) {
  // Handle keyboard events for tag removal
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!removable || removing) return

      // Allow removal via Delete or Backspace
      if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault()
        onRemove()
      }
    },
    [onRemove, removable, removing],
  )

  // Handle remove button click
  const handleRemoveClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()
      if (!removing) {
        onRemove()
      }
    },
    [onRemove, removing],
  )

  // Edge case: Handle missing children
  if (!children) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Tag: Empty children provided. Tag will not render.')
    }
    return null
  }

  return (
    <Badge
      color={color}
      size={size}
      className={cn(
        // Make tag focusable for keyboard navigation
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        // Add padding for remove button when removable
        removable && 'pr-1',
        // Removing state styles
        removing && 'opacity-50 pointer-events-none',
        className,
      )}
      tabIndex={0}
      role="option"
      aria-selected="true"
      onKeyDown={handleKeyDown}
      {...props}
    >
      {/* Tag content */}
      <span className="flex-1">{children}</span>

      {/* Remove button */}
      {removable && (
        <button
          type="button"
          onClick={handleRemoveClick}
          aria-label={removeLabel}
          disabled={removing}
          className={cn(
            // Button styling
            'ml-1 flex-shrink-0 rounded-sm p-0.5',
            'hover:bg-black/10 dark:hover:bg-white/10',
            'focus:outline-none focus:ring-1 focus:ring-ring',
            'transition-colors',
            // Disabled state
            'disabled:opacity-50 disabled:pointer-events-none',
            // Size-aware icon sizing
            size === 'sm' && '[&>svg]:size-2.5',
            size === 'md' && '[&>svg]:size-3',
            size === 'lg' && '[&>svg]:size-3.5',
          )}
        >
          <X />
        </button>
      )}
    </Badge>
  )
})
