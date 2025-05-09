import type { QuoteProps, QuoteSyntax } from "./Quote.types";
import { cn } from "@/lib/utils";

export type LocalizedQuoteProps = QuoteProps & {
  quoteOpen?: string;
  quoteClose?: string;
};

// Unicode reference for quotation marks:
// U+201C/U+201D: "..." (English double curly)
// U+2018/U+2019: '...' (English single curly)
// U+00AB/U+00BB: «...» (Guillemets)
// U+201E/U+201C: „..." (German low-high)
// U+300C/U+300D: 「...」(Japanese corner brackets)
// U+300E/U+300F: 『...』(Japanese double corner brackets)
// U+00A0: Non-breaking space

// Guillemets with space
// U+00AB: «
// U+00BB: »
// U+00A0: Non-breaking space

const guillemets: QuoteSyntax = {
  open: "\u00AB",
  close: "\u00BB",
};

const guillemetsWithSpace: QuoteSyntax = {
  open: "\u00AB\u00A0",
  close: "\u00A0\u00BB",
};

// Base language quote styles
export const QUOTE_SYNTAX: Record<string, QuoteSyntax> = {
  // English style (curly)
  en: {
    open: "\u201C",
    close: "\u201D",
  },

  // French style (with non-breaking spaces)
  fr: guillemetsWithSpace,

  // German style (low-high)
  de: {
    open: "\u201E",
    close: "\u201C",
  },

  // Guillemets style
  es: guillemets,
  it: guillemets,
  ru: guillemets,
  no: guillemets,
  da: guillemets,
  el: guillemets,

  // Polish, Czech, Slovak (German style)
  pl: {
    open: "\u201E",
    close: "\u201C",
  },
  cs: {
    open: "\u201E",
    close: "\u201C",
  },
  sk: {
    open: "\u201E",
    close: "\u201C",
  },

  // Scandinavian style (straight)
  sv: {
    open: "\u0022",
    close: "\u0022",
  },
  fi: {
    open: "\u0022",
    close: "\u0022",
  },

  // Asian style
  ja: {
    open: "\u300C",
    close: "\u300D",
  },
  zh: {
    open: "\u300C",
    close: "\u300D",
  },

  // Hebrew (using English style as per common practice)
  he: {
    open: "\u201C",
    close: "\u201D",
  },

  // Default fallback
  default: {
    open: "\u201C",
    close: "\u201D",
  },
};

export function Quote({
  className,
  lang = "en",
  quoteOpen,
  quoteClose,
  children,
  ...props
}: LocalizedQuoteProps) {
  const baseLang = lang.split("_")[0];
  const syntax = QUOTE_SYNTAX[baseLang] || QUOTE_SYNTAX.default;
  const open = quoteOpen ?? syntax.open;
  const close = quoteClose ?? syntax.close;

  return (
    <q
      data-slot="quote"
      className={cn(
        "font-serif italic before:content-[attr(data-before)] after:content-[attr(data-after)]",
        className
      )}
      data-before={open}
      data-after={close}
      {...props}
    >
      {children}
    </q>
  );
}
