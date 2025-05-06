import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";

import { cn } from "@/lib/utils";

// Base class that contains shared styles with Input but preserves OTP appearance
const baseClass = `
md:text-sm
selection:bg-primary
selection:text-primary-foreground
dark:bg-input/30
border
border-input
outline-1
outline-zinc-950/5
transition-[color,outline]
ring-offset-background
relative flex h-9 w-9 items-center justify-center
text-sm shadow-xs transition-all
rounded-md
`;

// Focus visible styling with proper WCAG 2.2 compliance
const focusVisibleClass = `
data-[active=true]:z-10
data-[active=true]:outline
data-[active=true]:ring-2
data-[active=true]:ring-offset-2
data-[active=true]:ring-primary
data-[active=true]:border-primary
`;

// Invalid state styling
const invalidClass = `
aria-invalid:oultine
aria-invalid:ring-destructive/10
aria-invalid:border-destructive
aria-invalid:bg-destructive/5

aria-invalid:text-destructive
data-[active=true]:aria-invalid:ring
data-[active=true]:aria-invalid:ring-destructive
data-[active=true]:aria-invalid:ring-offset
data-[active=true]:aria-invalid:ring-opacity-100
data-[active=true]:aria-invalid:border-destructive
`;

// Disabled state styling
const disabledClass = `
disabled:pointer-events-none
disabled:cursor-not-allowed 
disabled:opacity-50
disabled:text-muted-foreground
disabled:bg-muted-background
`;

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50 ",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  placeholder,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
  placeholder?: string;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      aria-live="polite"
      className={cn(
        baseClass,
        focusVisibleClass,
        invalidClass,
        disabledClass,
        className,
      )}
      {...props}
    >
      {char || (
        <span className="text-muted-foreground text-sm opacity-70">
          {placeholder && !isActive ? placeholder : ""}
        </span>
      )}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot };
