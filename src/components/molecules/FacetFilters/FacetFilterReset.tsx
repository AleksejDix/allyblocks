import React from 'react'
import { Button } from '@/components/atoms/Button'

type FacetFilterResetProps = {
  children?: React.ReactNode
  className?: string
  onReset?: () => void
  useFacetFilters: () => {
    // oxlint-disable-next-line no-explicit-any
    queryStates: [any, (value: any) => void]
    // oxlint-disable-next-line no-explicit-any
    defaultValues: Partial<any>
  }
}

export function FacetFilterReset({ children = 'Reset', className, onReset, useFacetFilters }: FacetFilterResetProps) {
  const { queryStates, defaultValues } = useFacetFilters()
  const [, setUrlValues] = queryStates
  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (onReset) {
      onReset()
    } else {
      setUrlValues(defaultValues || {})
    }
  }

  return (
    <Button type="button" variant="outline" onClick={handleReset} className={className}>
      {children}
    </Button>
  )
}
