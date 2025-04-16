import "../src/styles/index.css";
import { withBrand, withScheme, withNuqs, withI18next } from "./decorators";
import i18n from "../src/i18n/i18n";
import { type Preview } from "@storybook/react";

const parameters: Preview["parameters"] = {
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
    },
  },
  i18n,
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
  brand: {
    name: "Brand",
    description: "Brand",
    defaultValue: "medidata",
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
  parameters,
  globalTypes,
};

export default preview;
