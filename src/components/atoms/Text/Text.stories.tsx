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
    type: {
      control: 'select',
      options: ['body', 'heading'],
      description: 'Typography type (body or heading)',
    },
    size: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Size within the type (body: 1-4, heading: 1-6)',
    },
    weight: {
      control: 'select',
      options: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      description: 'Font weight (100-900)',
    },
    tone: {
      control: 'select',
      options: ['default', 'muted', 'success', 'warning', 'error', 'info', 'inherit'],
      description: 'Semantic tone for color',
    },
    as: {
      control: 'select',
      options: ['span', 'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'HTML element to render',
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

// Type system showcase
export const TypeSystem: Story = {
  render: () => (
    <div className="space-y-10 max-w-4xl">
      <div className="space-y-6">
        <Text type="heading" size={2} as="h2">
          Body Text Types
        </Text>
        <Text type="body" size={2} tone="muted">
          Body text has 4 sizes optimized for content and interface text
        </Text>

        <div className="space-y-4">
          <div>
            <Text type="body" size={1} tone="muted" className="block mb-1">
              Body Size 1 (Small)
            </Text>
            <Text type="body" size={1}>
              Small body text perfect for captions, metadata, timestamps, and fine print.
            </Text>
          </div>

          <div>
            <Text type="body" size={2} tone="muted" className="block mb-1">
              Body Size 2 (Default)
            </Text>
            <Text type="body" size={2}>
              Default body text for most content. This is the standard size for paragraphs, descriptions, and general
              interface text.
            </Text>
          </div>

          <div>
            <Text type="body" size={3} tone="muted" className="block mb-1">
              Body Size 3 (Large)
            </Text>
            <Text type="body" size={3}>
              Large body text for emphasized content, lead paragraphs, and important information that needs more
              prominence.
            </Text>
          </div>

          <div>
            <Text type="body" size={4} tone="muted" className="block mb-1">
              Body Size 4 (Extra Large)
            </Text>
            <Text type="body" size={4}>
              Extra large body text for special emphasis, callouts, and content that bridges between body and heading
              text.
            </Text>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Text type="heading" size={2} as="h2">
          Heading Text Types
        </Text>
        <Text type="body" size={2} tone="muted">
          Heading text has 6 sizes for hierarchical content structure
        </Text>

        <div className="space-y-4">
          <div>
            <Text type="body" size={1} tone="muted" className="block mb-2">
              Heading Size 1 (H1 equivalent)
            </Text>
            <Text type="heading" size={1} as="h1">
              Main Page Title
            </Text>
          </div>

          <div>
            <Text type="body" size={1} tone="muted" className="block mb-2">
              Heading Size 2 (H2 equivalent)
            </Text>
            <Text type="heading" size={2} as="h2">
              Section Title
            </Text>
          </div>

          <div>
            <Text type="body" size={1} tone="muted" className="block mb-2">
              Heading Size 3 (H3 equivalent)
            </Text>
            <Text type="heading" size={3} as="h3">
              Subsection Title
            </Text>
          </div>

          <div>
            <Text type="body" size={1} tone="muted" className="block mb-2">
              Heading Size 4 (H4 equivalent)
            </Text>
            <Text type="heading" size={4} as="h4">
              Article Title
            </Text>
          </div>

          <div>
            <Text type="body" size={1} tone="muted" className="block mb-2">
              Heading Size 5 (H5 equivalent)
            </Text>
            <Text type="heading" size={5} as="h5">
              Card Title
            </Text>
          </div>

          <div>
            <Text type="body" size={1} tone="muted" className="block mb-2">
              Heading Size 6 (H6 equivalent)
            </Text>
            <Text type="heading" size={6} as="h6">
              Small Heading
            </Text>
          </div>
        </div>
      </div>
    </div>
  ),
}

// Weight system showcase
export const WeightSystem: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <Text type="heading" size={2} as="h2">
          Font Weight Scale (100-900)
        </Text>
        <Text type="body" size={2} tone="muted">
          Numerical font weights matching CSS standards for precise typography control
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Text type="heading" size={4} as="h3">
            Light Weights
          </Text>
          <div className="space-y-2">
            <Text weight={100}>Weight 100 - Thin</Text>
            <Text weight={200}>Weight 200 - Extra Light</Text>
            <Text weight={300}>Weight 300 - Light</Text>
          </div>
        </div>

        <div className="space-y-3">
          <Text type="heading" size={4} as="h3">
            Normal Weights
          </Text>
          <div className="space-y-2">
            <Text weight={400}>Weight 400 - Normal</Text>
            <Text weight={500}>Weight 500 - Medium</Text>
          </div>
        </div>

        <div className="space-y-3">
          <Text type="heading" size={4} as="h3">
            Bold Weights
          </Text>
          <div className="space-y-2">
            <Text weight={600}>Weight 600 - Semi Bold</Text>
            <Text weight={700}>Weight 700 - Bold</Text>
          </div>
        </div>

        <div className="space-y-3">
          <Text type="heading" size={4} as="h3">
            Heavy Weights
          </Text>
          <div className="space-y-2">
            <Text weight={800}>Weight 800 - Extra Bold</Text>
            <Text weight={900}>Weight 900 - Black</Text>
          </div>
        </div>
      </div>
    </div>
  ),
}

// Tone system showcase
export const ToneSystem: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <Text type="heading" size={2} as="h2">
          Tone System
        </Text>
        <Text type="body" size={2} tone="muted">
          Semantic color tones for different message types and contexts
        </Text>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Text tone="default" weight={500}>
              Default Tone
            </Text>
            <Text tone="default" type="body" size={1}>
              Standard text color for normal content
            </Text>
          </div>

          <div className="space-y-2">
            <Text tone="muted" weight={500}>
              Muted Tone
            </Text>
            <Text tone="muted" type="body" size={1}>
              Subdued text for secondary information
            </Text>
          </div>

          <div className="space-y-2">
            <Text tone="success" weight={500}>
              Success Tone
            </Text>
            <Text tone="success" type="body" size={1}>
              Green text for positive messages and confirmations
            </Text>
          </div>

          <div className="space-y-2">
            <Text tone="warning" weight={500}>
              Warning Tone
            </Text>
            <Text tone="warning" type="body" size={1}>
              Yellow text for cautions and important alerts
            </Text>
          </div>

          <div className="space-y-2">
            <Text tone="error" weight={500}>
              Error Tone
            </Text>
            <Text tone="error" type="body" size={1}>
              Red text for errors and critical warnings
            </Text>
          </div>

          <div className="space-y-2">
            <Text tone="info" weight={500}>
              Info Tone
            </Text>
            <Text tone="info" type="body" size={1}>
              Blue text for informational messages and tips
            </Text>
          </div>
        </div>
      </div>
    </div>
  ),
}

// Styling options
export const StylingOptions: Story = {
  render: () => (
    <div className="space-y-10">
      <div className="space-y-6">
        <Text type="heading" size={2} as="h2">
          Text Decorations
        </Text>
        <div className="space-y-3">
          <Text decoration="none">No decoration</Text>
          <Text decoration="underline">Underlined text with offset</Text>
          <Text decoration="strikethrough">Strikethrough text</Text>
        </div>
      </div>

      <div className="space-y-6">
        <Text type="heading" size={2} as="h2">
          Text Transformations
        </Text>
        <div className="space-y-3">
          <Text transform="none">No transformation</Text>
          <Text transform="uppercase">Uppercase transformation</Text>
          <Text transform="lowercase">LOWERCASE TRANSFORMATION</Text>
          <Text transform="capitalize">capitalize each word</Text>
        </div>
      </div>

      <div className="space-y-6">
        <Text type="heading" size={2} as="h2">
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
            Justified text that spreads across the full width and aligns to both edges for even distribution.
          </Text>
        </div>
      </div>
    </div>
  ),
}

// Advanced typography
export const AdvancedTypography: Story = {
  render: () => (
    <div className="space-y-10 max-w-3xl">
      <div className="space-y-6">
        <Text type="heading" size={2} as="h2">
          Letter Spacing (Tracking)
        </Text>
        <div className="space-y-3">
          <Text tracking="tighter">Tighter letter spacing</Text>
          <Text tracking="tight">Tight letter spacing</Text>
          <Text tracking="normal">Normal letter spacing</Text>
          <Text tracking="wide">Wide letter spacing</Text>
          <Text tracking="wider">Wider letter spacing</Text>
          <Text tracking="widest">Widest letter spacing</Text>
        </div>
      </div>

      <div className="space-y-6">
        <Text type="heading" size={2} as="h2">
          Line Height (Leading)
        </Text>
        <div className="space-y-6">
          <div>
            <Text type="body" size={1} tone="muted" className="block mb-2">
              Leading: None
            </Text>
            <Text leading="none" as="p">
              This text has no line spacing which makes it very tight and compact for dense layouts where space is at a
              premium.
            </Text>
          </div>

          <div>
            <Text type="body" size={1} tone="muted" className="block mb-2">
              Leading: Tight
            </Text>
            <Text leading="tight" as="p">
              This text has tight line spacing that reduces vertical space between lines for a more compact feel while
              maintaining readability.
            </Text>
          </div>

          <div>
            <Text type="body" size={1} tone="muted" className="block mb-2">
              Leading: Normal
            </Text>
            <Text leading="normal" as="p">
              This text has normal line spacing which provides good readability for most content and is the standard for
              general use.
            </Text>
          </div>

          <div>
            <Text type="body" size={1} tone="muted" className="block mb-2">
              Leading: Relaxed
            </Text>
            <Text leading="relaxed" as="p">
              This text has relaxed line spacing that provides more breathing room between lines for easier reading and
              a more spacious feel.
            </Text>
          </div>
        </div>
      </div>
    </div>
  ),
}

// Truncation examples
export const Truncation: Story = {
  render: () => (
    <div className="space-y-8 max-w-lg">
      <div className="space-y-4">
        <Text type="heading" size={2} as="h2">
          Text Truncation
        </Text>
        <Text type="body" size={2} tone="muted">
          Control text overflow with single-line and multi-line truncation
        </Text>
      </div>

      <div className="space-y-6">
        <div>
          <Text type="body" size={1} tone="muted" className="block mb-2">
            Single Line Truncation
          </Text>
          <Text truncate as="p">
            This is a very long text that will be truncated with an ellipsis when it exceeds the container width and
            cannot fit on a single line.
          </Text>
        </div>

        <div>
          <Text type="body" size={1} tone="muted" className="block mb-2">
            2 Line Clamp
          </Text>
          <Text truncate="2" as="p">
            This is a longer text that will be clamped to exactly two lines. Any additional content beyond the second
            line will be hidden with an ellipsis to maintain the layout.
          </Text>
        </div>

        <div>
          <Text type="body" size={1} tone="muted" className="block mb-2">
            3 Line Clamp
          </Text>
          <Text truncate="3" as="p">
            This is an even longer text that will be clamped to exactly three lines. This gives you more space to show
            content while still maintaining a clean, controlled layout. Any text beyond three lines will be truncated
            with an ellipsis.
          </Text>
        </div>
      </div>
    </div>
  ),
}

// Real-world combinations
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-10 max-w-4xl">
      <Text type="heading" size={1} as="h1">
        Real-World Typography Examples
      </Text>

      <div className="space-y-8">
        {/* Article Header */}
        <article className="space-y-4 p-6 border rounded-lg">
          <Text type="heading" size={2} as="h2" tone="info">
            Building Accessible Design Systems
          </Text>
          <Text type="body" size={3} tone="muted" weight={300}>
            A comprehensive guide to creating inclusive digital experiences that work for everyone
          </Text>
          <div className="flex items-center gap-4 text-sm">
            <Text type="body" size={1} tone="muted">
              Published March 2024
            </Text>
            <Text type="body" size={1} tone="muted">
              •
            </Text>
            <Text type="body" size={1} tone="muted">
              8 min read
            </Text>
          </div>
          <Text type="body" size={2}>
            When we design with accessibility in mind from the start, we create better experiences for all users. This
            approach, known as universal design, benefits everyone and leads to more robust, inclusive products.
          </Text>
        </article>

        {/* Status Messages */}
        <div className="space-y-4 p-6 bg-muted/20 rounded-lg">
          <Text type="heading" size={3} as="h3">
            System Status
          </Text>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Text tone="success" weight={600}>
                ✓
              </Text>
              <Text tone="success" weight={500}>
                All systems operational
              </Text>
            </div>
            <div className="flex items-center gap-3">
              <Text tone="warning" weight={600}>
                ⚠
              </Text>
              <Text tone="warning" weight={500}>
                Scheduled maintenance in 2 hours
              </Text>
            </div>
            <div className="flex items-center gap-3">
              <Text tone="error" weight={600}>
                ✗
              </Text>
              <Text tone="error" weight={500}>
                Payment processing temporarily unavailable
              </Text>
            </div>
          </div>
        </div>

        {/* Product Card */}
        <div className="p-6 border rounded-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <Text type="heading" size={3} as="h3">
                Premium Plan
              </Text>
              <Text type="body" size={1} tone="muted">
                Perfect for growing teams
              </Text>
            </div>
            <div className="text-right">
              <Text type="body" size={1} tone="muted" decoration="strikethrough">
                $99/month
              </Text>
              <Text type="heading" size={4} weight={700} tone="success">
                $49/month
              </Text>
            </div>
          </div>

          <Text type="body" size={2} className="mb-4">
            Get advanced features, priority support, and unlimited team members. Perfect for organizations that need
            powerful collaboration tools.
          </Text>

          <div className="space-y-2">
            <Text type="body" size={2} weight={500}>
              ✓ Unlimited projects
            </Text>
            <Text type="body" size={2} weight={500}>
              ✓ Advanced analytics
            </Text>
            <Text type="body" size={2} weight={500}>
              ✓ Priority support
            </Text>
          </div>
        </div>
      </div>
    </div>
  ),
}

// Accessibility showcase
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <Text type="heading" size={2} as="h2">
          Accessibility Features
        </Text>
        <Text type="body" size={2} tone="muted">
          Built-in accessibility features for inclusive design
        </Text>
      </div>

      <div className="space-y-6">
        <div>
          <Text type="heading" size={4} as="h3">
            Visually Hidden Text
          </Text>
          <div className="flex items-center gap-3 mt-2">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded">
              Submit
              <Text visuallyHidden> form data to server</Text>
            </button>
            <Text type="body" size={1} tone="muted">
              (Button has hidden context for screen readers)
            </Text>
          </div>
        </div>

        <div>
          <Text type="heading" size={4} as="h3">
            Semantic HTML Structure
          </Text>
          <div className="mt-3 space-y-3">
            <Text type="heading" size={1} as="h1">
              Page Title (h1 element)
            </Text>
            <Text type="heading" size={2} as="h2">
              Section Title (h2 element)
            </Text>
            <Text type="heading" size={3} as="h3">
              Subsection Title (h3 element)
            </Text>
            <Text type="body" size={2} as="p">
              Paragraph content with proper semantic markup
            </Text>
          </div>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Check that visually hidden text is present but not visible
    const hiddenText = canvas.getByText(' form data to server')
    await expect(hiddenText).toBeInTheDocument()
    await expect(hiddenText).toHaveClass('sr-only')

    // Check semantic structure
    const h1 = canvas.getByRole('heading', { level: 1 })
    await expect(h1).toHaveTextContent('Page Title (h1 element)')

    const h2 = canvas.getByRole('heading', { level: 2 })
    await expect(h2).toHaveTextContent('Section Title (h2 element)')
  },
}
