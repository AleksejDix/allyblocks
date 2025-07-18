export type FormatSwissTimeProps = {
  /** Time to format */
  time: Date | string | null | undefined
  /** Show seconds */
  showSeconds?: boolean
  /** Override locale (uses global i18n locale by default) */
  locale?: 'de-CH' | 'fr-CH' | 'it-CH' | 'en'
}
