import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import {
  tableVariants,
  tableContainerVariants,
  tableHeaderVariants,
  tableBodyVariants,
  tableRowVariants,
  tableFooterVariants,
  tableCellVariants,
  tableHeadVariants,
  tableCaptionVariants,
} from './Table.variants'

export type TableProps = React.ComponentProps<'table'> &
  VariantProps<typeof tableVariants> & {
    /**
     * Additional CSS classes for the table container
     */
    containerClassName?: string
  }

export type TableHeaderProps = React.ComponentProps<'thead'> &
  VariantProps<typeof tableHeaderVariants> & {
    /**
     * Additional CSS classes for the table header
     */
    className?: string
  }

export type TableBodyProps = React.ComponentProps<'tbody'> &
  VariantProps<typeof tableBodyVariants> & {
    /**
     * Additional CSS classes for the table body
     */
    className?: string
  }

export type TableFooterProps = React.ComponentProps<'tfoot'> &
  VariantProps<typeof tableFooterVariants> & {
    /**
     * Additional CSS classes for the table footer
     */
    className?: string
  }

export type TableRowProps = React.ComponentProps<'tr'> &
  VariantProps<typeof tableRowVariants> & {
    /**
     * Additional CSS classes for the table row
     */
    className?: string
  }

export type TableHeadProps = React.ComponentProps<'th'> &
  VariantProps<typeof tableHeadVariants> & {
    /**
     * Additional CSS classes for the table head cell
     */
    className?: string
  }

export type TableCellProps = React.ComponentProps<'td'> &
  VariantProps<typeof tableCellVariants> & {
    /**
     * Additional CSS classes for the table cell
     */
    className?: string
  }

export type TableCaptionProps = React.ComponentProps<'caption'> &
  VariantProps<typeof tableCaptionVariants> & {
    /**
     * Additional CSS classes for the table caption
     */
    className?: string
  }

export type TableContainerProps = React.ComponentProps<'div'> &
  VariantProps<typeof tableContainerVariants> & {
    /**
     * Additional CSS classes for the table container
     */
    className?: string
  }
