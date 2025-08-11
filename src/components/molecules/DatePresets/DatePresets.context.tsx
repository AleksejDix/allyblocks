import { createContext, useContext } from 'react'
import type { UseFormReturn } from 'react-hook-form'

interface DatePresetsContextValue {
  fromFieldName: string
  toFieldName: string
  selectedValue: string
  onPresetSelect: (value: string, fromDate: string, toDate: string) => void
  form: UseFormReturn<any> | null
  notifyMatch: (value: string) => void
}

export const DatePresetsContext = createContext<DatePresetsContextValue | undefined>(undefined)

export function useDatePresetsContext() {
  const context = useContext(DatePresetsContext)
  if (!context) {
    throw new Error('useDatePresetsContext must be used within DatePresets')
  }
  return context
}