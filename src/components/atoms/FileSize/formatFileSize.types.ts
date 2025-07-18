export type FormatFileSizeProps = {
  /**
   * Size in bytes
   */
  bytes: number | null | undefined
  /**
   * Number of decimal places
   * @default 0
   */
  decimals?: number
  /**
   * Locale for number formatting
   * @default 'de-CH'
   */
  locale?: string
}
