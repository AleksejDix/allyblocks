import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import type { VariantProps } from 'class-variance-authority'
import { sliderVariants } from './Slider.variants'

export type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root> &
  VariantProps<typeof sliderVariants> & {
    /**
     * The minimum value for the slider
     * @default 0
     */
    min?: number
    /**
     * The maximum value for the slider
     * @default 100
     */
    max?: number
    /**
     * The step value for the slider
     * @default 1
     */
    step?: number
  }
