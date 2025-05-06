import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FieldEmail } from "@/components/molecules/Fields/FieldEmail";
import { FieldPassword } from "@/components/molecules/Fields/FieldPassword";
import { FieldOTP } from "@/components/molecules/Fields/FieldOTP";
import { FieldTextarea } from "@/components/molecules/Fields/FieldTextarea";
import { FieldCheckbox } from "@/components/molecules/Fields/FieldCheckbox";
import { FieldSelect } from "@/components/molecules/Fields/FieldSelect";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./Form";
import { FieldText } from "../Fields/FieldText/FieldText";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const meta: Meta<typeof Form> = {
  component: Form,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Form>;

function DefaultForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" type="email" {...field} />
              </FormControl>
              <FormDescription>
                We'll never share your email with anyone else.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Must be at least 8 characters long.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function InitialValuesForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "johndoe",
      email: "john@example.com",
      password: "password123",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormDescription>
                We'll never share your email with anyone else.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Must be at least 8 characters long.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function CustomValidationForm() {
  const customSchema = z.object({
    age: z.number().min(18, {
      message: "You must be at least 18 years old.",
    }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
    feedback: z.string().min(20, {
      message: "Feedback must be at least 20 characters long.",
    }),
  });

  const form = useForm<z.infer<typeof customSchema>>({
    resolver: zodResolver(customSchema),
    defaultValues: {
      age: 0,
      terms: false,
      feedback: "",
    },
  });

  function onSubmit(values: z.infer<typeof customSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                You must be at least 18 years old to register.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FieldTextarea
          name="feedback"
          label="Your Feedback"
          description="Please provide detailed feedback about your experience"
          placeholder="Tell us what you think..."
          required
          minHeight={100}
        />

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Accept terms and conditions</FormLabel>
                <FormDescription>
                  You agree to our Terms of Service and Privacy Policy.
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function AllFieldTypesForm() {
  const allFieldsSchema = z.object({
    text: z.string().min(2, "Text must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    number: z.number().min(0, "Must be a positive number"),
    checkbox: z.boolean(),
    textarea: z.string().min(10, "Must be at least 10 characters"),
    select: z.string().min(1, "Please select an option"),
    otp: z.string().length(6, "OTP must be 6 digits"),
  });

  const form = useForm<z.infer<typeof allFieldsSchema>>({
    resolver: zodResolver(allFieldsSchema),
    defaultValues: {
      text: "",
      email: "",
      password: "",
      number: 0,
      checkbox: false,
      textarea: "",
      select: "",
      otp: "",
    },
  });

  function onSubmit(values: z.infer<typeof allFieldsSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[400px]"
      >
        <FieldText
          name="text"
          label="Text Input"
          description="Standard text input field"
          placeholder="Enter text..."
          required
        />

        <FieldEmail
          name="email"
          label="Email Input"
          description="Email input with validation"
          placeholder="email@example.com"
          required
        />

        <FieldPassword
          name="password"
          label="Password Input"
          description="Secure password input"
          placeholder="Password"
          required
          showStrength
        />

        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number Input</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>Numeric input field</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FieldTextarea
          name="textarea"
          label="Textarea"
          description="Multi-line text input"
          placeholder="Enter longer text here..."
          minHeight={80}
          required
        />

        <FieldCheckbox
          name="checkbox"
          label="Accept terms"
          description="Checkbox input example"
          required
        />

        <FieldSelect
          name="select"
          label="Select Option"
          description="Dropdown selection example"
          options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
          ]}
          placeholder="Choose an option"
          required
        />

        <FieldOTP
          name="otp"
          label="OTP Input"
          description="One-time password input"
          maxLength={6}
          required
        />

        <Button type="submit" className="mt-4">
          Submit All Fields
        </Button>
      </form>
    </Form>
  );
}

// Basic form with validation
export const Default: Story = {
  render: () => <DefaultForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test form validation
    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    // Check for validation messages
    const usernameError = canvas.getByText(
      /username must be at least 2 characters/i
    );
    await expect(usernameError).toBeVisible();

    const emailError = canvas.getByText(/please enter a valid email address/i);
    await expect(emailError).toBeVisible();

    const passwordError = canvas.getByText(
      /password must be at least 8 characters/i
    );
    await expect(passwordError).toBeVisible();

    // Fill in valid data
    const usernameInput = canvas.getByPlaceholderText(/enter username/i);
    await userEvent.type(usernameInput, "john");

    const emailInput = canvas.getByPlaceholderText(/enter email/i);
    await userEvent.type(emailInput, "john@example.com");

    const passwordInput = canvas.getByPlaceholderText(/enter password/i);
    await userEvent.type(passwordInput, "password123");

    // Submit again
    await userEvent.click(submitButton);

    // Verify no error messages are visible
    await expect(usernameError).not.toBeVisible();
    await expect(emailError).not.toBeVisible();
    await expect(passwordError).not.toBeVisible();
  },
};

// Form with initial values
export const WithInitialValues: Story = {
  render: () => <InitialValuesForm />,
};

// Form with custom validation
export const WithCustomValidation: Story = {
  render: () => <CustomValidationForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test form validation
    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    // Check for validation messages
    const ageError = canvas.getByText(/you must be at least 18 years old/i);
    await expect(ageError).toBeVisible();

    const termsError = canvas.getByText(
      /you must accept the terms and conditions/i
    );
    await expect(termsError).toBeVisible();

    const feedbackError = canvas.getByText(
      /feedback must be at least 20 characters long/i
    );
    await expect(feedbackError).toBeVisible();

    // Fill in valid data
    const ageInput = canvas.getByRole("spinbutton");
    await userEvent.clear(ageInput);
    await userEvent.type(ageInput, "21");

    const feedbackTextarea = canvas.getByPlaceholderText(
      /tell us what you think/i
    );
    await userEvent.type(
      feedbackTextarea,
      "This is a detailed feedback that is more than 20 characters long."
    );

    const termsCheckbox = canvas.getByRole("checkbox");
    await userEvent.click(termsCheckbox);

    // Submit again
    await userEvent.click(submitButton);

    // Verify no error messages are visible
    await expect(ageError).not.toBeVisible();
    await expect(feedbackError).not.toBeVisible();
    await expect(termsError).not.toBeVisible();
  },
};

// Form with all field types
export const AllFieldTypes: Story = {
  render: () => <AllFieldTypesForm />,
  parameters: {
    docs: {
      description: {
        story: "Demonstrates all available form field types in a single form.",
      },
    },
  },
};
