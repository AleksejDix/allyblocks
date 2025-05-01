import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

export function LayoutAspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
}

