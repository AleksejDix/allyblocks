export type FormatSwissFrancProps = {
  /** Amount in Swiss Francs */
  amount: number | null | undefined
  /** Number of decimal places (default: 2) */
  decimals?: number
  /** Override locale (uses global i18n locale by default) */
  locale?: 'de-CH' | 'fr-CH' | 'it-CH' | 'en'
}
