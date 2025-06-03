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

// Variant Stories
export const Variants: Story = {
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
      <Box variant="card" width="xs" className="p-2 text-center">
        XS Width
      </Box>
      <Box variant="card" width="sm" className="p-2 text-center">
        SM Width
      </Box>
      <Box variant="card" width="md" className="p-2 text-center">
        MD Width
      </Box>
      <Box variant="card" width="lg" className="p-2 text-center">
        LG Width
      </Box>
      <Box variant="card" width="xl" className="p-2 text-center">
        XL Width
      </Box>
      <Box variant="card" width="2xl" className="p-2 text-center">
        2XL Width
      </Box>
    </div>
  ),
}

// Height Stories
export const Heights: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4">
      <Box variant="card" height="xs" className="p-2 text-center flex items-center justify-center">
        XS
      </Box>
      <Box variant="card" height="sm" className="p-2 text-center flex items-center justify-center">
        SM
      </Box>
      <Box variant="card" height="md" className="p-2 text-center flex items-center justify-center">
        MD
      </Box>
      <Box variant="card" height="lg" className="p-2 text-center flex items-center justify-center">
        LG
      </Box>
      <Box variant="card" height="xl" className="p-2 text-center flex items-center justify-center">
        XL
      </Box>
      <Box variant="card" height="2xl" className="p-2 text-center flex items-center justify-center">
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
        variant="primary"
        shadow="lg"
        width="lg"
        height="md"
        className="p-4 text-center text-primary-foreground flex items-center justify-center"
      >
        Primary Card
        <br />
        Large Shadow
        <br />
        LG Width × MD Height
      </Box>
      <Box
        variant="destructive"
        shadow="md"
        width="xl"
        height="sm"
        className="p-4 text-center text-destructive-foreground flex items-center justify-center"
      >
        Destructive Alert
        <br />
        Medium Shadow
        <br />
        XL Width × SM Height
      </Box>
    </div>
  ),
}

// Semantic HTML Elements
export const SemanticElements: Story = {
  render: () => (
    <div className="space-y-4">
      <Box as="header" variant="primary" className="p-4 text-primary-foreground">
        Header Element
      </Box>
      <Box as="main" variant="card" shadow="sm" className="p-4">
        Main Content Area
      </Box>
      <Box as="aside" variant="muted" className="p-4">
        Sidebar Content
      </Box>
      <Box as="section" variant="secondary" className="p-4 text-secondary-foreground">
        Section Element
      </Box>
      <Box as="footer" variant="accent" className="p-4 text-accent-foreground">
        Footer Element
      </Box>
    </div>
  ),
}

// Interactive Playground
export const Playground: Story = {
  args: {
    variant: 'card',
    shadow: 'md',
    width: 'lg',
    height: 'md',
    children: 'Customize me using the controls!',
    className: 'p-4 text-center flex items-center justify-center',
  },
}
