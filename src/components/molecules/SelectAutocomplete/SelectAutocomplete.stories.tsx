import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { useState } from 'react'
import {
  SelectAutocomplete,
  SelectAutocompleteTrigger,
  SelectAutocompleteValue,
  SelectAutocompleteContent,
  SelectAutocompleteList,
  SelectAutocompleteItem,
  SelectAutocompleteEmpty,
  SelectAutocompleteGroup,
  SelectAutocompleteLabel,
  SelectAutocompleteSeparator,
} from './SelectAutocomplete'
import type { SelectAutocompleteOption } from './SelectAutocomplete.types'

const meta: Meta<typeof SelectAutocomplete> = {
  title: 'Molecules/SelectAutocomplete',
  component: SelectAutocomplete,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '400px', width: '300px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SelectAutocomplete>

const fruitOptions: SelectAutocompleteOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
]

const vegetableOptions: SelectAutocompleteOption[] = [
  { value: 'carrot', label: 'Carrot' },
  { value: 'broccoli', label: 'Broccoli' },
  { value: 'spinach', label: 'Spinach' },
]

const allOptions = [...fruitOptions, ...vegetableOptions]

// Basic example with compound components
export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState<string>('')

    return (
      <SelectAutocomplete
        options={allOptions}
        value={value}
        onChange={setValue}
      >
        <SelectAutocompleteTrigger>
          <SelectAutocompleteValue placeholder="Select a food..." />
        </SelectAutocompleteTrigger>
        <SelectAutocompleteContent>
          <SelectAutocompleteList>
            {allOptions.map((option, index) => (
              <SelectAutocompleteItem
                key={option.value}
                option={option}
                index={index}
              />
            ))}
            <SelectAutocompleteEmpty>No options found</SelectAutocompleteEmpty>
          </SelectAutocompleteList>
        </SelectAutocompleteContent>
      </SelectAutocomplete>
    )
  },
}

// With grouped options
export const WithGroups: Story = {
  render: () => {
    const [value, setValue] = useState<string>('')

    return (
      <SelectAutocomplete
        options={allOptions}
        value={value}
        onChange={setValue}
      >
        <SelectAutocompleteTrigger>
          <SelectAutocompleteValue placeholder="Select a food..." />
        </SelectAutocompleteTrigger>
        <SelectAutocompleteContent>
          <SelectAutocompleteGroup>
            <SelectAutocompleteLabel>Fruits</SelectAutocompleteLabel>
            {fruitOptions.map((option, index) => (
              <SelectAutocompleteItem
                key={option.value}
                option={option}
                index={index}
              />
            ))}
          </SelectAutocompleteGroup>
          
          <SelectAutocompleteSeparator />
          
          <SelectAutocompleteGroup>
            <SelectAutocompleteLabel>Vegetables</SelectAutocompleteLabel>
            {vegetableOptions.map((option, index) => (
              <SelectAutocompleteItem
                key={option.value}
                option={option}
                index={fruitOptions.length + index}
              />
            ))}
          </SelectAutocompleteGroup>
          
          <SelectAutocompleteEmpty>No options found</SelectAutocompleteEmpty>
        </SelectAutocompleteContent>
      </SelectAutocomplete>
    )
  },
}

// Test story
export const SelectSingleOptionWithMouse: Story = {
  name: 'User should be able to select a single option from the list with a mouse',
  render: () => {
    const [value, setValue] = useState<string>('')
    
    return (
      <SelectAutocomplete
        options={fruitOptions}
        value={value}
        onChange={(newValue) => {
          console.log('onChange:', newValue)
          setValue(newValue)
        }}
      >
        <SelectAutocompleteTrigger>
          <SelectAutocompleteValue placeholder="Select a fruit..." />
        </SelectAutocompleteTrigger>
        <SelectAutocompleteContent>
          <SelectAutocompleteList>
            {fruitOptions.map((option, index) => (
              <SelectAutocompleteItem
                key={option.value}
                option={option}
                index={index}
              />
            ))}
            <SelectAutocompleteEmpty>No fruits found</SelectAutocompleteEmpty>
          </SelectAutocompleteList>
        </SelectAutocompleteContent>
      </SelectAutocomplete>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Wait for the component to be ready
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Test 1: Select "Banana"
    // Find and click the trigger to open the dropdown
    const trigger = canvas.getByRole('combobox')
    await userEvent.click(trigger)
    
    // Wait for the dropdown to open
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Find the "Banana" option and click it
    const bananaOption = canvas.getByText('Banana')
    await userEvent.click(bananaOption)
    
    // Wait for the dropdown to close and value to update
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // Verify that "Banana" is now displayed as the selected value
    const selectedText = canvas.getByText('Banana')
    await expect(selectedText).toBeInTheDocument()
    
    // Test 2: Change selection to "Date"
    await userEvent.click(trigger)
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const dateOption = canvas.getByText('Date')
    await userEvent.click(dateOption)
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const dateText = canvas.getByText('Date')
    await expect(dateText).toBeInTheDocument()
    
    // Test 3: Change selection to "Apple"
    await userEvent.click(trigger)
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const appleOption = canvas.getByText('Apple')
    await userEvent.click(appleOption)
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const appleText = canvas.getByText('Apple')
    await expect(appleText).toBeInTheDocument()
  },
}

// With disabled option
export const WithDisabledOptions: Story = {
  render: () => {
    const [value, setValue] = useState<string>('')
    
    const optionsWithDisabled: SelectAutocompleteOption[] = [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana', disabled: true },
      { value: 'cherry', label: 'Cherry' },
      { value: 'date', label: 'Date', disabled: true },
      { value: 'elderberry', label: 'Elderberry' },
    ]

    return (
      <SelectAutocomplete
        options={optionsWithDisabled}
        value={value}
        onChange={setValue}
      >
        <SelectAutocompleteTrigger>
          <SelectAutocompleteValue placeholder="Select a fruit..." />
        </SelectAutocompleteTrigger>
        <SelectAutocompleteContent>
          <SelectAutocompleteList>
            {optionsWithDisabled.map((option, index) => (
              <SelectAutocompleteItem
                key={option.value}
                option={option}
                index={index}
              />
            ))}
          </SelectAutocompleteList>
        </SelectAutocompleteContent>
      </SelectAutocomplete>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Wait for component to be ready
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Open dropdown
    const trigger = canvas.getByRole('combobox')
    await userEvent.click(trigger)
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Press arrow down - should highlight Apple (index 0)
    await userEvent.keyboard('{ArrowDown}')
    await new Promise(resolve => setTimeout(resolve, 50))
    
    const appleOption = canvas.getByText('Apple')
    const appleParent = appleOption.parentElement
    expect(appleParent).toHaveClass('bg-accent')
    
    // Press arrow down - should skip disabled "Banana" and go to "Cherry"
    await userEvent.keyboard('{ArrowDown}')
    await new Promise(resolve => setTimeout(resolve, 50))
    
    // Check that Cherry is highlighted
    const cherryOption = canvas.getByText('Cherry')
    const cherryParent = cherryOption.parentElement
    expect(cherryParent).toHaveClass('bg-accent')
    
    // Press arrow down again - should skip disabled "Date" and go to "Elderberry"
    await userEvent.keyboard('{ArrowDown}')
    await new Promise(resolve => setTimeout(resolve, 50))
    
    // Check that Elderberry is highlighted
    const elderberryOption = canvas.getByText('Elderberry')
    const elderberryParent = elderberryOption.parentElement
    expect(elderberryParent).toHaveClass('bg-accent')
    
    // Press arrow up - should skip disabled "Date" and go back to "Cherry"
    await userEvent.keyboard('{ArrowUp}')
    await new Promise(resolve => setTimeout(resolve, 50))
    
    // Check that Cherry is highlighted again
    expect(cherryParent).toHaveClass('bg-accent')
  },
}

// Disabled state
export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState<string>('banana')

    return (
      <SelectAutocomplete
        options={fruitOptions}
        value={value}
        onChange={setValue}
        disabled
      >
        <SelectAutocompleteTrigger>
          <SelectAutocompleteValue placeholder="Select a fruit..." />
        </SelectAutocompleteTrigger>
        <SelectAutocompleteContent>
          <SelectAutocompleteList>
            {fruitOptions.map((option, index) => (
              <SelectAutocompleteItem
                key={option.value}
                option={option}
                index={index}
              />
            ))}
          </SelectAutocompleteList>
        </SelectAutocompleteContent>
      </SelectAutocomplete>
    )
  },
}