import type { Meta, StoryObj } from '@storybook/react-vite'
import { within } from 'storybook/test'
import { expect } from 'storybook/test'

import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs'
import { Icon } from '@/components/atoms/Icon'

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  subcomponents: {
    TabsList,
    TabsTrigger,
    TabsContent,
  },
  parameters: {
    nuqs: {
      disabled: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The value of the tab that should be active when initially rendered',
    },
    value: {
      control: 'text',
      description: 'The controlled value of the tab to activate',
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the component',
    },
  },
}
export default meta

type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  args: {
    defaultValue: 'account',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p>Account settings and profile information.</p>
      </TabsContent>
      <TabsContent value="password">
        <p>Change your password and security settings.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p>Application preferences and configuration.</p>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const tabs = canvas.getAllByRole('tab')
    await expect(tabs).toHaveLength(3)

    // Check if first tab is active by default
    await expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
  },
}

export const WithIcons: Story = {
  args: {
    defaultValue: 'overview',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="overview">
          <Icon name="bar-chart-3" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="analytics">
          <Icon name="pie-chart" />
          Analytics
        </TabsTrigger>
        <TabsTrigger value="reports">
          <Icon name="file-text" />
          Reports
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Icon name="bell" />
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p>Dashboard overview and key metrics.</p>
      </TabsContent>
      <TabsContent value="analytics">
        <p>Detailed analytics and insights.</p>
      </TabsContent>
      <TabsContent value="reports">
        <p>Generate and download reports.</p>
      </TabsContent>
      <TabsContent value="notifications">
        <p>Notification preferences and settings.</p>
      </TabsContent>
    </Tabs>
  ),
}

export const Sizes: Story = {
  args: {
    defaultValue: 'small',
  },
  render: (args) => (
    <div className="space-y-8">
      <div>
        <h4 className="mb-4 font-medium">Small Size</h4>
        <Tabs {...args}>
          <TabsList size="sm">
            <TabsTrigger value="small" size="sm">
              Small
            </TabsTrigger>
            <TabsTrigger value="tab2" size="sm">
              Tab Two
            </TabsTrigger>
          </TabsList>
          <TabsContent value="small">
            <p>Small tabs content.</p>
          </TabsContent>
          <TabsContent value="tab2">
            <p>Another small tab content.</p>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <h4 className="mb-4 font-medium">Default Size</h4>
        <Tabs defaultValue="default">
          <TabsList>
            <TabsTrigger value="default">Default</TabsTrigger>
            <TabsTrigger value="tab2">Tab Two</TabsTrigger>
          </TabsList>
          <TabsContent value="default">
            <p>Default size tabs content.</p>
          </TabsContent>
          <TabsContent value="tab2">
            <p>Another default tab content.</p>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <h4 className="mb-4 font-medium">Large Size</h4>
        <Tabs defaultValue="large">
          <TabsList size="lg">
            <TabsTrigger value="large" size="lg">
              Large
            </TabsTrigger>
            <TabsTrigger value="tab2" size="lg">
              Tab Two
            </TabsTrigger>
          </TabsList>
          <TabsContent value="large">
            <p>Large tabs content.</p>
          </TabsContent>
          <TabsContent value="tab2">
            <p>Another large tab content.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
}

export const Vertical: Story = {
  args: {
    defaultValue: 'profile',
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="flex h-[400px] w-full">
      <Tabs {...args} className="flex-1">
        <TabsList orientation="vertical">
          <TabsTrigger value="profile" orientation="vertical">
            <Icon name="user" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="account" orientation="vertical">
            <Icon name="settings" />
            Account
          </TabsTrigger>
          <TabsTrigger value="security" orientation="vertical">
            <Icon name="shield" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" orientation="vertical">
            <Icon name="bell" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing" orientation="vertical">
            <Icon name="credit-card" />
            Billing
          </TabsTrigger>
        </TabsList>
        <div className="flex-1 pl-6">
          <TabsContent value="profile">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Profile Settings</h3>
              <p className="text-muted-foreground">Manage your profile information and public display settings.</p>
            </div>
          </TabsContent>
          <TabsContent value="account">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Account Settings</h3>
              <p className="text-muted-foreground">Update your account details and preferences.</p>
            </div>
          </TabsContent>
          <TabsContent value="security">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Security Settings</h3>
              <p className="text-muted-foreground">
                Manage your password, two-factor authentication, and security preferences.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="notifications">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Settings</h3>
              <p className="text-muted-foreground">Configure how and when you receive notifications.</p>
            </div>
          </TabsContent>
          <TabsContent value="billing">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Billing Settings</h3>
              <p className="text-muted-foreground">Manage your subscription, payment methods, and billing history.</p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  ),
}
