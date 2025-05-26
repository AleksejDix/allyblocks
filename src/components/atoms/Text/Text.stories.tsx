import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from '@storybook/test'

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
        'heading3xl',
        'heading2xl',
        'headingXl',
        'headingLg',
        'headingMd',
        'headingSm',
        'headingXs',
        'bodyLg',
        'bodyMd',
        'bodySm',
        'bodyXs',
        // Legacy variants
        'h1',
        'h2',
        'h3',
        'h4',
        'p',
        'lead',
        'large',
        'small',
        'muted',
      ],
      description: 'Typography variant to use',
    },
    tone: {
      control: 'select',
      options: ['default', 'subdued', 'success', 'critical', 'warning', 'info', 'inherit'],
      description: 'Semantic tone of the text',
    },
    fontWeight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold'],
      description: 'Font weight of the text',
    },
    alignment: {
      control: 'select',
      options: ['start', 'center', 'end', 'justify'],
      description: 'Text alignment',
    },
    decoration: {
      control: 'select',
      options: ['none', 'underline', 'line-through'],
      description: 'Text decoration',
    },
    transform: {
      control: 'select',
      options: ['none', 'uppercase', 'lowercase', 'capitalize'],
      description: 'Text transformation',
    },
    truncate: {
      control: 'select',
      options: [false, true, 'multiline'],
      description: 'Text truncation behavior',
    },
    as: {
      control: 'select',
      options: ['span', 'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'HTML element to render',
    },
    visuallyHidden: {
      control: 'boolean',
      description: 'Hide text visually but keep it accessible to screen readers',
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

// Heading variants showcase
export const HeadingVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Polaris Heading Variants</h2>
        <div className="space-y-3">
          <Text variant="heading3xl" as="h1">
            Heading 3XL - Main page title
          </Text>
          <Text variant="heading2xl" as="h1">
            Heading 2XL - Large section title
          </Text>
          <Text variant="headingXl" as="h2">
            Heading XL - Section title
          </Text>
          <Text variant="headingLg" as="h2">
            Heading LG - Subsection title
          </Text>
          <Text variant="headingMd" as="h3">
            Heading MD - Card title
          </Text>
          <Text variant="headingSm" as="h4">
            Heading SM - Small section
          </Text>
          <Text variant="headingXs" as="h5">
            Heading XS - Micro heading
          </Text>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Legacy Heading Variants</h2>
        <div className="space-y-3">
          <Text variant="h1" as="h1">
            H1 - Legacy heading 1
          </Text>
          <Text variant="h2" as="h2">
            H2 - Legacy heading 2
          </Text>
          <Text variant="h3" as="h3">
            H3 - Legacy heading 3
          </Text>
          <Text variant="h4" as="h4">
            H4 - Legacy heading 4
          </Text>
        </div>
      </div>
    </div>
  ),
}

// Body variants showcase
export const BodyVariants: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Polaris Body Variants</h2>
        <div className="space-y-3">
          <Text variant="bodyLg" as="p">
            Body Large - This is larger body text used for important content that needs more prominence than regular
            body text.
          </Text>
          <Text variant="bodyMd" as="p">
            Body Medium - This is the default body text size used for most content. It provides good readability and is
            the standard for paragraphs.
          </Text>
          <Text variant="bodySm" as="p">
            Body Small - This is smaller body text used for secondary information, captions, or metadata.
          </Text>
          <Text variant="bodyXs" as="p">
            Body Extra Small - This is the smallest body text used for fine print, timestamps, or very secondary
            information.
          </Text>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Legacy Text Variants</h2>
        <div className="space-y-3">
          <Text variant="lead" as="p">
            Lead text - Used for introductory paragraphs or important statements.
          </Text>
          <Text variant="large" as="p">
            Large text - Slightly larger than normal body text.
          </Text>
          <Text variant="small" as="p">
            Small text - Compact text for secondary information.
          </Text>
          <Text variant="muted" as="p">
            Muted text - Subdued text with reduced visual prominence.
          </Text>
        </div>
      </div>
    </div>
  ),
}

// Tone variants showcase
export const ToneVariants: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <h2 className="text-lg font-semibold">Text Tones</h2>
      <div className="space-y-3">
        <Text tone="default">Default tone - Standard text color for normal content.</Text>
        <Text tone="subdued">Subdued tone - Reduced prominence for secondary information.</Text>
        <Text tone="success">Success tone - Green text for positive messages and confirmations.</Text>
        <Text tone="critical">Critical tone - Red text for errors and important warnings.</Text>
        <Text tone="warning">Warning tone - Yellow/orange text for cautions and alerts.</Text>
        <Text tone="info">Info tone - Blue text for informational messages and tips.</Text>
        <Text tone="inherit">Inherit tone - Inherits color from parent element.</Text>
      </div>
    </div>
  ),
}

// Font weight variants
export const FontWeights: Story = {
  render: () => (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Font Weights</h2>
      <div className="space-y-3">
        <Text fontWeight="regular">Regular weight - Standard font weight for body text.</Text>
        <Text fontWeight="medium">Medium weight - Slightly heavier than regular for emphasis.</Text>
        <Text fontWeight="semibold">Semibold weight - Bold enough for headings and important text.</Text>
        <Text fontWeight="bold">Bold weight - Heavy emphasis for strong statements.</Text>
      </div>
    </div>
  ),
}

// Text alignment options
export const TextAlignment: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <h2 className="text-lg font-semibold">Text Alignment</h2>
      <div className="space-y-4 border rounded-lg p-4">
        <Text alignment="start" as="p">
          Start aligned - Text aligned to the start of the container (left in LTR languages).
        </Text>
        <Text alignment="center" as="p">
          Center aligned - Text centered within the container.
        </Text>
        <Text alignment="end" as="p">
          End aligned - Text aligned to the end of the container (right in LTR languages).
        </Text>
        <Text alignment="justify" as="p">
          Justified text - Text stretched to fill the full width of the container, creating even margins on both sides.
          This works best with longer paragraphs.
        </Text>
      </div>
    </div>
  ),
}

// Text decoration and transformation
export const TextStyling: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Text Decoration</h2>
        <div className="space-y-3">
          <Text decoration="none">No decoration - Plain text without any decoration.</Text>
          <Text decoration="underline">Underlined text - Text with an underline decoration.</Text>
          <Text decoration="line-through">Strikethrough text - Text with a line through it.</Text>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Text Transformation</h2>
        <div className="space-y-3">
          <Text transform="none">No transformation - Text as written.</Text>
          <Text transform="uppercase">Uppercase transformation - all letters in capitals.</Text>
          <Text transform="lowercase">LOWERCASE TRANSFORMATION - all letters in lowercase.</Text>
          <Text transform="capitalize">capitalize transformation - first letter of each word capitalized.</Text>
        </div>
      </div>
    </div>
  ),
}

// Truncation examples
export const TextTruncation: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Text Truncation</h2>

        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium mb-2">Normal text (no truncation)</h3>
            <Text>
              This is a very long text that will wrap to multiple lines naturally without any truncation applied to it.
            </Text>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Single line truncation</h3>
            <Text truncate>
              This is a very long text that will be truncated with an ellipsis when it exceeds the container width.
            </Text>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Multiline truncation (3 lines)</h3>
            <Text truncate="multiline">
              This is a very long text that will be clamped to exactly three lines and then truncated with an ellipsis.
              This is useful for card descriptions, preview text, and other content where you want to show a preview but
              limit the space used.
            </Text>
          </div>
        </div>
      </div>
    </div>
  ),
}

// Semantic HTML elements
export const SemanticElements: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Semantic HTML Elements</h2>
        <div className="space-y-3">
          <Text variant="headingLg" as="h1">
            H1 - Main page heading
          </Text>
          <Text variant="headingMd" as="h2">
            H2 - Section heading
          </Text>
          <Text variant="bodyMd" as="p">
            Paragraph - Regular body content in a paragraph element.
          </Text>
          <Text variant="bodySm" as="span">
            Span - Inline text content
          </Text>
          <Text variant="bodyMd" as="div">
            Div - Block-level text content
          </Text>
        </div>
      </div>
    </div>
  ),
}

// Accessibility features
export const AccessibilityFeatures: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Accessibility Features</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Visually Hidden Text</h3>
            <p className="text-sm text-muted-foreground mb-2">
              The following text is hidden visually but available to screen readers:
            </p>
            <Text visuallyHidden>This text is only visible to screen readers and assistive technologies.</Text>
            <Text variant="bodySm" tone="subdued">
              (Check with a screen reader to hear the hidden text above)
            </Text>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Semantic Tone Usage</h3>
            <div className="space-y-2">
              <Text tone="success">✓ Form submitted successfully</Text>
              <Text tone="critical">✗ Please fix the errors below</Text>
              <Text tone="warning">⚠ This action cannot be undone</Text>
              <Text tone="info">ℹ Additional information available</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

// Real-world usage examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      {/* Article layout */}
      <article className="space-y-4">
        <Text variant="heading2xl" as="h1">
          Building Accessible Web Applications
        </Text>
        <Text variant="bodyLg" tone="subdued" as="p">
          A comprehensive guide to creating inclusive digital experiences
        </Text>
        <Text variant="bodyMd" as="p">
          Accessibility is not just a nice-to-have feature—it's a fundamental requirement for creating inclusive web
          applications that work for everyone. In this article, we'll explore the key principles and practical
          techniques for building accessible interfaces.
        </Text>
        <Text variant="bodyMd" as="p">
          When we design with accessibility in mind from the start, we create better experiences for all users, not just
          those with disabilities. This approach, known as universal design, benefits everyone.
        </Text>
      </article>

      {/* Card layout */}
      <div className="border rounded-lg p-6 space-y-4">
        <Text variant="headingLg" as="h2">
          Product Features
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Text variant="headingMd" as="h3" tone="success">
              ✓ Advanced Analytics
            </Text>
            <Text variant="bodySm" tone="subdued">
              Get detailed insights into your application performance
            </Text>
          </div>
          <div className="space-y-2">
            <Text variant="headingMd" as="h3" tone="info">
              🔒 Enterprise Security
            </Text>
            <Text variant="bodySm" tone="subdued">
              Bank-level security with end-to-end encryption
            </Text>
          </div>
        </div>
      </div>

      {/* Status messages */}
      <div className="space-y-3">
        <Text variant="headingMd" as="h2">
          System Status
        </Text>
        <div className="space-y-2">
          <Text tone="success" fontWeight="medium">
            ✓ All systems operational
          </Text>
          <Text tone="warning" fontWeight="medium">
            ⚠ Scheduled maintenance in 2 hours
          </Text>
          <Text tone="critical" fontWeight="medium">
            ✗ Payment processing temporarily unavailable
          </Text>
        </div>
      </div>
    </div>
  ),
}

// Interactive playground
export const Playground: Story = {
  args: {
    variant: 'bodyMd',
    tone: 'default',
    fontWeight: 'regular',
    alignment: 'start',
    decoration: 'none',
    transform: 'none',
    truncate: false,
    as: 'span',
    visuallyHidden: false,
    breakWord: true,
    children: 'Customize this text using the controls below',
  },
}
