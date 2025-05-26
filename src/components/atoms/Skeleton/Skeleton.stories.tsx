import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from '@storybook/test'
import { useState } from 'react'

import { Skeleton } from './Skeleton'
import { Button } from '../Button'
import { Switch } from '../Switch'

const meta = {
  component: Skeleton,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Whether to show the skeleton or its children',
    },
    width: {
      control: 'text',
      description: 'Width of the skeleton',
    },
    height: {
      control: 'text',
      description: 'Height of the skeleton',
    },
    minWidth: {
      control: 'text',
      description: 'Minimum width of the skeleton',
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width of the skeleton',
    },
    minHeight: {
      control: 'text',
      description: 'Minimum height of the skeleton',
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height of the skeleton',
    },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

// Basic skeleton - no children, just loading placeholder
export const Default: Story = {
  render: () => <Skeleton width="200px" height="20px" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const skeleton = canvas.getByRole('generic')

    await expect(skeleton).toHaveAttribute('data-slot', 'skeleton')
    await expect(skeleton).toHaveAttribute('aria-hidden', 'true')
  },
}

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Text skeletons</h3>
        <div className="space-y-2">
          <Skeleton width="300px" height="16px" />
          <Skeleton width="250px" height="16px" />
          <Skeleton width="200px" height="16px" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Avatar skeletons</h3>
        <div className="flex gap-4">
          <Skeleton width="32px" height="32px" className="rounded-full" />
          <Skeleton width="48px" height="48px" className="rounded-full" />
          <Skeleton width="64px" height="64px" className="rounded-full" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Button skeletons</h3>
        <div className="flex gap-2">
          <Skeleton width="80px" height="36px" className="rounded-md" />
          <Skeleton width="100px" height="36px" className="rounded-md" />
          <Skeleton width="120px" height="36px" className="rounded-md" />
        </div>
      </div>
    </div>
  ),
}

// Controlled loading states - the main feature
export const LoadingStates: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true)

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => setIsLoading(!isLoading)} variant="outline" size="sm">
            Toggle Loading
          </Button>
          <span className="text-sm text-muted-foreground">Currently: {isLoading ? 'Loading' : 'Loaded'}</span>
        </div>

        <div className="space-y-4 p-4 border rounded-lg">
          <div className="flex items-center gap-4">
            <Skeleton loading={isLoading} width="48px" height="48px" className="rounded-full">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                JD
              </div>
            </Skeleton>

            <div className="space-y-2">
              <Skeleton loading={isLoading} width="120px" height="16px">
                <h3 className="font-semibold">John Doe</h3>
              </Skeleton>
              <Skeleton loading={isLoading} width="80px" height="14px">
                <p className="text-sm text-muted-foreground">Software Engineer</p>
              </Skeleton>
            </div>
          </div>

          <div className="flex gap-2">
            <Skeleton loading={isLoading}>
              <Button>Follow</Button>
            </Skeleton>
            <Skeleton loading={isLoading}>
              <Button variant="outline">Message</Button>
            </Skeleton>
          </div>
        </div>
      </div>
    )
  },
}

// Text content skeletons
export const TextContent: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Article title</h3>
        <Skeleton width="75%" height="24px" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Paragraph lines</h3>
        <div className="space-y-2">
          <Skeleton width="100%" height="16px" />
          <Skeleton width="95%" height="16px" />
          <Skeleton width="88%" height="16px" />
          <Skeleton width="92%" height="16px" />
          <Skeleton width="75%" height="16px" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Short lines</h3>
        <div className="space-y-2">
          <Skeleton width="60%" height="16px" />
          <Skeleton width="45%" height="16px" />
          <Skeleton width="70%" height="16px" />
        </div>
      </div>
    </div>
  ),
}

// Card layout skeleton
export const CardLayout: Story = {
  render: () => (
    <div className="max-w-sm border rounded-lg overflow-hidden">
      {/* Image skeleton */}
      <Skeleton width="100%" height="200px" />

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Title */}
        <Skeleton width="80%" height="20px" />

        {/* Description */}
        <div className="space-y-2">
          <Skeleton width="100%" height="16px" />
          <Skeleton width="90%" height="16px" />
          <Skeleton width="75%" height="16px" />
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-2">
          <Skeleton width="24px" height="24px" className="rounded-full" />
          <Skeleton width="80px" height="14px" />
          <span className="text-muted-foreground">•</span>
          <Skeleton width="60px" height="14px" />
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Skeleton width="80px" height="36px" className="rounded-md" />
          <Skeleton width="100px" height="36px" className="rounded-md" />
        </div>
      </div>
    </div>
  ),
}

// List items skeleton
export const ListItems: Story = {
  render: () => (
    <div className="space-y-1 max-w-md">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg">
          <Skeleton width="40px" height="40px" className="rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton width="75%" height="16px" />
            <Skeleton width="50%" height="14px" />
          </div>
          <Skeleton width="60px" height="32px" className="rounded-md" />
        </div>
      ))}
    </div>
  ),
}

// Table skeleton
export const TableLayout: Story = {
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-4 gap-4 p-4 bg-muted/50 border-b">
        <Skeleton width="60%" height="14px" />
        <Skeleton width="70%" height="14px" />
        <Skeleton width="50%" height="14px" />
        <Skeleton width="40%" height="14px" />
      </div>

      {/* Rows */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 p-4 border-b last:border-b-0">
          <Skeleton width="90%" height="16px" />
          <Skeleton width="80%" height="16px" />
          <Skeleton width="70%" height="16px" />
          <Skeleton width="60px" height="24px" className="rounded" />
        </div>
      ))}
    </div>
  ),
}

// Interactive elements with loading states
export const InteractiveElements: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Form elements (loading)</h3>
        <div className="space-y-3">
          <Skeleton loading={true}>
            <Button>Submit Form</Button>
          </Skeleton>
          <Skeleton loading={true}>
            <Switch defaultChecked />
          </Skeleton>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Form elements (loaded)</h3>
        <div className="space-y-3">
          <Skeleton loading={false}>
            <Button>Submit Form</Button>
          </Skeleton>
          <Skeleton loading={false}>
            <Switch defaultChecked />
          </Skeleton>
        </div>
      </div>
    </div>
  ),
}

// Dashboard layout skeleton
export const DashboardLayout: Story = {
  render: () => (
    <div className="space-y-6 p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton width="200px" height="28px" />
          <Skeleton width="300px" height="16px" />
        </div>
        <Skeleton width="120px" height="36px" className="rounded-md" />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton width="80px" height="14px" />
              <Skeleton width="20px" height="20px" className="rounded" />
            </div>
            <Skeleton width="60%" height="24px" />
            <Skeleton width="40%" height="12px" />
          </div>
        ))}
      </div>

      {/* Chart area */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <Skeleton width="150px" height="20px" />
          <Skeleton width="100px" height="32px" className="rounded-md" />
        </div>
        <Skeleton width="100%" height="300px" className="rounded" />
      </div>
    </div>
  ),
}
