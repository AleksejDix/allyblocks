import { cva } from 'class-variance-authority'

export const textVariants = cva('', {
  variants: {
    type: {
      body: 'font-normal',
      heading: 'font-extrabold',
    },
    size: {
      1: '', // Will be defined in compoundVariants
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
    },
    weight: {
      100: 'font-thin',
      200: 'font-extralight',
      300: 'font-light',
      400: 'font-normal',
      500: 'font-medium',
      600: 'font-semibold',
      700: 'font-bold',
      800: 'font-extrabold',
      900: 'font-black',
    },
    tone: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      error: 'text-destructive',
      info: 'text-blue-600 dark:text-blue-400',
      inherit: 'text-inherit',
    },
    decoration: {
      none: 'no-underline',
      underline: 'underline decoration-2 underline-offset-2',
      strikethrough: 'line-through',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
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
  compoundVariants: [
    // Body type sizes
    {
      type: 'body',
      size: 1,
      class: 'text-xs', // Small body text
    },
    {
      type: 'body',
      size: 2,
      class: 'text-sm', // Default body text
    },
    {
      type: 'body',
      size: 3,
      class: 'text-base', // Large body text
    },
    {
      type: 'body',
      size: 4,
      class: 'text-lg', // Extra large body text
    },

    // Heading type sizes
    {
      type: 'heading',
      size: 1,
      class: 'text-4xl lg:text-5xl', // H1 equivalent
    },
    {
      type: 'heading',
      size: 2,
      class: 'text-3xl', // H2 equivalent
    },
    {
      type: 'heading',
      size: 3,
      class: 'text-2xl', // H3 equivalent
    },
    {
      type: 'heading',
      size: 4,
      class: 'text-xl', // H4 equivalent
    },
    {
      type: 'heading',
      size: 5,
      class: 'text-lg', // H5 equivalent
    },
    {
      type: 'heading',
      size: 6,
      class: 'text-sm', // H6 equivalent - same size as default body
    },
  ],
  defaultVariants: {
    type: 'body',
    size: 2,
    weight: 400,
    tone: 'default',
    decoration: 'none',
    align: 'left',
    truncate: false,
  },
})
