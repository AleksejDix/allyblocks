import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@/components/atoms/Badge'
import { CheckCircle } from 'lucide-react' // Example icon
import { within, expect } from '@storybook/test'

const meta: Meta<typeof Badge> = {
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: `
Badge component for displaying labels, status indicators, and categorization.

## Features
- **Accessibility**: WCAG AAA contrast compliance in both light and dark themes
- **Colors**: 22+ culturally neutral color variants with no semantic meaning
- **Sizes**: Small, medium, and large variants
- **Composition**: Can render as child element using asChild prop
- **Performance**: Memoized component with optimized re-renders
- **Icons**: Proper icon sizing and spacing support

## Usage Guidelines
- Use for labels, categories, status indicators, and tags
- Colors are decorative only - don't rely on color alone for meaning
- Prefer text labels over color-only communication for accessibility
- Badge content should be concise (1-3 words typically)
        `.trim(),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: [
        'blue',
        'red',
        'green',
        'yellow',
        'purple',
        'orange',
        'pink',
        'emerald',
        'zinc',
        'slate',
        'gray',
        'neutral',
        'stone',
        'amber',
        'lime',
        'teal',
        'cyan',
        'sky',
        'indigo',
        'violet',
        'fuchsia',
        'rose',
      ],
      description: 'The color variant. Colors are culturally neutral with no semantic meaning.',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size variant affecting padding, text size, and icon dimensions.',
    },
    children: {
      control: 'text',
      description: 'The content displayed inside the badge. Can be text, icons, or mixed content.',
    },
    asChild: {
      control: 'boolean',
      description: 'When true, merges props with immediate child element instead of rendering a span.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    children: 'Badge',
    asChild: false,
  },
  // Global play function that runs for all stories
  play: async ({ canvasElement }) => {
    // Verify the component renders something
    await expect(canvasElement).not.toBeEmptyDOMElement()
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    color: 'blue',
    children: 'Default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic badge with default medium size and blue color.',
      },
    },
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4 bg-white  rounded-md">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Small</span>
        <Badge size="sm" color="blue">
          Small
        </Badge>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Medium</span>
        <Badge size="md" color="blue">
          Medium
        </Badge>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Large</span>
        <Badge size="lg" color="blue">
          Large
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Three size variants: small (xs text), medium (sm text), and large (base text) with appropriate padding and icon sizing.',
      },
    },
  },
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4 bg-white  rounded-md">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Blue</span>
        <Badge color="blue">Blue</Badge>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Red</span>
        <Badge color="red">Red</Badge>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Green</span>
        <Badge color="green">Green</Badge>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Yellow</span>
        <Badge color="yellow">Yellow</Badge>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Purple</span>
        <Badge color="purple">Purple</Badge>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Orange</span>
        <Badge color="orange">Orange</Badge>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Pink</span>
        <Badge color="pink">Pink</Badge>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Emerald</span>
        <Badge color="emerald">Emerald</Badge>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Sky</span>
        <Badge color="sky">Sky</Badge>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Violet</span>
        <Badge color="violet">Violet</Badge>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Rose</span>
        <Badge color="rose">Rose</Badge>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Zinc</span>
        <Badge color="zinc">Zinc</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive color palette with WCAG AAA contrast compliance. Colors are culturally neutral and carry no semantic meaning. All colors work perfectly in both light and dark themes.',
      },
    },
  },
}

// Story showcasing a badge with an icon
export const WithIcon: Story = {
  args: {
    color: 'blue',
    children: (
      <>
        <CheckCircle data-testid="badge-icon" />
        <span>Verified</span>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge with icon and text. Icons are automatically sized based on the badge size variant.',
      },
    },
  },
}

export const Counts: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4 bg-white  rounded-md">
      <Badge color="blue" size="sm">
        1
      </Badge>
      <Badge color="red" size="sm">
        99+
      </Badge>
    </div>
  ),
}

// Story showcasing the badge used as a link via asChild
export const AsLink: Story = {
  args: {
    asChild: true,
    color: 'purple',
    children: <a href="#">Link Badge</a>,
  },
  parameters: {
    docs: {
      description: {
        story:
          "The Badge can render as its child element (e.g., an `<a>` tag) using the `asChild` prop. This merges Badge styling with the child element's behavior and semantics. Note how hover and focus styles apply.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const link = canvas.getByRole('link')
    await expect(link).toBeInTheDocument()
  },
}

// Story showcasing the badge used as a button via asChild
export const AsButton: Story = {
  args: {
    asChild: true,
    color: 'green',
    children: (
      <button type="button" onClick={() => alert('Badge clicked!')}>
        Button Badge
      </button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'The Badge can also render as a button with proper interactive states. Includes hover, focus, and click behavior while maintaining Badge styling.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    await expect(button).toBeInTheDocument()
  },
}

// Story demonstrating interactive states
export const InteractiveStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4 bg-white  rounded-md">
      <div>
        <h3 className="text-sm font-medium mb-3">Static Badge (non-interactive)</h3>
        <Badge color="blue" size="md">
          Static Badge
        </Badge>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Link Badge (hover and focus)</h3>
        <Badge asChild color="purple">
          <a href="#" className="no-underline">
            Hover & Focus Me
          </a>
        </Badge>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Button Badge (hover, focus, and click)</h3>
        <Badge asChild color="green">
          <button type="button" onClick={() => alert('Clicked!')}>
            Click Me
          </button>
        </Badge>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Disabled Button Badge</h3>
        <Badge asChild color="gray">
          <button type="button" disabled>
            Disabled
          </button>
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Interactive states demonstration: static badges have no hover/focus styles, while link and button badges have proper interactive feedback with focus rings and hover effects.',
      },
    },
  },
}

// Story demonstrating edge case handling
export const EdgeCases: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 bg-white  rounded-md">
      <div>
        <h3 className="text-sm font-medium mb-2">Empty Badge (returns null in dev, shows console warning)</h3>
        <Badge color="blue">{/* Empty children */}</Badge>
        <p className="text-xs text-muted-foreground mt-1">Check console for warning message</p>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Badge with allowed child elements</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge asChild color="blue">
            <div>Div Badge</div>
          </Badge>
          <Badge asChild color="green">
            <span>Span Badge</span>
          </Badge>
          <Badge asChild color="purple">
            <a href="#">Link Badge</a>
          </Badge>
          <Badge asChild color="orange">
            <button type="button">Button Badge</button>
          </Badge>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">TypeScript will prevent invalid child elements</h3>
        <p className="text-xs text-muted-foreground">
          Try using asChild with invalid elements like {'<input>'} or {'<img>'} - TypeScript will show an error.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Edge cases and TypeScript safety: only div, span, a, and button elements are allowed with asChild for proper semantics and accessibility.',
      },
    },
  },
}
