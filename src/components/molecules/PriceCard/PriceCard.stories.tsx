import type { Meta, StoryObj } from '@storybook/react'
import { PriceCard } from './PriceCard'
import { Text } from '@/components/atoms/Text'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { Price } from '@/components/atoms/Price'
import { BulletList, BulletListItem } from '@/components/molecules/BulletList'
import { Stack } from '@/components/atoms/Stack'

const meta: Meta<typeof PriceCard> = {
  component: PriceCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    'aria-selected': { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ul role="listbox" aria-label="Pricing plans" className="list-none p-0 m-0">
      <PriceCard role="option" aria-selected={false}>
        <Text as="h3" type="heading" size="lg">
          Freelancer
        </Text>
        <Price amount={199} period="/year" size="3xl" />
        <Button variant="outline" className="w-full">
          Buy plan
        </Button>
        <BulletList gap="sm">
          <BulletListItem icon="check">
            <Text size="sm">5 products</Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm">Up to 1,000 subscribers</Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm">Basic analytics</Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm">48-hour support response time</Text>
          </BulletListItem>
        </BulletList>
      </PriceCard>
    </ul>
  ),
}

export const Selected: Story = {
  render: () => (
    <ul role="listbox" aria-label="Pricing plans" className="list-none p-0 m-0">
      <PriceCard role="option" aria-selected={true}>
        <div className="flex items-center justify-between">
          <Text as="h3" type="heading" size="lg">
            Startup
          </Text>
          <Badge color="blue" theme="inverted" size="sm">
            Most popular
          </Badge>
        </div>
        <Price amount={299} period="/year" theme="inverted" size="3xl" />
        <Button variant="secondary" className="w-full bg-white text-black hover:bg-gray-100">
          Buy plan
        </Button>
        <BulletList gap="sm">
          <BulletListItem icon="check">
            <Text size="sm" className="text-gray-300">
              25 products
            </Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm" className="text-gray-300">
              Up to 10,000 subscribers
            </Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm" className="text-gray-300">
              Advanced analytics
            </Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm" className="text-gray-300">
              24-hour support response time
            </Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm" className="text-gray-300">
              Marketing automations
            </Text>
          </BulletListItem>
        </BulletList>
      </PriceCard>
    </ul>
  ),
}

export const PricingTable: Story = {
  render: () => (
    <ul
      role="listbox"
      aria-label="Pricing plans"
      className="list-none p-0 m-0 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl"
    >
      <PriceCard role="option" aria-selected={false}>
        <Text as="h3" type="heading" size="lg">
          Freelancer
        </Text>
        <Price amount={199} period="/year" size="3xl" />
        <Button variant="outline" className="w-full">
          Buy plan
        </Button>
        <BulletList gap="sm">
          <BulletListItem icon="check">
            <Text size="sm">5 products</Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm">Up to 1,000 subscribers</Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm">Basic analytics</Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm">48-hour support response time</Text>
          </BulletListItem>
        </BulletList>
      </PriceCard>

      <PriceCard role="option" aria-selected={true}>
        <div className="flex items-center justify-between">
          <Text as="h3" type="heading" size="lg">
            Startup
          </Text>
          <Badge color="blue" theme="inverted" size="sm">
            Most popular
          </Badge>
        </div>
        <Price amount={299} period="/year" theme="inverted" size="3xl" />
        <Button variant="secondary" className="w-full bg-white text-black hover:bg-gray-100">
          Buy plan
        </Button>
        <BulletList gap="sm">
          <BulletListItem icon="check">
            <Text size="sm" className="text-gray-300">
              25 products
            </Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm" className="text-gray-300">
              Up to 10,000 subscribers
            </Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm" className="text-gray-300">
              Advanced analytics
            </Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm" className="text-gray-300">
              24-hour support response time
            </Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm" className="text-gray-300">
              Marketing automations
            </Text>
          </BulletListItem>
        </BulletList>
      </PriceCard>

      <PriceCard role="option" aria-selected={false}>
        <Text as="h3" type="heading" size="lg">
          Enterprise
        </Text>
        <Price amount={599} period="/year" size="3xl" />
        <Button variant="outline" className="w-full">
          Buy plan
        </Button>
        <BulletList gap="sm">
          <BulletListItem icon="check">
            <Text size="sm">Unlimited products</Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm">Unlimited subscribers</Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm">Advanced analytics</Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm">1-hour, dedicated support response time</Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm">Marketing automations</Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm">Custom reporting tools</Text>
          </BulletListItem>
        </BulletList>
      </PriceCard>
    </ul>
  ),
}

export const WithDiscounts: Story = {
  render: () => (
    <ul
      role="listbox"
      aria-label="Pricing plans"
      className="list-none p-0 m-0 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl"
    >
      <PriceCard role="option" aria-selected={false}>
        <Text as="h3" type="heading" size="lg">
          Pro
        </Text>
        <Price
          amount={55}
          originalAmount={69}
          discounted
          layout="vertical"
          discountColor="red"
          period="/year"
          size="3xl"
        />
        <Button variant="outline" className="w-full">
          Buy plan
        </Button>
        <BulletList gap="sm">
          <BulletListItem icon="check">
            <Text size="sm">Call intelligence</Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm">Advanced analytics</Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm">Deal insights</Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm">Email support</Text>
          </BulletListItem>
        </BulletList>
      </PriceCard>

      <PriceCard role="option" aria-selected={true}>
        <Stack direction="row" gap="lg" align="center" justify="between">
          <Text as="h3" type="heading" size="lg">
            Enterprise
          </Text>
          <Badge color="blue" theme="inverted" size="sm">
            Most popular
          </Badge>
        </Stack>
        <Price
          amount={99}
          originalAmount={129}
          discounted
          layout="vertical"
          discountColor="red"
          period="/year"
          theme="inverted"
          size="3xl"
        />
        <Button variant="secondary" className="w-full bg-white text-black hover:bg-gray-100">
          Buy plan
        </Button>
        <BulletList gap="sm">
          <BulletListItem icon="check">
            <Text size="sm" className="text-gray-300">
              Call intelligence
            </Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm" className="text-gray-300">
              Advanced analytics
            </Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm" className="text-gray-300">
              Deal insights
            </Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm" className="text-gray-300">
              Priority support
            </Text>
          </BulletListItem>
          <BulletListItem icon="check">
            <Text size="sm" className="text-gray-300">
              Custom integrations
            </Text>
          </BulletListItem>
        </BulletList>
      </PriceCard>
    </ul>
  ),
}
