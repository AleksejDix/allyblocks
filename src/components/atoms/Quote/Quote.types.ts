import type { ComponentPropsWithoutRef } from "react";

// Re-export the QUOTE_SYNTAX type for use in the component
export type QuoteSyntax = {
  open: string;
  close: string;
};

// Import QUOTE_SYNTAX from Quote component
import { QUOTE_SYNTAX } from "./Quote";
export type QuoteLang = keyof typeof QUOTE_SYNTAX;

export type QuoteProps = ComponentPropsWithoutRef<"q"> & {
  /**
   * The language code to use for quotation marks
   * @default "en"
   */
  lang?: QuoteLang;
  /**
   * Whether to render as a child component
   * @default false
   */
  asChild?: boolean;
}; 