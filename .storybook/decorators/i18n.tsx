import React, { Suspense, useEffect, ReactNode } from "react";
import type { Decorator } from "@storybook/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../src/i18n/i18n";
import { i18n as I18nInstance } from "i18next";

interface I18nProviderProps {
  children: ReactNode;
  locale: string;
  i18nInstance: I18nInstance;
}

// React component that will be used in the decorator
const I18nProvider = ({
  children,
  locale,
  i18nInstance,
}: I18nProviderProps) => {
  // Handle language changes from Storybook toolbar
  useEffect(() => {
    if (i18nInstance.language !== locale) {
      i18nInstance.changeLanguage(locale);
    }
  }, [locale, i18nInstance]);

  // Handle document updates and initialization
  useEffect(() => {
    const onChange = (lng: string) => {
      document.documentElement.lang = lng;
      document.dir = i18nInstance.dir(lng);
      // reload the page
      if (lng !== i18nInstance.language) {
        window.location.reload();
      }
    };

    i18nInstance.on("languageChanged", onChange);
    onChange(i18nInstance.language); // initial apply

    return () => i18nInstance.off("languageChanged", onChange);
  }, [i18nInstance]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
    </Suspense>
  );
};

export const withI18next: Decorator = (StoryFn, context) => {
  const locale = context.globals.locale;
  const i18nInstance = context.parameters.i18n || i18n;

  return (
    <I18nProvider locale={locale} i18nInstance={i18nInstance}>
      <StoryFn />
    </I18nProvider>
  );
};
