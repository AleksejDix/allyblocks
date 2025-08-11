import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Segments } from '@/components/molecules/Segments'
import { DatePresetsContext } from './DatePresets.context'
import type { DatePresetsProps } from './DatePresets.types'

export function DatePresets({ 
  fromFieldName, 
  toFieldName,
  size = 'sm',
  className,
  onPresetChange,
  children
}: DatePresetsProps) {
  const form = useFormContext()
  const [selectedValue, setSelectedValue] = useState<string>('')

  const handlePresetSelect = (value: string, fromDate: string, toDate: string) => {
    if (!form || !fromFieldName || !toFieldName) return
    
    form.setValue(fromFieldName, fromDate)
    form.setValue(toFieldName, toDate)
    
    if (onPresetChange) {
      onPresetChange(value, fromDate, toDate)
    }
  }

  if (!form) {
    console.warn('DatePresets must be used within a FormProvider')
    return null
  }

  const notifyMatch = (value: string) => {
    setSelectedValue(value)
  }

  const contextValue = {
    fromFieldName,
    toFieldName,
    selectedValue,
    onPresetSelect: handlePresetSelect,
    form,
    notifyMatch
  }

  return (
    <DatePresetsContext.Provider value={contextValue}>
      <Segments 
        value={selectedValue} 
        onValueChange={setSelectedValue}
        size={size}
        className={className}
      >
        {children}
      </Segments>
    </DatePresetsContext.Provider>
  )
}

DatePresets.displayName = 'DatePresets'