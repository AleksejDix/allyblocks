import type { Meta, StoryObj } from "@storybook/react";
import { Prose } from "./Prose";

const meta: Meta<typeof Prose> = {
  component: Prose,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg", "xl"],
    },
    maxWidth: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "none"],
    },
  },
  args: {
    size: "default",
    maxWidth: "xl",
  }
};

export default meta;
type Story = StoryObj<typeof Prose>;

const sampleContent = `
<h1>Heading 1</h1>
<p>This is a paragraph with some text. It includes <strong>bold text</strong>, <em>italic text</em>, and <a href="#">a link</a>.</p>
<h2>Heading 2</h2>
<p>Another paragraph with some more text. This one includes <code>inline code</code> and a <a href="#">link</a>.</p>
<h3>Heading 3</h3>
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
  <li>List item 3</li>
</ul>
<blockquote>
  <p>This is a blockquote. It can be used to highlight important information or quotes.</p>
</blockquote>
<pre><code>// This is a code block
function hello() {
  console.log("Hello, world!");
}</code></pre>
`;

export const Default: Story = {
  args: {
    html: sampleContent,
  },
};

export const WithChildren: Story = {
  render: () => (
    <Prose>
      <h1>Heading 1</h1>
      <p>This is a paragraph with some text. It includes <strong>bold text</strong>, <em>italic text</em>, and <a href="#">a link</a>.</p>
      <h2>Heading 2</h2>
      <p>Another paragraph with some more text. This one includes <code>inline code</code> and a <a href="#">link</a>.</p>
      <h3>Heading 3</h3>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
      </ul>
      <blockquote>
        <p>This is a blockquote. It can be used to highlight important information or quotes.</p>
      </blockquote>
      <pre>
        <code>
          {`// This is a code block
function hello() {
  console.log("Hello, world!");
}`}
        </code>
      </pre>
    </Prose>
  ),
};

export const Small: Story = {
  args: {
    size: "sm",
    html: sampleContent,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    html: sampleContent,
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    html: sampleContent,
  },
};

export const Narrow: Story = {
  args: {
    maxWidth: "sm",
    html: sampleContent,
  },
};

export const Wide: Story = {
  args: {
    maxWidth: "xl",
    html: sampleContent,
  },
};

export const ExtraWide: Story = {
  args: {
    maxWidth: "3xl",
    html: sampleContent,
  },
}; 