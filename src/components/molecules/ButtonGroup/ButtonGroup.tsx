import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
};

const basicClasses = `
    gap-2 inline-flex
`;

export function ButtonGroup(props: Props) {
  return <div className={cn(basicClasses)}>{props.children}</div>;
}
