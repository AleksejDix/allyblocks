import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  progressBarVariants,
  progressBarFillVariants,
  progressBarLabelVariants,
  progressBarValueVariants,
} from './ProgressBar.variants'
import type { ProgressBarProps } from './ProgressBar.types'

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, variant, size, value, max = 100, label, showValue = false, indeterminate = false, ...props }, ref) => {
    // Ensure value is within bounds
    const clampedValue = React.useMemo(() => {
      if (indeterminate) return 0
      return Math.min(Math.max(value, 0), max)
    }, [value, max, indeterminate])

    // Calculate percentage
    const percentage = React.useMemo(() => {
      if (indeterminate) return 0
      return (clampedValue / max) * 100
    }, [clampedValue, max, indeterminate])

    return (
      <div className="w-full">
        {(label || showValue) && (
          <div className={cn(progressBarLabelVariants())}>
            {label && <span id={props.id ? `${props.id}-label` : undefined}>{label}</span>}
            {showValue && !indeterminate && (
              <span className={cn(progressBarValueVariants())}>{Math.round(percentage)}%</span>
            )}
          </div>
        )}
        <div
          data-slot="progress-bar"
          ref={ref}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={indeterminate ? undefined : clampedValue}
          aria-labelledby={label && props.id ? `${props.id}-label` : undefined}
          aria-label={!label ? 'Progress' : undefined}
          className={cn(progressBarVariants({ variant, size }), className)}
          {...props}
        >
          <div
            data-slot="progress-bar-fill"
            data-indeterminate={indeterminate}
            className={cn(progressBarFillVariants({ variant }))}
            style={{
              width: indeterminate ? undefined : `${percentage}%`,
            }}
          />
        </div>
      </div>
    )
  },
)

ProgressBar.displayName = 'ProgressBar'
