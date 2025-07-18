export type FormatSwissDateProps = {
  /** Date to format */
  date: Date | string | null | undefined
  /** Show in relative format (heute, gestern, etc.) */
  relative?: boolean
  /** Override locale (uses global i18n locale by default) */
  locale?: 'de-CH' | 'fr-CH' | 'it-CH' | 'en'
}
