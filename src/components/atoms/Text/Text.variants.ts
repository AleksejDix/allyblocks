import { cva } from 'class-variance-authority'

export const textVariants = cva('', {
  variants: {
    variant: {
      // Display text - largest, for hero sections and major headers
      display: 'text-5xl font-bold leading-none tracking-tight lg:text-6xl',

      // Headings - semantic hierarchy
      h1: 'text-4xl font-bold leading-tight tracking-tight lg:text-5xl',
      h2: 'text-3xl font-semibold leading-tight tracking-tight',
      h3: 'text-2xl font-semibold leading-tight tracking-tight',
      h4: 'text-xl font-semibold leading-tight tracking-tight',
      h5: 'text-lg font-semibold leading-tight',
      h6: 'text-base font-semibold leading-tight',

      // Body text - main content
      body: 'text-base leading-relaxed',

      // UI text - interface elements
      label: 'text-sm font-medium leading-none',
      caption: 'text-xs leading-relaxed',

      // Specialized variants
      lead: 'text-xl font-normal leading-relaxed text-muted-foreground',
      code: 'font-mono text-sm bg-muted px-1.5 py-0.5 rounded border',

      // Legacy support (will be deprecated)
      blockquote: 'border-l-4 border-border pl-4 italic text-muted-foreground',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
    color: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      error: 'text-destructive',
      info: 'text-blue-600 dark:text-blue-400',
      inherit: 'text-inherit',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    transform: {
      none: '',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
    },
    decoration: {
      none: 'no-underline',
      underline: 'underline decoration-2 underline-offset-2',
      strikethrough: 'line-through',
    },
    leading: {
      none: 'leading-none',
      tight: 'leading-tight',
      snug: 'leading-snug',
      normal: 'leading-normal',
      relaxed: 'leading-relaxed',
      loose: 'leading-loose',
    },
    tracking: {
      tighter: 'tracking-tighter',
      tight: 'tracking-tight',
      normal: 'tracking-normal',
      wide: 'tracking-wide',
      wider: 'tracking-wider',
      widest: 'tracking-widest',
    },
    truncate: {
      false: '',
      true: 'truncate',
      '2': 'line-clamp-2',
      '3': 'line-clamp-3',
      '4': 'line-clamp-4',
      '5': 'line-clamp-5',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'default',
    align: 'left',
    transform: 'none',
    decoration: 'none',
    truncate: false,
  },
})
