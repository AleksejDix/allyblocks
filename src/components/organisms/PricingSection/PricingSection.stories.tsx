import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Container } from '@/components/atoms/Container'
import { Text } from '@/components/atoms/Text'
import { PriceCard } from '@/components/molecules/PriceCard'
import { Price } from '@/components/atoms/Price'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { BulletList, BulletListItem } from '@/components/molecules/BulletList'
import { Segments, Segment } from '@/components/molecules/Segments'
import { Stack } from '@/components/atoms/Stack'

const meta: Meta = {
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const PricingPage: Story = {
  render: () => {
    const [selected, setSelected] = useState('yearly')
    const isYearly = selected === 'yearly'

    return (
      <Container size="xl" className="py-16 space-y-8">
        {/* Title */}
        <div className="flex flex-col items-center max-w-md mx-auto">
          <Stack gap="lg">
            <Text as="h1" type="heading" size="4xl" align="center">
              Pricing
            </Text>

            {/* Subtitle */}
            <Text size="lg" tone="muted" align="center">
              Use Allyship with your whole team. Upgrade to enable additional features.
            </Text>
          </Stack>
        </div>

        {/* Segments Toggle */}
        <div className="flex justify-center">
          <Segments value={selected} onValueChange={(value) => setSelected(value || 'yearly')}>
            <Segment value="monthly">Monthly</Segment>
            <Segment value="yearly">Yearly</Segment>
          </Segments>
        </div>

        {/* Pricing Grid */}
        <ul
          role="listbox"
          aria-label="Pricing plans"
          className="list-none p-0 m-0 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <PriceCard role="option" aria-selected={false}>
            <Text as="h3" type="heading" size="lg">
              Basic Monitoring
            </Text>
            {isYearly ? (
              <Price amount={99.99} originalAmount={119.88} layout="vertical" discounted period="/year" size="3xl" />
            ) : (
              <Price amount={9.99} period="/month" size="3xl" />
            )}
            <Button variant="outline" className="w-full">
              Get started
            </Button>
            <BulletList gap="sm">
              <BulletListItem icon="check">
                <Text size="sm">1 Domain</Text>
              </BulletListItem>
              <BulletListItem icon="check">
                <Text size="sm">10 Pages per Domain</Text>
              </BulletListItem>
              <BulletListItem icon="check">
                <Text size="sm">Weekly Reports</Text>
              </BulletListItem>
            </BulletList>
          </PriceCard>

          <PriceCard role="option" aria-selected={false}>
            <Text as="h3" type="heading" size="lg">
              Advanced Manual Auditing
            </Text>
            {isYearly ? (
              <Price amount={199.99} originalAmount={239.88} layout="vertical" discounted period="/year" size="3xl" />
            ) : (
              <Price amount={19.99} period="/month" size="3xl" />
            )}
            <Button variant="outline" className="w-full">
              Get started
            </Button>

            <BulletList gap="sm">
              <BulletListItem icon="check">
                <Text size="sm">10 Domains</Text>
              </BulletListItem>
              <BulletListItem icon="check">
                <Text size="sm">100 Pages per Domain</Text>
              </BulletListItem>
              <BulletListItem icon="check">
                <Text size="sm">AllyStudio Access</Text>
              </BulletListItem>
            </BulletList>
          </PriceCard>

          <PriceCard role="option" aria-selected={true}>
            <div className="flex items-center justify-between">
              <Text as="h3" type="heading" size="lg">
                Automated Auditing
              </Text>
              <Badge color="blue" theme="inverted" size="sm">
                Most popular
              </Badge>
            </div>
            {isYearly ? (
              <Price
                amount={499.99}
                originalAmount={599.88}
                layout="vertical"
                discounted
                period="/year"
                theme="inverted"
                size="3xl"
              />
            ) : (
              <Price amount={49.99} period="/month" theme="inverted" size="3xl" />
            )}
            <Button variant="secondary" className="w-full bg-white text-black hover:bg-gray-100">
              Get started
            </Button>

            <BulletList gap="sm">
              <BulletListItem icon="check">
                <Text size="sm" className="text-gray-300">
                  100 Domains
                </Text>
              </BulletListItem>
              <BulletListItem icon="check">
                <Text size="sm" className="text-gray-300">
                  1000 Pages per Domain
                </Text>
              </BulletListItem>
              <BulletListItem icon="check">
                <Text size="sm" className="text-gray-300">
                  AllyStudio Access
                </Text>
              </BulletListItem>
              <BulletListItem icon="check">
                <Text size="sm" className="text-gray-300">
                  Auditing Editor
                </Text>
              </BulletListItem>
            </BulletList>
          </PriceCard>
        </ul>
      </Container>
    )
  },
}
