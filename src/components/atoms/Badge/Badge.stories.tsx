import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@/components/atoms/Badge'
import { CheckCircle } from 'lucide-react' // Example icon
import { within, expect } from '@storybook/test'

const meta: Meta<typeof Badge> = {
  component: Badge,
  parameters: {},
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
      description: 'The color variant of the badge.',
    },
    children: {
      control: 'text',
      description: 'The content displayed inside the badge.',
    },
    asChild: {
      control: 'boolean',
      description: 'Merge the props and behavior of the component with its immediate child.',
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
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4 bg-white dark:bg-slate-900 rounded-md">
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
          'The Badge can render as its child element (e.g., an `<a>` tag) using the `asChild` prop. Note how hover styles apply.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const link = canvas.getByRole('link')
    await expect(link).toBeInTheDocument()
  },
}
