import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { within, userEvent, expect } from 'storybook/test'
import { FieldSelect } from './FieldSelect'
import { Form } from '@/components/molecules/Form/Form'
import { Button } from '@/components/atoms/Button'
import { SelectItem } from '@/components/atoms/Select'

const meta: Meta = {
  title: 'molecules/Fields/FieldSelect',
  component: FieldSelect,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

// Default form without initial value
function DefaultForm() {
  const schema = z.object({
    fruit: z.string().min(1, 'Please select a fruit'),
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fruit: '',
    },
  })

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-96">
        <FieldSelect
          name="fruit"
          label="Favorite Fruit"
          placeholder="Select a fruit"
          required
        >
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
          <SelectItem value="strawberry">Strawberry</SelectItem>
        </FieldSelect>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export const Default: Story = {
  render: () => <DefaultForm />,
}

// Form with default value
function WithDefaultValueForm() {
  const schema = z.object({
    city: z.string(),
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      city: 'london', // Default value set here
    },
  })

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-96">
        <FieldSelect
          name="city"
          label="Select Your City"
          placeholder="Where are you located?"
        >
          <SelectItem value="new-york">New York</SelectItem>
          <SelectItem value="san-francisco">San Francisco</SelectItem>
          <SelectItem value="london">London</SelectItem>
          <SelectItem value="tokyo">Tokyo</SelectItem>
          <SelectItem value="paris">Paris</SelectItem>
        </FieldSelect>
        <div className="text-sm text-muted-foreground">
          Default value: London (should be pre-selected)
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export const WithDefaultValue: Story = {
  render: () => <WithDefaultValueForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Check that London is pre-selected
    const trigger = canvas.getByRole('button', { name: /Select Your City/i })
    await expect(trigger).toHaveTextContent('London')
  },
}

// Form with description
function WithDescriptionForm() {
  const schema = z.object({
    fruit: z.string(),
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fruit: '',
    },
  })

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-96">
        <FieldSelect
          name="fruit"
          label="Favorite Fruit"
          description="Choose your favorite fruit from the list"
          placeholder="Select a fruit"
        >
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
          <SelectItem value="strawberry">Strawberry</SelectItem>
        </FieldSelect>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export const WithDescription: Story = {
  render: () => <WithDescriptionForm />,
}

// Disabled form
function DisabledForm() {
  const schema = z.object({
    fruit: z.string(),
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fruit: 'apple',
    },
  })

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-96">
        <FieldSelect
          name="fruit"
          label="Favorite Fruit"
          placeholder="Select a fruit"
          disabled
        >
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
          <SelectItem value="strawberry">Strawberry</SelectItem>
        </FieldSelect>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export const Disabled: Story = {
  render: () => <DisabledForm />,
}

// Multiple selects in one form
function MultipleSelectsForm() {
  const schema = z.object({
    fruit: z.string().min(1, 'Please select a fruit'),
    city: z.string().min(1, 'Please select a city'),
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fruit: 'banana',
      city: '',
    },
  })

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-96">
        <FieldSelect
          name="fruit"
          label="Favorite Fruit"
          placeholder="Select a fruit"
          required
        >
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
          <SelectItem value="strawberry">Strawberry</SelectItem>
        </FieldSelect>
        <FieldSelect
          name="city"
          label="Your City"
          placeholder="Select a city"
          required
        >
          <SelectItem value="new-york">New York</SelectItem>
          <SelectItem value="san-francisco">San Francisco</SelectItem>
          <SelectItem value="london">London</SelectItem>
          <SelectItem value="tokyo">Tokyo</SelectItem>
          <SelectItem value="paris">Paris</SelectItem>
        </FieldSelect>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export const MultipleSelects: Story = {
  render: () => <MultipleSelectsForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Check that Banana is pre-selected in the first select
    const buttons = canvas.getAllByRole('button')
    const fruitTrigger = buttons.find(btn => btn.getAttribute('id')?.includes('form-item') && btn.textContent?.includes('Banana'))
    await expect(fruitTrigger).toHaveTextContent('Banana')
    
    // Check that city select shows placeholder
    const cityTrigger = buttons.find(btn => btn.getAttribute('id')?.includes('form-item') && btn.textContent?.includes('Select a city'))
    await expect(cityTrigger).toHaveTextContent('Select a city')
    
    // Test validation
    const submitButton = canvas.getByRole('button', { name: /submit/i })
    await userEvent.click(submitButton)
    
    // Should show error for city field
    const error = await canvas.findByText('Please select a city')
    await expect(error).toBeVisible()
  },
}

// Multiple selection mode
function MultiSelectForm() {
  const schema = z.object({
    tags: z.array(z.string()).min(1, 'Please select at least one tag'),
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      tags: [],
    },
  })

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-96">
        <FieldSelect
          name="tags"
          label="Tags"
          description="Select one or more tags"
          placeholder="Select tags..."
          mode="multiple"
          required
        >
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="typescript">TypeScript</SelectItem>
          <SelectItem value="tailwind">Tailwind CSS</SelectItem>
          <SelectItem value="vite">Vite</SelectItem>
          <SelectItem value="storybook">Storybook</SelectItem>
        </FieldSelect>
        <div className="text-sm text-muted-foreground">
          Selected: {form.watch('tags')?.join(', ') || 'None'}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export const MultipleMode: Story = {
  render: () => <MultiSelectForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Check that placeholder is shown
    const trigger = canvas.getByRole('button', { name: /Tags/i })
    await expect(trigger).toHaveTextContent('Select tags...')
    
    // Test validation
    const submitButton = canvas.getByRole('button', { name: /submit/i })
    await userEvent.click(submitButton)
    
    // Should show error
    const error = await canvas.findByText('Please select at least one tag')
    await expect(error).toBeVisible()
  },
}
