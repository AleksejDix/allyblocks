import { cva } from 'class-variance-authority'

export const textVariants = cva('', {
  variants: {
    type: {
      body: 'font-normal',
      heading: 'font-medium',
    },
    size: {
      xs: '', // Will be defined in compoundVariants
      sm: '',
      md: '',
      lg: '',
      xl: '',
      '2xl': '',
      '3xl': '',
      '4xl': '',
      '5xl': '',
      '6xl': '',
    },
    weight: {
      0: '',
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
      size: 'xs',
      class: 'text-xs', // Extra small body text
    },
    {
      type: 'body',
      size: 'sm',
      class: 'text-sm', // Small body text (default)
    },
    {
      type: 'body',
      size: 'md',
      class: 'text-base', // Medium body text
    },
    {
      type: 'body',
      size: 'lg',
      class: 'text-lg', // Large body text
    },

    // Heading type sizes
    {
      type: 'heading',
      size: 'sm',
      class: 'text-sm', // Small heading (same size as default body)
    },
    {
      type: 'heading',
      size: 'md',
      class: 'text-base', // Medium heading
    },
    {
      type: 'heading',
      size: 'lg',
      class: 'text-lg', // Large heading
    },
    {
      type: 'heading',
      size: 'xl',
      class: 'text-xl lg:text-2xl font-semibold', // Extra large heading
    },
    {
      type: 'heading',
      size: '2xl',
      class: 'text-2xl lg:text-3xl font-semibold', // 2X large heading
    },
    {
      type: 'heading',
      size: '3xl',
      class: 'text-3xl lg:text-4xl font-semibold', // 3X large heading (main title)
    },
    {
      type: 'heading',
      size: '4xl',
      class: 'text-4xl lg:text-5xl font-semibold', // 3X large heading (main title)
    },
    {
      type: 'heading',
      size: '5xl',
      class: 'text-5xl lg:text-6xl font-semibold', // 3X large heading (main title)
    },
    {
      type: 'heading',
      size: '6xl',
      class: 'text-6xl lg:text-7xl font-semibold', // 3X large heading (main title)
    },
  ],
  defaultVariants: {
    type: 'body',
    size: 'sm',
    weight: 0,
    tone: 'default',
    decoration: 'none',
    align: 'left',
    truncate: false,
  },
})
