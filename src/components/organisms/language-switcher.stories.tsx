import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor, screen } from "@storybook/test";
import LanguageSwitcher from "./language-switcher";

const meta: Meta<typeof LanguageSwitcher> = {
  title: "Organisms/LanguageSwitcher",
  component: LanguageSwitcher,
  parameters: {
    docs: {
      description: {
        component: "A dropdown component to switch between available languages",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LanguageSwitcher>;

export const Interactive: Story = {
  render: () => <LanguageSwitcher />,
  parameters: {
    locale: "de",
    docs: {
      description: {
        story: "Interactive language switcher showing language selection",
      },
    },
  },
  play: async ({ canvasElement }) => {
    // const canvas = within(canvasElement);
    // // Get the language switcher button within the component's canvas
    // const button = canvas.getByRole("button");
    // await expect(button).toBeInTheDocument();
    // // Click to open dropdown
    // await userEvent.click(button);
    // console.log(document.querySelectorAll("button"));
    // Wait for the dropdown menu items to appear using their accessible names
    // await waitFor(() => {
    //   const languages = ["Deutsch", "English", "Français", "Italiano"];
    //   for (const language of languages) {
    //     // Use screen.getByRole inside waitFor - it retries until found or timeout
    //     expect(
    //       screen.getByRole("menuitemradio", { name: accessibleName })
    //     ).toBeVisible();
    //   }
    // });
    // Now that items are present, get the English option using screen
    // const englishAccessibleName = "Change language to English";
    // const englishOption = screen.getByRole("menuitemradio", {
    //   name: englishAccessibleName,
    // });
    // Click the English option
    // await userEvent.click(englishOption);
    // After selecting a language, the dropdown should close.
    // Verify this by ensuring one of the menu items is no longer present.
    // await waitFor(() => {
    //   const germanAccessibleName = "Change language to Deutsch";
    //   // Use screen.queryByRole - it returns null if not found, suitable for absence check
    //   const anyDropdownItem = screen.queryByRole("menuitemradio", {
    //     name: germanAccessibleName,
    //   });
    //   expect(anyDropdownItem).not.toBeInTheDocument();
    // });
    // Optional: Check if the button text updated (requires i18n setup or component structure knowledge)
    // await expect(canvas.getByRole("button")).toHaveTextContent(/English/i);
  },
};
