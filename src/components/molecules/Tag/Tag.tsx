import { memo } from 'react'
import { Badge } from '@/components/atoms/Badge'
import { Icon } from '@/components/atoms/Icon'
import { IconButton } from '@/components/atoms/IconButton'
import { cn } from '@/lib/utils'
import { tagVariants, tagButtonVariants } from './Tag.variants'
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
  return (
    <Badge color={color} size={size} className={cn(tagVariants({ removing }), className)} role="status" {...props}>
      {/* Tag content */}
      <span className="flex-1 min-w-0">{children}</span>

      {/* Remove button */}
      {removable && (
        <IconButton
          variant="ghost"
          size={size}
          onClick={onRemove}
          aria-label={removeLabel}
          disabled={removing}
          className={tagButtonVariants({ size })}
        >
          <Icon name="x" />
        </IconButton>
      )}
    </Badge>
  )
})
