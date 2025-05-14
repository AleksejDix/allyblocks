import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import type { VariantProps } from "class-variance-authority";
import { Icon } from "@/components/atoms/Icon";
import type { IconProps } from "@/components/atoms/Icon/Icon.types";
import {
  accordionVariants,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionBodyVariants,
} from "./Accordion.variants";

// Extract the name parameter type
type IconName = IconProps["name"];

export type AccordionProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Root
> &
  VariantProps<typeof accordionVariants>;

export type AccordionRef = React.ComponentRef<typeof AccordionPrimitive.Root>;

export type AccordionItemProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Item
> &
  VariantProps<typeof accordionItemVariants>;

export type AccordionItemRef = React.ComponentRef<
  typeof AccordionPrimitive.Item
>;

export type AccordionHeaderProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Header
>;

export type AccordionHeaderRef = React.ComponentRef<
  typeof AccordionPrimitive.Header
>;

export type AccordionTriggerProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
> &
  VariantProps<typeof accordionTriggerVariants> & {
    asChild?: boolean;
  };

export type AccordionTriggerRef = React.ComponentRef<
  typeof AccordionPrimitive.Trigger
>;

export type AccordionIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<typeof Icon>,
  "name"
> & {
  icon?: IconName;
  openIcon?: IconName;
  closedIcon?: IconName;
};

export type AccordionIndicatorRef = React.ComponentRef<typeof Icon>;

export type AccordionBodyProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Content
> &
  VariantProps<typeof accordionBodyVariants> & {
    padding?: boolean;
  };

export type AccordionBodyRef = React.ComponentRef<
  typeof AccordionPrimitive.Content
>;
