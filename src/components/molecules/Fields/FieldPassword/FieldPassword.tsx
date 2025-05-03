import * as React from "react";
import { useFormContext, ControllerRenderProps } from "react-hook-form";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { Required } from "@/components/atoms/Required";
import { Icon } from "@/components/atoms/Icon";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/molecules/Form/Form";

interface FieldPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  showStrength?: boolean;
}

export function FieldPassword({
  name,
  label = "Password",
  description,
  required = true,
  showStrength = false,
  ...props
}: FieldPasswordProps) {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: { field: ControllerRenderProps }) => (
        <FormItem>
          <FormLabel>
            <div className="flex items-center">
              {label}
              {required && <Required required={required} />}
            </div>
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                id={`${field.name}-input`}
                className="pr-10"
                {...field}
                {...props}
                required={required}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Icon name="eye-off" /> : <Icon name="eye" />}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {showStrength && (
            <div className="mt-2">
              <PasswordStrengthIndicator password={field.value} />
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function PasswordStrengthIndicator({ password }: { password: string }) {
  const strength = React.useMemo(() => {
    if (!password) return 0;

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  }, [password]);

  const strengthText = React.useMemo(() => {
    switch (strength) {
      case 0:
        return "No password";
      case 1:
        return "Very weak";
      case 2:
        return "Weak";
      case 3:
        return "Medium";
      case 4:
        return "Strong";
      case 5:
        return "Very strong";
      default:
        return "";
    }
  }, [strength]);

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${(strength / 5) * 100}%` }}
          />
        </div>
        <span className="text-sm text-gray-500">{strengthText}</span>
      </div>
    </div>
  );
}
