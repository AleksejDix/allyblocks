import { cn } from '@/lib/utils'
import { type BulletProps } from './Bullet.types'

// Color mapping for common Tailwind colors
const colorClasses: Record<string, string> = {
  blue: 'bg-blue-400',
  red: 'bg-red-400',
  green: 'bg-green-400',
  yellow: 'bg-yellow-400',
  purple: 'bg-purple-400',
  orange: 'bg-orange-400',
  pink: 'bg-pink-400',
  emerald: 'bg-emerald-400',
  zinc: 'bg-zinc-400',
  slate: 'bg-slate-400',
  gray: 'bg-gray-400',
  neutral: 'bg-neutral-400',
  stone: 'bg-stone-400',
  amber: 'bg-amber-400',
  lime: 'bg-lime-400',
  teal: 'bg-teal-400',
  cyan: 'bg-cyan-400',
  sky: 'bg-sky-400',
  indigo: 'bg-indigo-400',
  violet: 'bg-violet-400',
  fuchsia: 'bg-fuchsia-400',
  rose: 'bg-rose-400',
}

export function Bullet({ className, color = 'zinc', label, style, ...props }: BulletProps) {
  // Use Tailwind class if available, otherwise fallback to CSS variable
  const colorClass = colorClasses[color]
  const bulletStyle = colorClass
    ? undefined
    : {
        ...style,
        backgroundColor: `hsl(var(--${color}))`,
      }

  return (
    <span
      role="status"
      aria-label={label}
      className={cn('inline-block rounded-full border-2 border-background shrink-0 w-3 h-3', colorClass, className)}
      style={bulletStyle}
      {...props}
    />
  )
}
