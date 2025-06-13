import type { Meta, StoryObj } from '@storybook/react-vite'
import { FieldSelect } from './FieldSelect'
import { withForm } from '../decorators/FormDecorator'

const meta: Meta<typeof FieldSelect> = {
  component: FieldSelect,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'The name of the field',
    },
    label: {
      control: 'text',
      description: 'The label text for the field',
    },
    description: {
      control: 'text',
      description: 'Optional description text',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the field is disabled',
    },
  },
}

export default meta
type Story = StoryObj<typeof FieldSelect>

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'strawberry', label: 'Strawberry' },
]

const cityOptions = [
  { value: 'new-york', label: 'New York' },
  { value: 'san-francisco', label: 'San Francisco' },
  { value: 'london', label: 'London' },
  { value: 'tokyo', label: 'Tokyo' },
  { value: 'paris', label: 'Paris' },
]

export const Default: Story = {
  decorators: [withForm],
  args: {
    name: 'fruit',
    label: 'Favorite Fruit',
    options: fruitOptions,
    placeholder: 'Select a fruit',
    required: true,
  },
}

export const WithPlaceholder: Story = {
  decorators: [withForm],
  args: {
    name: 'city',
    label: 'Select Your City',
    options: cityOptions,
    placeholder: 'Where are you located?',
  },
}

export const WithDescription: Story = {
  decorators: [withForm],
  args: {
    name: 'fruit',
    label: 'Favorite Fruit',
    description: 'Choose your favorite fruit from the list',
    options: fruitOptions,
    placeholder: 'Select a fruit',
  },
}

export const Disabled: Story = {
  decorators: [withForm],
  args: {
    name: 'fruit',
    label: 'Favorite Fruit',
    options: fruitOptions,
    placeholder: 'Select a fruit',
    disabled: true,
  },
}

export const Required: Story = {
  decorators: [withForm],
  args: {
    name: 'fruit',
    label: 'Favorite Fruit',
    options: fruitOptions,
    placeholder: 'Select a fruit',
    required: true,
  },
}
