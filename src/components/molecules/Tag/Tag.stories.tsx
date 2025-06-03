import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Tag } from './Tag'
import { within, expect } from 'storybook/test'

const meta: Meta<typeof Tag> = {
  component: Tag,
  parameters: {
    docs: {
      description: {
        component: `
Tag component for removable labels, multi-selection, and document tagging.

## Features
- **Built on Badge**: Inherits all Badge color and size variants with WCAG AAA compliance
- **Removable**: X button for mouse users, Delete/Backspace for keyboard users  
- **Accessibility**: Proper ARIA labels, keyboard navigation, focus management
- **Flexible**: Optional remove functionality, custom remove labels
- **Performance**: Memoized component with optimized re-renders

## Use Cases
- Multi-selection interfaces (tag selectors, filters)
- Document and content tagging systems
- Hashtag displays in text editors
- Removable labels and categories
- Chip-based input components

## Keyboard Support
- **Tab**: Navigate to/from tag
- **Delete/Backspace**: Remove tag (when removable)
- **Enter/Space**: Focus remove button (when using Tab navigation)
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
      description: 'The tag content displayed inside.',
    },
    removable: {
      control: 'boolean',
      description: 'Whether the tag can be removed via X button or keyboard.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    removing: {
      control: 'boolean',
      description: 'Whether the tag is currently being removed (for animations).',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    removeLabel: {
      control: 'text',
      description: 'Accessibility label for the remove button.',
      table: {
        defaultValue: { summary: '"Remove tag"' },
      },
    },
    onRemove: {
      action: 'removed',
      description: 'Callback fired when tag is removed.',
    },
  },
  args: {
    children: 'Tag',
    removable: true,
    removing: false,
  },
}

export default meta
type Story = StoryObj<typeof Tag>

export const Default: Story = {
  args: {
    color: 'blue',
    children: 'React',
    onRemove: () => alert('Tag removed!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic removable tag with default styling. Click the X or focus and press Delete/Backspace.',
      },
    },
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-md">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Small</span>
        <Tag size="sm" color="blue" onRemove={() => alert('Small removed!')}>
          Small
        </Tag>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Medium</span>
        <Tag size="md" color="blue" onRemove={() => alert('Medium removed!')}>
          Medium
        </Tag>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Large</span>
        <Tag size="lg" color="blue" onRemove={() => alert('Large removed!')}>
          Large
        </Tag>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three size variants with proportional remove button sizing.',
      },
    },
  },
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4 bg-white dark:bg-slate-900 rounded-md">
      {['blue', 'red', 'green', 'yellow', 'purple', 'orange', 'pink', 'emerald', 'sky', 'violet', 'rose', 'zinc'].map(
        (color) => (
          <Tag key={color} color={color as any} onRemove={() => alert(`${color} tag removed!`)}>
            {color}
          </Tag>
        ),
      )}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Color variants showcase. All inherit WCAG AAA contrast compliance from Badge.',
      },
    },
  },
}

export const MultiSelection: Story = {
  render: () => {
    const [tags, setTags] = useState([
      { id: 1, label: 'React', color: 'blue' },
      { id: 2, label: 'TypeScript', color: 'purple' },
      { id: 3, label: 'Tailwind', color: 'cyan' },
      { id: 4, label: 'Storybook', color: 'pink' },
      { id: 5, label: 'Vite', color: 'yellow' },
    ])

    const removeTag = (id: number) => {
      setTags(tags.filter((tag) => tag.id !== id))
    }

    return (
      <div className="p-4 bg-white dark:bg-slate-900 rounded-md">
        <h3 className="text-sm font-medium mb-3">Selected Technologies:</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag
              key={tag.id}
              color={tag.color as any}
              onRemove={() => removeTag(tag.id)}
              removeLabel={`Remove ${tag.label}`}
            >
              {tag.label}
            </Tag>
          ))}
          {tags.length === 0 && <span className="text-muted-foreground text-sm">No tags selected</span>}
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive multi-selection example. Remove tags to see the dynamic behavior.',
      },
    },
  },
}

export const DocumentTagging: Story = {
  render: () => (
    <div className="space-y-4 p-4 bg-white dark:bg-slate-900 rounded-md">
      <div>
        <h3 className="text-sm font-medium mb-2">Document: "React Component Architecture"</h3>
        <div className="flex flex-wrap gap-2">
          <Tag size="sm" color="green" onRemove={() => alert('Removed #important')}>
            #important
          </Tag>
          <Tag size="sm" color="blue" onRemove={() => alert('Removed #frontend')}>
            #frontend
          </Tag>
          <Tag size="sm" color="purple" onRemove={() => alert('Removed #architecture')}>
            #architecture
          </Tag>
          <Tag size="sm" color="orange" onRemove={() => alert('Removed #review-needed')}>
            #review-needed
          </Tag>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">User Tags:</h3>
        <div className="flex flex-wrap gap-2">
          <Tag size="sm" color="slate" onRemove={() => alert('Removed work')}>
            work
          </Tag>
          <Tag size="sm" color="slate" onRemove={() => alert('Removed tutorial')}>
            tutorial
          </Tag>
          <Tag size="sm" color="slate" onRemove={() => alert('Removed reference')}>
            reference
          </Tag>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Document tagging system with categorized tags. Uses small size for compact display.',
      },
    },
  },
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4 bg-white dark:bg-slate-900 rounded-md">
      <div>
        <h3 className="text-sm font-medium mb-3">Removable (default)</h3>
        <Tag color="blue" onRemove={() => alert('Removed!')}>
          Hover & Focus me
        </Tag>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Non-removable</h3>
        <Tag color="gray" removable={false} onRemove={() => {}}>
          Read-only tag
        </Tag>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Removing state</h3>
        <Tag color="red" removing={true} onRemove={() => alert('Already removing...')}>
          Being removed...
        </Tag>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different tag states: removable (default), non-removable, and removing animation state.',
      },
    },
  },
}

export const KeyboardNavigation: Story = {
  render: () => (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-md">
      <h3 className="text-sm font-medium mb-3">Keyboard Navigation Test</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Try: Tab to navigate, Delete/Backspace to remove, Shift+Tab to go backwards
      </p>
      <div className="flex flex-wrap gap-2">
        <Tag color="blue" onRemove={() => alert('Tag 1 removed!')}>
          Tag 1
        </Tag>
        <Tag color="green" onRemove={() => alert('Tag 2 removed!')}>
          Tag 2
        </Tag>
        <Tag color="purple" onRemove={() => alert('Tag 3 removed!')}>
          Tag 3
        </Tag>
        <Tag color="orange" removable={false} onRemove={() => {}}>
          Non-removable
        </Tag>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Keyboard navigation demonstration. All tags are keyboard accessible with proper focus management.',
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const firstTag = canvas.getAllByRole('option')[0]
    await expect(firstTag).toBeInTheDocument()
    await expect(firstTag).toHaveAttribute('tabindex', '0')
  },
}
