import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const proseVariants = cva("prose", {
  variants: {
    size: {
      sm: "prose-sm",
      default: "",
      lg: "prose-lg",
      xl: "prose-xl",
    },
    maxWidth: {
      none: "max-w-none",
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      "5xl": "max-w-5xl",
      "6xl": "max-w-6xl",
      "7xl": "max-w-7xl",
    },
  },
  defaultVariants: {
    size: "default",
    maxWidth: "xl",
  },
});

export interface ProseProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof proseVariants> {
  html?: string;
}

const Prose = React.forwardRef<HTMLElement, ProseProps>(
  ({ className, size, maxWidth, html, children, ...props }, ref) => {
    return (
      <article
        ref={ref}
        className={proseVariants({ size, maxWidth, className })}
        {...(html
          ? { dangerouslySetInnerHTML: { __html: html } }
          : { children })}
        {...props}
      />
    );
  },
);

Prose.displayName = "Prose";

export { Prose };
