import { cn } from '@/lib/utils'
import { Icon } from '@/components/atoms/Icon'
import type { ComponentProps } from 'react'
import type { IconProps } from '@/components/atoms/Icon/Icon.types'

export type BulletListItemProps = ComponentProps<'li'> & {
  /**
   * Icon name to use as bullet
   * @default 'check'
   */
  icon?: IconProps['name']

  /**
   * Whether this item is disabled/muted
   * @default false
   */
  disabled?: boolean

  /**
   * Content of the list item
   */
  children?: React.ReactNode
}

/**
 * BulletListItem component for individual items in a BulletList.
 *
 * Provides proper icon and text alignment with flex layout and gray background box behind icon.
 *
 * @example
 * <BulletListItem icon="check">
 *   Real-time contact syncing
 * </BulletListItem>
 */
function BulletListItem({ icon = 'check', className, children, ...props }: BulletListItemProps) {
  return (
    <li className={cn('flex items-start gap-2', className)} {...props}>
      <div className="flex-shrink-0 mt-1">
        <div className="size-4 bg-black/10 dark:bg-white/10 rounded flex items-center justify-center">
          <Icon name={icon} size={8} />
        </div>
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </li>
  )
}

export { BulletListItem }
