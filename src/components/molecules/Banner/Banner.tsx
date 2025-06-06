import { cn } from '@/lib/utils'
import { bannerVariants, bannerIconVariants, bannerContentVariants, bannerActionsVariants } from './Banner.variants'
import type { BannerProps, BannerIconProps, BannerContentProps, BannerActionsProps } from './Banner.types'

/**
 * Banner component for promotional messages that appear at the top of the page.
 *
 * Features:
 * - Yellow background design for promotions
 * - Composable with BannerIcon, BannerContent, and BannerActions
 * - Responsive design (stacked on mobile, horizontal on desktop)
 * - Accessibility-first
 *
 * @example
 * ```tsx
 * <Banner>
 *   <BannerIcon>
 *     <Icon name="tag" />
 *   </BannerIcon>
 *   <BannerContent>
 *     <Text>Black Friday Sale! Up to 50% off everything!</Text>
 *   </BannerContent>
 *   <BannerActions>
 *     <Button size="sm">Shop Now</Button>
 *     <Button variant="secondary" size="sm">Dismiss</Button>
 *   </BannerActions>
 * </Banner>
 * ```
 */
function Banner({ className, children, ...props }: BannerProps) {
  return (
    <div className={cn(bannerVariants(), className)} role="banner" {...props}>
      <div className="max-w-7xl mx-auto w-full flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
        {children}
      </div>
    </div>
  )
}

/**
 * BannerIcon - Icon container for banners
 */
function BannerIcon({ children, className }: BannerIconProps) {
  return <div className={cn(bannerIconVariants(), className)}>{children}</div>
}

/**
 * BannerContent - Main content area for banners
 */
function BannerContent({ children, className }: BannerContentProps) {
  return <div className={cn(bannerContentVariants(), className)}>{children}</div>
}

/**
 * BannerActions - Actions container for banners
 */
function BannerActions({ children, className }: BannerActionsProps) {
  return <div className={cn(bannerActionsVariants(), className)}>{children}</div>
}

// Set display names for better debugging
Banner.displayName = 'Banner'
BannerIcon.displayName = 'BannerIcon'
BannerContent.displayName = 'BannerContent'
BannerActions.displayName = 'BannerActions'

export { Banner, BannerIcon, BannerContent, BannerActions }
