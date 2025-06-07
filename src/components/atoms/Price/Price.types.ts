import type { ComponentProps } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { priceVariants } from './Price.variants'

export type PriceProps = ComponentProps<'div'> &
  VariantProps<typeof priceVariants> & {
    /**
     * The price amount (number or string)
     */
    amount: string | number

    /**
     * Currency code (ISO 4217) for proper internationalization
     * @default "USD"
     */
    currency?: string

    /**
     * Locale for number formatting
     * @default "en-US"
     */
    locale?: string

    /**
     * Period text (e.g., "/year", "/month", "per user")
     * @default undefined
     */
    period?: string

    /**
     * Original price for strikethrough discount display
     * @default undefined
     */
    originalAmount?: string | number

    /**
     * Whether this is a discounted price
     * @default false
     */
    discounted?: boolean

    /**
     * Custom Intl.NumberFormat options
     * @default { style: 'currency', currencyDisplay: 'symbol' }
     */
    formatOptions?: Intl.NumberFormatOptions

    /**
     * Whether to show the currency symbol
     * @default true
     */
    showCurrency?: boolean

    /**
     * Layout direction for discount display
     * @default "horizontal"
     */
    layout?: 'horizontal' | 'vertical'

    /**
     * Color treatment for discounted prices
     * @default "default"
     */
    discountColor?: 'default' | 'red'
  }
