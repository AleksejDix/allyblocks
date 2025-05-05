import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { z } from "zod";
import { FieldSelectNative } from "./FieldSelectNative";
import { Form } from "@/components/molecules/Form/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/atoms/Button/Button";

const meta: Meta<typeof FieldSelectNative> = {
  component: FieldSelectNative,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof FieldSelectNative>;

type DefaultValues = {
  favoriteFramework: string;
};

function DefaultForm() {
  const schema = z.object({
    favoriteFramework: z.string().min(1, "Please select a framework"),
  });

  const form = useForm<DefaultValues>({
    defaultValues: {
      favoriteFramework: "",
    },
    resolver: zodResolver(schema),
  });

  function onSubmit(values: DefaultValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldSelectNative
          name="favoriteFramework"
          label="Favorite Framework"
          description="Select your favorite JavaScript framework"
          placeholder="Choose a framework"
          required
        >
          <option value="react">React</option>
          <option value="vue">Vue</option>
          <option value="angular">Angular</option>
          <option value="svelte">Svelte</option>
        </FieldSelectNative>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export const Default: Story = {
  render: () => <DefaultForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const select = canvas.getByRole("combobox");
    await expect(select).toBeInTheDocument();

    await userEvent.selectOptions(select, "react");
    expect(select).toHaveValue("react");
  },
};

type TechValues = {
  techCategory: string;
};

function GroupsForm() {
  const schema = z.object({
    techCategory: z.string().min(1, "Please select a technology"),
  });

  const form = useForm<TechValues>({
    defaultValues: {
      techCategory: "",
    },
    resolver: zodResolver(schema),
  });

  function onSubmit(values: TechValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldSelectNative
          name="techCategory"
          label="Technology Category"
          placeholder="Select a technology"
          required
        >
          <optgroup label="Frontend">
            <option value="react">React</option>
            <option value="vue">Vue</option>
            <option value="angular">Angular</option>
          </optgroup>
          <optgroup label="Backend">
            <option value="node">Node.js</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </optgroup>
          <optgroup label="Mobile">
            <option value="reactNative">React Native</option>
            <option value="flutter">Flutter</option>
            <option value="swift">Swift</option>
          </optgroup>
        </FieldSelectNative>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export const WithOptGroups: Story = {
  render: () => <GroupsForm />,
};

type DisabledValues = {
  disabledField: string;
};

function DisabledForm() {
  const form = useForm<DisabledValues>({
    defaultValues: {
      disabledField: "react",
    },
  });

  function onSubmit(values: DisabledValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldSelectNative name="disabledField" label="Disabled Field" disabled>
          <option value="react">React</option>
          <option value="vue">Vue</option>
          <option value="angular">Angular</option>
        </FieldSelectNative>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export const Disabled: Story = {
  render: () => <DisabledForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const select = canvas.getByRole("combobox");
    await expect(select).toBeInTheDocument();
    expect(select).toBeDisabled();
  },
};

type ValidationValues = {
  requiredField: string;
};

function ValidationForm() {
  const schema = z.object({
    requiredField: z.string().min(1, "This field is required"),
  });

  const form = useForm<ValidationValues>({
    defaultValues: {
      requiredField: "",
    },
    resolver: zodResolver(schema),
  });

  function onSubmit(values: ValidationValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldSelectNative name="requiredField" label="Required Field" required>
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </FieldSelectNative>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export const WithValidation: Story = {
  render: () => <ValidationForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Submit the form without selecting a value
    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    // Validation error should appear
    await expect(
      canvas.getByText("This field is required")
    ).toBeInTheDocument();

    // Select a value and validation should pass
    const select = canvas.getByRole("combobox");
    await userEvent.selectOptions(select, "option1");

    // Submit again
    await userEvent.click(submitButton);

    // Error should be gone
    await expect(
      canvas.queryByText("This field is required")
    ).not.toBeInTheDocument();
  },
};

type MultiSelectValues = {
  technologies: string[];
};

function MultiSelectForm() {
  const schema = z.object({
    technologies: z.array(z.string()).min(1, "Select at least one technology"),
  });

  const form = useForm<MultiSelectValues>({
    defaultValues: {
      technologies: [],
    },
    resolver: zodResolver(schema),
  });

  function onSubmit(values: MultiSelectValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FieldSelectNative
          name="technologies"
          label="Select Technologies"
          description="Hold Ctrl/Cmd to select multiple options"
          multiple
          size={5}
          required
        >
          <optgroup label="Frontend">
            <option value="react">React</option>
            <option value="vue">Vue</option>
            <option value="angular">Angular</option>
          </optgroup>
          <optgroup label="Backend">
            <option value="node">Node.js</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </optgroup>
        </FieldSelectNative>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export const MultiSelect: Story = {
  render: () => <MultiSelectForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Simply verify the component renders correctly
    const select = canvas.getByRole("listbox");
    await expect(select).toBeInTheDocument();

    // Verify it has the multiple attribute
    expect(select).toHaveAttribute("multiple");

    // Verify options are present
    const options = select.querySelectorAll("option");
    expect(options.length).toBeGreaterThan(0);

    // Check that the form contains the description
    expect(
      canvas.getByText("Hold Ctrl/Cmd to select multiple options")
    ).toBeInTheDocument();
  },
};
