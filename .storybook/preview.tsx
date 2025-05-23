import "../src/styles/index.css";
import { withBrand, withNuqs, withI18next, withDarkMode } from "./decorators";
import i18n from "../src/i18n/i18n";
import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";
const parameters: Preview["parameters"] = {
  backgrounds: {
    disable: true,
  },
  docs: {
    theme: themes.dark,
    toc: true,
  },
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

const globalTypes: Preview["globalTypes"] = {
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
  scheme: {
    name: "Scheme",
    description: "Scheme",
    defaultValue: "system",
    toolbar: {
      icon: "globe",
      items: [
        { value: "light", title: "Light" },
        { value: "dark", title: "Dark" },
        { value: "system", title: "System" },
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
};

const preview: Preview = {
  decorators: [withBrand, withDarkMode, withNuqs, withI18next],
  globalTypes,
  parameters,
};

export default preview;
