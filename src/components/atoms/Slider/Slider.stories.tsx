import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from 'storybook/test'
import { useState } from 'react'

import { Slider } from './Slider'
import { Label } from '@/components/atoms/Label'

const meta: Meta<typeof Slider> = {
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
  },
}

export default meta
type Story = StoryObj<typeof Slider>

// Basic single value slider
export const Default: Story = {
  render: (args) => (
    <div className="w-80 space-y-4">
      <Label>Volume</Label>
      <Slider defaultValue={[50]} max={100} step={1} {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const slider = canvas.getByRole('slider')
    await expect(slider).toBeInTheDocument()
    await expect(slider).toHaveAttribute('aria-valuemin', '0')
    await expect(slider).toHaveAttribute('aria-valuemax', '100')
  },
}

// Range slider with two values
export const Range: Story = {
  render: (args) => (
    <div className="w-80 space-y-4">
      <Label>Price Range</Label>
      <Slider defaultValue={[25, 75]} max={100} step={1} {...args} />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>$0</span>
        <span>$100</span>
      </div>
    </div>
  ),
}

// Controlled slider with state
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState([33])

    return (
      <div className="w-80 space-y-4">
        <div className="flex items-center justify-between">
          <Label>Brightness</Label>
          <span className="text-sm text-muted-foreground">{value[0]}%</span>
        </div>
        <Slider value={value} onValueChange={setValue} max={100} step={1} {...args} />
      </div>
    )
  },
}

// Different step sizes
export const WithSteps: Story = {
  render: (args) => (
    <div className="w-80 space-y-6">
      <div className="space-y-2">
        <Label>Fine Control (step: 1)</Label>
        <Slider defaultValue={[50]} max={100} step={1} {...args} />
      </div>

      <div className="space-y-2">
        <Label>Coarse Control (step: 10)</Label>
        <Slider defaultValue={[50]} max={100} step={10} {...args} />
      </div>

      <div className="space-y-2">
        <Label>Decimal Steps (step: 0.1)</Label>
        <Slider defaultValue={[2.5]} max={5} step={0.1} {...args} />
      </div>
    </div>
  ),
}

// Custom range
export const CustomRange: Story = {
  render: (args) => (
    <div className="w-80 space-y-4">
      <Label>Temperature (-10°C to 40°C)</Label>
      <Slider defaultValue={[20]} min={-10} max={40} step={1} {...args} />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>-10°C</span>
        <span>40°C</span>
      </div>
    </div>
  ),
}

// Disabled state
export const Disabled: Story = {
  render: (args) => (
    <div className="w-80 space-y-4">
      <Label>Disabled Slider</Label>
      <Slider defaultValue={[50]} max={100} step={1} disabled {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const slider = canvas.getByRole('slider')
    // Slider uses data-disabled attribute instead of disabled
    await expect(slider).toHaveAttribute('data-disabled', '')
  },
}

// Vertical orientation
export const Vertical: Story = {
  render: (args) => (
    <div className="flex h-80 items-center justify-center space-x-8">
      <div className="space-y-2">
        <Label>Single</Label>
        <Slider defaultValue={[50]} max={100} step={1} orientation="vertical" className="h-full" {...args} />
      </div>

      <div className="space-y-2">
        <Label>Range</Label>
        <Slider defaultValue={[25, 75]} max={100} step={1} orientation="vertical" className="h-full" {...args} />
      </div>
    </div>
  ),
}

// Multiple sliders with different configurations
export const Showcase: Story = {
  render: () => (
    <div className="w-96 space-y-8">
      <div className="space-y-2">
        <Label>Volume (0-100)</Label>
        <Slider defaultValue={[75]} max={100} step={1} />
      </div>

      <div className="space-y-2">
        <Label>Zoom Level (0.5x - 3x)</Label>
        <Slider defaultValue={[1]} min={0.5} max={3} step={0.1} />
      </div>

      <div className="space-y-2">
        <Label>Age Range</Label>
        <Slider defaultValue={[18, 65]} min={0} max={100} step={1} />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>0 years</span>
          <span>100 years</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Budget Range</Label>
        <Slider defaultValue={[1000, 5000]} min={0} max={10000} step={100} />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>$0</span>
          <span>$10,000</span>
        </div>
      </div>
    </div>
  ),
}
