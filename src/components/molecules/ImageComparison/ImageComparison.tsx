import React, { forwardRef, useState, useRef, useCallback, useEffect, Children } from 'react'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/atoms/Icon'
import { imageComparisonVariants, handleVariants, dividerVariants, labelVariants } from './ImageComparison.variants'
import type { ImageComparisonProps, ImageComparisonRef } from './ImageComparison.types'

/**
 * Before component - wrapper for before content
 */
export const Before = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn('h-full w-full', className)}>{children}</div>
}

/**
 * After component - wrapper for after content
 */
export const After = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn('h-full w-full', className)}>{children}</div>
}

Before.displayName = 'Before'
After.displayName = 'After'

/**
 * ImageComparison component for before/after comparisons.
 * Always takes full width and height of its container.
 *
 * @example
 * ```tsx
 * <div className="h-96">
 *   <ImageComparison defaultValue={0.5} onValueChange={(value) => console.log(value)}>
 *     <Before>
 *       <img src="/before.jpg" alt="Before optimization" />
 *     </Before>
 *     <After>
 *       <img src="/after.jpg" alt="After optimization" />
 *     </After>
 *   </ImageComparison>
 * </div>
 * ```
 */
export const ImageComparison = forwardRef<ImageComparisonRef, ImageComparisonProps>(
  (
    {
      children,
      value,
      defaultValue = 0.5,
      onValueChange,
      showLabels = false,
      beforeLabel = 'Before',
      afterLabel = 'After',
      className,
      ...props
    },
    ref,
  ) => {
    // Determine if component is controlled
    const isControlled = value !== undefined
    const [internalPosition, setInternalPosition] = useState(defaultValue)
    const containerRef = useRef<HTMLDivElement>(null)
    const rafRef = useRef<number | null>(null)

    // Get current position (controlled or uncontrolled) - stable from first render
    const position = isControlled ? (value ?? defaultValue) : internalPosition

    // Memoize CSS variables to prevent recalculation and layout shifts
    const cssVariables = React.useMemo(
      () =>
        ({
          '--position': `${position * 100}%`,
          '--slider-offset': `${(position - 0.5) * 100}%`,
          willChange: 'transform',
          contain: 'layout style paint',
        }) as React.CSSProperties,
      [position],
    )

    // Watch for defaultValue changes when uncontrolled
    useEffect(() => {
      if (!isControlled && defaultValue !== undefined) {
        setInternalPosition(defaultValue)
      }
    }, [defaultValue, isControlled])

    // Find Before and After components
    const childrenArray = Children.toArray(children)
    const beforeElement = childrenArray.find((child) => React.isValidElement(child) && child.type === Before)
    const afterElement = childrenArray.find((child) => React.isValidElement(child) && child.type === After)

    if (!beforeElement || !afterElement) {
      throw new Error('ImageComparison requires both <Before> and <After> components')
    }

    const updatePosition = useCallback(
      (clientX: number) => {
        if (!containerRef.current) return

        // Cancel previous RAF if still pending
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
        }

        // Use RAF for smooth 120fps updates
        rafRef.current = requestAnimationFrame(() => {
          if (!containerRef.current) return

          const rect = containerRef.current.getBoundingClientRect()
          const x = clientX - rect.left
          const newPosition = Math.max(0, Math.min(1, x / rect.width))

          // Update state and call onChange
          if (isControlled) {
            onValueChange?.(newPosition)
          } else {
            setInternalPosition(newPosition)
            onValueChange?.(newPosition)
          }
        })
      },
      [isControlled, onValueChange],
    )

    const handleMouseDown = useCallback(
      (e: React.MouseEvent) => {
        updatePosition(e.clientX)
      },
      [updatePosition],
    )

    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        e.preventDefault()
        updatePosition(e.clientX)
      },
      [updatePosition],
    )

    const handleTouchStart = useCallback(
      (e: React.TouchEvent) => {
        updatePosition(e.touches[0].clientX)
      },
      [updatePosition],
    )

    const handleTouchMove = useCallback(
      (e: TouchEvent) => {
        e.preventDefault()
        updatePosition(e.touches[0].clientX)
      },
      [updatePosition],
    )

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        let newPosition = position

        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault()
            newPosition = Math.max(0, position - (e.shiftKey ? 0.1 : 0.05))
            break
          case 'ArrowRight':
            e.preventDefault()
            newPosition = Math.min(1, position + (e.shiftKey ? 0.1 : 0.05))
            break
          case 'Home':
            e.preventDefault()
            newPosition = 0
            break
          case 'End':
            e.preventDefault()
            newPosition = 1
            break
          case ' ':
          case 'Enter':
            e.preventDefault()
            newPosition = 0.5
            break
          default:
            return
        }

        if (isControlled) {
          onValueChange?.(newPosition)
        } else {
          setInternalPosition(newPosition)
          onValueChange?.(newPosition)
        }
      },
      [position, isControlled, onValueChange],
    )

    // Attach global mouse/touch events when dragging
    const [isDragging, setIsDragging] = useState(false)

    const startDragging = useCallback(() => {
      setIsDragging(true)
    }, [])

    const stopDragging = useCallback(() => {
      setIsDragging(false)
    }, [])

    useEffect(() => {
      if (!isDragging) return

      const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e)
      const handleGlobalMouseUp = () => stopDragging()
      const handleGlobalTouchMove = (e: TouchEvent) => handleTouchMove(e)
      const handleGlobalTouchEnd = () => stopDragging()

      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false })
      document.addEventListener('touchend', handleGlobalTouchEnd)

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove)
        document.removeEventListener('mouseup', handleGlobalMouseUp)
        document.removeEventListener('touchmove', handleGlobalTouchMove)
        document.removeEventListener('touchend', handleGlobalTouchEnd)
      }
    }, [isDragging, handleMouseMove, stopDragging, handleTouchMove])

    // Cleanup RAF on unmount
    useEffect(() => {
      return () => {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
        }
      }
    }, [])

    // Convert position to percentage for display
    const positionPercent = Math.round(position * 100)

    return (
      <div ref={ref} className={cn(imageComparisonVariants(), className)} {...props}>
        <div
          ref={containerRef}
          className="relative h-full w-full grid grid-cols-1 grid-rows-1"
          data-position={position}
          style={cssVariables}
        >
          {/* Before Content - spans full area */}
          <div className="col-start-1 col-end-1 row-start-1 row-end-1">{beforeElement}</div>

          {/* After Content - spans full area, clipped */}
          <div
            className="col-start-1 col-end-1 row-start-1 row-end-1 [clip-path:polygon(var(--position)_0%,100%_0%,100%_100%,var(--position)_100%)]"
            style={{
              willChange: 'clip-path',
              transform: 'translate3d(0,0,0)', // Force GPU layer
            }}
          >
            {afterElement}
          </div>

          {/* Slider Overlay - spans full area, contains centered line and handle */}
          <div
            className="col-start-1 col-end-1 row-start-1 row-end-1 flex items-center justify-center pointer-events-none"
            style={{
              willChange: 'transform',
              transform: 'translate3d(var(--slider-offset), 0, 0)', // Force GPU layer with 3D transform
            }}
          >
            {/* Divider Line - centered in container */}
            <div className={cn(dividerVariants())} />

            {/* Handle - centered in container */}
            <button
              className={cn(handleVariants(), 'pointer-events-auto')}
              onMouseDown={(e) => {
                startDragging()
                handleMouseDown(e)
              }}
              onTouchStart={(e) => {
                startDragging()
                handleTouchStart(e)
              }}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              aria-label={`Comparison slider at ${positionPercent}%`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={positionPercent}
              role="slider"
            >
              <Icon name="grip-vertical" className="h-4 w-4 text-gray-600" />
            </button>
          </div>

          {/* Labels */}
          {showLabels && (
            <>
              <div className={cn(labelVariants(), 'left-4 bg-gray-900/80 text-white')}>{beforeLabel}</div>
              <div className={cn(labelVariants(), 'right-4 bg-white/90 text-gray-900 border border-gray-200')}>
                {afterLabel}
              </div>
            </>
          )}
        </div>
      </div>
    )
  },
)

ImageComparison.displayName = 'ImageComparison'
