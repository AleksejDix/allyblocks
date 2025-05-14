import * as React from 'react'
import { cn } from '@/lib/utils'
import { termsVariants } from './Terms.variants'
import { type TermsProps } from './Terms.types'

function Terms({ className, variant, ...props }: TermsProps) {
  return <dl className={cn(termsVariants({ variant, className }))} {...props} />
}

function Term({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <dt className={cn('text-muted-foreground font-light md:col-span-2', className)} {...props} />
}

function TermDefinition({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <dd className={cn('font-normal md:col-span-8', className)} {...props} />
}

export { Terms, Term, TermDefinition }
