import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, userEvent, expect, waitFor, screen } from 'storybook/test'
import { LanguageMenu } from './LanguageMenu'
import i18n from '@/i18n/i18n'
import { ActionGroup } from '@/components/molecules/ActionGroup'
import { Separator } from '@/components/atoms/Separator'

const meta: Meta<typeof LanguageMenu> = {
  component: LanguageMenu,
  parameters: {
    nuqs: {
      disabled: false,
    },
  },
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof LanguageMenu>

const withLanguageCleanup = async (testFn: () => Promise<void>, originalLanguage = 'de'): Promise<void> => {
  try {
    // Wait for i18n to be initialized and set to German
    await i18n.changeLanguage(originalLanguage)
    await waitFor(() => {
      expect(i18n.language).toBe(originalLanguage)
    })
    await testFn()
  } finally {
    await i18n.changeLanguage(originalLanguage)
    document.documentElement.lang = originalLanguage
    document.dir = i18n.dir(originalLanguage)
  }
}

export const Interactive: Story = {
  render: () => (
    <ActionGroup>
      <LanguageMenu />
      <Separator orientation="vertical" />
      <LanguageMenu />
    </ActionGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive language switcher showing language selection',
      },
    },
  },
  play: async ({ canvasElement }) => {
    await withLanguageCleanup(async () => {
      const canvas = within(canvasElement)

      // Wait for i18n to be initialized and translations to be loaded
      await waitFor(() => {
        const buttons = canvas.getAllByRole('button')
        expect(buttons[0]).toHaveAttribute('aria-label', 'Sprache ändern, aktuelle Sprache ist Deutsch')
      })

      const buttons = canvas.getAllByRole('button')
      const button = buttons[0]

      // 2. Test opening the dropdown
      await userEvent.click(button)

      // 3. Verify all language options are available
      await waitFor(() => {
        const languages = ['Deutsch', 'English', 'Français', 'Italiano']
        for (const language of languages) {
          expect(
            screen.getByRole('menuitemradio', {
              name: new RegExp(`Sprache ändern zu ${language}`, 'i'),
            }),
          ).toBeVisible()
        }
      })

      // 4. Test changing language to English
      const englishOption = screen.getByRole('menuitemradio', {
        name: /Sprache ändern zu English/i,
      })
      await userEvent.click(englishOption)

      // Wait for language change and verify - this component uses query state, not document.lang
      await waitFor(
        () => {
          // The UI stays in German but shows "English" as selected language
          expect(button).toHaveAttribute('aria-label', 'Sprache ändern, aktuelle Sprache ist English')
          // Check if button text content shows "English"
          expect(button).toHaveTextContent('English')
        },
        { timeout: 5000 }
      )
    })
  },
}
