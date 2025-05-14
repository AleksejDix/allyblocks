import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Icon } from "@/components/atoms/Icon";

import { cn } from "@/lib/utils";
import type {
  AccordionProps,
  AccordionRef,
  AccordionItemProps,
  AccordionItemRef,
  AccordionHeaderProps,
  AccordionHeaderRef,
  AccordionTriggerProps,
  AccordionTriggerRef,
  AccordionBodyProps,
  AccordionBodyRef,
  AccordionIndicatorProps,
  AccordionIndicatorRef,
} from "./Accordion.types";
import {
  accordionVariants,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionBodyVariants,
} from "./Accordion.variants";

const AccordionContext = React.createContext<Record<string, never>>({});

const Accordion = React.forwardRef<AccordionRef, AccordionProps>(
  function Accordion({ className, variant = "default", ...props }, ref) {
    return (
      <AccordionContext.Provider value={{}}>
        <AccordionPrimitive.Root
          ref={ref}
          data-slot="accordion"
          className={cn(accordionVariants({ variant, className }))}
          {...props}
        />
      </AccordionContext.Provider>
    );
  }
);

const AccordionItem = React.forwardRef<AccordionItemRef, AccordionItemProps>(
  function AccordionItem({ className, variant, ...props }, ref) {
    return (
      <AccordionPrimitive.Item
        ref={ref}
        data-slot="accordion-item"
        className={cn(accordionItemVariants({ variant, className }))}
        {...props}
      />
    );
  }
);

const AccordionHeader = React.forwardRef<
  AccordionHeaderRef,
  AccordionHeaderProps
>(function AccordionHeader({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.Header
      ref={ref}
      data-slot="accordion-header"
      className={cn(className)}
      {...props}
    />
  );
});

// Component shown only when accordion item is closed
const AccordionIndicatorClosed = React.forwardRef<
  AccordionIndicatorRef,
  AccordionIndicatorProps
>(function AccordionIndicatorClosed(
  { className, icon = "minus", ...props },
  ref
) {
  return (
    <Icon
      ref={ref}
      name={icon}
      className={cn(
        "transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)]",
        "group-data-[state=open]:hidden",
        className
      )}
      {...props}
    />
  );
});

// Component shown only when accordion item is open
const AccordionIndicatorOpen = React.forwardRef<
  AccordionIndicatorRef,
  AccordionIndicatorProps
>(function AccordionIndicatorOpen({ className, icon = "plus", ...props }, ref) {
  return (
    <Icon
      ref={ref}
      name={icon}
      className={cn(
        "transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)]",
        "hidden group-data-[state=open]:block rotate-180",
        className
      )}
      {...props}
    />
  );
});

// Main indicator component that handles both states
const AccordionIndicator = React.forwardRef<
  AccordionIndicatorRef,
  AccordionIndicatorProps
>(function AccordionIndicator(
  { className, icon, openIcon, closedIcon, ...props },
  ref
) {
  // If we have specific open/closed icons, use the appropriate components
  if (openIcon && closedIcon) {
    return (
      <div className="relative inline-flex">
        <AccordionIndicatorClosed
          icon={closedIcon}
          className={className}
          {...props}
        />
        <AccordionIndicatorOpen
          icon={openIcon}
          className={className}
          {...props}
        />
      </div>
    );
  }

  // Single icon that rotates
  return (
    <Icon
      ref={ref}
      name={icon || "chevron-down"}
      className={cn(
        "transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180",
        className
      )}
      {...props}
    />
  );
});

const AccordionTrigger = React.forwardRef<
  AccordionTriggerRef,
  AccordionTriggerProps
>(function AccordionTrigger({ className, variant, children, ...props }, ref) {
  const triggerClasses = cn(accordionTriggerVariants({ variant, className }));

  return (
    <AccordionPrimitive.Trigger
      ref={ref}
      data-slot="accordion-trigger"
      className={triggerClasses}
      {...props}
    >
      {children}
    </AccordionPrimitive.Trigger>
  );
});

const AccordionBody = React.forwardRef<AccordionBodyRef, AccordionBodyProps>(
  function AccordionBody(
    { className, variant, children, padding = true, ...props },
    ref
  ) {
    return (
      <AccordionPrimitive.Content
        ref={ref}
        data-slot="accordion-content"
        className={cn(accordionBodyVariants({ variant }))}
        {...props}
      >
        <div
          data-slot="accordion-content-inner"
          className={cn(padding && "p-3", className)}
        >
          {children}
        </div>
      </AccordionPrimitive.Content>
    );
  }
);

export {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionIndicator,
  AccordionIndicatorOpen,
  AccordionIndicatorClosed,
  AccordionBody,
};
