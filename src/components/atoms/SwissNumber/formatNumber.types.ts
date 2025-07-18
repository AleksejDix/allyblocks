export type FormatNumberProps = {
  /** Number to format */
  value: number | null | undefined
  /** Number of decimal places */
  decimals?: number
  /** Override locale (uses global i18n locale by default) */
  locale?: 'de-CH' | 'fr-CH' | 'it-CH' | 'en'
}
