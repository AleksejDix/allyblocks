import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { Decorator } from '@storybook/react-vite'

// Interface for query parameters
interface QueryParams {
  enabled?: boolean
  options?: {
    defaultOptions?: {
      queries?: {
        retry?: number | boolean
        retryDelay?: number
        staleTime?: number
        cacheTime?: number
        refetchOnWindowFocus?: boolean
      }
      mutations?: {
        retry?: number | boolean
      }
    }
  }
}

// Create a default query client for stories
const createQueryClient = (options?: QueryParams['options']) => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 30000,
        refetchOnWindowFocus: false,
        ...options?.defaultOptions?.queries,
      },
      mutations: {
        retry: false,
        ...options?.defaultOptions?.mutations,
      },
    },
  })
}

export const withQuery: Decorator = (Story, context) => {
  // Get query parameters from story
  const queryParams = context.parameters?.query as QueryParams | boolean | undefined

  // Handle different parameter formats
  let enabled = false
  let options: QueryParams['options'] | undefined

  if (typeof queryParams === 'boolean') {
    enabled = queryParams
  } else if (typeof queryParams === 'object' && queryParams !== null) {
    enabled = queryParams.enabled ?? true
    options = queryParams.options
  }

  // If query is disabled, render the story directly
  if (!enabled) {
    return <Story />
  }

  // Create query client with custom options
  const queryClient = createQueryClient(options)

  return (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  )
}
