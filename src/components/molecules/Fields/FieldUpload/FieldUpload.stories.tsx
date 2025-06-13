import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, expect } from 'storybook/test'
import { FieldUpload } from './FieldUpload'
import { withForm } from '../decorators/FormDecorator'

const meta: Meta<typeof FieldUpload> = {
  component: FieldUpload,
  parameters: {},
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
    disabled: {
      control: 'boolean',
      description: 'Whether the field is disabled',
    },
    accept: {
      control: 'text',
      description: "Accepted file types (e.g., '.jpg,.png,.pdf')",
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file uploads',
    },
    maxSize: {
      control: 'number',
      description: 'Maximum file size in bytes',
    },
    helpText: {
      control: 'text',
      description: 'Help text for upload instructions',
    },
  },
}

export default meta
type Story = StoryObj<typeof FieldUpload>

export const Default: Story = {
  decorators: [withForm],
  args: {
    name: 'document',
    label: 'Upload Document',
    description: 'Upload your document in PDF format',
    accept: '.pdf',
    required: true,
    maxSize: 5 * 1024 * 1024, // 5MB
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const uploadField = canvas.getByLabelText(/Upload Document/i)

    // Check that the upload field is accessible and can be interacted with
    await expect(uploadField).toBeInTheDocument()
  },
}

export const MultipleFiles: Story = {
  decorators: [withForm],
  args: {
    name: 'documents',
    label: 'Upload Images',
    description: 'Upload one or more image files',
    accept: '.jpg,.jpeg,.png,.gif',
    multiple: true,
    helpText: 'Drag and drop image files or click to browse',
  },
}

export const WithHelpText: Story = {
  decorators: [withForm],
  args: {
    name: 'file',
    label: 'Upload File',
    helpText: 'Drag and drop your file here or click to browse',
  },
}

export const Required: Story = {
  decorators: [withForm],
  args: {
    name: 'document',
    label: 'Required Document',
    required: true,
  },
}

export const WithDescription: Story = {
  decorators: [withForm],
  args: {
    name: 'document',
    label: 'Upload Document',
    description: 'Please upload a valid document file',
  },
}

export const Disabled: Story = {
  decorators: [withForm],
  args: {
    name: 'document',
    label: 'Upload Document',
    description: 'This upload field is disabled',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const uploadField = canvas.getByLabelText(/Upload Document/i)

    // Check that the field is properly disabled
    await expect(uploadField).toBeDisabled()
  },
}
