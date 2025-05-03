import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./InputOTP";

const meta: Meta<typeof InputOTP> = {
  component: InputOTP,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    maxLength: {
      control: "number",
      description: "Maximum length of the OTP",
      defaultValue: 6,
    },
    containerClassName: {
      control: "text",
      description: "Additional CSS classes for the container",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputOTP>;

// Helper function to render OTP with different configurations
const renderOTP = (maxLength: number) => (
  <InputOTP maxLength={maxLength}>
    <InputOTPGroup>
      {Array.from({ length: maxLength }).map((_, i) => (
        <React.Fragment key={i}>
          <InputOTPSlot index={i} />
        </React.Fragment>
      ))}
    </InputOTPGroup>
  </InputOTP>
);

export const Default: Story = {
  render: () => renderOTP(6),
};

export const FourDigits: Story = {
  render: () => renderOTP(4),
};

export const Disabled: Story = {
  render: () => (
    <InputOTP maxLength={6} disabled>
      <InputOTPGroup>
        {Array.from({ length: 6 }).map((_, i) => (
          <InputOTPSlot index={i} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  ),
};

export const InvalidState: Story = {
  render: () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        {Array.from({ length: 6 }).map((_, i) => (
          <InputOTPSlot index={i} aria-invalid={true} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  ),
  parameters: {
    docs: {
      description: {
        story: "OTP input in an error state, indicated by red highlighting.",
      },
    },
  },
};

export const WithAutoFocus: Story = {
  render: () => (
    <InputOTP maxLength={6} autoFocus>
      <InputOTPGroup>
        {Array.from({ length: 6 }).map((_, i) => (
          <InputOTPSlot index={i} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  ),
};

export const WithOnComplete: Story = {
  render: () => {
    const handleComplete = (value: string) => {
      console.log("OTP completed:", value);
    };

    return (
      <InputOTP maxLength={6} onComplete={handleComplete}>
        <InputOTPGroup>
          {Array.from({ length: 6 }).map((_, i) => (
            <InputOTPSlot index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    );
  },
};

export const WithPlaceholders: Story = {
  render: () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        {Array.from({ length: 6 }).map((_, i) => (
          <InputOTPSlot index={i} key={i} placeholder="X" />
        ))}
      </InputOTPGroup>
    </InputOTP>
  ),
  parameters: {
    docs: {
      description: {
        story: "OTP input with numbered placeholders to indicate position.",
      },
    },
  },
};
