import type { Meta, StoryObj } from '@storybook/react-vite'
import { Loader } from './Loader'
import React from 'react'

const meta: Meta<typeof Loader> = {
  component: Loader,
  parameters: {
    docs: {
      description: {
        component: `
A spinning loading indicator with WCAG accessibility compliance.

## Usage

\`\`\`tsx
import { Loader } from "@/components/atoms/Loader";

// Basic spinner
<Loader />

// With custom accessible label
<Loader aria-label="Loading user data" />

// With visible text
<Loader>
  <span className="ml-2 text-sm">Loading...</span>
</Loader>

// Overlay mode
<Loader overlay aria-label="Loading application" />
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    overlay: {
      control: 'boolean',
    },
  },
  args: {
    size: 'md',
    overlay: false,
  },
}

export default meta
type Story = StoryObj<typeof Loader>

export const Default: Story = {
  args: {},
}

export const WithText: Story = {
  args: {
    children: <span className="ml-2 text-sm text-muted-foreground">Loading...</span>,
  },
}

export const WithMultilineText: Story = {
  args: {
    'aria-label': 'Loading user profile',
    children: (
      <div className="ml-3">
        <div className="text-sm font-medium">Loading profile...</div>
        <div className="text-xs text-muted-foreground">This may take a moment</div>
      </div>
    ),
  },
}

export const WithCustomLabel: Story = {
  args: {
    'aria-label': 'Loading user data',
    children: <span className="ml-2 text-sm text-muted-foreground">Loading user data...</span>,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Loader size="sm" />
      <Loader size="md" />
      <Loader size="lg" />
      <Loader size="xl" />
    </div>
  ),
}

export const Overlay: Story = {
  args: {
    overlay: true,
    'aria-label': 'Loading application',
  },
}
