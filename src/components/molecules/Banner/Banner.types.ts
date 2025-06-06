import * as React from 'react'

/**
 * Props for the Banner component.
 * A promotional banner that appears at the top of the page for announcements and offers.
 */
export type BannerProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Banner content - use BannerIcon, BannerContent, and BannerActions for composition
   */
  children: React.ReactNode

  /**
   * Additional className for custom styling
   */
  className?: string
}

/**
 * Props for the BannerIcon component
 */
export type BannerIconProps = {
  children: React.ReactNode
  className?: string
}

/**
 * Props for the BannerContent component
 */
export type BannerContentProps = {
  children: React.ReactNode
  className?: string
}

/**
 * Props for the BannerActions component
 */
export type BannerActionsProps = {
  children: React.ReactNode
  className?: string
}
