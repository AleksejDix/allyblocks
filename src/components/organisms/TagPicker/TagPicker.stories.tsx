import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { TagPicker } from './TagPicker'
import { Badge } from '@/components/atoms/Badge'
import { within, expect } from 'storybook/test'

const meta: Meta<typeof TagPicker> = {
  component: TagPicker,
  parameters: {
    docs: {
      description: {
        component: `
TagPicker component for selecting multiple options as removable tags.

## Features
- **MultiSelect Integration**: Built on top of our MultiSelect component
- **Tag Display**: Selected options appear as removable tags
- **Overflow Handling**: Shows "+N more" when exceeding maxVisibleTags
- **Customizable**: Tag colors, sizes, and custom rendering
- **Accessible**: Full keyboard navigation and screen reader support
- **Flexible**: Can disable dropdown or tag removal independently

## Use Cases
- User/team member selection
- Technology stack selection  
- Category/label assignment
- Filter selection interfaces
- Multi-criteria search builders

## Keyboard Support
- **Tab**: Navigate to dropdown trigger
- **Enter/Space**: Open dropdown when focused
- **Arrow keys**: Navigate dropdown options
- **Enter/Space**: Select/deselect options
- **Escape**: Close dropdown
- **Tab**: Navigate to tag remove buttons
- **Enter/Space**: Remove individual tags
        `.trim(),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant for tags and trigger button',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the trigger button',
    },
    maxVisibleTags: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Maximum number of tags to show before overflow indicator',
    },
    removableTags: {
      control: 'boolean',
      description: 'Whether tags can be removed',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showDropdown: {
      control: 'boolean',
      description: 'Whether to show the selection dropdown',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the entire component is disabled',
    },
    onValueChange: {
      action: 'valueChanged',
      description: 'Callback when selected values change',
    },
  },
}

export default meta
type Story = StoryObj<typeof TagPicker>

// Sample data
const technologyOptions = [
  { value: 'react', label: 'React', color: 'blue' as const },
  { value: 'vue', label: 'Vue.js', color: 'green' as const },
  { value: 'angular', label: 'Angular', color: 'red' as const },
  { value: 'svelte', label: 'Svelte', color: 'orange' as const },
  { value: 'typescript', label: 'TypeScript', color: 'purple' as const },
  { value: 'javascript', label: 'JavaScript', color: 'yellow' as const },
  { value: 'python', label: 'Python', color: 'cyan' as const },
  { value: 'rust', label: 'Rust', color: 'slate' as const },
  { value: 'go', label: 'Go', color: 'teal' as const },
  { value: 'java', label: 'Java', color: 'amber' as const },
]

const userOptions = [
  { value: 'bryan', label: 'Bryan', color: 'blue' as const },
  { value: 'nancy', label: 'Nancy', color: 'purple' as const },
  { value: 'alice', label: 'Alice', color: 'green' as const },
  { value: 'eugenia', label: 'Eugenia', color: 'pink' as const },
  { value: 'linda', label: 'Linda', color: 'orange' as const },
  { value: 'lloyd', label: 'Lloyd', color: 'cyan' as const },
  { value: 'julia', label: 'Julia', color: 'red' as const },
  { value: 'albert', label: 'Albert', color: 'violet' as const },
]

export const Default: Story = {
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState(['react', 'typescript'])

    return <TagPicker {...args} value={selectedValues} onValueChange={setSelectedValues} />
  },
  args: {
    options: technologyOptions,
    placeholder: 'Select technologies...',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic TagPicker with technology options. Tags are removable and new selections can be made from the dropdown.',
      },
    },
  },
}

export const Sizes: Story = {
  render: () => {
    const [smallValues, setSmallValues] = useState(['react', 'typescript'])
    const [mediumValues, setMediumValues] = useState(['react', 'typescript'])
    const [largeValues, setLargeValues] = useState(['react', 'typescript'])

    return (
      <div className="space-y-6 p-4 bg-white dark:bg-slate-900 rounded-md">
        <div>
          <h3 className="text-sm font-medium mb-2">Small</h3>
          <TagPicker
            size="sm"
            options={technologyOptions.slice(0, 5)}
            value={smallValues}
            onValueChange={setSmallValues}
            placeholder="Small size..."
          />
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Medium (Default)</h3>
          <TagPicker
            size="md"
            options={technologyOptions.slice(0, 5)}
            value={mediumValues}
            onValueChange={setMediumValues}
            placeholder="Medium size..."
          />
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Large</h3>
          <TagPicker
            size="lg"
            options={technologyOptions.slice(0, 5)}
            value={largeValues}
            onValueChange={setLargeValues}
            placeholder="Large size..."
          />
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Three size variants with proportional tags and trigger buttons.',
      },
    },
  },
}

export const UserSelection: Story = {
  render: () => {
    const [selectedUsers, setSelectedUsers] = useState(['bryan', 'nancy', 'alice'])

    return (
      <div className="p-4 bg-white dark:bg-slate-900 rounded-md">
        <h3 className="text-sm font-medium mb-3">Team Members</h3>
        <TagPicker
          options={userOptions}
          value={selectedUsers}
          onValueChange={setSelectedUsers}
          placeholder="Select team members..."
          removeLabel="Remove user"
        />
        <div className="mt-4 text-xs text-muted-foreground">Selected: {selectedUsers.length} users</div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive user selection example. Add and remove team members dynamically.',
      },
    },
  },
}

export const OverflowHandling: Story = {
  render: () => {
    const [values1, setValues1] = useState(['react', 'vue', 'angular', 'typescript', 'python', 'rust'])
    const [values2, setValues2] = useState(['react', 'vue', 'angular', 'typescript', 'python', 'rust'])

    return (
      <div className="space-y-6 p-4 bg-white dark:bg-slate-900 rounded-md">
        <div>
          <h3 className="text-sm font-medium mb-2">Max 3 visible tags</h3>
          <TagPicker
            options={technologyOptions}
            value={values1}
            onValueChange={setValues1}
            maxVisibleTags={3}
            placeholder="Many technologies selected..."
          />
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Max 5 visible tags</h3>
          <TagPicker
            options={technologyOptions}
            value={values2}
            onValueChange={setValues2}
            maxVisibleTags={5}
            placeholder="Many technologies selected..."
          />
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Overflow handling when many options are selected. Shows "+N more" indicator.',
      },
    },
  },
}

export const CustomTagRendering: Story = {
  render: () => {
    const [selectedUsers, setSelectedUsers] = useState(['bryan', 'nancy', 'alice'])

    return (
      <div className="p-4 bg-white dark:bg-slate-900 rounded-md">
        <h3 className="text-sm font-medium mb-3">Custom Tag Rendering</h3>
        <TagPicker
          options={userOptions}
          value={selectedUsers}
          onValueChange={setSelectedUsers}
          placeholder="Select team members..."
          renderTag={(option, onRemove) => (
            <Badge key={option.value} color={option.color} className="flex items-center gap-1 pr-1">
              <span>👤 {option.label}</span>
              <button
                onClick={onRemove}
                className="ml-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-sm p-0.5"
                aria-label={`Remove ${option.label}`}
              >
                ×
              </button>
            </Badge>
          )}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom tag rendering with user icons and custom remove buttons.',
      },
    },
  },
}

export const ReadOnlyMode: Story = {
  render: () => {
    const [nonRemovableValues, setNonRemovableValues] = useState(['react', 'typescript', 'python'])
    const [noDropdownValues, setNoDropdownValues] = useState(['react', 'typescript', 'python'])
    const [displayOnlyValues] = useState(['react', 'typescript', 'python'])

    return (
      <div className="space-y-6 p-4 bg-white dark:bg-slate-900 rounded-md">
        <div>
          <h3 className="text-sm font-medium mb-2">Non-removable tags</h3>
          <TagPicker
            options={technologyOptions}
            value={nonRemovableValues}
            onValueChange={setNonRemovableValues}
            removableTags={false}
            placeholder="Technologies..."
          />
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">No dropdown</h3>
          <TagPicker
            options={technologyOptions}
            value={noDropdownValues}
            onValueChange={setNoDropdownValues}
            showDropdown={false}
            placeholder="Technologies..."
          />
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Display only</h3>
          <TagPicker
            options={technologyOptions}
            value={displayOnlyValues}
            onValueChange={() => {}} // No-op for display only
            removableTags={false}
            showDropdown={false}
            placeholder="Technologies..."
          />
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Read-only modes: non-removable tags, no dropdown, or display-only.',
      },
    },
  },
}

export const EmptyStates: Story = {
  render: () => {
    const [noSelectionValues, setNoSelectionValues] = useState<string[]>([])
    const [disabledValues] = useState(['react', 'typescript'])

    return (
      <div className="space-y-6 p-4 bg-white dark:bg-slate-900 rounded-md">
        <div>
          <h3 className="text-sm font-medium mb-2">No selection</h3>
          <TagPicker
            options={technologyOptions}
            value={noSelectionValues}
            onValueChange={setNoSelectionValues}
            placeholder="Select technologies..."
          />
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">No options available</h3>
          <TagPicker
            options={[]}
            value={[]}
            onValueChange={() => {}}
            placeholder="No options..."
            emptyText="No technologies available"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Disabled state</h3>
          <TagPicker
            options={technologyOptions}
            value={disabledValues}
            onValueChange={() => {}}
            disabled
            placeholder="Disabled..."
          />
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty states: no selection, no options, and disabled state.',
      },
    },
  },
}

export const AccessibilityTest: Story = {
  render: () => {
    const [accessibilityValues, setAccessibilityValues] = useState(['bryan', 'nancy'])

    return (
      <div className="p-4 bg-white dark:bg-slate-900 rounded-md">
        <h3 className="text-sm font-medium mb-3">Accessibility Test</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Try: Tab to navigate, Enter/Space to interact, Arrow keys in dropdown
        </p>
        <TagPicker
          options={userOptions.slice(0, 5)}
          value={accessibilityValues}
          onValueChange={setAccessibilityValues}
          placeholder="Select team members..."
          removeLabel="Remove team member"
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Accessibility testing with proper ARIA labels and keyboard navigation.',
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)

    // Check for accessible trigger button (the main dropdown trigger)
    const trigger = canvas.getByRole('button', { expanded: false })
    await expect(trigger).toBeInTheDocument()

    // Check for tag remove buttons
    const removeButtons = canvas.getAllByLabelText(/remove/i)
    await expect(removeButtons.length).toBeGreaterThan(0)
  },
}
