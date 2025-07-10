import type { Meta, StoryObj } from '@storybook/react'
import { Banner, BannerIcon, BannerContent, BannerActions } from './Banner'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'
import { Stack } from '@/components/atoms/Stack'

const meta: Meta<typeof Banner> = {
  component: Banner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Banner>

export const Newsletter: Story = {
  render: () => (
    <Banner>
      <BannerIcon>
        <Icon name="mail" />
      </BannerIcon>
      <BannerContent>
        <Text type="body" size="sm" weight={500}>
          Subscribe to our newsletter and get 10% off your first order!
        </Text>
      </BannerContent>
      <BannerActions>
        <Button size="sm">Subscribe</Button>
      </BannerActions>
    </Banner>
  ),
}

export const VersionUpdate: Story = {
  render: () => (
    <Banner>
      <BannerIcon>
        <Icon name="arrow-up" />
      </BannerIcon>
      <BannerContent>
        <Text type="body" size="sm" weight={500}>
          v2.1.0 • New features and improvements available
        </Text>
      </BannerContent>
      <BannerActions>
        <Button size="sm">Update now</Button>
      </BannerActions>
    </Banner>
  ),
}

export const WithDismiss: Story = {
  render: () => (
    <Banner>
      <BannerIcon>
        <Icon name="gift" />
      </BannerIcon>
      <BannerContent>
        <Text type="body" size="sm" weight={500}>
          Free shipping on orders over $50! Limited time offer.
        </Text>
      </BannerContent>
      <BannerActions>
        <Button variant="secondary" size="sm">
          Dismiss
        </Button>
        <Button size="sm">Shop Now</Button>
      </BannerActions>
    </Banner>
  ),
}

export const CookieConsent: Story = {
  render: () => (
    <Banner>
      <BannerIcon>
        <Icon name="cookie" />
      </BannerIcon>
      <BannerContent>
        <Text type="body" size="sm" weight={500}>
          We use cookies to improve your experience. By continuing, you agree to our cookie policy.
        </Text>
      </BannerContent>
      <BannerActions>
        <Button variant="secondary" size="sm">
          Decline
        </Button>
        <Button size="sm">Accept</Button>
      </BannerActions>
    </Banner>
  ),
}

export const Maintenance: Story = {
  render: () => (
    <Banner>
      <BannerIcon>
        <Icon name="wrench" />
      </BannerIcon>
      <BannerContent>
        <Stack gap="xs">
          <Text type="heading" size="md">
            Scheduled maintenance
          </Text>
          <Text type="body">Some features may be unavailable today 2-4 PM EST.</Text>
        </Stack>
      </BannerContent>
    </Banner>
  ),
}

export const SimpleText: Story = {
  render: () => (
    <Banner>
      <BannerContent>
        <Text type="body" size="sm" weight={500}>
          Welcome to our platform! Explore all the features we have to offer.
        </Text>
      </BannerContent>
    </Banner>
  ),
}
