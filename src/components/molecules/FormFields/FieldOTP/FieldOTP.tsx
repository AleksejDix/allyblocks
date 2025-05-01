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
import { OTPFieldProps } from "../Field";

export function FieldOTP({
  name,
  label = "One-time password",
  description,
  required = true,
  disabled = false,
  maxLength = 6,
}: OTPFieldProps) {
  const { control } = useFormContext();

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
        required: required ? "OTP is required" : false,
      }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <InputOTP
              maxLength={maxLength}
              disabled={disabled}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            >
              <InputOTPGroup>{renderOTP()}</InputOTPGroup>
            </InputOTP>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
