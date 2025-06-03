import type { Meta, StoryObj } from '@storybook/react-vite'
import { Copy } from './Copy'
import { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'

const meta: Meta<typeof Copy> = {
  component: Copy,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The text content to copy to clipboard',
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip text to show on hover',
    },
    copiedTooltip: {
      control: 'text',
      description: 'Tooltip text to show after successful copy',
    },
    copiedDuration: {
      control: 'number',
      description: 'Duration in milliseconds to show the copied state',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the icon button',
    },
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'Visual variant of the icon button',
    },
    asChild: {
      control: 'boolean',
      description: 'Render as a child component instead of default IconButton',
    },
    icon: {
      control: false,
      description: 'Custom icon render function or React element',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 'Hello, World!',
  },
}

export const WithCustomTooltip: Story = {
  args: {
    value: 'API_KEY_abc123xyz789',
    tooltip: 'Copy API Key',
    copiedTooltip: 'API Key copied!',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Copy value="Small button" size="sm" />
      <Copy value="Medium button" size="md" />
      <Copy value="Large button" size="lg" />
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Copy value="Default variant" variant="default" />
      <Copy value="Outline variant" variant="outline" />
      <Copy value="Secondary variant" variant="secondary" />
      <Copy value="Ghost variant" variant="ghost" />
    </div>
  ),
}

export const CustomIcons: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <Copy value="Custom static icon" icon={<Icon name="copy" size={16} />} tooltip="Copy with custom icon" />

        <Copy
          value="Custom render prop icon"
          icon={({ isCopied, size }) => (
            <Icon
              name={isCopied ? 'check-circle' : 'copy'}
              size={size === 'sm' ? 14 : size === 'md' ? 16 : 18}
              className={isCopied ? 'text-green-500' : undefined}
            />
          )}
          tooltip="Copy with render prop icon"
        />

        <Copy
          value="Document copy"
          icon={({ isCopied }) => <Icon name={isCopied ? 'file-check' : 'file-text'} size={16} />}
          tooltip="Copy document"
        />
      </div>

      <p className="text-sm text-gray-500 text-center max-w-md">
        Examples of custom icons: static icon, render prop with state-based styling, and document-themed icons
      </p>
    </div>
  ),
}

export const AsChild: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <Copy value="Custom button text" asChild>
        <Button variant="outline">Copy Text</Button>
      </Copy>

      <Copy value="Another custom element" asChild>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Custom Copy Button
        </button>
      </Copy>

      <Copy value="Link style copy" asChild>
        <a href="#" className="text-blue-500 hover:text-blue-700 underline">
          Copy this link text
        </a>
      </Copy>
    </div>
  ),
}

export const WithCallbacks: Story = {
  render: () => {
    const [lastCopied, setLastCopied] = useState<string>('')
    const [error, setError] = useState<string>('')

    return (
      <div className="flex flex-col items-center gap-4">
        <Copy
          value="Text with callbacks"
          onCopySuccess={(value) => {
            setLastCopied(value)
            setError('')
          }}
          onCopyError={(err) => {
            setError(err.message)
            setLastCopied('')
          }}
        />

        {lastCopied && <p className="text-green-600 text-sm">✅ Copied: "{lastCopied}"</p>}

        {error && <p className="text-red-600 text-sm">❌ Error: {error}</p>}

        <p className="text-sm text-gray-500 max-w-md text-center">
          💡 Try pressing <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Ctrl+C</kbd> (or{' '}
          <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Cmd+C</kbd> on Mac) anywhere on this page to see
          visual feedback!
        </p>
      </div>
    )
  },
}

export const LongDuration: Story = {
  args: {
    value: 'This will show copied state for 5 seconds',
    copiedDuration: 5000,
    copiedTooltip: 'Copied for 5 seconds!',
  },
}

export const Playground: Story = {
  args: {
    value: 'Playground text to copy',
    tooltip: 'Copy',
    copiedTooltip: 'Copied!',
    copiedDuration: 2000,
    size: 'sm',
    variant: 'ghost',
    asChild: false,
  },
}
