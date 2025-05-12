import type { Meta, StoryObj } from "@storybook/react";
import { Quote } from "./Quote";
import { within, expect } from "@storybook/test";

const meta = {
  component: Quote,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Quote>;

export default meta;
type Story = StoryObj<typeof Quote>;

// Basic usage
export const Default: Story = {
  args: {
    children: "This is a basic quote",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const quote = await canvas.getByText("This is a basic quote");
    expect(quote).toHaveClass("font-serif italic");
  },
};

// Language variants
export const English: Story = {
  args: {
    lang: "en",
    children: "This is an English quote",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const quote = await canvas.getByText("This is an English quote");
    expect(quote).toHaveStyle({
      "--quote-open": '"',
      "--quote-close": '"',
    });
  },
};

export const French: Story = {
  args: {
    lang: "fr",
    children: "Ceci est une citation française",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const quote = await canvas.getByText("Ceci est une citation française");
    expect(quote).toHaveStyle({
      "--quote-open": '"« "',
      "--quote-close": '" »"',
    });
  },
};

export const German: Story = {
  args: {
    lang: "de",
    children: "Dies ist ein deutsches Zitat",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const quote = await canvas.getByText("Dies ist ein deutsches Zitat");
    expect(quote).toHaveStyle({
      "--quote-open": '"„"',
      "--quote-close": '""',
    });
  },
};

export const Japanese: Story = {
  args: {
    lang: "ja",
    children: "これは日本語の引用です",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const quote = await canvas.getByText("これは日本語の引用です");
    expect(quote).toHaveStyle({
      "--quote-open": '"「"',
      "--quote-close": '"」"',
    });
  },
};

export const Chinese: Story = {
  args: {
    lang: "zh",
    children: "这是一段中文引用",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const quote = await canvas.getByText("这是一段中文引用");
    expect(quote).toHaveStyle({
      "--quote-open": '"「"',
      "--quote-close": '"」"',
    });
  },
};

export const Russian: Story = {
  args: {
    lang: "ru",
    children: "Это русская цитата",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const quote = await canvas.getByText("Это русская цитата");
    expect(quote).toHaveStyle({
      "--quote-open": '"«"',
      "--quote-close": '"»"',
    });
  },
};

// Custom quotes
export const CustomQuotes: Story = {
  args: {
    quoteOpen: "→",
    quoteClose: "←",
    children: "This quote uses custom arrow marks",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const quote = await canvas.getByText("This quote uses custom arrow marks");
    expect(quote).toHaveStyle({
      "--quote-open": '"→"',
      "--quote-close": '"←"',
    });
  },
};

// Nested quotes
export const NestedQuotes: Story = {
  render: () => (
    <div className="space-y-4">
      <Quote lang="en">
        This is a quote with a <Quote>nested quote</Quote> inside
      </Quote>
      <Quote lang="fr">
        Ceci est une citation avec une <Quote>citation imbriquée</Quote> à
        l'intérieur
      </Quote>
      <Quote lang="ja">
        これは<Quote>入れ子になった引用</Quote>を含む引用です
      </Quote>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // English
    const outerEn = await canvas.getByText(/This is a quote with a/);
    const innerEn = await canvas.getByText("nested quote");
    expect(outerEn).toBeInTheDocument();
    expect(innerEn).toBeInTheDocument();
    // French
    const outerFr = await canvas.getByText(/Ceci est une citation/);
    const innerFr = await canvas.getByText("citation imbriquée");
    expect(outerFr).toBeInTheDocument();
    expect(innerFr).toBeInTheDocument();
    // Japanese
    const outerJa = await canvas.getByText(/これは/);
    const innerJa = await canvas.getByText("入れ子になった引用");
    expect(outerJa).toBeInTheDocument();
    expect(innerJa).toBeInTheDocument();
  },
};

// Long quotes
export const LongQuote: Story = {
  args: {
    lang: "en",
    children:
      "This is a longer quote that demonstrates how the component handles multiple lines of text. It should maintain proper spacing and alignment while preserving the quotation marks at the beginning and end.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const quote = await canvas.getByText(
      "This is a longer quote that demonstrates how the component handles multiple lines of text. It should maintain proper spacing and alignment while preserving the quotation marks at the beginning and end."
    );
    expect(quote).toBeInTheDocument();
    expect(quote).toHaveClass("font-serif italic");
  },
};

// With custom styling
export const StyledQuote: Story = {
  args: {
    lang: "en",
    className: "text-blue-600 font-bold",
    children: "This quote has custom styling",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const quote = await canvas.getByText("This quote has custom styling");
    expect(quote).toHaveClass("text-blue-600 font-bold");
  },
};

// All language variants
export const AllLanguages: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Quote lang="en">English quote</Quote>
      <Quote lang="fr">Citation française</Quote>
      <Quote lang="de">Deutsches Zitat</Quote>
      <Quote lang="es">Cita en español</Quote>
      <Quote lang="it">Citazione italiana</Quote>
      <Quote lang="ru">Русская цитата</Quote>
      <Quote lang="pl">Polski cytat</Quote>
      <Quote lang="ja">日本語の引用</Quote>
      <Quote lang="zh">中文引用</Quote>
      <Quote lang="he">ציטוט בעברית</Quote>
      <Quote lang="el">Ελληνικό απόσπασμα</Quote>
      <Quote lang="sv">Svenskt citat</Quote>
      <Quote lang="no">Norsk sitat</Quote>
      <Quote lang="da">Dansk citat</Quote>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const languages = [
      "English quote",
      "Citation française",
      "Deutsches Zitat",
      "Cita en español",
      "Citazione italiana",
      "Русская цитата",
      "Polski cytat",
      "日本語の引用",
      "中文引用",
      "ציטוט בעברית",
      "Ελληνικό απόσπασμα",
      "Svenskt citat",
      "Norsk sitat",
      "Dansk citat",
    ];
    for (const text of languages) {
      const quote = await canvas.getByText(text);
      expect(quote).toBeInTheDocument();
    }
  },
};
