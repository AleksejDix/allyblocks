import type { ComponentProps } from 'react'

export type FeedbackProps = ComponentProps<'div'> & {
  /**
   * Content to display inside the feedback component
   */
  children?: React.ReactNode
}
