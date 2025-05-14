import { cn } from "@/lib/utils";
import { tableVariants } from "./Table.variants";
import {
  type TableProps,
  type TableHeaderProps,
  type TableBodyProps,
  type TableFooterProps,
  type TableRowProps,
  type TableHeadProps,
  type TableCellProps,
} from "./Table.types";

function Table({ className, variant, size, density, ...props }: TableProps) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto border-l border-r"
    >
      <table
        data-slot="table"
        role="grid"
        className={cn(tableVariants({ variant, size, density, className }))}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead
      data-slot="table-header"
      role="rowgroup"
      className={cn(" border-collapse", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody
      data-slot="table-body"
      role="rowgroup"
      className={cn("", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <div
      data-slot="table-footer"
      role="rowgroup"
      className={cn(" font-medium", className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      role="row"
      className={cn("", "transition-colors", className)}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      role="columnheader"
      data-slot="table-head"
      className={cn(
        "text-foreground text-left font-medium whitespace-nowrap",
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      role="cell"
      data-slot="table-cell"
      className={cn(
        "align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
};
