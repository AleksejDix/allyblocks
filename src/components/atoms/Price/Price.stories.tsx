import type { Meta, StoryObj } from '@storybook/react'
import { Price } from './Price'

const meta: Meta<typeof Price> = {
  component: Price,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    amount: { control: 'number' },
    currency: { control: 'text' },
    locale: { control: 'text' },
    period: { control: 'text' },
    originalAmount: { control: 'number' },
    discounted: { control: 'boolean' },
    showCurrency: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
    },
    theme: {
      control: { type: 'select' },
      options: ['default', 'inverted'],
    },
    layout: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    discountColor: {
      control: { type: 'select' },
      options: ['red'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    amount: 299,
    period: '/year',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Small</span>
        <Price amount={99} size="sm" period="/month" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Medium</span>
        <Price amount={199} size="md" period="/month" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Large</span>
        <Price amount={299} size="lg" period="/year" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">4XL (Default)</span>
        <Price amount={599} size="4xl" period="/year" />
      </div>
    </div>
  ),
}

export const WithDiscount: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Horizontal Layout (Default)</span>
        <Price amount={199} originalAmount={299} discounted period="/year" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Vertical Layout</span>
        <Price amount={199} originalAmount={299} discounted layout="vertical" period="/year" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Vertical + Red Discount</span>
        <Price amount={199} originalAmount={299} discounted layout="vertical" discountColor="red" period="/year" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Inverted + Red Discount</span>
        <div className="p-4 bg-gray-900 rounded-md">
          <Price
            amount={23}
            originalAmount={29}
            discounted
            layout="vertical"
            discountColor="red"
            period="/month"
            size="3xl"
            theme="inverted"
          />
        </div>
      </div>
    </div>
  ),
}

export const InternationalCurrencies: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Swiss Franc (de-CH)</span>
        <Price amount={299.99} currency="CHF" locale="de-CH" period="/year" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Euro (de-DE)</span>
        <Price amount={249.5} currency="EUR" locale="de-DE" period="/year" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">British Pound (en-GB)</span>
        <Price amount={199.99} currency="GBP" locale="en-GB" period="/year" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Japanese Yen (ja-JP)</span>
        <Price amount={29999} currency="JPY" locale="ja-JP" period="/year" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Indian Rupee (hi-IN)</span>
        <Price amount={24999} currency="INR" locale="hi-IN" period="/year" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Canadian Dollar (en-CA)</span>
        <Price amount={349.99} currency="CAD" locale="en-CA" period="/year" />
      </div>
    </div>
  ),
}

export const CustomFormatting: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">No Decimal Places</span>
        <Price amount={1299.99} period="/year" formatOptions={{ minimumFractionDigits: 0, maximumFractionDigits: 0 }} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Always 2 Decimals</span>
        <Price amount={299} period="/year" formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Currency Code Instead of Symbol</span>
        <Price amount={299} currency="CHF" period="/year" formatOptions={{ currencyDisplay: 'code' }} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Number Only (No Currency)</span>
        <Price amount={1299.99} period=" credits" showCurrency={false} />
      </div>
    </div>
  ),
}

export const InvertedTheme: Story = {
  render: () => (
    <div className="flex gap-6 p-4">
      <div className="p-4 bg-white rounded-md">
        <h3 className="text-sm font-medium mb-3 text-gray-900">Default Theme</h3>
        <Price amount={299} period="/year" />
      </div>

      <div className="p-4 bg-gray-900 rounded-md">
        <h3 className="text-sm font-medium mb-3 text-white">Inverted Theme</h3>
        <Price amount={299} period="/year" theme="inverted" />
      </div>
    </div>
  ),
}

export const PricingCardUsage: Story = {
  render: () => (
    <div className="max-w-sm p-6 border rounded-lg bg-gray-900 text-white">
      <h3 className="text-lg font-semibold mb-4">Startup Plan</h3>
      <Price amount={55} originalAmount={69} discounted currency="CHF" period="/year" theme="inverted" />
      <p className="text-sm text-gray-400 mt-2">Per user/month, billed annually</p>
      <button className="w-full mt-4 bg-white text-black py-2 px-4 rounded-md font-medium">Buy plan</button>
    </div>
  ),
}

export const LargeNumbers: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Thousands</span>
        <Price amount={1299} currency="CHF" period="/year" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Millions</span>
        <Price amount={1299999} currency="CHF" period="/year" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">With Custom Decimals</span>
        <Price amount={12999.5} currency="CHF" period="/year" formatOptions={{ minimumFractionDigits: 2 }} />
      </div>
    </div>
  ),
}
