import * as React from 'react'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/atoms/Icon'
import { loaderVariants, loaderIconVariants } from './Loader.variants'
import type { LoaderProps } from './Loader.types'

export const Loader = ({
  className,
  size,
  overlay,
  ref,
  ...props
}: LoaderProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <div ref={ref} className={cn(loaderVariants({ overlay }), className)} role="status" aria-label="Loading" {...props}>
      <Icon name="loader-2" className={cn(loaderIconVariants({ size }))} />
      {props.children}
    </div>
  )
}

Loader.displayName = 'Loader'
