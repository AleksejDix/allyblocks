import type { Meta, StoryObj } from '@storybook/react'
import * as RadioPrimitive from '@radix-ui/react-radio-group'
import { Radio } from './Radio'
import { Text } from '@/components/atoms/Text'

const meta: Meta<typeof Radio> = {
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the radio button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio button is disabled',
    },
  },
}

export default meta
type Story = StoryObj<typeof Radio>

export const Default: Story = {
  render: ({ size, disabled, ...args }) => (
    <RadioPrimitive.Root defaultValue="option1">
      <div className="flex items-center space-x-2">
        <Radio value="option1" id="radio-1" size={size} disabled={disabled} />
        <label htmlFor="radio-1" className="cursor-pointer text-sm">
          Default Radio
        </label>
      </div>
    </RadioPrimitive.Root>
  ),
  args: {
    size: 'md',
    disabled: false,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <RadioPrimitive.Root defaultValue="sm">
        <div className="flex items-center space-x-2">
          <Radio value="sm" id="radio-sm" size="sm" />
          <label htmlFor="radio-sm" className="cursor-pointer text-sm">
            Small (sm)
          </label>
        </div>
      </RadioPrimitive.Root>

      <RadioPrimitive.Root defaultValue="md">
        <div className="flex items-center space-x-2">
          <Radio value="md" id="radio-md" size="md" />
          <label htmlFor="radio-md" className="cursor-pointer text-sm">
            Medium (md)
          </label>
        </div>
      </RadioPrimitive.Root>

      <RadioPrimitive.Root defaultValue="lg">
        <div className="flex items-center space-x-2">
          <Radio value="lg" id="radio-lg" size="lg" />
          <label htmlFor="radio-lg" className="cursor-pointer text-sm">
            Large (lg)
          </label>
        </div>
      </RadioPrimitive.Root>
    </div>
  ),
}

export const RadioGroup: Story = {
  render: () => (
    <div className="w-80">
      <Text type="heading" size="md" className="mb-4">
        Choose your plan
      </Text>
      <RadioPrimitive.Root defaultValue="premium">
        <div className="flex flex-col gap-3">
          <div className="flex items-center space-x-3">
            <Radio value="basic" id="plan-basic" />
            <div className="flex-1">
              <label htmlFor="plan-basic" className="cursor-pointer font-medium text-sm block">
                Basic Plan
              </label>
              <Text className="text-xs text-gray-600">Free forever with basic features</Text>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Radio value="premium" id="plan-premium" />
            <div className="flex-1">
              <label htmlFor="plan-premium" className="cursor-pointer font-medium text-sm block">
                Premium Plan
              </label>
              <Text className="text-xs text-gray-600">$9/month with advanced features</Text>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Radio value="enterprise" id="plan-enterprise" />
            <div className="flex-1">
              <label htmlFor="plan-enterprise" className="cursor-pointer font-medium text-sm block">
                Enterprise Plan
              </label>
              <Text className="text-xs text-gray-600">Custom pricing for large teams</Text>
            </div>
          </div>
        </div>
      </RadioPrimitive.Root>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <RadioPrimitive.Root defaultValue="enabled">
        <div className="flex items-center space-x-2">
          <Radio value="enabled" id="radio-enabled" />
          <label htmlFor="radio-enabled" className="cursor-pointer text-sm">
            Enabled Radio
          </label>
        </div>
      </RadioPrimitive.Root>

      <RadioPrimitive.Root defaultValue="disabled-checked">
        <div className="flex items-center space-x-2">
          <Radio value="disabled-checked" id="radio-disabled-checked" disabled />
          <label htmlFor="radio-disabled-checked" className="cursor-not-allowed opacity-50 text-sm">
            Disabled & Checked
          </label>
        </div>
      </RadioPrimitive.Root>

      <RadioPrimitive.Root>
        <div className="flex items-center space-x-2">
          <Radio value="disabled-unchecked" id="radio-disabled-unchecked" disabled />
          <label htmlFor="radio-disabled-unchecked" className="cursor-not-allowed opacity-50 text-sm">
            Disabled & Unchecked
          </label>
        </div>
      </RadioPrimitive.Root>
    </div>
  ),
}
