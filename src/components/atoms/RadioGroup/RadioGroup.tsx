import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '@/lib/utils'
import { radioVariants, radioGroupVariants } from './RadioGroup.variants'
import { type RadioGroupProps, type RadioProps, type RadioItemProps } from './RadioGroup.types'

function RadioGroup({ className, orientation, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn(radioGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

function Radio({ className, ...props }: RadioProps) {
  return (
    <RadioGroupPrimitive.Item data-slot="radio" className={cn(radioVariants(), className)} {...props}>
      <RadioGroupPrimitive.Indicator
        data-slot="radio-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

function RadioItem({ className, ...props }: RadioItemProps) {
  return <div className={cn('flex items-center space-x-2', className)} {...props} />
}

export { RadioGroup, Radio, RadioItem }
