import type { Meta, StoryObj } from '@storybook/react-vite'
import { Box } from './Box'

const meta: Meta<typeof Box> = {
  component: Box,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        // System colors
        'default',
        'muted',
        'primary',
        'secondary',
        'accent',
        'transparent',
        'card',
        'popover',
        'destructive',
        'sidebar',
        'sidebar-primary',
        'sidebar-accent',
        // Bright colors
        'blue',
        'red',
        'green',
        'yellow',
        'purple',
        'orange',
        'pink',
        'emerald',
        'teal',
        'cyan',
        'sky',
        'indigo',
        'violet',
        'fuchsia',
        'rose',
        'amber',
        'lime',
        // Neutral colors
        'zinc',
        'slate',
        'gray',
        'neutral',
        'stone',
      ],
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    width: {
      control: 'select',
      options: [
        'auto',
        'full',
        'screen',
        'min',
        'max',
        'fit',
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
      ],
    },
    height: {
      control: 'select',
      options: [
        'auto',
        'full',
        'screen',
        'min',
        'max',
        'fit',
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
      ],
    },
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'aside', 'main', 'header', 'footer'],
    },
  },
  args: {
    variant: 'default',
    shadow: 'none',
    width: 'auto',
    height: 'auto',
    as: 'div',
  },
}

export default meta
type Story = StoryObj<typeof Box>

export const Default: Story = {
  render: () => <Box className="p-4">Default Box</Box>,
}

// System Variants
export const SystemVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Box variant="default" className="p-4 text-center">
        Default
      </Box>
      <Box variant="muted" className="p-4 text-center">
        Muted
      </Box>
      <Box variant="primary" className="p-4 text-center text-primary-foreground">
        Primary
      </Box>
      <Box variant="secondary" className="p-4 text-center text-secondary-foreground">
        Secondary
      </Box>
      <Box variant="accent" className="p-4 text-center text-accent-foreground">
        Accent
      </Box>
      <Box variant="card" className="p-4 text-center">
        Card
      </Box>
      <Box variant="popover" className="p-4 text-center">
        Popover
      </Box>
      <Box variant="destructive" className="p-4 text-center text-destructive-foreground">
        Destructive
      </Box>
      <Box variant="sidebar" className="p-4 text-center">
        Sidebar
      </Box>
    </div>
  ),
}

// Bright Color Variants
export const BrightColors: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <Box variant="blue" className="p-4 text-center">
        Blue
      </Box>
      <Box variant="red" className="p-4 text-center">
        Red
      </Box>
      <Box variant="green" className="p-4 text-center">
        Green
      </Box>
      <Box variant="yellow" className="p-4 text-center">
        Yellow
      </Box>
      <Box variant="purple" className="p-4 text-center">
        Purple
      </Box>
      <Box variant="orange" className="p-4 text-center">
        Orange
      </Box>
      <Box variant="pink" className="p-4 text-center">
        Pink
      </Box>
      <Box variant="emerald" className="p-4 text-center">
        Emerald
      </Box>
      <Box variant="teal" className="p-4 text-center">
        Teal
      </Box>
      <Box variant="cyan" className="p-4 text-center">
        Cyan
      </Box>
      <Box variant="sky" className="p-4 text-center">
        Sky
      </Box>
      <Box variant="indigo" className="p-4 text-center">
        Indigo
      </Box>
      <Box variant="violet" className="p-4 text-center">
        Violet
      </Box>
      <Box variant="fuchsia" className="p-4 text-center">
        Fuchsia
      </Box>
      <Box variant="rose" className="p-4 text-center">
        Rose
      </Box>
      <Box variant="amber" className="p-4 text-center">
        Amber
      </Box>
      <Box variant="lime" className="p-4 text-center">
        Lime
      </Box>
    </div>
  ),
}

// Neutral Color Variants
export const NeutralColors: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-4">
      <Box variant="zinc" className="p-4 text-center">
        Zinc
      </Box>
      <Box variant="slate" className="p-4 text-center">
        Slate
      </Box>
      <Box variant="gray" className="p-4 text-center">
        Gray
      </Box>
      <Box variant="neutral" className="p-4 text-center">
        Neutral
      </Box>
      <Box variant="stone" className="p-4 text-center">
        Stone
      </Box>
    </div>
  ),
}

// Shadow Stories
export const Shadows: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8 p-8">
      <Box variant="card" shadow="none" className="p-4 text-center">
        No Shadow
      </Box>
      <Box variant="card" shadow="sm" className="p-4 text-center">
        Small Shadow
      </Box>
      <Box variant="card" shadow="md" className="p-4 text-center">
        Medium Shadow
      </Box>
      <Box variant="card" shadow="lg" className="p-4 text-center">
        Large Shadow
      </Box>
      <Box variant="card" shadow="xl" className="p-4 text-center">
        Extra Large Shadow
      </Box>
    </div>
  ),
}

// Width Stories
export const Widths: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <Box variant="blue" width="xs" className="p-2 text-center">
        XS Width
      </Box>
      <Box variant="green" width="sm" className="p-2 text-center">
        SM Width
      </Box>
      <Box variant="purple" width="md" className="p-2 text-center">
        MD Width
      </Box>
      <Box variant="orange" width="lg" className="p-2 text-center">
        LG Width
      </Box>
      <Box variant="pink" width="xl" className="p-2 text-center">
        XL Width
      </Box>
      <Box variant="cyan" width="2xl" className="p-2 text-center">
        2XL Width
      </Box>
    </div>
  ),
}

// Height Stories
export const Heights: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4">
      <Box variant="red" height="xs" className="p-2 text-center flex items-center justify-center">
        XS
      </Box>
      <Box variant="yellow" height="sm" className="p-2 text-center flex items-center justify-center">
        SM
      </Box>
      <Box variant="emerald" height="md" className="p-2 text-center flex items-center justify-center">
        MD
      </Box>
      <Box variant="sky" height="lg" className="p-2 text-center flex items-center justify-center">
        LG
      </Box>
      <Box variant="violet" height="xl" className="p-2 text-center flex items-center justify-center">
        XL
      </Box>
      <Box variant="rose" height="2xl" className="p-2 text-center flex items-center justify-center">
        2XL
      </Box>
    </div>
  ),
}

// Combined Example
export const Combined: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8">
      <Box
        variant="blue"
        shadow="lg"
        width="lg"
        height="md"
        className="p-4 text-center flex items-center justify-center"
      >
        Blue Box
        <br />
        Large Shadow
        <br />
        LG Width × MD Height
      </Box>
      <Box
        variant="emerald"
        shadow="md"
        width="xl"
        height="sm"
        className="p-4 text-center flex items-center justify-center"
      >
        Emerald Box
        <br />
        Medium Shadow
        <br />
        XL Width × SM Height
      </Box>
    </div>
  ),
}

// Color with Shadows
export const ColoredWithShadows: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 p-8">
      <Box variant="blue" shadow="lg" className="p-6 text-center">
        Blue with Shadow
      </Box>
      <Box variant="purple" shadow="lg" className="p-6 text-center">
        Purple with Shadow
      </Box>
      <Box variant="emerald" shadow="lg" className="p-6 text-center">
        Emerald with Shadow
      </Box>
      <Box variant="orange" shadow="lg" className="p-6 text-center">
        Orange with Shadow
      </Box>
      <Box variant="pink" shadow="lg" className="p-6 text-center">
        Pink with Shadow
      </Box>
      <Box variant="cyan" shadow="lg" className="p-6 text-center">
        Cyan with Shadow
      </Box>
    </div>
  ),
}

// Semantic HTML Elements
export const SemanticElements: Story = {
  render: () => (
    <div className="space-y-4">
      <Box as="header" variant="blue" className="p-4">
        Header Element
      </Box>
      <Box as="main" variant="card" shadow="sm" className="p-4">
        Main Content Area
      </Box>
      <Box as="aside" variant="zinc" className="p-4">
        Sidebar Content
      </Box>
      <Box as="section" variant="emerald" className="p-4">
        Section Element
      </Box>
      <Box as="footer" variant="slate" className="p-4">
        Footer Element
      </Box>
    </div>
  ),
}

// Interactive Playground
export const Playground: Story = {
  args: {
    variant: 'blue',
    shadow: 'md',
    width: 'lg',
    height: 'md',
    children: 'Customize me using the controls!',
    className: 'p-4 text-center flex items-center justify-center',
  },
}
