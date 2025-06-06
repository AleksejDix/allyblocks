import { cva } from 'class-variance-authority'

/**
 * Box component variants using CVA.
 * Defines all visual variants for the Box component including colors, shadow, width, and height.
 */
export const boxVariants = cva('border', {
  variants: {
    variant: {
      // System colors
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

      // Bright Colors - Standard Pattern with borders
      blue: 'bg-blue-100 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-800',
      red: 'bg-red-100 text-red-900 border-red-200 dark:bg-red-950 dark:text-red-100 dark:border-red-800',
      green: 'bg-green-100 text-green-900 border-green-200 dark:bg-green-950 dark:text-green-100 dark:border-green-800',
      yellow:
        'bg-yellow-100 text-yellow-900 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-100 dark:border-yellow-800',
      purple:
        'bg-purple-100 text-purple-900 border-purple-200 dark:bg-purple-950 dark:text-purple-100 dark:border-purple-800',
      orange:
        'bg-orange-100 text-orange-900 border-orange-200 dark:bg-orange-950 dark:text-orange-100 dark:border-orange-800',
      pink: 'bg-pink-100 text-pink-900 border-pink-200 dark:bg-pink-950 dark:text-pink-100 dark:border-pink-800',
      emerald:
        'bg-emerald-100 text-emerald-900 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-100 dark:border-emerald-800',
      teal: 'bg-teal-100 text-teal-900 border-teal-200 dark:bg-teal-950 dark:text-teal-100 dark:border-teal-800',
      cyan: 'bg-cyan-100 text-cyan-900 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-100 dark:border-cyan-800',
      sky: 'bg-sky-100 text-sky-900 border-sky-200 dark:bg-sky-950 dark:text-sky-100 dark:border-sky-800',
      indigo:
        'bg-indigo-100 text-indigo-900 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-100 dark:border-indigo-800',
      violet:
        'bg-violet-100 text-violet-900 border-violet-200 dark:bg-violet-950 dark:text-violet-100 dark:border-violet-800',
      fuchsia:
        'bg-fuchsia-100 text-fuchsia-900 border-fuchsia-200 dark:bg-fuchsia-950 dark:text-fuchsia-100 dark:border-fuchsia-800',
      rose: 'bg-rose-100 text-rose-900 border-rose-200 dark:bg-rose-950 dark:text-rose-100 dark:border-rose-800',
      amber: 'bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-950 dark:text-amber-100 dark:border-amber-800',
      lime: 'bg-lime-100 text-lime-900 border-lime-200 dark:bg-lime-950 dark:text-lime-100 dark:border-lime-800',

      // Neutral Colors - Special Pattern (800/700 instead of 950/900) with borders
      zinc: 'bg-zinc-100 text-zinc-900 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700',
      slate: 'bg-slate-100 text-slate-900 border-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700',
      gray: 'bg-gray-100 text-gray-900 border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700',
      neutral:
        'bg-neutral-100 text-neutral-900 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700',
      stone: 'bg-stone-100 text-stone-900 border-stone-200 dark:bg-stone-800 dark:text-stone-100 dark:border-stone-700',
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
