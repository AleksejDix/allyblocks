import { ReactNode } from 'react'

export interface DatePresetsProps {
  fromFieldName: string
  toFieldName: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onPresetChange?: (preset: string, fromDate: string, toDate: string) => void
  children: ReactNode
}