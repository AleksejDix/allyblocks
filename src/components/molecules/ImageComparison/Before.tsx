import type { ReactNode } from 'react'

/**
 * Before component for ImageComparison.
 * Wraps the "before" content in the comparison.
 */
export interface BeforeProps {
  /**
   * The content to show as the "before" state
   */
  children: ReactNode
}

/**
 * Before component for use within ImageComparison.
 *
 * @example
 * ```tsx
 * <ImageComparison>
 *   <Before>
 *     <img src="/old-design.jpg" alt="Old design" />
 *   </Before>
 *   <After>
 *     <img src="/new-design.jpg" alt="New design" />
 *   </After>
 * </ImageComparison>
 * ```
 */
export const Before = ({ children }: BeforeProps) => {
  return <>{children}</>
}

Before.displayName = 'Before'
