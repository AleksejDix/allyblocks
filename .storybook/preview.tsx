import "../src/styles/index.css";
import { withBrand, withScheme, withNuqs, withI18next } from "./decorators";
import i18n from "../src/i18n/i18n";
import type { Preview } from "@storybook/react";

export const parameters: Preview["parameters"] = {
  backgrounds: { disable: true },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },

  options: {
    storySort: {
      order: [
        "Docs",
        ["Introduction", "Atomic Design", "Component Categories"],
        "Atoms",
        ["Input", "Action", "Display", "Layout"],
        "Molecules",
        "Organisms",
      ],
    },
  },
  i18n,
  a11y: {
    config: {
      rules: [
        {
          id: "color-contrast",
          enabled: true,
        },
      ],
    },
  },
};

export const globalTypes: Preview["globalTypes"] = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    defaultValue: "de",
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
  brand: {
    name: "Brand",
    description: "Brand",
    defaultValue: "schadcn",
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
    defaultValue: "auto",
    toolbar: {
      icon: "mirror",
      items: [
        { value: "light", title: "Light" },
        { value: "dark", title: "Dark" },
        { value: "auto", title: "Auto" },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

const preview: Preview = {
  decorators: [withBrand, withScheme, withNuqs, withI18next],
};

export default preview;
