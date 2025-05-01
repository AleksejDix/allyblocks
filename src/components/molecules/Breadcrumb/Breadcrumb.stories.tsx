import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { within, expect, userEvent } from "@storybook/test";
import { Home, Folder, FileText } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  component: Breadcrumb,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

// Basic breadcrumb story
export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Components</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test the nav element has the correct aria label
    const nav = canvas.getByRole("navigation");
    await expect(nav).toHaveAttribute("aria-label", "breadcrumb");

    // Test the list is present
    const list = canvas.getByRole("list");
    await expect(list).toBeInTheDocument();

    // Test links are rendered and have correct href values
    const homeLink = canvas.getByRole("link", { name: /home/i });
    await expect(homeLink).toHaveAttribute("href", "/");

    const docsLink = canvas.getByRole("link", { name: /docs/i });
    await expect(docsLink).toHaveAttribute("href", "/docs");

    // Test the current page is marked correctly
    const currentPage = canvas.getByRole("link", { name: /components/i });
    await expect(currentPage).toHaveAttribute("aria-current", "page");
    await expect(currentPage).toHaveAttribute("aria-disabled", "true");
  },
};

// Breadcrumb with icons
export const WithIcons: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center gap-2">
            <Home aria-hidden="true" size={16} />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs" className="flex items-center gap-2">
            <Folder aria-hidden="true" size={16} />
            Docs
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="flex items-center gap-2">
            <FileText aria-hidden="true" size={16} />
            Components
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that the icons are present
    const homeLink = canvas.getByRole("link", { name: /home/i });
    const homeIcon = homeLink.querySelector("svg");
    await expect(homeIcon).not.toBeNull();

    // Test the page with icon
    const currentPage = canvas.getByRole("link", { name: /components/i });
    const pageIcon = currentPage.querySelector("svg");
    await expect(pageIcon).not.toBeNull();
  },
};

// Breadcrumb with ellipsis for truncated paths
export const WithEllipsis: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/ui">UI</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test ellipsis is present - find by data-slot instead of role
    const ellipsis = canvas
      .getByText("More")
      .closest('[data-slot="breadcrumb-ellipsis"]') as HTMLElement;
    await expect(ellipsis).toBeInTheDocument();
    await expect(ellipsis).toHaveAttribute("aria-hidden", "true");

    // Check for the screenreader text
    const srText = within(ellipsis).getByText("More");
    await expect(srText).toHaveClass("sr-only");

    // Test that links still work around the ellipsis
    const homeLink = canvas.getByRole("link", { name: /home/i });
    await expect(homeLink).toBeInTheDocument();

    const uiLink = canvas.getByRole("link", { name: /ui/i });
    await expect(uiLink).toBeInTheDocument();
  },
};

// Breadcrumb with custom separator
export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Components</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that the custom separator is rendered - by data-slot instead of role
    const separators = canvas.getAllByText("/");
    await expect(separators.length).toBeGreaterThan(0);

    // Check that at least one separator has the expected attributes
    const separatorWithText = separators[0].closest(
      '[data-slot="breadcrumb-separator"]'
    ) as HTMLElement;
    await expect(separatorWithText).not.toBeNull();
    await expect(separatorWithText).toHaveAttribute("aria-hidden", "true");
  },
};

// Test link click with asChild prop
export const WithCustomLink: Story = {
  render: () => {
    // Define a custom link component for the test
    const CustomLink = React.forwardRef<
      HTMLAnchorElement,
      React.ComponentProps<"a"> & { active?: boolean }
    >(({ active, className, ...props }, ref) => (
      <a
        ref={ref}
        className={`test-custom-link${active ? " active" : ""} ${
          className || ""
        }`}
        data-testid={active ? "active-link" : undefined}
        {...props}
      />
    ));

    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <CustomLink href="/">Home</CustomLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <CustomLink href="/docs" active>
                Docs
              </CustomLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>API</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the custom link and verify it works with asChild
    const activeLink = canvas.getByTestId("active-link");
    await expect(activeLink).toHaveClass("test-custom-link active");
    await expect(activeLink).toHaveAttribute("href", "/docs");

    // Test click behavior
    let clicked = false;
    // Mock the default link behavior
    activeLink.addEventListener("click", (e) => {
      e.preventDefault();
      clicked = true;
    });

    await userEvent.click(activeLink);
    await expect(clicked).toBe(true);
  },
};
