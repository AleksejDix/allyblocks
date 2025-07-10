import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form } from '@/components/molecules/Form/Form'
import { Button } from '@/components/atoms/Button/Button'
import type { Decorator } from '@storybook/react'

export const withForm: Decorator = (Story, context) => {
  // Extract field props from story args
  const { name, required, label } = context.args || {}

  // Create dynamic schema based on field props
  const createSchema = () => {
    if (!name || typeof name !== 'string') return undefined

    let fieldSchema = z.string()

    if (required) {
      fieldSchema = fieldSchema.min(1, `${label || name} is required`)
    }

    return z.object({
      [name as string]: fieldSchema,
    })
  }

  const schema = createSchema()

  const form = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: 'onSubmit',
    defaultValues: name && typeof name === 'string' ? { [name]: '' } : {},
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onSubmit = (data: Record<string, unknown>) => {
    // Validation passed - prevent actual submission in Storybook
    console.log('Form data:', data)
  }

  const onError = (errors: Record<string, unknown>) => {
    // Validation failed - errors will be displayed
    console.log('Form errors:', errors)
  }

  return (
    <Form {...form}>
      <form className="space-y-4" noValidate onSubmit={form.handleSubmit(onSubmit, onError)}>
        <Story {...context} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
