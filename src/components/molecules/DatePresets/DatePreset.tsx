import { useEffect } from 'react'
import { isSameDay } from 'date-fns'
import { Segment } from '@/components/molecules/Segments'
import { useDatePresetsContext } from './DatePresets.context'

export interface DatePresetProps {
  value: string
  label: string
  getDateRange: () => { from: string; to: string }
}

export function DatePreset({ value, label, getDateRange }: DatePresetProps) {
  const { selectedValue, onPresetSelect, form, fromFieldName, toFieldName, notifyMatch } = useDatePresetsContext()
  
  const handleClick = () => {
    const { from, to } = getDateRange()
    // Dates are already strings, pass them directly
    onPresetSelect(value, from, to)
  }
  
  // Auto-detect if this preset matches current form values
  useEffect(() => {
    if (!form || !fromFieldName || !toFieldName) return
    
    const subscription = form.watch((values) => {
      const fromValue = values[fromFieldName]
      const toValue = values[toFieldName]
      
      if (!fromValue || !toValue) {
        if (selectedValue === value) {
          notifyMatch('') // Clear selection if no dates
        }
        return
      }
      
      // Get this preset's date range (already in string format)
      const { from: presetFrom, to: presetTo } = getDateRange()
      
      // Compare dates - handle both string and Date formats
      let matches = false
      
      if (typeof fromValue === 'string' && typeof toValue === 'string') {
        // Direct string comparison since presets are already strings
        matches = fromValue === presetFrom && toValue === presetTo
        
        // If no direct match, try parsing and comparing dates
        if (!matches) {
          try {
            const fromDate = new Date(fromValue)
            const toDate = new Date(toValue)
            const presetFromDate = new Date(presetFrom)
            const presetToDate = new Date(presetTo)
            
            if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime()) && 
                !isNaN(presetFromDate.getTime()) && !isNaN(presetToDate.getTime())) {
              matches = isSameDay(fromDate, presetFromDate) && isSameDay(toDate, presetToDate)
            }
          } catch {
            // Invalid date strings, no match
          }
        }
      } else {
        // If form values are Date objects, convert everything to dates for comparison
        const fromDate = fromValue instanceof Date ? fromValue : new Date(fromValue)
        const toDate = toValue instanceof Date ? toValue : new Date(toValue)
        const presetFromDate = new Date(presetFrom)
        const presetToDate = new Date(presetTo)
        
        if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime()) && 
            !isNaN(presetFromDate.getTime()) && !isNaN(presetToDate.getTime())) {
          matches = isSameDay(fromDate, presetFromDate) && isSameDay(toDate, presetToDate)
        }
      }
      
      // Notify parent if this preset matches
      if (matches && selectedValue !== value) {
        notifyMatch(value)
      } else if (!matches && selectedValue === value) {
        notifyMatch('') // Clear selection if no longer matches
      }
    })
    
    return () => subscription.unsubscribe()
  }, [form, fromFieldName, toFieldName, getDateRange, value, selectedValue, notifyMatch])
  
  return (
    <Segment 
      value={value} 
      onClick={handleClick}
      data-state={selectedValue === value ? 'on' : 'off'}
    >
      {label}
    </Segment>
  )
}

DatePreset.displayName = 'DatePreset'