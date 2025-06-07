import { cn } from '@/lib/utils'
import { Box } from '@/components/atoms/Box'
import type { PriceCardProps } from './PriceCard.types'

/**
 * PriceCard component for displaying pricing plans as accessible options.
 *
 * Minimal composable component that uses Box for styling and accepts children
 * for flexible content composition. Uses aria-selected for recommended plans.
 *
 * @example
 * <ul role="listbox" aria-label="Pricing plans">
 *   <PriceCard role="option" aria-selected="true">
 *     <Text as="h3" type="heading" size="lg">Pro</Text>
 *     <Text size="4xl" weight={700}>$69</Text>
 *     <Text tone="muted" size="sm">Per user/month, billed annually</Text>
 *     <Text size="sm" weight={500}>For scaling businesses</Text>
 *     <BulletList gap="sm">
 *       <BulletListItem icon="check">
 *         <Text size="sm">Feature 1</Text>
 *       </BulletListItem>
 *     </BulletList>
 *     <Button className="w-full">Continue with Pro</Button>
 *   </PriceCard>
 * </ul>
 */
function PriceCard({ className, children, ...props }: PriceCardProps) {
  const isSelected = props['aria-selected'] === 'true' || props['aria-selected'] === true

  return (
    <Box
      as="li"
      className={cn(
        'p-6 rounded-lg border space-y-4',
        isSelected ? 'border-gray-900 bg-gray-900 text-white ring-2 ring-gray-900/20' : 'border-gray-200 bg-white',
        className,
      )}
      {...props}
    >
      {children}
    </Box>
  )
}

export { PriceCard }
