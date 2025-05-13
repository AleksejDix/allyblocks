import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { tableVariants } from "./Table.variants";

export type TableProps = React.ComponentProps<"table"> &
  VariantProps<typeof tableVariants> & {
    /**
     * Number of columns in the table
     * @default 4
     */
    columns?: number;
  };

export type TableHeaderProps = React.ComponentProps<"thead">;
export type TableBodyProps = React.ComponentProps<"tbody">;
export type TableFooterProps = React.ComponentProps<"tfoot">;
export type TableRowProps = React.ComponentProps<"tr">;
export type TableHeadProps = React.ComponentProps<"th">;
export type TableCellProps = React.ComponentProps<"td">;
