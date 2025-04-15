import type { Decorator } from "@storybook/react";
import React from "react";
import i18n from "../../src/i18n/i18n";
import { I18nextProvider } from "react-i18next";

export const withI18next: Decorator = (Story, context) => {
  const { locale } = context.globals;

  const html = document.documentElement;
  html.dir = i18n.dir(locale);
  html.lang = locale;

  return (
    <I18nextProvider i18n={i18n}>
      <Story />
    </I18nextProvider>
  );
};

i18n.on("languageChanged", (locale) => {
  const direction = i18n.dir(locale);
  document.dir = direction;
});
