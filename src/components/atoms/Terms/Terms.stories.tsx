import type { Meta, StoryObj } from '@storybook/react'
import { Terms, Term, TermDefinition } from './Terms'
import React from 'react'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/molecules/Card/'

const meta: Meta<typeof Terms> = {
  component: Terms,
  subcomponents: { Term, TermDefinition },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Terms>

export const Default: Story = {
  render: () => (
    <Terms>
      <Term>Name</Term>
      <TermDefinition>John Doe</TermDefinition>
      <Term>Email</Term>
      <TermDefinition>john.doe@example.com</TermDefinition>
      <Term>Position</Term>
      <TermDefinition>Software Engineer</TermDefinition>
      <Term>About</Term>
      <TermDefinition>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</TermDefinition>
    </Terms>
  ),
}

export const Divided: Story = {
  render: () => (
    <Terms variant="divided">
      <Term>Name</Term>
      <TermDefinition>John Doe</TermDefinition>
      <Term>Email</Term>
      <TermDefinition>john.doe@example.com</TermDefinition>
      <Term>Position</Term>
      <TermDefinition>Software Engineer</TermDefinition>
      <Term>Department</Term>
      <TermDefinition>Engineering</TermDefinition>
    </Terms>
  ),
}

export const Striped: Story = {
  render: () => (
    <Terms variant="striped">
      <Term>Name</Term>
      <TermDefinition>John Doe</TermDefinition>
      <Term>Email</Term>
      <TermDefinition>john.doe@example.com</TermDefinition>
      <Term>Position</Term>
      <TermDefinition>Software Engineer</TermDefinition>
      <Term>Department</Term>
      <TermDefinition>Engineering</TermDefinition>
    </Terms>
  ),
}

export const CustomStyling: Story = {
  render: () => (
    <Terms className="bg-muted p-4 rounded-lg">
      <Term className="text-primary">Name</Term>
      <TermDefinition className="font-semibold">John Doe</TermDefinition>
      <Term className="text-primary">Email</Term>
      <TermDefinition className="font-semibold">john.doe@example.com</TermDefinition>
      <Term className="text-primary">Position</Term>
      <TermDefinition className="font-semibold">Software Engineer</TermDefinition>
      <Term className="text-primary">Department</Term>
      <TermDefinition className="font-semibold">Engineering</TermDefinition>
    </Terms>
  ),
}

export const CustomRatio: Story = {
  render: () => (
    <Terms className="grid-cols-3">
      <Term className="md:col-span-2">Name</Term>
      <TermDefinition className="md:col-span-1">John Doe</TermDefinition>
      <Term className="md:col-span-2">Email</Term>
      <TermDefinition className="md:col-span-1">john.doe@example.com</TermDefinition>
      <Term className="md:col-span-2">Position</Term>
      <TermDefinition className="md:col-span-1">Software Engineer</TermDefinition>
      <Term className="md:col-span-2">Department</Term>
      <TermDefinition className="md:col-span-1">Engineering</TermDefinition>
    </Terms>
  ),
}

export const FormLayout: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardBody>
        <Terms>
          {formData.map((item, index) => (
            <React.Fragment key={index}>
              <Term>{item.label}</Term>
              <TermDefinition className="font-medium">{item.value}</TermDefinition>
            </React.Fragment>
          ))}
        </Terms>
      </CardBody>
    </Card>
  ),
}

// Data for FormLayout example
const formData = [
  { label: 'Full name', value: 'Alex Thompson' },
  { label: 'Address', value: '123 Main Street, City, Country' },
  { label: 'Email address', value: 'alex@example.com' },
  { label: 'Phone number', value: '+1 234 567 890' },
  { label: 'Date of birth', value: 'January 15, 1985' },
  { label: 'Occupation', value: 'Software Developer' },
  {
    label: 'About',
    value: 'A motivated professional with 5+ years of experience in software development.',
  },
]
