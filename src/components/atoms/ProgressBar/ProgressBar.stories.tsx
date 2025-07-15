import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, expect } from 'storybook/test'
import { ProgressBar } from './ProgressBar'
import { useState, useEffect } from 'react'

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component: 'A progress bar component with accessibility features for showing task completion.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value (0-100)',
    },
    max: {
      control: { type: 'number', min: 1 },
      description: 'Maximum value for progress calculation',
      defaultValue: 100,
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'error'],
      description: 'The visual style of the progress bar',
      defaultValue: 'default',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The height of the progress bar',
      defaultValue: 'md',
    },
    label: {
      control: 'text',
      description: 'Label for screen readers and visual display',
    },
    showValue: {
      control: 'boolean',
      description: 'Show the percentage value visually',
      defaultValue: false,
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate loading state (ignores value)',
      defaultValue: false,
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    await expect(canvasElement).not.toBeEmptyDOMElement()
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 60,
    label: 'Loading progress',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default progress bar showing 60% completion with a label.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const progressBar = canvas.getByRole('progressbar')
    await expect(progressBar).toBeInTheDocument()
    await expect(progressBar).toHaveAttribute('aria-valuenow', '60')
    await expect(progressBar).toHaveAttribute('aria-valuemax', '100')
  },
}

export const WithValue: Story = {
  args: {
    value: 75,
    label: 'Upload progress',
    showValue: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar with visible percentage value display.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const progressBar = canvas.getByRole('progressbar')
    const valueText = canvas.getByText('75%')
    await expect(progressBar).toHaveAttribute('aria-valuenow', '75')
    await expect(valueText).toBeInTheDocument()
  },
}

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Shows all available progress bar variants with different semantic meanings.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <ProgressBar value={60} variant="default" label="Default progress" showValue />
      </div>
      <div>
        <ProgressBar value={100} variant="success" label="Success progress" showValue />
      </div>
      <div>
        <ProgressBar value={75} variant="warning" label="Warning progress" showValue />
      </div>
      <div>
        <ProgressBar value={25} variant="error" label="Error progress" showValue />
      </div>
    </div>
  ),
}

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Displays all available progress bar sizes.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <ProgressBar value={60} size="sm" label="Small progress bar" />
      </div>
      <div>
        <ProgressBar value={60} size="md" label="Medium progress bar" />
      </div>
      <div>
        <ProgressBar value={60} size="lg" label="Large progress bar" />
      </div>
    </div>
  ),
}

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    label: 'Loading...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Indeterminate progress bar for unknown completion time.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const progressBar = canvas.getByRole('progressbar')
    await expect(progressBar).not.toHaveAttribute('aria-valuenow')
  },
}

export const AnimatedProgress: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates animated progress with smooth transitions.',
      },
    },
  },
  render: () => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0
          }
          return prev + 10
        })
      }, 500)

      return () => clearInterval(timer)
    }, [])

    return (
      <div className="space-y-4">
        <p>Watch the progress animate automatically</p>
        <ProgressBar value={progress} label="Animated progress" showValue />
      </div>
    )
  },
}

export const WithoutLabel: Story = {
  args: {
    value: 45,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar without a visible label but with proper accessibility.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const progressBar = canvas.getByRole('progressbar')
    await expect(progressBar).toHaveAttribute('aria-label', 'Progress')
  },
}

export const CustomMax: Story = {
  args: {
    value: 250,
    max: 500,
    label: 'File download',
    showValue: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar with custom maximum value (250 out of 500).',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const progressBar = canvas.getByRole('progressbar')
    const valueText = canvas.getByText('50%')
    await expect(progressBar).toHaveAttribute('aria-valuenow', '250')
    await expect(progressBar).toHaveAttribute('aria-valuemax', '500')
    await expect(valueText).toBeInTheDocument()
  },
}

export const AccessibilityTest: Story = {
  args: {
    value: 80,
    label: 'Upload progress',
    showValue: true,
    id: 'upload-progress',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests proper accessibility attributes and labeling.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const progressBar = canvas.getByRole('progressbar')

    // Check ARIA attributes
    await expect(progressBar).toHaveAttribute('aria-valuenow', '80')
    await expect(progressBar).toHaveAttribute('aria-valuemin', '0')
    await expect(progressBar).toHaveAttribute('aria-valuemax', '100')
    await expect(progressBar).toHaveAttribute('aria-labelledby', 'upload-progress-label')

    // Check proper labeling
    const label = canvas.getByText('Upload progress')
    await expect(label).toHaveAttribute('id', 'upload-progress-label')
  },
}
