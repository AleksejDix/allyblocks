import { cva } from 'class-variance-authority'

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-1 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      color: {
        blue: 'border-transparent bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100 [a&]:hover:bg-blue-200 dark:[a&]:hover:bg-blue-800',
        red: 'border-transparent bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100 [a&]:hover:bg-red-200 dark:[a&]:hover:bg-red-800',
        green:
          'border-transparent bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100 [a&]:hover:bg-green-200 dark:[a&]:hover:bg-green-800',
        yellow:
          'border-transparent bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100 [a&]:hover:bg-yellow-200 dark:[a&]:hover:bg-yellow-800',
        purple:
          'border-transparent bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100 [a&]:hover:bg-purple-200 dark:[a&]:hover:bg-purple-800',
        orange:
          'border-transparent bg-orange-100 text-orange-900 dark:bg-orange-900 dark:text-orange-100 [a&]:hover:bg-orange-200 dark:[a&]:hover:bg-orange-800',
        pink: 'border-transparent bg-pink-100 text-pink-900 dark:bg-pink-900 dark:text-pink-100 [a&]:hover:bg-pink-200 dark:[a&]:hover:bg-pink-800',
        emerald:
          'border-transparent bg-emerald-100 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100 [a&]:hover:bg-emerald-200 dark:[a&]:hover:bg-emerald-800',
        teal: 'border-transparent bg-teal-100 text-teal-900 dark:bg-teal-900 dark:text-teal-100 [a&]:hover:bg-teal-200 dark:[a&]:hover:bg-teal-800',
        cyan: 'border-transparent bg-cyan-100 text-cyan-900 dark:bg-cyan-900 dark:text-cyan-100 [a&]:hover:bg-cyan-200 dark:[a&]:hover:bg-cyan-800',
        sky: 'border-transparent bg-sky-100 text-sky-900 dark:bg-sky-900 dark:text-sky-100 [a&]:hover:bg-sky-200 dark:[a&]:hover:bg-sky-800',
        indigo:
          'border-transparent bg-indigo-100 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-100 [a&]:hover:bg-indigo-200 dark:[a&]:hover:bg-indigo-800',
        violet:
          'border-transparent bg-violet-100 text-violet-900 dark:bg-violet-900 dark:text-violet-100 [a&]:hover:bg-violet-200 dark:[a&]:hover:bg-violet-800',
        fuchsia:
          'border-transparent bg-fuchsia-100 text-fuchsia-900 dark:bg-fuchsia-900 dark:text-fuchsia-100 [a&]:hover:bg-fuchsia-200 dark:[a&]:hover:bg-fuchsia-800',
        rose: 'border-transparent bg-rose-100 text-rose-900 dark:bg-rose-900 dark:text-rose-100 [a&]:hover:bg-rose-200 dark:[a&]:hover:bg-rose-800',
        amber:
          'border-transparent bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-100 [a&]:hover:bg-amber-200 dark:[a&]:hover:bg-amber-800',
        lime: 'border-transparent bg-lime-100 text-lime-900 dark:bg-lime-900 dark:text-lime-100 [a&]:hover:bg-lime-200 dark:[a&]:hover:bg-lime-800',

        // Neutral colors
        zinc: 'border-transparent bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 [a&]:hover:bg-zinc-200 dark:[a&]:hover:bg-zinc-700',
        slate:
          'border-transparent bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100 [a&]:hover:bg-slate-200 dark:[a&]:hover:bg-slate-700',
        gray: 'border-transparent bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 [a&]:hover:bg-gray-200 dark:[a&]:hover:bg-gray-700',
        neutral:
          'border-transparent bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 [a&]:hover:bg-neutral-200 dark:[a&]:hover:bg-neutral-700',
        stone:
          'border-transparent bg-stone-100 text-stone-900 dark:bg-stone-800 dark:text-stone-100 [a&]:hover:bg-stone-200 dark:[a&]:hover:bg-stone-700',
      },
    },
    defaultVariants: {
      color: 'zinc',
    },
  },
)
