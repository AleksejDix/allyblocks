import { beforeAll, afterEach, vi } from "vitest";
import { setProjectAnnotations } from "@storybook/react";
import * as projectAnnotations from "./preview";
import React from "react";

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: "3rdParty",
    init: () => {},
  },
  I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
}));

const annotations = setProjectAnnotations([projectAnnotations]);

beforeAll(annotations.beforeAll);

// Store the original URL to restore after each test
let originalUrl: string;

beforeAll(() => {
  // Save the original URL when tests start
  originalUrl = window.location.href;
});

afterEach(() => {
  // Restore the original URL after each test
  if (window.location.href !== originalUrl) {
    window.history.pushState({}, "", originalUrl);

    // If we have custom event handlers for URL changes, notify them too
    window.dispatchEvent(new PopStateEvent("popstate", { state: {} }));
    document.dispatchEvent(new Event("nuqs:url-updated"));
  }
});
