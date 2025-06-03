import { cva } from 'class-variance-authority'

export const cardVariants = cva('bg-card text-card-foreground rounded-xl overflow-hidden border shadow-sm')

export const cardHeaderVariants = cva('relative px-4 pt-4 pb-3')

export const cardSectionVariants = cva('px-4 py-3')

export const cardSectionHeaderVariants = cva('flex items-center justify-between mb-2')

export const cardFooterVariants = cva('px-4 pb-4 pt-3')

export const cardBodyVariants = cva('px-4 py-3')
