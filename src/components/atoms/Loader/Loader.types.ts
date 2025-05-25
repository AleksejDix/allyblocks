import * as React from 'react'

export type LoaderProps = React.ComponentProps<'div'> & {
  /**
   * Size of the loader
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Whether the loader should be full screen/overlay
   */
  overlay?: boolean
}
