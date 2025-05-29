import { cva } from 'class-variance-authority'

/**
 * Box component variants using CVA.
 * Defines all visual variants for the Box component including variant, shadow, width, and height.
 */
export const boxVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-background',
      muted: 'bg-muted',
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      accent: 'bg-accent',
      transparent: 'bg-transparent',
      card: 'bg-card',
      popover: 'bg-popover',
      destructive: 'bg-destructive',
      sidebar: 'bg-sidebar',
      'sidebar-primary': 'bg-sidebar-primary',
      'sidebar-accent': 'bg-sidebar-accent',
    },
    shadow: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    },
    width: {
      auto: 'w-auto',
      full: 'w-full',
      screen: 'w-screen',
      min: 'w-min',
      max: 'w-max',
      fit: 'w-fit',
      xs: 'w-20',
      sm: 'w-24',
      md: 'w-32',
      lg: 'w-48',
      xl: 'w-64',
      '2xl': 'w-80',
      '3xl': 'w-96',
      '4xl': 'w-112',
      '5xl': 'w-128',
      '6xl': 'w-144',
      '7xl': 'w-160',
    },
    height: {
      auto: 'h-auto',
      full: 'h-full',
      screen: 'h-screen',
      min: 'h-min',
      max: 'h-max',
      fit: 'h-fit',
      xs: 'h-20',
      sm: 'h-24',
      md: 'h-32',
      lg: 'h-48',
      xl: 'h-64',
      '2xl': 'h-80',
      '3xl': 'h-96',
      '4xl': 'h-112',
      '5xl': 'h-128',
      '6xl': 'h-144',
      '7xl': 'h-160',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
