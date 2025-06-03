import type { Meta, StoryObj } from '@storybook/react-vite'
import { within } from 'storybook/test'
import { expect } from 'storybook/test'
import React from 'react'

import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from './Popover'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'

const meta: Meta<typeof Popover> = {
  component: Popover,
  subcomponents: {
    PopoverTrigger,
    PopoverContent,
    PopoverAnchor,
  },
  parameters: {
    nuqs: {
      disabled: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the popover is open',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the popover is open by default',
    },
  },
}
export default meta

type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Dimensions</h4>
          <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="width">Width</label>
              <input id="width" defaultValue="100%" className="col-span-2 h-8 rounded border px-2" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="maxWidth">Max. width</label>
              <input id="maxWidth" defaultValue="300px" className="col-span-2 h-8 rounded border px-2" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="height">Height</label>
              <input id="height" defaultValue="25px" className="col-span-2 h-8 rounded border px-2" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="maxHeight">Max. height</label>
              <input id="maxHeight" defaultValue="none" className="col-span-2 h-8 rounded border px-2" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: /open popover/i })
    await expect(trigger).toBeInTheDocument()
  },
}

export const WithIcon: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Icon name="info" className="mr-2 h-4 w-4" />
          Info
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex items-start space-x-3">
          <Icon name="info" className="h-5 w-5 text-blue-500 mt-0.5" />
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Information</h4>
            <p className="text-sm text-muted-foreground">
              This is some helpful information about the feature you're looking at. It provides context and guidance to
              help you understand what's happening.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const TooltipStyle: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm">
          <Icon name="help-circle" className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto max-w-xs px-3 py-1.5">
        <p className="text-sm">Click to get help with this feature</p>
      </PopoverContent>
    </Popover>
  ),
}

export const FormExample: Story = {
  render: (args) => (
    <div className="flex items-center space-x-4">
      <span>Account Settings</span>
      <Popover {...args}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <Icon name="settings" className="mr-2 h-4 w-4" />
            Configure
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Account Settings</h4>
              <p className="text-sm text-muted-foreground">Manage your account preferences and settings.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Username
                </label>
                <input id="username" placeholder="Enter username" className="w-full h-9 rounded border px-3" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input id="email" type="email" placeholder="Enter email" className="w-full h-9 rounded border px-3" />
              </div>
              <div className="flex items-center space-x-2">
                <input id="notifications" type="checkbox" className="h-4 w-4 rounded border" />
                <label htmlFor="notifications" className="text-sm">
                  Enable notifications
                </label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Save Changes</Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
}

export const Positioning: Story = {
  render: (args) => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="grid grid-cols-3 gap-4">
        <Popover {...args}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              Top
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" className="w-48">
            <p className="text-sm">Popover positioned above</p>
          </PopoverContent>
        </Popover>

        <Popover {...args}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              Right
            </Button>
          </PopoverTrigger>
          <PopoverContent side="right" className="w-48">
            <p className="text-sm">Popover positioned to the right</p>
          </PopoverContent>
        </Popover>

        <Popover {...args}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              Bottom
            </Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" className="w-48">
            <p className="text-sm">Popover positioned below</p>
          </PopoverContent>
        </Popover>

        <Popover {...args}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              Left
            </Button>
          </PopoverTrigger>
          <PopoverContent side="left" className="w-48">
            <p className="text-sm">Popover positioned to the left</p>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  ),
}
