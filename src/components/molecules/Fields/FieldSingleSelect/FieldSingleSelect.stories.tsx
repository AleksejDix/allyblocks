import type { Meta, StoryObj } from '@storybook/react-vite'
import { FieldSingleSelect } from './FieldSingleSelect'
import { withForm } from '../decorators/FormDecorator'

const meta: Meta<typeof FieldSingleSelect> = {
  component: FieldSingleSelect,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FieldSingleSelect>

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Disabled Option', value: 'option4', disabled: true },
]

export const Default: Story = {
  decorators: [withForm],
  args: {
    name: 'category',
    label: 'Category',
    options: options,
    description: 'Select a category from the dropdown',
  },
}

export const WithPlaceholder: Story = {
  decorators: [withForm],
  args: {
    name: 'category',
    label: 'Category',
    options: options,
    placeholder: 'Choose a category...',
  },
}

export const Required: Story = {
  decorators: [withForm],
  args: {
    name: 'category',
    label: 'Category',
    options: options,
    required: true,
  },
}

export const WithDescription: Story = {
  decorators: [withForm],
  args: {
    name: 'category',
    label: 'Category',
    options: options,
    description: 'Please select one option from the list',
  },
}

export const Disabled: Story = {
  decorators: [withForm],
  args: {
    name: 'category',
    label: 'Category',
    options: options,
    disabled: true,
  },
}
