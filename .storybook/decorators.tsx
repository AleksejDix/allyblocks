import type { Decorator } from "@storybook/react";
import React, { useEffect, Suspense } from "react";
import i18n from "../src/i18n/i18n";
import { I18nextProvider } from "react-i18next";

export const withI18next: Decorator = (Story, context) => {
  const { locale } = context.globals;

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  const html = document.documentElement;
  html.dir = i18n.dir(locale);
  html.lang = locale;

  return (
    <Suspense fallback={<div>loading translations...</div>}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </Suspense>
  );
};

i18n.on("languageChanged", (locale) => {
  const direction = i18n.dir(locale);
  document.dir = direction;
});

export const withBrand: Decorator = (Story, context) => {
  const { theme } = context.globals;

  const html = document.documentElement;
  html.setAttribute("data-brand", theme || "");

  return <Story />;
};

export const withScheme: Decorator = (Story, context) => {
  const { scheme } = context.globals;

  const html = document.documentElement;
  html.classList.toggle("dark", scheme === "dark");

  return <Story />;
};
