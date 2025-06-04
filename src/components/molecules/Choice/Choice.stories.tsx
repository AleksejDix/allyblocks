import type { Meta, StoryObj } from '@storybook/react'
import { Choice, ChoiceItem, ChoiceIcon, ChoiceContent, ChoiceLabel, ChoiceDescription } from './Choice'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'

const meta: Meta<typeof Choice> = {
  component: Choice,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Name attribute for radio group',
    },
    defaultValue: {
      control: 'text',
      description: 'Default selected value',
    },
  },
}

export default meta
type Story = StoryObj<typeof Choice>

export const Default: Story = {
  render: (args) => (
    <div className="w-96">
      <Choice name="plan" defaultValue="premium" {...args}>
        <ChoiceItem value="basic" id="plan-basic">
          <ChoiceIcon>
            <Icon name="user" />
          </ChoiceIcon>
          <ChoiceContent>
            <ChoiceLabel>
              Basic Plan{' '}
              <Text as="span" className="text-gray-500 text-xs font-normal">
                (Free)
              </Text>
            </ChoiceLabel>
            <ChoiceDescription>Perfect for individuals just getting started with basic features.</ChoiceDescription>
          </ChoiceContent>
        </ChoiceItem>

        <ChoiceItem value="premium" id="plan-premium">
          <ChoiceIcon>
            <Icon name="star" />
          </ChoiceIcon>
          <ChoiceContent>
            <ChoiceLabel>
              Premium Plan{' '}
              <Text as="span" className="text-gray-500 text-xs font-normal">
                ($19/month)
              </Text>
            </ChoiceLabel>
            <ChoiceDescription>Advanced features with priority support for growing teams.</ChoiceDescription>
          </ChoiceContent>
        </ChoiceItem>
      </Choice>
    </div>
  ),
  args: {
    name: 'plan',
    defaultValue: 'premium',
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="w-96">
      <Text type="heading" size="md" className="mb-4">
        Plan Selection (Some Disabled)
      </Text>
      <Choice name="planDisabled" defaultValue="basic">
        <ChoiceItem value="basic" id="plan-basic-disabled">
          <ChoiceIcon>
            <Icon name="user" />
          </ChoiceIcon>
          <ChoiceContent>
            <ChoiceLabel>Basic Plan</ChoiceLabel>
            <ChoiceDescription>Free tier with limited features</ChoiceDescription>
          </ChoiceContent>
        </ChoiceItem>

        <ChoiceItem value="premium" id="plan-premium-disabled" disabled>
          <ChoiceIcon>
            <Icon name="star" />
          </ChoiceIcon>
          <ChoiceContent>
            <ChoiceLabel>Premium Plan</ChoiceLabel>
            <ChoiceDescription>Currently unavailable in your region</ChoiceDescription>
          </ChoiceContent>
        </ChoiceItem>

        <ChoiceItem value="enterprise" id="plan-enterprise-disabled" disabled>
          <ChoiceIcon>
            <Icon name="building" />
          </ChoiceIcon>
          <ChoiceContent>
            <ChoiceLabel>Enterprise Plan</ChoiceLabel>
            <ChoiceDescription>Contact sales for availability</ChoiceDescription>
          </ChoiceContent>
        </ChoiceItem>
      </Choice>
    </div>
  ),
}
