import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'
import { sliderVariants, sliderTrackVariants, sliderRangeVariants, sliderThumbVariants } from './Slider.variants'
import type { SliderProps } from './Slider.types'

function Slider({ className, defaultValue, value, min = 0, max = 100, ...props }: SliderProps) {
  const _values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max],
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(sliderVariants(), className)}
      {...props}
    >
      <SliderPrimitive.Track data-slot="slider-track" className={cn(sliderTrackVariants())}>
        <SliderPrimitive.Range data-slot="slider-range" className={cn(sliderRangeVariants())} />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb data-slot="slider-thumb" key={index} className={cn(sliderThumbVariants())} />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
