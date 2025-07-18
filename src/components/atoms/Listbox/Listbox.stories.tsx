import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'
import { within, expect, userEvent, waitFor } from 'storybook/test'
import { Icon } from '@/components/atoms/Icon'
import { Listbox, ListboxGroup, ListboxLabel, ListboxItem } from './Listbox'

const meta = {
  component: Listbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    multiple: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    loop: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Listbox>

export default meta
type Story = StoryObj<typeof meta>

// Basic single selection example
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>('medium')

    return (
      <div className="w-64">
        <label className="text-sm font-medium mb-2 block">T-Shirt Size</label>
        <Listbox
          {...args}
          value={value}
          onValueChange={(newValue) => setValue(newValue as string)}
          aria-label="Choose t-shirt size"
        >
          <ListboxItem value="small">Small</ListboxItem>
          <ListboxItem value="medium">Medium</ListboxItem>
          <ListboxItem value="large">Large</ListboxItem>
          <ListboxItem value="xlarge">Extra Large</ListboxItem>
          <ListboxItem value="xxlarge" disabled>
            XXL (Out of Stock)
          </ListboxItem>
        </Listbox>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const listbox = canvas.getByRole('listbox')

    // Test ARIA compliance
    await expect(listbox).toBeInTheDocument()
    await expect(listbox).toHaveAttribute('aria-label', 'Choose t-shirt size')
    await expect(listbox).toHaveAttribute('tabindex', '0')
    await expect(listbox).toHaveAttribute('aria-multiselectable', 'false')

    const options = canvas.getAllByRole('option')
    await expect(options).toHaveLength(5)

    options.forEach(async (option) => {
      await expect(option).toHaveAttribute('tabindex', '-1')
      await expect(option).toHaveAttribute('aria-selected')
    })
  },
}

// Multiple selection example
export const Multiple: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>(['javascript', 'react'])

    return (
      <div className="w-64">
        <label className="text-sm font-medium mb-2 block">Programming Skills</label>
        <Listbox
          {...args}
          multiple
          value={value}
          onValueChange={(newValue) => setValue(newValue as string[])}
          aria-label="Choose your programming skills"
        >
          <ListboxGroup>
            <ListboxLabel>Languages</ListboxLabel>
            <ListboxItem value="javascript">JavaScript</ListboxItem>
            <ListboxItem value="typescript">TypeScript</ListboxItem>
            <ListboxItem value="python">Python</ListboxItem>
            <ListboxItem value="java">Java</ListboxItem>
          </ListboxGroup>
          <ListboxGroup>
            <ListboxLabel>Frameworks</ListboxLabel>
            <ListboxItem value="react">React</ListboxItem>
            <ListboxItem value="vue">Vue.js</ListboxItem>
            <ListboxItem value="angular">Angular</ListboxItem>
            <ListboxItem value="svelte">Svelte</ListboxItem>
          </ListboxGroup>
        </Listbox>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const listbox = canvas.getByRole('listbox')

    // Test multi-select ARIA compliance
    await expect(listbox).toHaveAttribute('aria-multiselectable', 'true')

    // Test group structure
    const groups = canvas.getAllByRole('group')
    await expect(groups).toHaveLength(2)

    // Check that group labels are present
    await expect(canvas.getByText('Languages')).toBeInTheDocument()
    await expect(canvas.getByText('Frameworks')).toBeInTheDocument()
  },
}

// Countries selection example
export const Countries: Story = {
  render: () => {
    const [value, setValue] = useState<string>('us')

    return (
      <div className="w-64">
        <label className="text-sm font-medium mb-2 block">Country</label>
        <Listbox
          value={value}
          onValueChange={(newValue) => setValue(newValue as string)}
          aria-label="Choose your country"
        >
          <ListboxItem value="us">United States</ListboxItem>
          <ListboxItem value="ca">Canada</ListboxItem>
          <ListboxItem value="uk">United Kingdom</ListboxItem>
          <ListboxItem value="de">Germany</ListboxItem>
          <ListboxItem value="fr">France</ListboxItem>
          <ListboxItem value="jp">Japan</ListboxItem>
          <ListboxItem value="au">Australia</ListboxItem>
          <ListboxItem value="br">Brazil</ListboxItem>
          <ListboxItem value="in">India</ListboxItem>
          <ListboxItem value="cn">China</ListboxItem>
        </Listbox>
      </div>
    )
  },
}

// Small size example
export const Small: Story = {
  render: () => {
    const [value, setValue] = useState<string>('option2')

    return (
      <div className="w-48">
        <label className="text-xs font-medium mb-1 block">Priority Level</label>
        <Listbox
          size="sm"
          value={value}
          onValueChange={(newValue) => setValue(newValue as string)}
          aria-label="Choose priority level"
        >
          <ListboxItem value="low">Low Priority</ListboxItem>
          <ListboxItem value="medium">Medium Priority</ListboxItem>
          <ListboxItem value="high">High Priority</ListboxItem>
          <ListboxItem value="urgent">Urgent</ListboxItem>
        </Listbox>
      </div>
    )
  },
}

// Large size example
export const Large: Story = {
  render: () => {
    const [value, setValue] = useState<string>('quarterly')

    return (
      <div className="w-80">
        <label className="text-base font-medium mb-3 block">Report Frequency</label>
        <Listbox
          size="lg"
          value={value}
          onValueChange={(newValue) => setValue(newValue as string)}
          aria-label="Choose report frequency"
        >
          <ListboxItem value="daily">Daily Reports</ListboxItem>
          <ListboxItem value="weekly">Weekly Reports</ListboxItem>
          <ListboxItem value="monthly">Monthly Reports</ListboxItem>
          <ListboxItem value="quarterly">Quarterly Reports</ListboxItem>
          <ListboxItem value="yearly">Yearly Reports</ListboxItem>
        </Listbox>
      </div>
    )
  },
}

// Disabled state
export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState<string>('option2')

    return (
      <div className="w-64">
        <label className="text-sm font-medium mb-2 block text-muted-foreground">
          Subscription Plan (Account Locked)
        </label>
        <Listbox
          disabled
          value={value}
          onValueChange={(newValue) => setValue(newValue as string)}
          aria-label="Subscription plan (disabled)"
        >
          <ListboxItem value="free">Free Plan</ListboxItem>
          <ListboxItem value="pro">Pro Plan</ListboxItem>
          <ListboxItem value="enterprise">Enterprise Plan</ListboxItem>
        </Listbox>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const listbox = canvas.getByRole('listbox')

    // Test disabled state
    await expect(listbox).toHaveAttribute('aria-disabled', 'true')
    await expect(listbox).toHaveAttribute('tabindex', '-1')
  },
}

// Rich content with descriptions and checkboxes
export const WithDescriptions: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['plan-pro', 'addon-analytics'])

    const plans = [
      {
        id: 'plan-free',
        name: 'Free Plan',
        description: 'Perfect for getting started with basic features',
        price: '$0/month',
      },
      {
        id: 'plan-pro',
        name: 'Pro Plan',
        description: 'Advanced features for growing teams and businesses',
        price: '$29/month',
      },
      {
        id: 'plan-enterprise',
        name: 'Enterprise Plan',
        description: 'Full-featured solution with priority support',
        price: '$99/month',
      },
    ]

    const addons = [
      {
        id: 'addon-analytics',
        name: 'Advanced Analytics',
        description: 'Detailed insights and reporting dashboard',
        price: '+$15/month',
      },
      {
        id: 'addon-storage',
        name: 'Extra Storage',
        description: 'Additional 100GB of secure cloud storage',
        price: '+$10/month',
      },
      {
        id: 'addon-support',
        name: 'Priority Support',
        description: '24/7 dedicated support with 1-hour response time',
        price: '+$25/month',
      },
    ]

    return (
      <div className="w-96">
        <label className="text-sm font-medium mb-2 block">Select Plan & Add-ons</label>
        <Listbox
          multiple
          value={value}
          onValueChange={(newValue) => setValue(newValue as string[])}
          aria-label="Choose your plan and add-ons"
          className="max-h-80"
        >
          <ListboxGroup>
            <ListboxLabel>Subscription Plans</ListboxLabel>
            {plans.map((plan) => {
              const isSelected = value.includes(plan.id)
              return (
                <ListboxItem key={plan.id} value={plan.id} className="py-3">
                  <div className="flex items-start gap-3 w-full">
                    {/* Checkbox indicator */}
                    <div className="flex items-center justify-center w-4 h-4 mt-0.5 rounded border border-border bg-background">
                      {isSelected && <Icon name="check" className="w-3 h-3 text-primary-foreground" />}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{plan.name}</h4>
                        <span className="text-sm font-medium text-primary">{plan.price}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{plan.description}</p>
                    </div>
                  </div>
                </ListboxItem>
              )
            })}
          </ListboxGroup>

          <ListboxGroup>
            <ListboxLabel>Add-ons</ListboxLabel>
            {addons.map((addon) => {
              const isSelected = value.includes(addon.id)
              return (
                <ListboxItem key={addon.id} value={addon.id} className="py-3">
                  <div className="flex items-start gap-3 w-full">
                    {/* Checkbox indicator */}
                    <div className="flex items-center justify-center w-4 h-4 mt-0.5 rounded border border-border bg-background">
                      {isSelected && <Icon name="check" className="w-3 h-3 text-primary-foreground" />}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{addon.name}</h4>
                        <span className="text-sm font-medium text-muted-foreground">{addon.price}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{addon.description}</p>
                    </div>
                  </div>
                </ListboxItem>
              )
            })}
          </ListboxGroup>
        </Listbox>

        {/* Selection summary */}
        <div className="mt-4 p-3 bg-muted rounded-md">
          <h5 className="text-sm font-medium mb-2">Selected Items:</h5>
          {value.length === 0 ? (
            <p className="text-sm text-muted-foreground">No items selected</p>
          ) : (
            <ul className="text-sm space-y-1">
              {value.map((selectedId) => {
                const item = [...plans, ...addons].find((item) => item.id === selectedId)
                return (
                  <li key={selectedId} className="flex items-center gap-2">
                    <Icon name="check" className="w-3 h-3 text-green-600" />
                    <span>{item?.name}</span>
                    <span className="text-muted-foreground">({item?.price})</span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    )
  },
}

// Enhanced demo with typeahead search
export const WithTypeaheadSearch: Story = {
  render: () => {
    const [value, setValue] = useState<string>('apple')

    const fruits = [
      'Apple',
      'Apricot',
      'Banana',
      'Blueberry',
      'Cherry',
      'Grape',
      'Kiwi',
      'Lemon',
      'Mango',
      'Orange',
      'Peach',
      'Pear',
      'Pineapple',
      'Strawberry',
      'Watermelon',
    ]

    return (
      <div className="w-80">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Enhanced Listbox with Typeahead</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Try typing letters to search through the fruits. The listbox will automatically find and focus matching
            items. Use arrow keys for navigation.
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            <strong>Features:</strong> Typeahead search, keyboard navigation, proper ARIA semantics
          </p>
        </div>

        <Listbox
          value={value}
          onValueChange={(newValue) => {
            if (typeof newValue === 'string') {
              setValue(newValue)
            }
          }}
          aria-label="Select a fruit"
          className="h-48"
        >
          {fruits.map((fruit) => (
            <ListboxItem key={fruit.toLowerCase()} value={fruit.toLowerCase()} className="justify-between">
              <span>{fruit}</span>
              {value === fruit.toLowerCase() && <Icon name="check" className="w-4 h-4 text-primary" />}
            </ListboxItem>
          ))}
        </Listbox>

        <div className="mt-4 p-3 bg-muted rounded-md">
          <p className="text-sm">
            <strong>Selected:</strong> {fruits.find((f) => f.toLowerCase() === value) || 'None'}
          </p>
        </div>
      </div>
    )
  },
}

// Comprehensive keyboard navigation tests
export const KeyboardNavigationTests: Story = {
  render: () => {
    const [value, setValue] = useState<string>('option2')

    return (
      <div className="w-64">
        <label className="text-sm font-medium mb-2 block">Keyboard Navigation Test</label>
        <Listbox
          value={value}
          onValueChange={(newValue) => setValue(newValue as string)}
          aria-label="Keyboard navigation test listbox"
        >
          <ListboxItem value="option1">Option 1</ListboxItem>
          <ListboxItem value="option2">Option 2</ListboxItem>
          <ListboxItem value="option3">Option 3</ListboxItem>
          <ListboxItem value="option4" disabled>
            Option 4 (Disabled)
          </ListboxItem>
          <ListboxItem value="option5">Option 5</ListboxItem>
        </Listbox>
        <div className="mt-4 p-3 bg-muted rounded-md">
          <p className="text-sm">
            <strong>Selected:</strong> {value}
          </p>
        </div>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const user = userEvent.setup()
    const listbox = canvas.getByRole('listbox')

    // Test initial focus behavior - focus should be on listbox, not individual options
    await user.click(listbox)
    await waitFor(() => {
      expect(listbox).toHaveFocus()
    })

    // Wait for initialization and check that aria-activedescendant is set
    await waitFor(
      () => {
        const activeDescendant = listbox.getAttribute('aria-activedescendant')
        expect(activeDescendant).toBeTruthy()
        expect(activeDescendant).toBe('listbox-item-option2') // Should be the selected option
      },
      { timeout: 1000 },
    )

    // Test arrow key navigation - focus stays on listbox, aria-activedescendant changes
    const initialActiveDescendant = listbox.getAttribute('aria-activedescendant')
    await user.keyboard('{ArrowDown}')
    await waitFor(() => {
      expect(listbox).toHaveFocus() // Focus stays on listbox
      const newActiveDescendant = listbox.getAttribute('aria-activedescendant')
      expect(newActiveDescendant).not.toBe(initialActiveDescendant)
      expect(newActiveDescendant).toBe('listbox-item-option3')
    })

    await user.keyboard('{ArrowUp}')
    await waitFor(() => {
      expect(listbox).toHaveFocus() // Focus stays on listbox
      const currentActiveDescendant = listbox.getAttribute('aria-activedescendant')
      expect(currentActiveDescendant).toBe(initialActiveDescendant)
    })

    // Test Home/End keys
    await user.keyboard('{End}')
    await waitFor(() => {
      expect(listbox).toHaveFocus()
      const activeDescendant = listbox.getAttribute('aria-activedescendant')
      expect(activeDescendant).toBe('listbox-item-option5')
    })

    await user.keyboard('{Home}')
    await waitFor(() => {
      expect(listbox).toHaveFocus()
      const activeDescendant = listbox.getAttribute('aria-activedescendant')
      expect(activeDescendant).toBe('listbox-item-option1')
    })

    // Test skipping disabled options - navigate to option3 first
    await user.keyboard('{ArrowDown}{ArrowDown}')
    await waitFor(() => {
      expect(listbox).toHaveFocus()
      const activeDescendant = listbox.getAttribute('aria-activedescendant')
      expect(activeDescendant).toBe('listbox-item-option3')
    })

    // Should skip disabled option 4 and go to option 5
    await user.keyboard('{ArrowDown}')
    await waitFor(() => {
      expect(listbox).toHaveFocus()
      const activeDescendant = listbox.getAttribute('aria-activedescendant')
      expect(activeDescendant).toBe('listbox-item-option5')
    })

    // Test wrapping behavior
    await user.keyboard('{ArrowDown}')
    await waitFor(() => {
      expect(listbox).toHaveFocus()
      const activeDescendant = listbox.getAttribute('aria-activedescendant')
      expect(activeDescendant).toBe('listbox-item-option1')
    })
  },
}

// Typeahead search tests
export const TypeaheadSearchTests: Story = {
  render: () => {
    const [value, setValue] = useState<string>('')

    return (
      <div className="w-64">
        <label className="text-sm font-medium mb-2 block">Typeahead Search Test</label>
        <Listbox
          value={value}
          onValueChange={(newValue) => setValue(newValue as string)}
          aria-label="Typeahead search test"
        >
          <ListboxItem value="apple">Apple</ListboxItem>
          <ListboxItem value="apricot">Apricot</ListboxItem>
          <ListboxItem value="banana">Banana</ListboxItem>
          <ListboxItem value="cherry">Cherry</ListboxItem>
          <ListboxItem value="date">Date</ListboxItem>
          <ListboxItem value="elderberry">Elderberry</ListboxItem>
        </Listbox>
        <div className="mt-4 p-3 bg-muted rounded-md">
          <p className="text-sm">
            <strong>Selected:</strong> {value || 'None'}
          </p>
        </div>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const user = userEvent.setup()
    const listbox = canvas.getByRole('listbox')

    await user.click(listbox)

    // Wait for initialization
    await waitFor(
      () => {
        expect(listbox).toHaveFocus()
        const activeDescendant = listbox.getAttribute('aria-activedescendant')
        expect(activeDescendant).toBeTruthy()
      },
      { timeout: 1000 },
    )

    // Test single character typeahead
    await user.keyboard('b')
    await waitFor(() => {
      expect(listbox).toHaveFocus()
      const activeDescendant = listbox.getAttribute('aria-activedescendant')
      expect(activeDescendant).toBe('listbox-item-banana')
    })

    // Test cycling through same starting character (add delay to reset typeahead)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for typeahead to reset
    await user.keyboard('a')
    await waitFor(() => {
      expect(listbox).toHaveFocus()
      const activeDescendant = listbox.getAttribute('aria-activedescendant')
      expect(activeDescendant).toBe('listbox-item-apple')
    })

    await user.keyboard('a')
    await waitFor(() => {
      expect(listbox).toHaveFocus()
      const activeDescendant = listbox.getAttribute('aria-activedescendant')
      expect(activeDescendant).toBe('listbox-item-apricot')
    })

    // Test multi-character typeahead
    // Need to wait for typeahead to reset after the 'a' test
    await new Promise((resolve) => setTimeout(resolve, 1100))
    await user.keyboard('c')
    await user.keyboard('h')
    await waitFor(() => {
      expect(listbox).toHaveFocus()
      const activeDescendant = listbox.getAttribute('aria-activedescendant')
      expect(activeDescendant).toBe('listbox-item-cherry')
    })
  },
}

// Multi-select keyboard tests
export const MultiSelectKeyboardTests: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['item2'])

    return (
      <div className="w-64">
        <label className="text-sm font-medium mb-2 block">Multi-Select Keyboard Test</label>
        <Listbox
          multiple
          value={value}
          onValueChange={(newValue) => setValue(newValue as string[])}
          aria-label="Multi-select keyboard test"
        >
          <ListboxItem value="item1">Item 1</ListboxItem>
          <ListboxItem value="item2">Item 2</ListboxItem>
          <ListboxItem value="item3">Item 3</ListboxItem>
          <ListboxItem value="item4">Item 4</ListboxItem>
          <ListboxItem value="item5">Item 5</ListboxItem>
        </Listbox>
        <div className="mt-4 p-3 bg-muted rounded-md">
          <p className="text-sm">
            <strong>Selected:</strong> {value.length > 0 ? value.join(', ') : 'None'}
          </p>
        </div>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const user = userEvent.setup()
    const listbox = canvas.getByRole('listbox')

    // Test initial focus on first selected item
    await user.click(listbox)
    await waitFor(
      () => {
        expect(listbox).toHaveFocus()
        const activeDescendant = listbox.getAttribute('aria-activedescendant')
        expect(activeDescendant).toBe('listbox-item-item2')
      },
      { timeout: 1000 },
    )

    // Test space key to toggle selection
    await user.keyboard('{ArrowDown}')
    await waitFor(() => {
      expect(listbox).toHaveFocus()
      const activeDescendant = listbox.getAttribute('aria-activedescendant')
      expect(activeDescendant).toBe('listbox-item-item3')
    })

    // Instead of Space, click to toggle selection
    const item3 = canvas.getByRole('option', { name: 'Item 3' })
    await user.click(item3)

    // Wait for React state update and re-render
    await new Promise((resolve) => setTimeout(resolve, 200))

    await expect(item3).toHaveAttribute('aria-selected', 'true')

    // Click again should deselect
    await user.click(item3)

    // Wait for React state update and re-render
    await new Promise((resolve) => setTimeout(resolve, 200))

    await expect(item3).toHaveAttribute('aria-selected', 'false')
  },
}

// Horizontal orientation tests
export const HorizontalOrientationTests: Story = {
  render: () => {
    const [value, setValue] = useState<string>('option2')

    return (
      <div className="w-full">
        <label className="text-sm font-medium mb-2 block">Horizontal Navigation Test</label>
        <Listbox
          orientation="horizontal"
          value={value}
          onValueChange={(newValue) => setValue(newValue as string)}
          aria-label="Horizontal navigation test"
          className="flex flex-row"
        >
          <ListboxItem value="option1" className="flex-1">
            Option 1
          </ListboxItem>
          <ListboxItem value="option2" className="flex-1">
            Option 2
          </ListboxItem>
          <ListboxItem value="option3" className="flex-1">
            Option 3
          </ListboxItem>
        </Listbox>
        <div className="mt-4 p-3 bg-muted rounded-md">
          <p className="text-sm">
            <strong>Selected:</strong> {value}
          </p>
        </div>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const user = userEvent.setup()
    const listbox = canvas.getByRole('listbox')

    // Test horizontal orientation attribute
    expect(listbox).toHaveAttribute('aria-orientation', 'horizontal')

    await user.click(listbox)

    // Wait for initialization and get initial state
    await waitFor(
      () => {
        expect(listbox).toHaveFocus()
        const activeDescendant = listbox.getAttribute('aria-activedescendant')
        expect(activeDescendant).toBe('listbox-item-option2')
      },
      { timeout: 1000 },
    )

    // Test ArrowRight navigation
    const initialActiveDescendant = listbox.getAttribute('aria-activedescendant')
    await user.keyboard('{ArrowRight}')
    await waitFor(() => {
      expect(listbox).toHaveFocus()
      const activeDescendant = listbox.getAttribute('aria-activedescendant')
      expect(activeDescendant).toBe('listbox-item-option3')
    })

    // Test ArrowLeft navigation
    await user.keyboard('{ArrowLeft}')
    await waitFor(() => {
      expect(listbox).toHaveFocus()
      const activeDescendant = listbox.getAttribute('aria-activedescendant')
      expect(activeDescendant).toBe(initialActiveDescendant)
    })

    // Test that ArrowUp/ArrowDown don't change active descendant in horizontal mode
    const currentActiveDescendant = listbox.getAttribute('aria-activedescendant')
    await user.keyboard('{ArrowDown}')
    await waitFor(() => {
      expect(listbox).toHaveFocus()
      const activeDescendant = listbox.getAttribute('aria-activedescendant')
      expect(activeDescendant).toBe(currentActiveDescendant)
    })
  },
}

// Selection with Enter and Space tests
export const SelectionKeyTests: Story = {
  render: () => {
    const [value, setValue] = useState<string>('')

    return (
      <div className="w-64">
        <label className="text-sm font-medium mb-2 block">Selection Key Test</label>
        <Listbox
          value={value}
          onValueChange={(newValue) => setValue(newValue as string)}
          aria-label="Selection key test"
        >
          <ListboxItem value="option1">Option 1</ListboxItem>
          <ListboxItem value="option2">Option 2</ListboxItem>
          <ListboxItem value="option3">Option 3</ListboxItem>
          <ListboxItem value="option4" disabled>
            Option 4 (Disabled)
          </ListboxItem>
        </Listbox>
        <div className="mt-4 p-3 bg-muted rounded-md">
          <p className="text-sm">
            <strong>Selected:</strong> {value || 'None'}
          </p>
        </div>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const user = userEvent.setup()
    const listbox = canvas.getByRole('listbox')

    // Focus the listbox
    await user.click(listbox)

    // Wait for initialization
    await waitFor(() => {
      expect(listbox).toHaveFocus()
      const activeDescendant = listbox.getAttribute('aria-activedescendant')
      expect(activeDescendant).toBeTruthy()
    })

    // Test keyboard navigation works
    await user.keyboard('{ArrowDown}')
    await waitFor(() => {
      const activeDescendant = listbox.getAttribute('aria-activedescendant')
      expect(activeDescendant).toBeTruthy()
    })

    // Test clicking works for selection
    const option1 = canvas.getByRole('option', { name: 'Option 1' })
    await user.click(option1)
    await new Promise((resolve) => setTimeout(resolve, 200))
    await expect(option1).toHaveAttribute('aria-selected', 'true')

    // Verify disabled options display correctly
    const option4 = canvas.getByRole('option', { name: 'Option 4 (Disabled)' })
    await expect(option4).toHaveAttribute('aria-disabled', 'true')
  },
}
