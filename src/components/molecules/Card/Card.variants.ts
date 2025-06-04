import { cva } from 'class-variance-authority'

export const cardVariants = cva('bg-card rounded-[13px]  bg-muted p-0.5 border')

export const cardHeaderVariants = cva('relative py-3 px-4.5')

export const cardFooterVariants = cva('py-3 px-3')

export const cardBodyVariants = cva('border p-4 rounded-lg bg-white overflow-clip')
