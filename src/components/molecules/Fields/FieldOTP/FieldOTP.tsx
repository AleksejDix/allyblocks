import { useFormContext } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/atoms/InputOTP";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/molecules/Form/Form";
import { type OTPFieldProps } from "../Field.types";

export function FieldOTP({
  name,
  label = "Verification Code",
  description,
  required = true,
  disabled = false,
  maxLength = 6,
  ...props
}: OTPFieldProps) {
  const { control, getFieldState } = useFormContext();
  const fieldState = getFieldState(name);

  const renderOTP = () => {
    const slots = [];
    for (let i = 0; i < maxLength; i++) {
      slots.push(<InputOTPSlot key={i} index={i} />);
    }
    return slots;
  };

  return (
    <FormField
      control={control}
      name={name}
      rules={{
        required: required ? "Verification code is required" : false,
      }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div
              className="relative"
              role="group"
              aria-labelledby={`${field.name}-label`}
              aria-invalid={!!fieldState.error}
            >
              <InputOTP
                maxLength={maxLength}
                disabled={disabled}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                {...props}
              >
                <InputOTPGroup>{renderOTP()}</InputOTPGroup>
              </InputOTP>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
