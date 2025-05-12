import { createActionContext, createActionHook } from "@/lib/useAction";
import type { DialogAction } from "./Dialog.types";

export const DialogContext = createActionContext<DialogAction>();

export const useDialog = createActionHook<DialogAction>(
  DialogContext,
  "useDialog"
);
