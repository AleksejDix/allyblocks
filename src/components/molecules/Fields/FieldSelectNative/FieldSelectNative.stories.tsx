import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { FieldSelectNative } from './FieldSelectNative'
import { withForm } from '../decorators/FormDecorator'

const meta: Meta<typeof FieldSelectNative> = {
  component: FieldSelectNative,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-md">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof FieldSelectNative>

export const Default: Story = {
  decorators: [withForm],
  args: {
    name: 'favoriteFramework',
    label: 'Favorite Framework',
    description: 'Select your favorite JavaScript framework',
    placeholder: 'Choose a framework',
    required: true,
    children: (
      <>
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="angular">Angular</option>
        <option value="svelte">Svelte</option>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const select = canvas.getByRole('combobox')
    await expect(select).toBeInTheDocument()

    await userEvent.selectOptions(select, 'react')
    expect(select).toHaveValue('react')
  },
}

export const WithOptGroups: Story = {
  decorators: [withForm],
  args: {
    name: 'techCategory',
    label: 'Technology Category',
    placeholder: 'Select a technology',
    required: true,
    children: (
      <>
        <optgroup label="Frontend">
          <option value="react">React</option>
          <option value="vue">Vue</option>
          <option value="angular">Angular</option>
        </optgroup>
        <optgroup label="Backend">
          <option value="node">Node.js</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </optgroup>
        <optgroup label="Mobile">
          <option value="reactNative">React Native</option>
          <option value="flutter">Flutter</option>
          <option value="swift">Swift</option>
        </optgroup>
      </>
    ),
  },
}

export const WithDescription: Story = {
  decorators: [withForm],
  args: {
    name: 'framework',
    label: 'Framework',
    description: 'Choose your preferred framework',
    children: (
      <>
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="angular">Angular</option>
      </>
    ),
  },
}

export const Required: Story = {
  decorators: [withForm],
  args: {
    name: 'required',
    label: 'Required Field',
    required: true,
    children: (
      <>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </>
    ),
  },
}

export const Disabled: Story = {
  decorators: [withForm],
  args: {
    name: 'disabledField',
    label: 'Disabled Field',
    disabled: true,
    children: (
      <>
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="angular">Angular</option>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const select = canvas.getByRole('combobox')
    await expect(select).toBeInTheDocument()
    expect(select).toBeDisabled()
  },
}

export const MultiSelect: Story = {
  decorators: [withForm],
  args: {
    name: 'technologies',
    label: 'Select Technologies',
    description: 'Hold Ctrl/Cmd to select multiple options',
    multiple: true,
    required: true,
    children: (
      <>
        <optgroup label="Frontend">
          <option value="react">React</option>
          <option value="vue">Vue</option>
          <option value="angular">Angular</option>
        </optgroup>
        <optgroup label="Backend">
          <option value="node">Node.js</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </optgroup>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const select = canvas.getByRole('listbox')
    await expect(select).toBeInTheDocument()
    expect(select).toHaveAttribute('multiple')
  },
}
