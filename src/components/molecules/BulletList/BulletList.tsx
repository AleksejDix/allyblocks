import { cn } from '@/lib/utils'
import { Stack } from '@/components/atoms/Stack'
import type { BulletListProps } from './BulletList.types'

/**
 * BulletList component for displaying feature lists with icons.
 *
 * Minimal composable component that uses Stack with ul element.
 * Accepts BulletListItem components as children for maximum flexibility.
 *
 * @example
 * <BulletList gap="sm">
 *   <BulletListItem icon="check">
 *     Real-time contact syncing
 *   </BulletListItem>
 *   <BulletListItem icon="star">
 *     Premium feature
 *   </BulletListItem>
 * </BulletList>
 */
function BulletList({ gap = 'sm', className, children, ...props }: BulletListProps) {
  return (
    <Stack as="ul" gap={gap} className={cn('list-none', className)} {...props}>
      {children}
    </Stack>
  )
}

export { BulletList }
