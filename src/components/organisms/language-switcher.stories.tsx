import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor, screen } from "@storybook/test";
import LanguageSwitcher from "@/components/organisms/language-switcher";
import i18n from "@/i18n/i18n";

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

const withLanguageCleanup = async (
  testFn: () => Promise<void>,
  originalLanguage = "de"
): Promise<void> => {
  const initialLanguage = i18n.language || originalLanguage;
  try {
    await testFn();
  } finally {
    await i18n.changeLanguage(initialLanguage);
    document.documentElement.lang = initialLanguage;
    document.dir = i18n.dir(initialLanguage);
  }
};

export const Interactive: Story = {
  render: () => <LanguageSwitcher />,
  parameters: {
    docs: {
      description: {
        story: "Interactive language switcher showing language selection",
      },
    },
  },
  play: async ({ canvasElement }) => {
    await withLanguageCleanup(async () => {
      const canvas = within(canvasElement);

      // 1. Verify German is the initial language
      // Check document language
      await expect(document.documentElement.lang).toBe("de");

      // Get the language switcher button
      const button = canvas.getByRole("button", { name: /Deutsch/i });
      await expect(button).toBeInTheDocument();

      // Verify button shows "Deutsch" as current language
      await expect(button).toHaveTextContent(/Deutsch/i);

      // 2. Test opening the dropdown
      await userEvent.click(button);

      // 3. Verify all language options are available
      await waitFor(() => {
        const languages = ["Deutsch", "English", "Français", "Italiano"];
        for (const language of languages) {
          expect(
            screen.getByRole("menuitemradio", {
              name: new RegExp(language, "i"),
            })
          ).toBeVisible();
        }
      });

      // 4. Test changing language to English
      const englishOption = screen.getByRole("menuitemradio", {
        name: /English/i,
      });
      await userEvent.click(englishOption);

      await waitFor(() => {
        expect(document.documentElement.lang).toBe("en");
        expect(canvas.getByRole("button")).toHaveTextContent(/English/i);
      });
    });
  },
};
