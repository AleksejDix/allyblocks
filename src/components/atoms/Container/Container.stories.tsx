import type { Meta, StoryObj } from '@storybook/react-vite'
import { Container } from './Container'

const meta: Meta<typeof Container> = {
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Maximum width of the container',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Horizontal padding for the container',
    },
    centered: {
      control: 'boolean',
      description: 'Whether to center the container horizontally',
    },
    as: {
      control: 'text',
      description: 'The HTML element to render as',
    },
    className: {
      control: 'text',
      description: 'Custom className to apply',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Sample content for demonstrations
const SampleContent = () => (
  <div className="space-y-4">
    <h1 className="text-3xl font-bold text-gray-900">Container Example</h1>
    <p className="text-gray-600 leading-relaxed">
      This is sample content inside a container. The container provides responsive max-widths and centers the content
      horizontally. You can customize the size, padding, and centering behavior.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-blue-100 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900">Feature 1</h3>
        <p className="text-blue-700 text-sm">Some feature description</p>
      </div>
      <div className="bg-green-100 p-4 rounded-lg">
        <h3 className="font-semibold text-green-900">Feature 2</h3>
        <p className="text-green-700 text-sm">Another feature description</p>
      </div>
      <div className="bg-purple-100 p-4 rounded-lg">
        <h3 className="font-semibold text-purple-900">Feature 3</h3>
        <p className="text-purple-700 text-sm">Third feature description</p>
      </div>
    </div>
  </div>
)

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50">
      <Container>
        <SampleContent />
      </Container>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50 space-y-8 py-8">
      <Container size="sm">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-2">Small Container (sm)</h2>
          <p className="text-gray-600">Max width: 640px</p>
        </div>
      </Container>

      <Container size="md">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-2">Medium Container (md)</h2>
          <p className="text-gray-600">Max width: 768px</p>
        </div>
      </Container>

      <Container size="lg">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-2">Large Container (lg)</h2>
          <p className="text-gray-600">Max width: 1024px</p>
        </div>
      </Container>

      <Container size="xl">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-2">Extra Large Container (xl)</h2>
          <p className="text-gray-600">Max width: 1280px</p>
        </div>
      </Container>

      <Container size="2xl">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-2">2X Large Container (2xl)</h2>
          <p className="text-gray-600">Max width: 1536px</p>
        </div>
      </Container>

      <Container size="full">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-2">Full Width Container</h2>
          <p className="text-gray-600">Max width: 100%</p>
        </div>
      </Container>
    </div>
  ),
}

export const Padding: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50 space-y-8 py-8">
      <Container padding="none">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-2">No Padding</h2>
          <p className="text-gray-600">Container touches the edges</p>
        </div>
      </Container>

      <Container padding="sm">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-2">Small Padding</h2>
          <p className="text-gray-600">16px horizontal padding</p>
        </div>
      </Container>

      <Container padding="md">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-2">Medium Padding (Default)</h2>
          <p className="text-gray-600">24px horizontal padding</p>
        </div>
      </Container>

      <Container padding="lg">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-2">Large Padding</h2>
          <p className="text-gray-600">32px horizontal padding</p>
        </div>
      </Container>

      <Container padding="xl">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-2">Extra Large Padding</h2>
          <p className="text-gray-600">48px horizontal padding</p>
        </div>
      </Container>
    </div>
  ),
}

export const Centering: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50 space-y-8 py-8">
      <Container centered={true} size="md">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-2">Centered Container (Default)</h2>
          <p className="text-gray-600">Container is centered horizontally with mx-auto</p>
        </div>
      </Container>

      <Container centered={false} size="md">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-2">Non-Centered Container</h2>
          <p className="text-gray-600">Container aligns to the left without mx-auto</p>
        </div>
      </Container>
    </div>
  ),
}

export const SemanticElements: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50 space-y-8 py-8">
      <Container as="header">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h1 className="text-2xl font-bold mb-2">Header Container</h1>
          <p className="text-gray-600">Rendered as a &lt;header&gt; element</p>
        </div>
      </Container>

      <Container as="main">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h1 className="text-2xl font-bold mb-2">Main Container</h1>
          <p className="text-gray-600">Rendered as a &lt;main&gt; element</p>
        </div>
      </Container>

      <Container as="section">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-2">Section Container</h2>
          <p className="text-gray-600">Rendered as a &lt;section&gt; element</p>
        </div>
      </Container>

      <Container as="footer">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-2">Footer Container</h2>
          <p className="text-gray-600">Rendered as a &lt;footer&gt; element</p>
        </div>
      </Container>
    </div>
  ),
}

export const ResponsiveLayout: Story = {
  render: () => (
    <Container>
      <div className="space-y-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h1 className="text-3xl font-bold mb-4">Responsive Layout Example</h1>
          <p className="text-gray-600 mb-6">
            This container uses Tailwind's responsive container behavior. It automatically adjusts its max-width based
            on the screen size.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-lg">
                <h3 className="font-semibold text-indigo-900 mb-2">Card {i + 1}</h3>
                <p className="text-indigo-700 text-sm">Responsive grid item that adapts to container width</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  ),
}
