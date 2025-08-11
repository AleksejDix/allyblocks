import React from 'react'
import { useForm, type FieldValues, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form } from '@/components/molecules/Form/Form'

// oxlint-disable-next-line no-explicit-any
type FacetFilterProps<TSchema extends z.ZodObject<any, any>> = {
  children: React.ReactNode
  schema: TSchema
  onSubmit?: (data: z.infer<TSchema>) => void
  className?: string
  debug?: boolean
  useFacetFilters: () => {
    // oxlint-disable-next-line no-explicit-any
    queryStates: [any, (value: any) => void]
    // oxlint-disable-next-line no-explicit-any
    defaultValues: Partial<any>
  }
}

// oxlint-disable-next-line no-explicit-any
export function FacetFilter<TSchema extends z.ZodObject<any, any>>({
  children,
  schema,
  onSubmit,
  className,
  debug = false,
  useFacetFilters,
}: FacetFilterProps<TSchema>) {
  const { queryStates, defaultValues } = useFacetFilters()
  const [urlValues, setUrlValues] = queryStates

  // Merge URL values with defaults for controlled form behavior
  const formValues = React.useMemo(() => {
    return {
      ...defaultValues,
      ...urlValues,
    }
  }, [defaultValues, urlValues])

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
    values: formValues, // Use reactive values
  }) as UseFormReturn<z.infer<TSchema>>

  const handleSubmit = React.useCallback(
    (data: z.infer<TSchema>) => {
      setUrlValues(data as FieldValues)
      onSubmit?.(data)
    },
    [setUrlValues, onSubmit],
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={className}>
        {children}
        {debug && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="text-sm font-semibold mb-2">Debug Info:</h3>
            <div className="space-y-2 text-xs">
              <div>
                <strong>Form Values:</strong>
                <pre className="mt-1 p-2 bg-white dark:bg-gray-900 rounded overflow-auto">
                  {JSON.stringify(form.watch(), null, 2)}
                </pre>
              </div>
              <div>
                <strong>URL Values:</strong>
                <pre className="mt-1 p-2 bg-white dark:bg-gray-900 rounded overflow-auto">
                  {JSON.stringify(urlValues, null, 2)}
                </pre>
              </div>
              <div>
                <strong>Default Values:</strong>
                <pre className="mt-1 p-2 bg-white dark:bg-gray-900 rounded overflow-auto">
                  {JSON.stringify(defaultValues, null, 2)}
                </pre>
              </div>
              <div>
                <strong>Form State:</strong>
                <pre className="mt-1 p-2 bg-white dark:bg-gray-900 rounded overflow-auto">
                  {JSON.stringify(
                    {
                      isDirty: form.formState.isDirty,
                      isValid: form.formState.isValid,
                      isSubmitting: form.formState.isSubmitting,
                      errors: form.formState.errors,
                    },
                    null,
                    2,
                  )}
                </pre>
              </div>
            </div>
          </div>
        )}
      </form>
    </Form>
  )
}
