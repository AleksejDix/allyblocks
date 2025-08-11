import type { ReactNode } from 'react'

export interface FieldDateRangeProps {
  label?: string
  description?: string
  children: ReactNode
  className?: string
}

export function FieldDateRange({ label, description, children, className }: FieldDateRangeProps) {
  return (
    <div className={className}>
      {label && (
        <div className="text-sm font-medium leading-none mb-4">
          {label}
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
      )}
      {children}
    </div>
  )
}

export default FieldDateRange
