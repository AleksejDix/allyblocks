import type { Meta, StoryObj } from '@storybook/react-vite'
import { FieldMultiSelect } from './FieldMultiSelect'
import { withForm } from '../decorators/FormDecorator'

const meta: Meta<typeof FieldMultiSelect> = {
  component: FieldMultiSelect,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FieldMultiSelect>

const options = [
  { label: 'Tag 1', value: 'tag1' },
  { label: 'Tag 2', value: 'tag2' },
  { label: 'Tag 3', value: 'tag3' },
  { label: 'Disabled Tag', value: 'tag4', disabled: true },
]

export const Default: Story = {
  decorators: [withForm],
  args: {
    name: 'tags',
    label: 'Tags',
    options: options,
    description: 'Select one or more tags',
  },
}

export const WithPlaceholder: Story = {
  decorators: [withForm],
  args: {
    name: 'tags',
    label: 'Tags',
    options: options,
    placeholder: 'Choose tags...',
  },
}

export const Required: Story = {
  decorators: [withForm],
  args: {
    name: 'tags',
    label: 'Tags',
    options: options,
    required: true,
  },
}

export const WithDescription: Story = {
  decorators: [withForm],
  args: {
    name: 'tags',
    label: 'Tags',
    options: options,
    description: 'Select multiple tags from the list',
  },
}

export const CustomWidth: Story = {
  decorators: [withForm],
  args: {
    name: 'tags',
    label: 'Tags',
    options: options,
    width: 300,
  },
}

export const Disabled: Story = {
  decorators: [withForm],
  args: {
    name: 'tags',
    label: 'Tags',
    options: options,
    disabled: true,
  },
}
