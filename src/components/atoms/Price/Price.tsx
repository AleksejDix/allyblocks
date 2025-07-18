import { memo } from 'react'
import { cn } from '@/lib/utils'
import { Text } from '@/components/atoms/Text'
import { priceVariants } from './Price.variants'
import type { PriceProps } from './Price.types'

/**
 * Price component for displaying currency amounts with proper internationalization.
 *
 * Features:
 * - Proper currency formatting using Intl.NumberFormat
 * - Multiple locale and currency support (ISO 4217)
 * - Period display (/year, /month, etc.)
 * - Strikethrough discounts with original price
 * - Vertical and horizontal layouts
 * - Red discount color treatment
 * - Multiple size variants
 * - Theme support for light/dark backgrounds
 * - Automatic thousands separators and currency positioning
 *
 * @example
 * ```tsx
 * // Basic price with CHF
 * <Price amount={299} currency="CHF" period="/year" />
 *
 * // Vertical discount layout with red price
 * <Price
 *   amount={199}
 *   originalAmount={299}
 *   discounted
 *   layout="vertical"
 *   discountColor="red"
 *   period="/year"
 * />
 *
 * // European formatting
 * <Price amount={249} currency="EUR" locale="de-DE" period="/year" />
 * ```
 */
export const Price = memo(function Price({
  amount,
  currency = 'CHF',
  locale = 'de-CH',
  period,
  originalAmount,
  discounted = false,
  formatOptions,
  showCurrency = true,
  layout = 'horizontal',
  discountColor = 'default',
  size,
  theme,
  className,
  ...props
}: PriceProps) {
  const defaultFormatOptions: Intl.NumberFormatOptions = {
    style: showCurrency ? 'currency' : 'decimal',
    currency: showCurrency ? currency : undefined,
    currencyDisplay: 'symbol',
    ...formatOptions,
  }

  const formatPrice = (value: string | number): string => {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value

    if (isNaN(numericValue)) {
      console.warn(`Price: Invalid amount "${value}" provided`)
      return '0'
    }

    try {
      const formatter = new Intl.NumberFormat(locale, defaultFormatOptions)
      return formatter.format(numericValue)
    } catch (error) {
      console.warn(`Price: Error formatting currency. Falling back to simple format.`, error)
      return showCurrency ? `${currency} ${numericValue}` : String(numericValue)
    }
  }

  const currentPrice = formatPrice(amount)
  const originalPrice = originalAmount ? formatPrice(originalAmount) : undefined

  // Determine if we should apply red color (only when discounted and explicitly requested)
  const shouldUseRedColor = discounted && discountColor === 'red'

  if (layout === 'vertical' && discounted && originalPrice) {
    return (
      <div className={cn('flex flex-col items-start gap-0', className)} {...props}>
        {/* Original price (strikethrough) - above in vertical layout */}
        <Text
          type="heading"
          size={size === '4xl' ? 'lg' : size === '3xl' ? 'md' : 'sm'}
          tone="muted"
          decoration="strikethrough"
          className={cn(theme === 'inverted' ? 'text-gray-400' : 'text-gray-500')}
        >
          {originalPrice}
        </Text>

        {/* Main price + period on same line */}
        <div
          className={cn(
            priceVariants({ size, theme, layout: 'horizontal', discountColor: shouldUseRedColor ? 'red' : 'default' }),
          )}
        >
          <Text type="heading" size={size} className={theme === 'inverted' ? 'text-white' : undefined}>
            {currentPrice}
          </Text>

          {period && (
            <Text
              as="span"
              size={size === '4xl' ? 'lg' : size === '3xl' ? 'md' : 'sm'}
              tone="muted"
              className={theme === 'inverted' ? 'text-gray-400' : undefined}
            >
              {period}
            </Text>
          )}
        </div>
      </div>
    )
  }

  // Horizontal layout or no discount
  return (
    <div
      className={cn(
        priceVariants({ size, theme, layout: 'horizontal', discountColor: shouldUseRedColor ? 'red' : 'default' }),
        className,
      )}
      {...props}
    >
      {/* Original price (strikethrough) - inline in horizontal layout */}
      {discounted && originalPrice && (
        <Text
          type="heading"
          size={size === '4xl' ? 'lg' : size === '3xl' ? 'md' : 'sm'}
          tone="muted"
          decoration="strikethrough"
          className={theme === 'inverted' ? 'text-gray-400' : 'text-gray-500'}
        >
          {originalPrice}
        </Text>
      )}

      {/* Main price */}
      <Text type="heading" size={size} className={theme === 'inverted' ? 'text-white' : undefined}>
        {currentPrice}
      </Text>

      {/* Period */}
      {period && (
        <Text
          as="span"
          size={size === '4xl' ? 'lg' : size === '3xl' ? 'md' : 'sm'}
          tone="muted"
          className={theme === 'inverted' ? 'text-gray-400' : undefined}
        >
          {period}
        </Text>
      )}
    </div>
  )
})
