import { createActionContext, createActionHook } from '@/lib/useAction'
import type { ActionToolbarContext as ActionToolbarContextType } from './ActionToolbar.types'

/**
 * Context for sharing ActionToolbar state across components
 */
export const ActionToolbarContext = createActionContext<ActionToolbarContextType>()

/**
 * Hook to use the ActionToolbar context
 */
export const useActionToolbar = createActionHook<ActionToolbarContextType>(ActionToolbarContext, 'useActionToolbar')
