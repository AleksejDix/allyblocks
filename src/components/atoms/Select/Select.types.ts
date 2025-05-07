import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import type { VariantProps } from "class-variance-authority";
import {
  selectTriggerVariants,
  selectContentVariants,
  selectItemVariants,
} from "./Select.variants";

/**
 * Base Select component props
 */
export type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root>;

/**
 * SelectGroup component props
 */
export type SelectGroupProps = React.ComponentProps<
  typeof SelectPrimitive.Group
>;

/**
 * SelectValue component props
 */
export type SelectValueProps = React.ComponentProps<
  typeof SelectPrimitive.Value
>;

/**
 * SelectTrigger component props with variant support
 */
export type SelectTriggerProps = React.ComponentProps<
  typeof SelectPrimitive.Trigger
> &
  VariantProps<typeof selectTriggerVariants> & {
    /**
     * The content to display within the trigger
     */
    children?: React.ReactNode;
  };

/**
 * SelectContent component props with variant support
 */
export type SelectContentProps = React.ComponentProps<
  typeof SelectPrimitive.Content
> &
  VariantProps<typeof selectContentVariants>;

/**
 * SelectLabel component props
 */
export type SelectLabelProps = React.ComponentProps<
  typeof SelectPrimitive.Label
>;

/**
 * SelectItem component props with variant support
 */
export type SelectItemProps = React.ComponentProps<
  typeof SelectPrimitive.Item
> &
  VariantProps<typeof selectItemVariants> & {
    /**
     * The content to display within the item
     */
    children: React.ReactNode;
  };

/**
 * SelectSeparator component props
 */
export type SelectSeparatorProps = React.ComponentProps<
  typeof SelectPrimitive.Separator
>;

/**
 * SelectScrollUpButton component props
 */
export type SelectScrollUpButtonProps = React.ComponentProps<
  typeof SelectPrimitive.ScrollUpButton
>;

/**
 * SelectScrollDownButton component props
 */
export type SelectScrollDownButtonProps = React.ComponentProps<
  typeof SelectPrimitive.ScrollDownButton
>;
