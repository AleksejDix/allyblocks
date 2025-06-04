import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from 'storybook/test'

import { Text } from './Text'

const meta = {
  component: Text,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'display',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'body',
        'label',
        'caption',
        'lead',
        'code',
        'blockquote',
      ],
      description: 'Semantic variant of the text',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
      description: 'Size of the text (overrides variant size)',
    },
    weight: {
      control: 'select',
      options: ['light', 'normal', 'medium', 'semibold', 'bold', 'extrabold'],
      description: 'Font weight',
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'success', 'warning', 'error', 'info', 'inherit'],
      description: 'Text color',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    transform: {
      control: 'select',
      options: ['none', 'uppercase', 'lowercase', 'capitalize'],
      description: 'Text transformation',
    },
    decoration: {
      control: 'select',
      options: ['none', 'underline', 'strikethrough'],
      description: 'Text decoration',
    },
    leading: {
      control: 'select',
      options: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
      description: 'Line height',
    },
    tracking: {
      control: 'select',
      options: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
      description: 'Letter spacing',
    },
    truncate: {
      control: 'select',
      options: [false, true, '2', '3', '4', '5'],
      description: 'Text truncation',
    },
    as: {
      control: 'select',
      options: ['span', 'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'HTML element to render',
    },
    visuallyHidden: {
      control: 'boolean',
      description: 'Hide text visually but keep accessible',
    },
    breakWord: {
      control: 'boolean',
      description: 'Whether text should break to new lines',
    },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

// Basic usage
export const Default: Story = {
  args: {
    children: 'This is default body text using the Text component.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const text = canvas.getByText('This is default body text using the Text component.')

    await expect(text).toBeInTheDocument()
    await expect(text.tagName.toLowerCase()).toBe('span')
  },
}

// Semantic variants showcase
export const SemanticVariants: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-4">
        <Text variant="h2" as="h2">
          Semantic Typography Variants
        </Text>

        <div className="space-y-6">
          <div className="space-y-2">
            <Text variant="display" as="h1">
              Display Text
            </Text>
            <Text variant="caption" color="muted">
              Largest text for hero sections and major headers
            </Text>
          </div>

          <div className="space-y-2">
            <Text variant="h1" as="h1">
              Heading 1
            </Text>
            <Text variant="h2" as="h2">
              Heading 2
            </Text>
            <Text variant="h3" as="h3">
              Heading 3
            </Text>
            <Text variant="h4" as="h4">
              Heading 4
            </Text>
            <Text variant="h5" as="h5">
              Heading 5
            </Text>
            <Text variant="h6" as="h6">
              Heading 6
            </Text>
          </div>

          <div className="space-y-2">
            <Text variant="lead" as="p">
              Lead paragraph - Used for introductory text that provides more emphasis than regular body text.
            </Text>
            <Text variant="body" as="p">
              Body text - The default text variant for most content. Perfect for paragraphs and general text content.
            </Text>
          </div>

          <div className="space-y-2">
            <Text variant="label">Form Label</Text>
            <Text variant="caption">Caption text for additional context</Text>
            <Text variant="code">console.log('Hello world')</Text>
          </div>
        </div>
      </div>
    </div>
  ),
}

// Size variants showcase
export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <Text variant="h2" as="h2">
        Size Variants
      </Text>
      <div className="space-y-3">
        <Text size="xs">Extra Small (xs) - Tiny text</Text>
        <Text size="sm">Small (sm) - Compact text</Text>
        <Text size="base">Base - Default size</Text>
        <Text size="lg">Large (lg) - Prominent text</Text>
        <Text size="xl">Extra Large (xl) - Big text</Text>
        <Text size="2xl">2X Large - Very big text</Text>
        <Text size="3xl">3X Large - Huge text</Text>
        <Text size="4xl">4X Large - Massive text</Text>
        <Text size="5xl">5X Large - Giant text</Text>
        <Text size="6xl">6X Large - Enormous text</Text>
      </div>
    </div>
  ),
}

// Weight and color combinations
export const WeightAndColor: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <Text variant="h2" as="h2">
          Font Weights
        </Text>
        <div className="space-y-2">
          <Text weight="light">Light weight text</Text>
          <Text weight="normal">Normal weight text</Text>
          <Text weight="medium">Medium weight text</Text>
          <Text weight="semibold">Semibold weight text</Text>
          <Text weight="bold">Bold weight text</Text>
          <Text weight="extrabold">Extra bold weight text</Text>
        </div>
      </div>

      <div className="space-y-4">
        <Text variant="h2" as="h2">
          Color Variants
        </Text>
        <div className="space-y-2">
          <Text color="default">Default color text</Text>
          <Text color="muted">Muted color text</Text>
          <Text color="success">Success color text</Text>
          <Text color="warning">Warning color text</Text>
          <Text color="error">Error color text</Text>
          <Text color="info">Info color text</Text>
        </div>
      </div>
    </div>
  ),
}

// Text styling options
export const TextStyling: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <Text variant="h2" as="h2">
          Text Alignment
        </Text>
        <div className="space-y-3 max-w-md">
          <Text align="left" as="p">
            Left aligned text (default)
          </Text>
          <Text align="center" as="p">
            Center aligned text
          </Text>
          <Text align="right" as="p">
            Right aligned text
          </Text>
          <Text align="justify" as="p">
            Justified text that spreads across the full width of the container and aligns to both edges.
          </Text>
        </div>
      </div>

      <div className="space-y-4">
        <Text variant="h2" as="h2">
          Text Decorations
        </Text>
        <div className="space-y-2">
          <Text decoration="none">No decoration</Text>
          <Text decoration="underline">Underlined text</Text>
          <Text decoration="strikethrough">Strikethrough text</Text>
        </div>
      </div>

      <div className="space-y-4">
        <Text variant="h2" as="h2">
          Text Transformations
        </Text>
        <div className="space-y-2">
          <Text transform="none">No transformation</Text>
          <Text transform="uppercase">Uppercase text</Text>
          <Text transform="lowercase">LOWERCASE TEXT</Text>
          <Text transform="capitalize">capitalize each word</Text>
        </div>
      </div>
    </div>
  ),
}

// Advanced typography controls
export const AdvancedTypography: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <div className="space-y-4">
        <Text variant="h2" as="h2">
          Line Height (Leading)
        </Text>
        <div className="space-y-4">
          <div>
            <Text variant="caption" color="muted">
              Leading None
            </Text>
            <Text leading="none" as="p">
              This text has no line spacing which makes it very tight and compact for dense layouts.
            </Text>
          </div>
          <div>
            <Text variant="caption" color="muted">
              Leading Tight
            </Text>
            <Text leading="tight" as="p">
              This text has tight line spacing that reduces vertical space between lines for a more compact feel.
            </Text>
          </div>
          <div>
            <Text variant="caption" color="muted">
              Leading Normal
            </Text>
            <Text leading="normal" as="p">
              This text has normal line spacing which provides good readability for most content.
            </Text>
          </div>
          <div>
            <Text variant="caption" color="muted">
              Leading Relaxed
            </Text>
            <Text leading="relaxed" as="p">
              This text has relaxed line spacing that provides more breathing room between lines for easier reading.
            </Text>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Text variant="h2" as="h2">
          Letter Spacing (Tracking)
        </Text>
        <div className="space-y-2">
          <Text tracking="tighter">Tighter letter spacing</Text>
          <Text tracking="tight">Tight letter spacing</Text>
          <Text tracking="normal">Normal letter spacing</Text>
          <Text tracking="wide">Wide letter spacing</Text>
          <Text tracking="wider">Wider letter spacing</Text>
          <Text tracking="widest">Widest letter spacing</Text>
        </div>
      </div>
    </div>
  ),
}

// Truncation examples
export const Truncation: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <Text variant="h2" as="h2">
        Text Truncation
      </Text>

      <div className="space-y-4">
        <div>
          <Text variant="caption" color="muted">
            Single Line Truncation
          </Text>
          <Text truncate as="p">
            This is a very long text that will be truncated with an ellipsis when it exceeds the container width.
          </Text>
        </div>

        <div>
          <Text variant="caption" color="muted">
            2 Line Clamp
          </Text>
          <Text truncate="2" as="p">
            This is a longer text that will be clamped to exactly two lines. Any additional content beyond the second
            line will be hidden with an ellipsis.
          </Text>
        </div>

        <div>
          <Text variant="caption" color="muted">
            3 Line Clamp
          </Text>
          <Text truncate="3" as="p">
            This is an even longer text that will be clamped to exactly three lines. This gives you more space to show
            content while still maintaining a clean, controlled layout. Any text beyond three lines will be truncated.
          </Text>
        </div>
      </div>
    </div>
  ),
}

// Combinations showcase
export const Combinations: Story = {
  render: () => (
    <div className="space-y-8 max-w-3xl">
      <Text variant="h1" as="h1">
        Typography Combinations
      </Text>

      <div className="space-y-6">
        <div className="p-6 border rounded-lg">
          <Text variant="h3" as="h2" color="info">
            Product Launch Announcement
          </Text>
          <Text variant="lead" as="p" color="muted" className="mt-2">
            We're excited to introduce our latest innovation that will revolutionize your workflow.
          </Text>
          <Text variant="body" as="p" className="mt-4">
            Our new product combines cutting-edge technology with intuitive design to deliver an unparalleled user
            experience. Built with performance and accessibility in mind, it's designed to help teams work more
            efficiently than ever before.
          </Text>
          <Text variant="caption" color="muted" className="mt-4">
            Published on March 2024 • 3 min read
          </Text>
        </div>

        <div className="p-6 bg-muted/20 rounded-lg">
          <Text size="2xl" weight="bold" color="success" transform="uppercase" tracking="wide">
            Special Offer
          </Text>
          <Text variant="h4" as="h3" className="mt-2">
            50% Off Everything
          </Text>
          <Text variant="body" decoration="strikethrough" color="muted" className="mt-1">
            Regular Price: $99.99
          </Text>
          <Text size="xl" weight="bold" color="error" className="mt-1">
            Sale Price: $49.99
          </Text>
          <Text variant="caption" transform="uppercase" tracking="wide" color="muted" className="mt-3">
            Limited Time Only
          </Text>
        </div>

        <div className="space-y-3">
          <Text variant="h4" as="h3">
            Code Example
          </Text>
          <div className="bg-muted p-4 rounded-lg">
            <Text variant="code" as="pre">
              {`function greet(name: string): string {
  return \`Hello, \${name}!\`;
}`}
            </Text>
          </div>
          <Text variant="caption" color="muted">
            TypeScript function example with proper syntax highlighting
          </Text>
        </div>
      </div>
    </div>
  ),
}

// Accessibility showcase
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-6">
      <Text variant="h2" as="h2">
        Accessibility Features
      </Text>

      <div className="space-y-4">
        <div>
          <Text variant="label">Visually Hidden Text</Text>
          <div className="flex items-center gap-2 mt-1">
            <button className="px-3 py-1 bg-primary text-primary-foreground rounded">
              Submit
              <Text visuallyHidden> form data</Text>
            </button>
            <Text variant="caption" color="muted">
              (Button has hidden context for screen readers)
            </Text>
          </div>
        </div>

        <div>
          <Text variant="label">Semantic HTML Structure</Text>
          <div className="mt-2 space-y-2">
            <Text variant="h3" as="h1">
              Page Title (h1 element)
            </Text>
            <Text variant="h4" as="h2">
              Section Title (h2 element)
            </Text>
            <Text variant="body" as="p">
              Paragraph content with proper semantics
            </Text>
          </div>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Check that visually hidden text is present but not visible
    const hiddenText = canvas.getByText(' form data')
    await expect(hiddenText).toBeInTheDocument()
    await expect(hiddenText).toHaveClass('sr-only')

    // Check semantic structure
    const h1 = canvas.getByRole('heading', { level: 1 })
    await expect(h1).toHaveTextContent('Page Title (h1 element)')

    const h2 = canvas.getByRole('heading', { level: 2 })
    await expect(h2).toHaveTextContent('Section Title (h2 element)')
  },
}
