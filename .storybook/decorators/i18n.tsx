import React, { Suspense, useEffect, ReactNode } from "react";
import type { Decorator } from "@storybook/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../src/i18n/i18n";

interface I18nProviderProps {
  children: ReactNode;
  locale: string;
}

// React component that will be used in the decorator
const I18nProvider = ({ children, locale }: I18nProviderProps) => {
  // Handle language changes from Storybook toolbar
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  // Handle document updates and initialization
  useEffect(() => {
    const onChange = (lng: string) => {
      document.documentElement.lang = lng;
      document.dir = i18n.dir(lng);
    };

    i18n.on("languageChanged", onChange);
    onChange(i18n.language); // initial apply

    return () => i18n.off("languageChanged", onChange);
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </Suspense>
  );
};

export const withI18next: Decorator = (StoryFn, context) => {
  const locale = context.globals.locale || "de";

  return (
    <I18nProvider locale={locale}>
      <StoryFn />
    </I18nProvider>
  );
};
