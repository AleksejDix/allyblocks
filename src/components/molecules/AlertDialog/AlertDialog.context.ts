import { createActionContext, createActionHook } from '@/lib/useAction'
import type { AlertDialogAction } from './AlertDialog.types'

export const AlertDialogContext = createActionContext<AlertDialogAction>()

export const useAlertDialog = createActionHook<AlertDialogAction>(AlertDialogContext, 'useAlertDialog')
