import { cva } from 'class-variance-authority'

export const textVariants = cva('', {
  variants: {
    variant: {
      // Heading variants - based on Polaris typography scale
      heading3xl: 'text-4xl font-bold leading-tight tracking-tight lg:text-5xl',
      heading2xl: 'text-3xl font-bold leading-tight tracking-tight',
      headingXl: 'text-2xl font-bold leading-tight tracking-tight',
      headingLg: 'text-xl font-semibold leading-tight tracking-tight',
      headingMd: 'text-sm font-semibold leading-tight',
      headingSm: 'text-xs font-semibold leading-tight',
      headingXs: 'text-xs font-semibold leading-tight',

      // Body variants - based on Polaris body text scale
      bodyLg: 'text-sm leading-relaxed',
      bodyMd: 'text-sm leading-relaxed',
      bodySm: 'text-xs leading-relaxed',
      bodyXs: 'text-xs leading-relaxed',

      // Legacy variants for backward compatibility
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      blockquote: 'mt-6 border-l-2 border-border pl-6 italic',
      list: 'my-6 ml-6 list-disc [&>li]:mt-2',
      inlineCode: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
    },
    tone: {
      default: '',
      subdued: 'text-muted-foreground',
      success: 'text-green-600 dark:text-green-400',
      critical: 'text-red-600 dark:text-red-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      info: 'text-blue-600 dark:text-blue-400',
      inherit: 'text-inherit',
    },
    fontWeight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    alignment: {
      start: 'text-left',
      center: 'text-center',
      end: 'text-right',
      justify: 'text-justify',
    },
    decoration: {
      none: 'no-underline',
      underline: 'underline',
      'line-through': 'line-through',
    },
    transform: {
      none: '',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
    },
    truncate: {
      false: '',
      true: 'truncate',
      multiline: 'line-clamp-3',
    },
  },
  defaultVariants: {
    variant: 'bodyMd',
    tone: 'default',
    fontWeight: 'regular',
    alignment: 'start',
    decoration: 'none',
    transform: 'none',
    truncate: false,
  },
})
