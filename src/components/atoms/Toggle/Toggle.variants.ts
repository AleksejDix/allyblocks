import { type VariantProps } from "class-variance-authority"
import { buttonVariants } from "../Button/Button.variants"

export const toggleVariants = buttonVariants

export type ToggleVariants = VariantProps<typeof buttonVariants> 