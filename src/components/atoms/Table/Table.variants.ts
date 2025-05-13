import { cva } from "class-variance-authority";

export const tableVariants = cva(
  ["w-full caption-bottom isolate border-collapse -mx-[1px]"],
  {
    variants: {
      variant: {
        default:
          "[&>[role=rowgroup]>[role=cell]]:border [&>[role=rowgroup]>[role=cell]]:border [&>[role=rowgroup]>[role=cell]]:border",
        striped: [
          "[&>[role=rowgroup]+[role=rowgroup]>[role=row]:nth-child(odd)]:bg-muted",
        ],
        divided:
          "[&>[role=rowgroup]_[role=row]:not(:last-child)]:shadow-[inset_0_-1px_0_0_var(--color-input)]",
        bordered: [
          `[&_tr]:border dark:border-zinc-800`,
          `[&>[role=rowgroup]+[role=rowgroup]_[role=row]:first-child]:rounded-t-md`,
        ],
        spectrum: [
          "[&>[role=rowgroup]>[role=cell]]:border [&>[role=rowgroup]>[role=cell]]:border [&>[role=rowgroup]>tr::before]:size-15",
          "[&>[role=rowgroup]>tr::before]:bg-muted [&>[role=rowgroup]>tr::before]:rounded-full ",
        ],
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      density: {
        compact: [
          "[&>[role=rowgroup]_[role=columnheader]]:px-3 [&>[role=rowgroup]_[role=columnheader]]:py-2",
          "[&>[role=rowgroup]_[role=cell]]:px-3 [&>[role=rowgroup]_[role=cell]]:py-2",
          "[&>[role=rowgroup]_[role=cell]:has([data-slot=button])]:p-0.5",
        ],
        default: [
          "[&>[role=rowgroup]_[role=columnheader]]:px-3 [&>[role=rowgroup]_[role=columnheader]]:py-3",
          "[&>[role=rowgroup]_[role=cell]]:px-3 [&>[role=rowgroup]_[role=cell]]:py-3",
          "[&>[role=rowgroup]_[role=cell]:has([data-slot=button])]:py-1 [&>[role=rowgroup]_[role=cell]:has([data-slot=button])]:px-1",
        ],
        relaxed: [
          "[&>[role=rowgroup]_[role=columnheader]]:px-4 [&>[role=rowgroup]_[role=columnheader]]:py-4",
          "[&>[role=rowgroup]_[role=cell]]:px-4 [&>[role=rowgroup]_[role=cell]]:py-4",
          "[&>[role=rowgroup]_[role=cell]:has([data-slot=button])]:py-2 [&>[role=rowgroup]_[role=cell]:has([data-slot=button])]:px-2",
        ],
      },
    },
    defaultVariants: {
      variant: "bordered",
      size: "sm",
      density: "default",
    },
  }
);
