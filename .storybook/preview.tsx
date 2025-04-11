import "../src/styles/index.css";

import { withBrand, withScheme, withI18next } from "./decorators";
import { type Preview } from "@storybook/react";

export const parameters: Preview["parameters"] = {
  backgrounds: { disable: true },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: "alphabetical",
      includeNames: true,
      locales: ["de", "en", "fr", "it"],
    },
  },
};

export const globalTypes: Preview["globalTypes"] = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    toolbar: {
      icon: "globe",
      items: [
        { value: "de", title: "Deutsch" },
        { value: "en", title: "English" },
        { value: "fr", title: "Français" },
        { value: "it", title: "Italiano" },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
  theme: {
    name: "Theme",
    description: "Theme",
    toolbar: {
      icon: "contrast",
      items: [
        { value: "medidata", title: "MediData" },
        { value: "schadcn", title: "schadcn" },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
  scheme: {
    name: "scheme",
    description: "scheme",
    defaultValue: "light",
    toolbar: {
      icon: "mirror",
      items: [
        { value: "light", title: "Light" },
        { value: "dark", title: "Dark" },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

export const decorators = [withBrand, withScheme, withI18next];
