import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { FieldRadioGroup } from './FieldRadioGroup'
import { withForm } from '../decorators/FormDecorator'

const meta: Meta<typeof FieldRadioGroup> = {
  component: FieldRadioGroup,
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

type Story = StoryObj<typeof FieldRadioGroup>

export const Default: Story = {
  decorators: [withForm],
  args: {
    name: 'favoriteFramework',
    label: 'Favorite Framework',
    description: 'Select your favorite JavaScript framework',
    required: true,
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const radioButtons = canvas.getAllByRole('radio')
    expect(radioButtons).toHaveLength(4)

    // Click on Vue option
    await userEvent.click(radioButtons[1])
    expect(radioButtons[1]).toBeChecked()
  },
}

export const Horizontal: Story = {
  decorators: [withForm],
  args: {
    name: 'paymentMethod',
    label: 'Payment Method',
    description: 'Select your preferred payment method',
    required: true,
    orientation: 'horizontal',
    options: [
      { value: 'credit-card', label: 'Credit Card' },
      { value: 'paypal', label: 'PayPal' },
      { value: 'bank', label: 'Bank Transfer' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio options displayed horizontally',
      },
    },
  },
}

export const WithDisabledOption: Story = {
  decorators: [withForm],
  args: {
    name: 'subscription',
    label: 'Subscription Plan',
    description: 'Select your subscription plan',
    options: [
      { value: 'basic', label: 'Basic' },
      { value: 'pro', label: 'Pro' },
      {
        value: 'enterprise',
        label: 'Enterprise (Coming Soon)',
        disabled: true,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio group with a disabled option',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const radioButtons = canvas.getAllByRole('radio')

    // Try to click the third disabled option
    await userEvent.click(radioButtons[2])

    // Third option should not be checked since it's disabled
    expect(radioButtons[2]).not.toBeChecked()
  },
}

export const Required: Story = {
  decorators: [withForm],
  args: {
    name: 'required_field',
    label: 'Required Selection',
    description: 'You must select one option',
    required: true,
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
}
