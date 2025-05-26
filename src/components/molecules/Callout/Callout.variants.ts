import { cva } from 'class-variance-authority'

export const calloutVariants = cva(
  [
    // Layout & Structure
    'relative',
    'w-full',
    'rounded-lg',
    'border',
    'p-4',
    'gap-3',
    'items-start',

    // Typography
    'text-sm',

    // Focus States
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-ring',
    'focus-visible:ring-offset-2',

    // Accessibility
    'aria-invalid:ring-destructive/20',
    'dark:aria-invalid:ring-destructive/40',
    'aria-invalid:border-destructive',

    // Transitions
    'transition-colors',
  ],
  {
    variants: {
      color: {
        // Blue variants
        blue: [
          'bg-blue-50',
          'border-blue-200',
          'text-blue-900',
          'dark:bg-blue-950/50',
          'dark:border-blue-800',
          'dark:text-blue-100',
        ],
        // Red variants
        red: [
          'bg-red-50',
          'border-red-200',
          'text-red-900',
          'dark:bg-red-950/50',
          'dark:border-red-800',
          'dark:text-red-100',
        ],
        // Green variants
        green: [
          'bg-green-50',
          'border-green-200',
          'text-green-900',
          'dark:bg-green-950/50',
          'dark:border-green-800',
          'dark:text-green-100',
        ],
        // Yellow variants
        yellow: [
          'bg-yellow-50',
          'border-yellow-200',
          'text-yellow-900',
          'dark:bg-yellow-950/50',
          'dark:border-yellow-800',
          'dark:text-yellow-100',
        ],
        // Purple variants
        purple: [
          'bg-purple-50',
          'border-purple-200',
          'text-purple-900',
          'dark:bg-purple-950/50',
          'dark:border-purple-800',
          'dark:text-purple-100',
        ],
        // Orange variants
        orange: [
          'bg-orange-50',
          'border-orange-200',
          'text-orange-900',
          'dark:bg-orange-950/50',
          'dark:border-orange-800',
          'dark:text-orange-100',
        ],
        // Pink variants
        pink: [
          'bg-pink-50',
          'border-pink-200',
          'text-pink-900',
          'dark:bg-pink-950/50',
          'dark:border-pink-800',
          'dark:text-pink-100',
        ],
        // Emerald variants
        emerald: [
          'bg-emerald-50',
          'border-emerald-200',
          'text-emerald-900',
          'dark:bg-emerald-950/50',
          'dark:border-emerald-800',
          'dark:text-emerald-100',
        ],
        // Teal variants
        teal: [
          'bg-teal-50',
          'border-teal-200',
          'text-teal-900',
          'dark:bg-teal-950/50',
          'dark:border-teal-800',
          'dark:text-teal-100',
        ],
        // Cyan variants
        cyan: [
          'bg-cyan-50',
          'border-cyan-200',
          'text-cyan-900',
          'dark:bg-cyan-950/50',
          'dark:border-cyan-800',
          'dark:text-cyan-100',
        ],
        // Sky variants
        sky: [
          'bg-sky-50',
          'border-sky-200',
          'text-sky-900',
          'dark:bg-sky-950/50',
          'dark:border-sky-800',
          'dark:text-sky-100',
        ],
        // Indigo variants
        indigo: [
          'bg-indigo-50',
          'border-indigo-200',
          'text-indigo-900',
          'dark:bg-indigo-950/50',
          'dark:border-indigo-800',
          'dark:text-indigo-100',
        ],
        // Violet variants
        violet: [
          'bg-violet-50',
          'border-violet-200',
          'text-violet-900',
          'dark:bg-violet-950/50',
          'dark:border-violet-800',
          'dark:text-violet-100',
        ],
        // Fuchsia variants
        fuchsia: [
          'bg-fuchsia-50',
          'border-fuchsia-200',
          'text-fuchsia-900',
          'dark:bg-fuchsia-950/50',
          'dark:border-fuchsia-800',
          'dark:text-fuchsia-100',
        ],
        // Rose variants
        rose: [
          'bg-rose-50',
          'border-rose-200',
          'text-rose-900',
          'dark:bg-rose-950/50',
          'dark:border-rose-800',
          'dark:text-rose-100',
        ],
        // Amber variants
        amber: [
          'bg-amber-50',
          'border-amber-200',
          'text-amber-900',
          'dark:bg-amber-950/50',
          'dark:border-amber-800',
          'dark:text-amber-100',
        ],
        // Lime variants
        lime: [
          'bg-lime-50',
          'border-lime-200',
          'text-lime-900',
          'dark:bg-lime-950/50',
          'dark:border-lime-800',
          'dark:text-lime-100',
        ],
        // Zinc variants
        zinc: [
          'bg-zinc-50',
          'border-zinc-200',
          'text-zinc-900',
          'dark:bg-zinc-950/50',
          'dark:border-zinc-800',
          'dark:text-zinc-100',
        ],
        // Slate variants
        slate: [
          'bg-slate-50',
          'border-slate-200',
          'text-slate-900',
          'dark:bg-slate-950/50',
          'dark:border-slate-800',
          'dark:text-slate-100',
        ],
        // Gray variants
        gray: [
          'bg-gray-50',
          'border-gray-200',
          'text-gray-900',
          'dark:bg-gray-950/50',
          'dark:border-gray-800',
          'dark:text-gray-100',
        ],
        // Neutral variants
        neutral: [
          'bg-neutral-50',
          'border-neutral-200',
          'text-neutral-900',
          'dark:bg-neutral-950/50',
          'dark:border-neutral-800',
          'dark:text-neutral-100',
        ],
        // Stone variants
        stone: [
          'bg-stone-50',
          'border-stone-200',
          'text-stone-900',
          'dark:bg-stone-950/50',
          'dark:border-stone-800',
          'dark:text-stone-100',
        ],
        // Destructive variants
        destructive: [
          'bg-destructive/10',
          'border-destructive/20',
          'text-destructive',
          'dark:bg-destructive/10',
          'dark:border-destructive/20',
          'dark:text-destructive',
        ],
      },
    },
    defaultVariants: {
      color: 'blue',
    },
  },
)
