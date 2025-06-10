import type { ReactNode } from 'react'

/**
 * After component for ImageComparison.
 * Wraps the "after" content in the comparison.
 */
export interface AfterProps {
  /**
   * The content to show as the "after" state
   */
  children: ReactNode
}

/**
 * After component for use within ImageComparison.
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
export const After = ({ children }: AfterProps) => {
  return <>{children}</>
}

After.displayName = 'After'
