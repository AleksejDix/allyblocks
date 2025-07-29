import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within, screen } from 'storybook/test'
import { useState } from 'react'
import { Icon } from '@/components/atoms/Icon'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from './Select'
import { waitFor } from '@testing-library/react'

const meta: Meta<typeof Select> = {
  component: Select,
  subcomponents: {
    SelectContent: SelectContent,
    SelectItem: SelectItem,
    SelectTrigger: SelectTrigger,
    SelectValue: SelectValue,
    SelectGroup: SelectGroup,
    SelectLabel: SelectLabel,
    SelectSeparator: SelectSeparator,
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'radio',
      options: ['single', 'multiple'],
      description: 'Selection mode - single or multiple',
      defaultValue: 'multiple',
    },
    value: {
      control: 'object',
      description: 'The value of the select (string for single mode, string[] for multiple mode)',
    },
    defaultValue: {
      control: 'object',
      description: 'The default value of the select',
    },
    onValueChange: {
      action: 'value changed',
      description: 'Callback when the selection changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the select is required',
    },
  },
}

export default meta

type Story = StoryObj<typeof Select>

const fruitOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Grape', value: 'grape' },
  { label: 'Strawberry', value: 'strawberry' },
]

export const InteractiveTest: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([])

    const handleValueChange = (newValues: string | string[]) => {
      console.log('Value changed:', newValues)
      setSelectedValues(newValues as string[])
    }

    return (
      <div className="p-4">
        <h3 className="font-medium mb-4">Interactive Select Test</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Selected: {selectedValues.length > 0 ? selectedValues.join(', ') : 'None'}
        </p>

        <Select value={selectedValues} onValueChange={handleValueChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select fruits..." />
            <Icon name="chevron-down" size={16} className="opacity-50" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {fruitOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="mt-4 text-xs text-muted-foreground">
          <p>Debug: Check browser console for selection events</p>
          <p>Values: {JSON.stringify(selectedValues)}</p>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive test to verify Select dropdown and selection functionality.',
      },
    },
  },
}

export const CustomTriggerText: Story = {
  render: () => (
    <Select defaultValue={['apple', 'orange']}>
      <SelectTrigger>
        <SelectValue placeholder="Select fruits" showSelectedLabels={false} selectedText="Fruits" />
        <Icon name="chevron-down" size={16} className="opacity-50" />
      </SelectTrigger>
      <SelectContent width="trigger">
        <SelectGroup>
          {fruitOptions.map((option) => (
            <SelectItem key={option.value} value={option.value} context={{ displayText: option.label }}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button')

    // Check that the trigger text shows the custom text
    await expect(trigger).toHaveTextContent('Fruits: 2')
  },
}

export const Default: Story = {
  render: (args) => {
    return (
      <Select {...args}>
        <SelectTrigger>
          <SelectValue placeholder="Select fruits" showSelectedLabels={true} maxDisplayItems={2} />
          <Icon name="chevron-down" size={16} className="opacity-50" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {fruitOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button')

    await expect(trigger).toBeInTheDocument()

    await userEvent.click(trigger)

    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument()
    })

    const appleOption = screen.getByRole('menuitemcheckbox', { name: 'Apple' })
    await userEvent.click(appleOption)

    await expect(trigger).toHaveTextContent('Apple')
  },
}

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger>
        <SelectValue placeholder="Disabled select" />
        <Icon name="chevron-down" size={16} className="opacity-50" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {fruitOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button')

    await expect(trigger).toBeDisabled()
  },
}

export const DisabledOptions: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Some options disabled" />
        <Icon name="chevron-down" size={16} className="opacity-50" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana" disabled>
            Banana (Unavailable)
          </SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="grape" disabled>
            Grape (Unavailable)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const Groups: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select fruits or vegetables" />
        <Icon name="chevron-down" size={16} className="opacity-50" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="broccoli">Broccoli</SelectItem>
          <SelectItem value="spinach">Spinach</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const Prefilled: Story = {
  render: () => {
    return (
      <Select defaultValue={['apple', 'orange']}>
        <SelectTrigger>
          <SelectValue placeholder="Select fruits" />
          <Icon name="chevron-down" size={16} className="opacity-50" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {fruitOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button')

    // Check that the trigger text shows the correct count
    await expect(trigger).toHaveTextContent('Apple, Orange')
  },
}

export const SelectionDisplay: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="font-medium mb-2">Show Selected Items (Default)</h3>
          <Select defaultValue={['apple', 'orange', 'grape']}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select fruits" showSelectedLabels={true} maxDisplayItems={2} />
              <Icon name="chevron-down" size={16} className="opacity-50" />
            </SelectTrigger>
            <SelectContent width="trigger">
              <SelectGroup>
                {fruitOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-1">Shows selected item labels with truncation</p>
        </div>

        <div>
          <h3 className="font-medium mb-2">Show More Items</h3>
          <Select defaultValue={['apple', 'orange', 'grape', 'strawberry']}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select fruits" showSelectedLabels={true} maxDisplayItems={3} />
              <Icon name="chevron-down" size={16} className="opacity-50" />
            </SelectTrigger>
            <SelectContent width="trigger">
              <SelectGroup>
                {fruitOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-1">Shows more selected items before truncating</p>
        </div>

        <div>
          <h3 className="font-medium mb-2">Count Only</h3>
          <Select defaultValue={['apple', 'orange', 'grape']}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select fruits" showSelectedLabels={false} selectedText="Selected" />
              <Icon name="chevron-down" size={16} className="opacity-50" />
            </SelectTrigger>
            <SelectContent width="trigger">
              <SelectGroup>
                {fruitOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-1">Shows only the count of selected items</p>
        </div>
      </div>
    )
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-medium mb-2">Small</h3>
        <Select>
          <SelectTrigger size="sm">
            <SelectValue placeholder="Select fruits" />
            <Icon name="chevron-down" size={16} className="opacity-50" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {fruitOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-medium mb-2">Medium (Default)</h3>
        <Select>
          <SelectTrigger size="default">
            <SelectValue placeholder="Select fruits" />
            <Icon name="chevron-down" size={16} className="opacity-50" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {fruitOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-medium mb-2">Large</h3>
        <Select>
          <SelectTrigger size="lg">
            <SelectValue placeholder="Select fruits" />
            <Icon name="chevron-down" size={16} className="opacity-50" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {fruitOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-medium mb-2">Default</h3>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select fruits" />
            <Icon name="chevron-down" size={16} className="opacity-50" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {fruitOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-medium mb-2">Ghost</h3>
        <Select>
          <SelectTrigger variant="ghost">
            <SelectValue placeholder="Select fruits" />
            <Icon name="chevron-down" size={16} className="opacity-50" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {fruitOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
}

export const Widths: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-medium mb-2">Auto Width (Default)</h3>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select fruits" />
            <Icon name="chevron-down" size={16} className="opacity-50" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {fruitOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-medium mb-2">Full Width</h3>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select fruits" />
            <Icon name="chevron-down" size={16} className="opacity-50" />
          </SelectTrigger>
          <SelectContent width="trigger">
            <SelectGroup>
              {fruitOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
}

export const Descriptions: Story = {
  render: () => {
    // Define options for better reuse
    const frameworks = [
      {
        value: 'react',
        label: 'React',
        description: 'A JavaScript library for building user interfaces',
      },
      {
        value: 'vue',
        label: 'Vue',
        description: 'Progressive JavaScript framework for building UIs',
      },
      {
        value: 'angular',
        label: 'Angular',
        description: 'Platform for building mobile and desktop web applications',
      },
      {
        value: 'svelte',
        label: 'Svelte',
        description: 'Compiler that creates reactive components',
      },
    ]

    return (
      <div className="space-y-4">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select with descriptions" />
            <Icon name="chevron-down" size={16} className="opacity-50" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {frameworks.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div>
                    <span className="font-medium line-clamp-1">{option.label}</span>
                    <span className="text-xs text-muted-foreground">{option.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <p className="text-sm text-muted-foreground">
          Items with descriptions provide additional context about each option. The trigger will show the option value
          when selected.
        </p>
      </div>
    )
  },
}

export const EmptyOptions: Story = {
  render: () => (
    <div className="max-w-sm space-y-4">
      <h3 className="text-sm font-medium">Empty state</h3>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="No options available" />
          <Icon name="chevron-down" size={16} className="opacity-50" />
        </SelectTrigger>
        <SelectContent width="trigger">
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <Icon name="x-circle" size={24} className="text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">No options available</p>
          </div>
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground">Custom empty state when no options are available</p>
    </div>
  ),
}

export const SingleSelection: Story = {
  render: () => {
    const [value, setValue] = useState<string>('')

    return (
      <div className="max-w-2xl space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Single Selection Mode</h3>
          <p className="text-sm text-muted-foreground">
            When mode="single", the component behaves like a traditional select with radio buttons.
          </p>

          <Select mode="single" value={value} onValueChange={(newValue) => setValue(newValue as string)}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a framework" />
              <Icon name="chevron-down" size={16} className="opacity-50" />
            </SelectTrigger>
            <SelectContent side="bottom" width="trigger">
              <SelectGroup>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="vue">Vue</SelectItem>
                <SelectItem value="angular">Angular</SelectItem>
                <SelectItem value="svelte">Svelte</SelectItem>
                <SelectItem value="solid">Solid</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="text-sm">
            <span className="font-medium">Selected value:</span>{' '}
            <code className="rounded bg-muted px-1.5 py-0.5">{value || 'none'}</code>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Multiple Selection Mode (Default)</h3>
          <p className="text-sm text-muted-foreground">
            When mode="multiple" or not specified, the component allows multiple selections with checkboxes.
          </p>

          <SelectExampleControlled />
        </div>
      </div>
    )
  },
}

// Helper component for controlled multiple selection example
function SelectExampleControlled() {
  const [value, setValue] = useState<string[]>(['react', 'typescript'])

  return (
    <>
      <Select value={value} onValueChange={(newValue) => setValue(newValue as string[])}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select technologies" />
          <Icon name="chevron-down" size={16} className="opacity-50" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="tailwind">Tailwind CSS</SelectItem>
            <SelectItem value="vite">Vite</SelectItem>
            <SelectItem value="storybook">Storybook</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="text-sm">
        <span className="font-medium">Selected values:</span>{' '}
        <code className="rounded bg-muted px-1.5 py-0.5">{value.join(', ') || 'none'}</code>
      </div>
    </>
  )
}
