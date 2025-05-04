import React from "react";
import type { Decorator } from "@storybook/react";

// Theme modes
export type ThemeMode = "light" | "dark" | "system";

// Decorator that syncs with the scheme globalType
export const withDarkMode: Decorator = (Story, context) => {
  const { scheme } = context.globals;
  const html = document.documentElement;

  // Check if we should use dark mode
  const systemIsDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const shouldBeDark = scheme === "system" ? systemIsDark : scheme === "dark";

  // Apply to document
  if (shouldBeDark) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }

  // Apply to iframes (for stories)
  document.querySelectorAll("iframe").forEach((iframe) => {
    try {
      if (iframe.contentDocument) {
        if (shouldBeDark) {
          iframe.contentDocument.documentElement.classList.add("dark");
        } else {
          iframe.contentDocument.documentElement.classList.remove("dark");
        }
      }
    } catch {
      // Ignore cross-origin errors
    }
  });

  // Apply to autodocs (.sbdocs elements)
  document.querySelectorAll(".sbdocs").forEach((element) => {
    if (shouldBeDark) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  });

  return <Story {...context} />;
};
