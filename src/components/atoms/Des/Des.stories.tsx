import type { Meta, StoryObj } from "@storybook/react";
import { Des, DesLabel, DesValue } from "./Des";
import React from "react";

const meta: Meta<typeof Des> = {
  component: Des,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Des>;

export const Default: Story = {
  render: () => (
    <Des className="w-[600px]">
      <DesLabel>Name</DesLabel>
      <DesValue>John Doe</DesValue>
      <DesLabel>Email</DesLabel>
      <DesValue>john.doe@example.com</DesValue>
      <DesLabel>Position</DesLabel>
      <DesValue>Software Engineer</DesValue>
      <DesLabel>Department</DesLabel>
      <DesValue>Engineering</DesValue>
    </Des>
  ),
};

export const Divided: Story = {
  render: () => (
    <Des variant="divided" className="w-[600px]">
      <DesLabel>Name</DesLabel>
      <DesValue>John Doe</DesValue>
      <DesLabel>Email</DesLabel>
      <DesValue>john.doe@example.com</DesValue>
      <DesLabel>Position</DesLabel>
      <DesValue>Software Engineer</DesValue>
      <DesLabel>Department</DesLabel>
      <DesValue>Engineering</DesValue>
    </Des>
  ),
};

export const Striped: Story = {
  render: () => (
    <Des variant="striped" className="w-[600px]">
      <DesLabel>Name</DesLabel>
      <DesValue>John Doe</DesValue>
      <DesLabel>Email</DesLabel>
      <DesValue>john.doe@example.com</DesValue>
      <DesLabel>Position</DesLabel>
      <DesValue>Software Engineer</DesValue>
      <DesLabel>Department</DesLabel>
      <DesValue>Engineering</DesValue>
    </Des>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Des className="w-[600px] bg-muted p-4 rounded-lg">
      <DesLabel className="text-primary">Name</DesLabel>
      <DesValue className="font-semibold">John Doe</DesValue>
      <DesLabel className="text-primary">Email</DesLabel>
      <DesValue className="font-semibold">john.doe@example.com</DesValue>
      <DesLabel className="text-primary">Position</DesLabel>
      <DesValue className="font-semibold">Software Engineer</DesValue>
      <DesLabel className="text-primary">Department</DesLabel>
      <DesValue className="font-semibold">Engineering</DesValue>
    </Des>
  ),
};

export const CustomRatio: Story = {
  render: () => (
    <Des className="w-[600px] grid-cols-12">
      <DesLabel className="col-span-4">Name</DesLabel>
      <DesValue className="col-span-8">John Doe</DesValue>
      <DesLabel className="col-span-4">Email</DesLabel>
      <DesValue className="col-span-8">john.doe@example.com</DesValue>
      <DesLabel className="col-span-4">Position</DesLabel>
      <DesValue className="col-span-8">Software Engineer</DesValue>
      <DesLabel className="col-span-4">Department</DesLabel>
      <DesValue className="col-span-8">Engineering</DesValue>
    </Des>
  ),
};

export const FormLayout: Story = {
  render: () => (
    <div className="w-full max-w-lg p-6 border rounded-lg bg-card">
      <h2 className="text-xl font-semibold mb-4">User Information</h2>
      <Des className="w-full">
        {formData.map((item, index) => (
          <React.Fragment key={index}>
            <DesLabel>{item.label}</DesLabel>
            <DesValue className="font-medium">{item.value}</DesValue>
          </React.Fragment>
        ))}
      </Des>
    </div>
  ),
};

// Data for FormLayout example
const formData = [
  { label: "Full name", value: "Alex Thompson" },
  { label: "Address", value: "123 Main Street, City, Country" },
  { label: "Email address", value: "alex@example.com" },
  { label: "Phone number", value: "+1 234 567 890" },
  { label: "Date of birth", value: "January 15, 1985" },
  { label: "Occupation", value: "Software Developer" },
  {
    label: "About",
    value:
      "A motivated professional with 5+ years of experience in software development.",
  },
];
