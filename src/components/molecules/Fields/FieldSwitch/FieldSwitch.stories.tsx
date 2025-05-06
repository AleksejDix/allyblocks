import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/molecules/Form/Form";
import { FieldSwitch } from "./FieldSwitch";
import { Button } from "@/components/atoms/Button/Button";

const meta: Meta<typeof FieldSwitch> = {
  component: FieldSwitch,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FieldSwitch>;

type SwitchFormValues = {
  notifications: boolean;
  darkMode: boolean;
  maintenance: boolean;
  subscribed: boolean;
  advanced: boolean;
};

function BasicSwitchForm() {
  const form = useForm<SwitchFormValues>({
    defaultValues: {
      notifications: false,
    },
  });

  function onSubmit(values: SwitchFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldSwitch
          name="notifications"
          label="Enable Notifications"
          description="Receive notifications when someone mentions you"
        />
        <Button type="submit">Save Preferences</Button>
      </form>
    </Form>
  );
}

function WithLabelsForm() {
  const form = useForm<SwitchFormValues>({
    defaultValues: {
      darkMode: false,
    },
  });

  function onSubmit(values: SwitchFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldSwitch
          name="darkMode"
          label="Dark Mode"
          onLabel="On"
          offLabel="Off"
        />
        <Button type="submit">Save Preferences</Button>
      </form>
    </Form>
  );
}

function AlignRightForm() {
  const form = useForm<SwitchFormValues>({
    defaultValues: {
      maintenance: false,
    },
  });

  function onSubmit(values: SwitchFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldSwitch
          name="maintenance"
          label="Maintenance Mode"
          description="Put the system in maintenance mode"
          alignRight
          onLabel="Enabled"
          offLabel="Disabled"
        />
        <Button type="submit">Save Settings</Button>
      </form>
    </Form>
  );
}

function PreSelectedForm() {
  const form = useForm<SwitchFormValues>({
    defaultValues: {
      subscribed: true,
    },
  });

  function onSubmit(values: SwitchFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldSwitch
          name="subscribed"
          label="Newsletter Subscription"
          description="Receive our weekly newsletter"
        />
        <Button type="submit">Save Preferences</Button>
      </form>
    </Form>
  );
}

function DisabledForm() {
  const form = useForm<SwitchFormValues>({
    defaultValues: {
      advanced: false,
    },
  });

  function onSubmit(values: SwitchFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldSwitch
          name="advanced"
          label="Advanced Features"
          description="Enable advanced features (requires admin privileges)"
          disabled
        />
        <Button type="submit">Save Preferences</Button>
      </form>
    </Form>
  );
}

function RequiredForm() {
  const schema = z.object({
    notifications: z.boolean().refine((val) => val === true, {
      message: "You must enable notifications",
    }),
    darkMode: z.boolean().optional(),
    maintenance: z.boolean().optional(),
    subscribed: z.boolean().optional(),
    advanced: z.boolean().optional(),
  });

  const form = useForm<SwitchFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      notifications: false,
      darkMode: false,
      maintenance: false,
      subscribed: false,
      advanced: false,
    },
  });

  function onSubmit(values: SwitchFormValues) {
    alert(JSON.stringify(values));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldSwitch
          name="notifications"
          label="Enable Notifications"
          description="Notifications are required for this system"
          required
        />
        <Button type="submit">Save Preferences</Button>
      </form>
    </Form>
  );
}

// Basic switch
export const Default: Story = {
  render: () => <BasicSwitchForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchElement = canvas.getByRole("switch");

    // Check initial state
    await expect(switchElement).not.toBeChecked();

    // Toggle switch
    await userEvent.click(switchElement);
    await expect(switchElement).toBeChecked();
  },
};

// Switch with on/off labels
export const WithLabels: Story = {
  render: () => <WithLabelsForm />,
};

// Switch aligned to the right
export const AlignRight: Story = {
  render: () => <AlignRightForm />,
};

// Pre-selected switch
export const PreSelected: Story = {
  render: () => <PreSelectedForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchElement = canvas.getByRole("switch");

    // Check initial state
    await expect(switchElement).toBeChecked();
  },
};

// Disabled switch
export const Disabled: Story = {
  render: () => <DisabledForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchElement = canvas.getByRole("switch");

    // Check disabled state
    await expect(switchElement).toBeDisabled();
  },
};

// Required switch with validation
export const Required: Story = {
  render: () => <RequiredForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check required indicator
    await expect(
      canvas.getByText("*", { selector: ".text-destructive" })
    ).toBeInTheDocument();

    // Submit form to trigger validation
    const submitButton = canvas.getByRole("button", {
      name: /save preferences/i,
    });
    await userEvent.click(submitButton);

    // Check error message
    const error = await canvas.findByText(/you must enable notifications/i);
    await expect(error).toBeVisible();
  },
};
