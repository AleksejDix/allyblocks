import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../atoms/Button";
import { FieldEmail } from "../../molecules/Fields/FieldEmail";
import { FieldPassword } from "../../molecules/Fields/FieldPassword";

const authSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    // Only required for signup
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  );

type AuthFormData = z.infer<typeof authSchema>;

interface AuthFormProps {
  mode: "login" | "signup";
  onSubmit: (data: AuthFormData) => Promise<void>;
  onError?: (error: Error) => void;
  defaultValues?: Partial<AuthFormData>;
}

export function AuthForm({
  mode,
  onSubmit,
  onError,
  defaultValues,
}: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      ...defaultValues,
    },
  });

  const handleFormSubmit = async (data: AuthFormData) => {
    try {
      setIsLoading(true);
      await onSubmit(data);
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        className="space-y-6"
        noValidate
        autoComplete={mode === "signup" ? "off" : "on"}
      >
        <div className="space-y-4">
          <FieldEmail
            name="email"
            label="Email"
            required
            autoComplete="username email"
          />

          <FieldPassword
            name="password"
            label="Password"
            required
            autoComplete={
              mode === "login" ? "current-password" : "new-password"
            }
          />

          {mode === "signup" && (
            <FieldPassword
              name="confirmPassword"
              label="Confirm Password"
              required
              autoComplete="new-password"
            />
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : mode === "login" ? "Login" : "Sign Up"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
