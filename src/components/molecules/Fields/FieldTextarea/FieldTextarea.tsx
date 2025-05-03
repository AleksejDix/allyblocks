import { useFormContext } from "react-hook-form";
import { TextareaFieldProps } from "../Field";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/molecules/Form/Form";
import { Required } from "@/components/atoms/Required";
import { Textarea } from "@/components/atoms/Textarea";

// Add CSS property type definition for field-sizing
declare module "react" {
  interface CSSProperties {
    "field-sizing"?: "content" | "normal";
  }
}

export function FieldTextarea({
  name,
  label,
  description,
  required = false,
  minHeight,
  maxHeight,
  autoResize = false,
  className,
  style,
  ...props
}: TextareaFieldProps) {
  const { control, getFieldState } = useFormContext();
  const fieldState = getFieldState(name);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <div className="flex items-center">
              {label}
              {required && <Required required={required} />}
            </div>
          </FormLabel>
          <FormControl>
            <Textarea
              className={className}
              style={{
                ...style,
                minHeight: minHeight ? `${minHeight}px` : undefined,
                maxHeight: maxHeight ? `${maxHeight}px` : undefined,
                resize: autoResize ? "none" : "vertical",
                "field-sizing": autoResize ? "content" : "normal",
              }}
              aria-invalid={!!fieldState.error}
              aria-required={required}
              {...field}
              {...props}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
