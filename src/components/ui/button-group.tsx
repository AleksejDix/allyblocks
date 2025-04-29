import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline";
};

const variantClasses = {
  default: "divide-primary-foreground/30",
  secondary: "divide-background",
  outline: "divide-input",
};

const firstChildClasses = "[&>button:first-child]:rounded-s-md";
const lastChildClasses = "[&>button:last-child]:rounded-e-md";

const basicClasses = `
    [&>button]:rounded-none 
    [&>button]:shadow-none 
    [&>button:focus-visible]:z-20 
    divide-x
    ${firstChildClasses} 
    ${lastChildClasses} 
    inline-flex  rounded-md shadow-xs rtl:space-x-reverse
`;

export function ButtonGroup(props: Props) {
  return (
    <div
      className={cn(basicClasses, variantClasses[props.variant || "default"])}
    >
      {props.children}
    </div>
  );
}
