import React from 'react'
import { cn } from '@/lib/utils'
import { containerVariants } from './Container.variants'
import type { ContainerProps, ContainerRef } from './Container.types'

/**
 * Container component that provides responsive max-widths and centering.
 * Uses Tailwind's container utility with additional customization options.
 *
 * @example
 * ```tsx
 * <Container>
 *   <h1>Page Content</h1>
 * </Container>
 *
 * <Container size="lg" padding="xl">
 *   <div>Custom sized container</div>
 * </Container>
 *
 * <Container as="section" centered={false}>
 *   <div>Non-centered container</div>
 * </Container>
 * ```
 */
export const Container = (
  { className, as: Component = 'div', size, padding = 'md', centered = true, children, ...props }: ContainerProps,
  ref?: React.Ref<ContainerRef>,
) => {
  return (
    <Component ref={ref} className={cn(containerVariants({ size, padding, centered }), className)} {...props}>
      {children}
    </Component>
  )
}

Container.displayName = 'Container'
